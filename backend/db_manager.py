import psycopg2
import uuid
from datetime import datetime
import time
from configparser import ConfigParser


def config(filename='database.ini', section='postgresql'):
    # create a parser
    parser = ConfigParser()
    # read config file
    parser.read(filename)

    # get section, default to postgresql
    db = {}
    if parser.has_section(section):
        params = parser.items(section)
        for param in params:
            db[param[0]] = param[1] 
    else:
        raise Exception(
            'Section {0} not found in the {1} file'.format(section, filename))

    return db

def update_donations_email(tid, recipient_email_sent_check, donor_email_sent_check):
    """ Update the user donated amount and the num donations after recieiving payment """
    if recipient_email_sent_check is True:
        recipient_email = 1
    else:
        recipient_email = 0
        
    if donor_email_sent_check is True:
        donor_email = 1
    else:
        donor_email = 0
    
    sql = """UPDATE donations SET recipient_email_sent = (%s), donor_email_sent = (%s) WHERE tid = (%s);"""

    data = (str(recipient_email), str(donor_email), str(tid))
    conn = None
    try:
        # read database configuration
        params = config()
        # connect to the PostgreSQL database
        conn = psycopg2.connect(**params)
        # create a new cursor
        cur = conn.cursor()
        # execute the INSERT statement
        cur.execute(sql, data)
        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cur.close()
        return True
    except (Exception, psycopg2.DatabaseError) as error:
        print("FAILED!! Nice going idiot: " + str(error))
        return False
    finally:
        if conn is not None:
            conn.close()

    return "Donations Table Email Fields Updated " + str(tid)


def not_existing_user(email):
    conn = None
    try:
        # read database configuration
        params = config()
        # connect to the PostgreSQL database
        conn = psycopg2.connect(**params)
        # create a new cursor
        cur = conn.cursor()
        # get all the entries in the recipients table
        cur.execute(
            "SELECT email FROM recipients ORDER BY date_created")
        all_emails = cur.fetchall()
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()
            
    for existing_email in all_emails:
        if email == existing_email[0]:
            return False
    return True
    


def update_user_entry(recipient_email, dollars):
    """ Update the user donated amount and the num donations after recieiving payment """
    sql = """UPDATE recipients SET num_donations = (%s), total_recieved = (%s) WHERE uid = (%s);"""

    """ get the info related to the user """
    sql_user = """ SELECT num_donations, total_recieved, uid WHERE email = %s;"""
    ruid = None

    conn = None
    try:
        # read database configuration
        params = config()
        # connect to the PostgreSQL database
        conn = psycopg2.connect(**params)
        # create a new cursor
        cur = conn.cursor()

        # get recpient info
        cur.execute(sql_user, (str(recipient_email),))
        recipient_row = cur.fetchone()

        # calc new values
        new_num_donations = int(recipient_row[0]) + 1
        new_total_recieved = int(recipient_row[1]) + int(dollars)
        ruid = recipient_row[2]

        data = (str(new_num_donations), str(new_total_recieved), str(ruid))
        # execute the INSERT statement
        cur.execute(sql, data)
        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cur.close()
        return True
    except (Exception, psycopg2.DatabaseError) as error:
        print("FAILED!! Nice going idiot: " + str(error))
        return False
    finally:
        if conn is not None:
            conn.close()

    return "updated user entry with uuid: " + str(ruid)


def insert_donation(recipient_email, dollars, donor_email, donor_first_name, donor_last_name, timestamp_string, donor_email_sent, recipient_email_sent):
    """ Insert donation record into donations database """
    sql = """INSERT INTO donations(tid, uid, amount_donated, donor_email, donor_first_name, donor_last_name,
             donation_timestamp, donor_email_sent, recipient_email_sent)

             VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s);"""

    """ get the uid of the user """
    sql_user = """ SELECT uid WHERE email = %s;"""

    conn = None
    try:
        # read database configuration
        params = config()
        # connect to the PostgreSQL database
        conn = psycopg2.connect(**params)
        # create a new cursor
        cur = conn.cursor()

        # get the recipient uid sql statement
        cur.execute(sql_user, (str(recipient_email),))
        ruid = cur.fetchone()[0]

        # generate the Uid
        uuid_string = donor_email + timestamp_string
        created_tuid = uuid.uuid5(uuid.NAMESPACE_OID, uuid_string)
        # execute the INSERT statement
        data = (str(created_tuid), str(ruid), str(dollars), donor_email, donor_first_name, donor_last_name, timestamp_string, 0, 0, donor_email_sent, recipient_email_sent)

        cur.execute(sql, data)

        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cur.close()
        return True
    except (Exception, psycopg2.DatabaseError) as error:
        print("FAILED!! Nice going idiot: " + str(error))
        return False
    finally:
        if conn is not None:
            conn.close()

    return "donation inserted with uid: " + str(created_tuid)


