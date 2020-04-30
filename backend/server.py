from flask import Flask, jsonify, request, redirect, Response, render_template
from flask_cors import CORS, cross_origin
from waitress import serve
from time import sleep
from random import randint
import time
from datetime import datetime, date
from jinja2 import Environment, FileSystemLoader
import os
import base64


from error import InvalidUsage
from db_manager import update_user_entry
from db_manager import insert_donation
from db_manager import not_existing_user
from db_manager import check_if_user_exist
from db_manager import create_profile
from db_manager import insert_social_media_links 
from db_manager import insert_uploads
from db_manager import delete_user
from db_manager import get_recipient_profile

from send_email import send_donor_order_confirmation
from send_email import send_reicipient_welcome_email
from send_email import send_recipient_order_confirmation

# google api shit
from google.oauth2 import id_token
from google.auth.transport import requests

from matchmaker import Matchmaker
from payment import DoorDash

import smtplib

app = Flask(__name__)
#CORS(app, resources={r"/*": {"origins": "*"}})
#app.config['CORS_HEADERS'] = 'Content-Type'

env = Environment(loader=FileSystemLoader(
    '%s/templates/' % os.path.dirname(__file__)))


def has_args(iterable, args):
    """Verify that all args are in the iterable."""

    try:
        return all(x in iterable for x in args)

    except TypeError:
        return False


# TODO deploy this in prod
# @app.before_request
# def before_request():
#     print(request.url)
#     print(request.host)
#     print(request.host_url)
#     if request.url.startswith('http://'):
#         url = request.url.replace('http://', 'https://', 1)
#         code = 301
#         return redirect(url, code=code)


@app.route('/', methods=['GET'])
def ping():
    return 'API is Running... wait slow down. The fuck, come back API!', 200


