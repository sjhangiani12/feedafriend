from flask import Flask, jsonify, request
from flask_cors import CORS
from waitress import serve

from error import InvalidUsage
from door_dash import purchase
from door_dash import preFill

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
    return 'API is Running'


@app.errorhandler(InvalidUsage)
def handle_invalid_usage(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response


@app.route('/purchase', methods=['POST'])
def purch():
    if not has_args(request.json, ['sender_email', 'sender_address', 'city', 'state', 'zipcode', 'cardholder_name', 'card_number', 'exp_date', 'cvv']):
        raise InvalidUsage('not all paramenters present')

    # response = jsonify(error.to_dict())
    # response.status_code = error.status_code

    # updates the opening prices dictionary in stockFilter
    request.json['ticker']
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


if __name__ == '__main__':
    app.debug = True
    app.run(threaded=True)


serve(app, host='0.0.0.0', port=5000, threads=350)
