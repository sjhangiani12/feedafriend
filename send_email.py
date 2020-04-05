# Code from best solution in page below:
# https://help.zoho.com/portal/community/topic/zoho-mail-servers-reject-python-smtp-module-communications

import smtplib
from email.mime.text import MIMEText
from email.header import Header
from email.utils import formataddr

# Define to/from
sender = 'admin@care37.org'
sender_title = "Sup Bitch"
recipient = 'rlin20@uw.edu'

# Create message
msg = MIMEText("Did ya kno Nikhil eats ASS", 'plain', 'utf-8')
msg['Subject'] =  Header("Sent from python", 'utf-8')
msg['From'] = formataddr((str(Header(sender_title, 'utf-8')), sender))
msg['To'] = recipient

# Create server object with SSL option
server = smtplib.SMTP_SSL('smtp.zoho.com', 465)

# Perform operations via server
server.login('admin@care37.org', 'Care37Pwd')
server.sendmail(sender, [recipient], msg.as_string())
server.quit()
