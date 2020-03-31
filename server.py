from db_manager import insert_user
from payment import preFill
from payment import purchase
from flask import Flask, jsonify, request
from flask_cors import CORS
from waitress import serve

from error import InvalidUsage

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


@app.route('/purchase', methods=['POST'])
def purch():
    if not has_args(request.json, ['sender_email', 'sender_address', 'city', 'state', 'zipcode', 'cardholder_name', 'card_number', 'exp_date', 'cvv']):
        raise InvalidUsage('note all paramenters present')

    a = Matchmaker().get_recipient()
    print(a)

    status = purchase(sender_email=request.json['sender_email'], sender_address=request.json['sender_address'], city=request.json['city'], state=request.json['state'],
                      zipcode=request.json['zipcode'], cardholder_name=request.json['cardholder_name'], card_number=request.json['card_number'], exp_date=request.json['exp_date'], cvv=request.json['cvv'])

    return status


@app.route('/preFill', methods=['POST'])
def pref():
    if not has_args(request.json, ['dollars', 'recipient_name', 'recipient_email', 'sender_name']):
        raise InvalidUsage('note all paramenters present')
    status = preFill(dollars=request.json['dollars'], recipient_name=request.json['recipient_name'],
                     recipient_email=request.json['recipient_email'], sender_name=request.json['sender_name'])
    return status


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
    if not has_args(request.json, ['sender_name', 'sender_email', 'sender_address', 'city', 'state', 'zipcode', 'cardholder_name', 'card_number', 'exp_date', 'cvv', 'dollars']):
        raise InvalidUsage('Missing paramenters')

    # get matchmaker obj
    # fill out form
    # pay and deliver
    # update User DB
    # insert to Transactions DB
    # send confirm email to both particpants
        # which should update the transaction to indicate this was complete
    recipient = Matchmaker().get_recipientProfile()
    print(recipient)
    # purchase_status = False
    if preFill(dollars=request.json['dollars'], recipient_name=recipient.get_first_name(),
               recipient_email=recipient.get_email(), sender_name=request.json['sender_name']):
        return recipient.get_email()

    #     purchase_status = purchase(sender_email=request.json['sender_email'], sender_address=request.json['sender_address'], city=request.json['city'], state=request.json['state'],
    #                                zipcode=request.json['zipcode'], cardholder_name=request.json['cardholder_name'], card_number=request.json['card_number'], exp_date=request.json['exp_date'], cvv=request.json['cvv'])
    #     print(purchase_status)
    # return status


if __name__ == '__main__':
    app.debug = True
    app.run(threaded=True)


serve(app, host='0.0.0.0', port=5000, threads=350)
