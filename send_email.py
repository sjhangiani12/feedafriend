import smtplib
from email.mime.text import MIMEText
from email.header import Header
from email.utils import formataddr


#TODO in getting this module done: Create an email template -> get confirmation details and whatever we need, hide pwd from plain text (lol), get

def send_donor_order_confirmation(donor_email, amount_donated, donor_name, ):
    # Define to/from
    sender = 'admin@care37.org'
    sender_title = "Care 37"
    email_recipient = str(donor_email)

    # Create message
    msg = MIMEText("Hi ! Thank you for your order.", 'plain', 'utf-8')
    msg['Subject'] =  Header("Order Confirmation", 'utf-8')
    msg['From'] = formataddr((str(Header(sender_title, 'utf-8')), sender))
    msg['To'] = email_recipient

    # Create server object with SSL option
    server = smtplib.SMTP_SSL('smtp.zoho.com', 465)

    # Perform operations via server
    server.login('admin@care37.org', 'Care37Pwd')
    server.sendmail(sender, [recipient], msg.as_string())
    server.quit()


send_order_confirmation("sharan@uw.edu", )