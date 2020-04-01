from flask import Flask, jsonify, request
from flask_cors import CORS
from waitress import serve
from time import sleep
from random import randint


from error import InvalidUsage
from db_manager import insert_user
from db_manager import update_user_entry
from db_manager import insert_donation

from payment import DoorDash
from matchmaker import Matchmaker

app = Flask(__name__)
CORS(app)


def has_args(iterable, args):
    """Verify that all args are in the iterable."""

    try:
        return all(x in iterable for x in args)

    except TypeError:
        return False


@app.route('/', methods=['GET'])
def ping():
    return 'API is Running... wait slow down. The fuck, come back API!'


@app.errorhandler(InvalidUsage)
def handle_invalid_usage(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response


@app.route('/createUser', methods=['POST'])
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
    return response


@app.route('/makeDonation', methods=['POST'])
def makeDonation():
    if not has_args(request.json, ['sender_first_name', 'sender_last_name', 'sender_email', 'sender_address', 'city', 'state', 'zipcode', 'cardholder_name', 'card_number', 'exp_date', 'cvv', 'dollars']):
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
        purchase_status = payment.purchase(sender_email=request.json['sender_email'], sender_address=request.json['sender_address'],
                                            city=request.json['city'], state=request.json['state'], zipcode=request.json['zipcode'], cardholder_name=request.json['cardholder_name'], card_number=request.json['card_number'], exp_date=request.json['exp_date'], cvv=request.json['cvv'])
    
    # update User DB
    user_update_status = update_user_entry(recipient, request.json["dollars"])
    # insert to Transactions DB
    donation_update_status = insert_donation(recipient, request.json["dollars"], request.json["sender_email"], request.json["sender_first_name"], request.json["sender_last_name"])
    # send confirm email to both particpants
        # which should update the transaction to indicate this was complete
    return "Transaction Complete:" + str(purchase_status) + " | User Table Updated:" + str(user_update_status) + " | Transactions Table Inserted:" + str(donation_update_status)

if __name__ == '__main__':
    app.debug = True
    app.run(threaded=True)
    app.run(ssl_context='adhoc')