def delete_user(email):
       """ Update the user donated amount and the num donations after recieiving payment """
    sql = """UPDATE recipients SET email = (%s), first_name = (%s), last_name = (%s), bio = (%s), prof_pic = (%s), 
    zip_code = (%s) WHERE uid = (%s);"""

    """ get the info related to the user """
    sql_user = """ SELECT uid WHERE email = %s;"""
    ruid = None

    conn = None
    try:
        # read database configuration
        params = config()
        # connect to the PostgreSQL database
        conn = psycopg2.connect(**params)
        # create a new cursor
        cur = conn.cursor()

        # get recpient info
        cur.execute(sql_user, (str(recipient_email),))
        recipient_row = cur.fetchone()

        # calc new values
        ruid = recipient_row[0]

        data = (str(NULL), str(NULL), str(NULL), str(NULL), str(NULL), str(NULL), str(ruid))
        # execute the INSERT statement
        cur.execute(sql, data)
        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cur.close()
        return True
    except (Exception, psycopg2.DatabaseError) as error:
        print("FAILED!! Nice going idiot: " + str(error))
        return False
    finally:
        if conn is not None:
            conn.close()

    return "deleted user PII with uuid: " + str(ruid)


def insert_user(email, first_name, last_name, bio, zip_code, intro_email_sent):
    """ insert a new vendor into the vendors table """
    sql = """INSERT INTO recipients(uid, email, first_name, last_name, bio, zip_code, date_created,
                                    num_donations, total_recieved, intro_email_sent)

             VALUES( %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);"""
    conn = None
    try:
        # read database configuration
        params = config()
        # connect to the PostgreSQL database
        conn = psycopg2.connect(**params)
        # create a new cursor
        cur = conn.cursor()
        # get the date created (TIMESTAMP '2004-10-19 10:23:54')
        timestamp_string = time.strftime(
            "%a, %d %b %Y %H:%M:%S +0000", datetime.fromtimestamp(int(time.time())).timetuple())
        # generate the Uid
        created_uuid = uuid.uuid5(uuid.NAMESPACE_OID, email)
        # execute the INSERT statement
        cur.execute(sql, (str(created_uuid), email, first_name, last_name, bio, str(
            zip_code), timestamp_string, str(0), str(0), intro_email_sent))
        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        return "FAILED!! Nice going idiot: " + str(error)
    finally:
        if conn is not None:
            conn.close()

    return "user inserted with uid: " + str(created_uuid)


def add_phone_number(email, phone_number):
    """ add phone number to the user """
    sql = """update recipients 
             set phone_number = %s
             where email = %s;"""

    # read database configuration
    params = config()
    # connect to the PostgreSQL database
    conn = psycopg2.connect(**params)
    # create a new cursor
    cur = conn.cursor()
    # execute the UPDATE statement
    cur.execute(sql, (str(phone_number), str(email)))
    # commit the changes to the database
    conn.commit()
    # close communication with the database
    cur.close()
    return "phone number updated for email: " + str(email)

def get_phone_number(email):
    """ get phone number """
    sql = """select phone_number
             from recipients 
             where email = %s;"""

    # read database configuration
    params = config()
    # connect to the PostgreSQL database
    conn = psycopg2.connect(**params)
    # create a new cursor
    cur = conn.cursor()
    # execute the UPDATE statement
    cur.execute(sql, (str(email),))
    # check if not found
    if (cur.rowcount == 0):
        return 0
    # get the phone number
    phone_number = cur.fetchone()
    # commit the changes to the database
    conn.commit()
    # close communication with the database
    cur.close()
    return phone_number[0]


def get_is_verified(email):
    """ get is verified"""
    sql = """select is_verified 
             from recipients 
             where email = %s;"""

    # read database configuration
    params = config()
    # connect to the PostgreSQL database
    conn = psycopg2.connect(**params)
    # create a new cursor
    cur = conn.cursor()
    # execute the UPDATE statement
    cur.execute(sql, (str(email),))
    # get the phone number
    is_verified = cur.fetchone()
    # commit the changes to the database
    conn.commit()
    # close communication with the database
    cur.close()
    return is_verified[0]


# this endpoint checks if the user is in the database
def check_if_user_exist(email):
    """ check if the user exists """
    sql = """select email
             from recipients 
             where email = %s;"""

    # read database configuration
    params = config()
    # connect to the PostgreSQL database
    conn = psycopg2.connect(**params)
    # create a new cursor
    cur = conn.cursor()
    # execute the UPDATE statement
    cur.execute(sql, (str(email),))
    # get the phone number
    email = cur.fetchone()
    # check if there was a row
    exists = False
    if cur.rowcount > 0:
        exists = True
    # commit the changes to the database
    conn.commit()
    # close communication with the database
    cur.close()
    return exists
            
