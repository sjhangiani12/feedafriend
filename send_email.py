import smtplib
from flask import render_template
from email.mime.text import MIMEText
from email.header import Header
from email.utils import formataddr
from datetime import datetime
from email.mime.multipart import MIMEMultipart




#TODO in getting this module done: Create an email template -> get confirmation details and whatever we need, hide pwd from plain text (lol), get

def send_donor_order_confirmation(donor_email, amount_donated, donor_name, invoice_number, transaction_date, html):
    # Define to/from
    bcc = 'sharan@uw.edu'
    sender = 'admin@care37.org'
    sender_title = "Care 37"
    email_recipient = str(donor_email)

    # Create message
    msg = MIMEMultipart('alternative')
    msg['Subject'] =  Header("Order Confirmation", 'utf-8')
    msg['From'] = formataddr((str(Header(sender_title, 'utf-8')), sender))
    msg['To'] = email_recipient
    msg['Bcc'] = 'sharan@uw.edu'
    
    
    part2 = MIMEText(html, 'html')
    msg.attach(part2)
    # Create server object with SSL option
    server = smtplib.SMTP_SSL('smtp.zoho.com', 465)

    # Perform operations via server
    server.login('admin@care37.org', 'Care37Pwd')
    server.sendmail(sender, [email_recipient], bcc, msg.as_string())
    server.quit()

    return True



