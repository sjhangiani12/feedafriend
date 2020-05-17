import smtplib
from flask import render_template
from email.mime.text import MIMEText
from email.header import Header
from email.utils import formataddr
from datetime import datetime
from email.mime.multipart import MIMEMultipart


file = open('sendgrid_api.txt')
pwd = file.read()


def send_donor_order_confirmation(donor_email, bodyContent):
    # Define to/from
    sender = 'hello@feedafriend.org'
    sender_title = "Feed-a-Friend"
    recipient = str(donor_email)

    # Create message
    msg = MIMEMultipart()
    msg['Subject'] =  Header("Order Confirmation", 'utf-8')
    msg['From'] = formataddr((str(Header(sender_title, 'utf-8')), sender))
    msg['To'] = recipient
    
    
    msg.attach(MIMEText(bodyContent, "html"))
    msgBody = msg.as_string()

    try:
        # Create server object with SSL option
        print('connecting')
        server = smtplib.SMTP_SSL('smtp.sendgrid.net', 465)
        print('connected')
        # Perform operations via server
        server.login('apikey', pwd)
        server.sendmail(sender, [recipient], msgBody)
        print("Sent email")
        server.quit()
        return True
    except Exception as error:
        print(error)
        return False
    
    
def send_recipient_order_confirmation(recipient_email, bodyContent):
    # Define to/from
    sender = 'ahello@feedafriend.org'
    sender_title = "Feed-a-Friend"
    recipient = str(recipient_email)

    # Create message
    msg = MIMEMultipart()
    msg['Subject'] =  Header("Order Confirmation", 'utf-8')
    msg['From'] = formataddr((str(Header(sender_title, 'utf-8')), sender))
    msg['To'] = recipient
    
    
    msg.attach(MIMEText(bodyContent, "html"))
    msgBody = msg.as_string()

    try:
        # Create server object with SSL option
        print('connecting')
        server = smtplib.SMTP_SSL('smtp.sendgrid.net', 465)
        print('connected')
        # Perform operations via server
        server.login('apikey', pwd)
        server.sendmail(sender, [recipient], msgBody)
        print("Sent email")
        server.quit()
        return True
    except Exception as error:
        print(error)
        return False
    
def send_reicipient_welcome_email(recipient_email, bodyContent):
    # Define to/from
    sender = 'hello@feedafriend.org'
    sender_title = "Feed-a-Friend"
    recipient = str(recipient_email)

    # Create message
    msg = MIMEMultipart()
    msg['Subject'] =  Header("Thanks for joining the FeedAFriend Community!", 'utf-8')
    msg['From'] = formataddr((str(Header(sender_title, 'utf-8')), sender))
    msg['To'] = recipient
    
    
    msg.attach(MIMEText(bodyContent, "html"))
    msgBody = msg.as_string()

    try:
        # Create server object with SSL option
        print('connecting')
        server = smtplib.SMTP_SSL('smtp.sendgrid.net', 465)
        print('connected')
        # Perform operations via server
        server.login('apikey', pwd)
        server.sendmail(sender, [recipient], msgBody)
        print("Sent email")
        server.quit()
        return True
    except Exception as error:
        print(error)
        return False