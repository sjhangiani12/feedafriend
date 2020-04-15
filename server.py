from flask import Flask, jsonify, request, redirect, Response, render_template
from flask_cors import CORS, cross_origin
from waitress import serve
from time import sleep
from random import randint
import time
from datetime import datetime
from error import InvalidUsage
from db_manager import insert_user
from db_manager import update_user_entry
from db_manager import insert_donation
from send_email import send_donor_order_confirmation

from matchmaker import Matchmaker
from payment import DoorDash

import smtplib

app = Flask(__name__)
#CORS(app, resources={r"/*": {"origins": "*"}})
#app.config['CORS_HEADERS'] = 'Content-Type'

def has_args(iterable, args):
    """Verify that all args are in the iterable."""

    try:
        return all(x in iterable for x in args)

    except TypeError:
        return False


@app.before_request
def before_request():
    print(request.url)
    print(request.host)
    print(request.host_url)
    if request.url.startswith('http://'):
        url = request.url.replace('http://', 'https://', 1)
        code = 301
        return redirect(url, code=code)


# @app.before_request
# def authorize():
#     if 'auth-token' in request.headers:
#         token = request.headers.get('auth-token')
#         if token != "SharanSmellsSauravLikesPHPRobiIsAFacist":
#             raise InvalidUsage('YOU SHALL NOT PASS... invalid auth token') 
#     else:
#         code = 401
#         raise InvalidUsage('WHERE MY TOKEN AT? no auth-token provided')


@app.route('/', methods=['GET'])
def ping():
    return 'API is Running... wait slow down. The fuck, come back API!'


@app.errorhandler(InvalidUsage)
def handle_invalid_usage(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response


@app.route('/sendEmail', methods=['POST', 'OPTIONS'])
def sendEmail():
    content = 'python is java as a walking is to take a helicopter'
    mail = smtplib.SMTP('smtp.zoho.com', 465)
    mail.ehlo()
    mail.starttls()
    mail.login('nikhil@care37.org', 'NikhileatsASS69')
    mail.sendmail('nikhil@care37.org', 'sharan@care37.org', content)
    mail.close()


@app.route('/createUser', methods=['POST', 'OPTIONS'])
#@cross_origin(origin='*',headers=['Content- Type','Authorization'])
def createUser():
    # required params
    if not has_args(request.json, ['email', 'first_name', 'last_name', 'zip_code']):
        raise InvalidUsage('note all paramenters present')
    # check if they put a bio
    if not has_args(request.json, ['bio']):
        request.json['bio'] = ""
    # insert that bish in the db, naaaah what im sayin
    response = insert_user(request.json['email'], request.json['first_name'], request.json['last_name'],
                           request.json['bio'], request.json['zip_code'])
    response = Response(response)
    # response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/makeDonation', methods=['POST', 'OPTIONS'])
def makeDonation():
    if not has_args(request.json, ['sender_first_name', 'sender_last_name', 'sender_email', 
                                   'sender_address', 'city', 'state', 'zipcode', 'cardholder_name', 
                                   'card_number', 'exp_date', 'cvc', 'dollars']):
        raise InvalidUsage('Missing paramenters')

    # get matchmaker obj
    recipient = Matchmaker().get_recipientProfile()
    purchase_status = False
    payment = DoorDash()
    #fill out form
    full_name = request.json['sender_first_name'] + request.json['sender_last_name']
    if payment.preFill(dollars=request.json['dollars'], recipient_name=recipient.get_first_name(),
                       recipient_email=recipient.get_email(), sender_name=full_name) == True:
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
    
    # update User DB
    user_update_status = update_user_entry(recipient, request.json["dollars"])
    # insert to Transactions DB
    timestamp_string = time.strftime(
    "%a, %d %b %Y %H:%M:%S +0000", datetime.fromtimestamp(int(time.time())).timetuple())
    donation_update_status = insert_donation(recipient, request.json["dollars"], 
                                             request.json["sender_email"], 
                                             request.json["sender_first_name"], 
                                             request.json["sender_last_name"], timestamp_string)
    # send confirm email to both particpants
    
    html = render_template('billing.html', amount_donated=request.json["dollars"], 
                        invoice_number=1, 
                        Transaction_date=timestamp_string)
    # donor_email, amount_donated, donor_name, invoice_number, transaction_date, html
    send_donor_order_confirmation(request.json["sender_email"], request.json['dollars'], request.json["sender_first_name"], 1, timestamp_string, html)

        # which should update the transaction to indicate this was complete
    return "Transaction Complete:" + str(purchase_status) + " | User Table Updated:" + str(user_update_status) + " | Transactions Table Inserted:" + str(donation_update_status)

if __name__ == '__main__':
    app.debug = True
    app.run(threaded=True)
    # enable ssl for local development https://stackoverflow.com/questions/29458548/can-you-add-https-functionality-to-a-python-flask-web-server
    # context = ('/Users/MrSwag/Library/Keychains/server.crt', '/Users/MrSwag/Library/Keychains/server.key')#certificate and key files
    # app.run('127.0.0.1', port=5000, debug=True, ssl_context=context)