@app.errorhandler(InvalidUsage)
def handle_invalid_usage(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response


@app.route('/deleteUser', methods=['POST', 'OPTIONS'])
def deleteUser():
    if not has_args(request.json, ['idtoken']):
        raise InvalidUsage('missing parameters')

    try:
        # Specify the CLIENT_ID of the app that accesses the backend:
        CLIENT_ID = os.environ.get('CARE37_GOOGLE_CLIENT_ID')

        idinfo = id_token.verify_oauth2_token(request.json['idtoken'], requests.Request(), CLIENT_ID)

        if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
            raise ValueError('Wrong issuer.')

        if CLIENT_ID not in idinfo['aud']:
            print("clientid was not in aud field from google response")
            return 400

        # ID token is valid. Get the user's Google Account ID from the decoded token.

        # delete the user
        email = idinfo['email']
        delete_user_output = delete_user(email)
        return delete_user_output, 200
    except ValueError:
        # Invalid token
        print("invalid login")
        return 400


@app.route('/createProfile', methods=['POST', 'OPTIONS'])
def create_prof():
    # required params
    # TODO the param checking is off
    # if not has_args(request.json, ['idtoken', 'first_name', 'last_name', 'zip_code',
    #                                'bio', 'social_media_links', 'prof_pic'
    #                                'uploads']):
    #     raise InvalidUsage('note all paramenters present')

    try:
        # Specify the CLIENT_ID of the app that accesses the backend:
        CLIENT_ID = os.environ.get('CARE37_GOOGLE_CLIENT_ID')

        idinfo = id_token.verify_oauth2_token(request.json['idtoken'], requests.Request(), CLIENT_ID)

        if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
            raise ValueError('Wrong issuer.')

        if CLIENT_ID not in idinfo['aud']:
            print("clientid was not in aud field from google response")
            return 400

        # ID token is valid. Get the user's Google Account ID from the decoded token.

        email = idinfo['email']
        # create the profile 
        uid = create_profile(email=email, first_name=request.json['first_name'], last_name=request.json['last_name'],
            bio=request.json['bio'], zip_code=request.json['zip_code'], prof_pic=request.json['prof_pic'],
            intro_email_sent=True)
        # insert all of the uploads
        response = insert_uploads(uid=uid, uploads=request.json['uploads'])
        print(response)
        # insert all the social media links
        response = insert_social_media_links(uid=uid, social_media_links=request.json['social_media_links'])
        print(response)

        email_status = False
        if not_existing_user(email):
            template = env.get_template('recipient_intro.html')
            html = template.render(recipient_name=request.json["first_name"])
            # send confirm email to donor
            email_status = send_reicipient_welcome_email(
                recipient_email=email, bodyContent=html)
        print(email_status)
                # insert that bish in the db, naaaah what im sayin
        return 'created', 200
    
    except ValueError:
        # Invalid token
        print("invalid login")
        return 400



@app.route('/makeDonation', methods=['POST', 'OPTIONS'])
def makeDonation():
    if not has_args(request.json, ['sender_first_name', 'sender_last_name', 'sender_email',
                                   'sender_address', 'city', 'state', 'zipcode', 'cardholder_name',
                                   'card_number', 'exp_date', 'cvc', 'dollars', 'recipient_email',
                                   'recipient_first_name', 'recipient_last_name']):
        raise InvalidUsage('Missing paramenters')

    # get the recipient email, first name, last name
    purchase_status = False
    #fill out form
    full_name = request.json['sender_first_name'] + \
        request.json['sender_last_name']
    payment = DoorDash()
    if payment.preFill(dollars=request.json['dollars'], recipient_name=request.json['recipient_first_name'],
                       recipient_email=request.json['recipient_email'], sender_name=full_name) == True:
        sleep(randint(1, 2))
        # pay and deliver
        purchase_status = payment.purchase(sender_email=request.json['sender_email'],
                                           sender_address=request.json['sender_address'],
                                           city=request.json['city'], state=request.json['state'],
                                           zipcode=request.json['zipcode'],
                                           cardholder_name=request.json['cardholder_name'],
                                           card_number=request.json['card_number'],
                                           exp_date=request.json['exp_date'],
                                           cvc=request.json['cvc'])
        if purchase_status['status'] == True:
            # render template for donor:
            d2 = date.today().strftime("%B %d, %Y")
            template = env.get_template('billing.html')
            html = template.render(amount_donated=request.json["dollars"],
                                   invoice_number=1,
                                   Transaction_date=d2)
            # send confirm email to donor
            donor_confirm_email = send_donor_order_confirmation(
                donor_email=request.json["sender_email"], bodyContent=html)
            # render template for recipient:
            template = env.get_template('recipient_confirmation.html')
            html = template.render(recipient_name=request.json['recipient_first_name'],
                                   amount_donated=request.json["dollars"])
            recipient_confirm_email = send_recipient_order_confirmation(
                recipient_email=request.json['recipient_email'], bodyContent=html)
            # update User DB
            user_update_status = update_user_entry(
                request.json['recipient_email'], request.json["dollars"])
            # insert to Transactions DB
            timestamp_string = time.strftime(
                "%a, %d %b %Y %H:%M:%S +0000", datetime.fromtimestamp(int(time.time())).timetuple())
            donation_update_status = insert_donation(request.json['recipient_email'], request.json["dollars"],
                                                     request.json["sender_email"],
                                                     request.json["sender_first_name"],
                                                     request.json["sender_last_name"],
                                                     timestamp_string,
                                                     donor_confirm_email,
                                                     recipient_confirm_email)

            return "Transaction Complete:" + str(purchase_status) + " | User Table Updated:" + str(user_update_status) + " | Transactions Table Inserted:" + str(donation_update_status), 200
        else:
            return "Transaction Complete:" + str(purchase_status) + " | User Table Updated:" + "False" + " | Transactions Table Inserted:" + "False", 400
    else:
        return "There was an error", 500


############################## GOOGLE AUTH ##############################

# logins in a user given their google idtoken
# returns true is the user exists in the db, false if not
@app.route('/login', methods=['POST', 'OPTIONS'])
def login():
    if not has_args(request.json, ['idtoken']):
        raise InvalidUsage('Missing paramenters')
    try:
        # Specify the CLIENT_ID of the app that accesses the backend:
        CLIENT_ID = os.environ.get('CARE37_GOOGLE_CLIENT_ID')

        idinfo = id_token.verify_oauth2_token(request.json['idtoken'], requests.Request(), CLIENT_ID)

        if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
            raise ValueError('Wrong issuer.')

        if CLIENT_ID not in idinfo['aud']:
            print("clientid was not in aud field from google response")
            return 400

        # ID token is valid. Get the user's Google Account ID from the decoded token.

        email = idinfo['email']
        if check_if_user_exist(email):
            return jsonify({"user_exists": True}), 200
        else:
            return jsonify({"user_exists": False}), 200

    except ValueError:
        # Invalid token
        print("invalid login")
        return 400


@app.route('/getNextRecipient', methods=['GET', 'OPTIONS'])
def get_next_recipient():
    recipient = Matchmaker().get_recipientProfile()
    profile = get_recipient_profile(recipient.get_email())

    profile_dict = _profile_to_dict(profile=profile)

    return jsonify(profile_dict), 200

@app.route('/getRecipientProfile', methods=['GET', 'OPTIONS'])
def get_recipient_prof():
    if not has_args(request.args, ['idtoken']):
        raise InvalidUsage('note all paramenters present')

    try:
        # Specify the CLIENT_ID of the app that accesses the backend:
        CLIENT_ID = os.environ.get('CARE37_GOOGLE_CLIENT_ID')

        idinfo = id_token.verify_oauth2_token(request.args['idtoken'], requests.Request(), CLIENT_ID)

        if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
            raise ValueError('Wrong issuer.')

        if CLIENT_ID not in idinfo['aud']:
            print("clientid was not in aud field from google response")
            return 400

        # ID token is valid. Get the user's Google Account ID from the decoded token.

        email = idinfo['email']
        profile = get_recipient_profile(email)

        profile_dict = _profile_to_dict(profile=profile)

        return jsonify(profile_dict), 200

    except ValueError:
        # Invalid token
        print("invalid login")
        return 400
    
def _profile_to_dict(profile):
    profile_basic = profile[0]
    links = profile[1]
    uploads = profile[2]

    for i in range(len(uploads)):
        uploads[i] = [uploads[i][0], uploads[i][1].tobytes().decode("utf-8")] 

    profile_dict = {
        "first_name": profile_basic[1],
        "last_name": profile_basic[2],
        "bio": profile_basic[3],
        "prof_pic": profile_basic[4].tobytes().decode("utf-8"),
        "social_media_links": links,
        "uploads": uploads
    }
    return profile_dict

if __name__ == '__main__':
    app.debug = True
    app.run(threaded=True)
