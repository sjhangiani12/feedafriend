import psycopg2
import uuid
from datetime import datetime
import time
from configparser import ConfigParser
import traceback


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

def update_intro_email(uid, email_status):
    """ Update the user donated amount and the num donations after recieiving payment """
        
    sql = """UPDATE recipients SET intro_email_sent = (%s) WHERE uid = (%s);"""

    data = (str(email_status), str(uid))
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


def get_email_status(uid):
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
            "SELECT intro_email_sent FROM recipients WHERE uid = (%s)", str(uid))
        email_status = cur.fetchone()
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()
    return email_status


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
        data = (str(created_tuid), str(ruid), str(dollars), donor_email, donor_first_name,
                donor_last_name, timestamp_string, 0, 0, donor_email_sent, recipient_email_sent)

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


def delete_user(recipient_email):
    """ Update the user donated amount and the num donations after recieiving payment """
    sql = """UPDATE recipients SET email = (%s), first_name = (%s), last_name = (%s), bio = (%s), prof_pic = (%s),
    zip_code = (%s) WHERE uid = (%s);"""

    """ get the info related to the user """
    sql_user = """ SELECT uid from recipients WHERE email = %s;"""
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

        data = (str(None), str(None), str(None), str(
            None), str(None), str(None), str(ruid))
        # execute the INSERT statement
        cur.execute(sql, data)
        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cur.close()
        return str(True)
    except (Exception, psycopg2.DatabaseError) as error:
        print("FAILED!! Nice going idiot: " + str(error))
        return str(False)
    finally:
        if conn is not None:
            conn.close()


# creates a new user profile with the given information
def create_profile(email, first_name, last_name, bio, zip_code, prof_pic, intro_email_sent):
    """ insert a new recipient into the recipients table """
    sql_insert_recipient = """INSERT INTO recipients(uid, email, first_name, last_name, bio, prof_pic, zip_code, date_created,
                                    num_donations, total_recieved, intro_email_sent)

             VALUES( %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);"""

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
        uuid_string = email + str(datetime.now())
        created_uuid = uuid.uuid5(uuid.NAMESPACE_OID, uuid_string)
        # execute the INSERT statement
        cur.execute(sql_insert_recipient, (str(created_uuid), email, first_name, last_name, bio, prof_pic, str(
            zip_code), timestamp_string, str(0), str(0), intro_email_sent))
        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cur.close()
        conn.close()

        return str(created_uuid)
    except psycopg2.OperationalError as e:
        print("DB error creating profile.\n{0}").format(e)
        return None 

# inserts all links in the social_media_links array into the db
def insert_social_media_links(uid, social_media_links):
    """ insert the social media links """
    sql_insert_link = """ INSERT INTO social_media_links(uid, link)
                               VALUES (%s, %s)"""

    # read database configuration
    params = config()
    # connect to the PostgreSQL database
    conn = psycopg2.connect(**params)
    # create a new cursor
    cur = conn.cursor()
    for link in social_media_links:
        # execute the INSERT statement
        cur.execute(sql_insert_link, (uid, link))
    # commit the changes to the database
    conn.commit()
    # close communication with the database
    cur.close()
    conn.close()

    return "inserted links: " + str(uid)


# inserts all the uploads from the uploads array into the db with the given uid
def insert_uploads(uid, uploads):
    """ insert the uploads"""
    sql_insert_upload = """ INSERT INTO user_uploads(uid, upload_comment, upload)
                               VALUES (%s, %s, %s)"""

    # read database configuration
    params = config()
    # connect to the PostgreSQL database
    conn = psycopg2.connect(**params)
    # create a new cursor
    cur = conn.cursor()
    for upload in uploads:
        # execute the INSERT statement
        cur.execute(sql_insert_upload, (uid, upload[0], upload[1]))
    # commit the changes to the database
    conn.commit()
    # close communication with the database
    cur.close()
    conn.close()

    return "inserted uploads: " + str(uid)


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


# returns the profile of the recipient, including their social media links and uploads
def get_recipient_profile(email):
    """ get the basic profile of the user """
    sql_user = """ SELECT uid, first_name, last_name, bio, prof_pic
                   FROM recipients
                   WHERE email = %s;"""

    """ get the social media links of the user """
    sql_links = """ SELECT link FROM social_media_links WHERE uid = %s; """

    """ get the uploads of the user """
    sql_uploads = """ SELECT upload_comment, upload FROM user_uploads WHERE uid = %s; """

    # read database configuration
    params = config()
    # connect to the PostgreSQL database
    conn = psycopg2.connect(**params)
    # create a new cursor
    cur = conn.cursor()

    # get basic recpient info
    cur.execute(sql_user, (str(email),))
    recipient_row = cur.fetchone()
    uid = recipient_row[0]

    # get social media links
    cur.execute(sql_links, (str(uid),))
    links = cur.fetchall()

    # get uploads
    cur.execute(sql_uploads, (str(uid),))
    uploads = cur.fetchall()

    # commit the changes to the database
    conn.commit()
    # close communication with the database
    cur.close()
    conn.close()

    # convert the data to a dictionary
    for i in range(len(uploads)):
        uploads[i] = [uploads[i][0], uploads[i][1].tobytes().decode("utf-8")] 

    profile_dict = {
        "email": email,
        "first_name": recipient_row[1],
        "last_name": recipient_row[2],
        "bio": recipient_row[3],
        "prof_pic": recipient_row[4].tobytes().decode("utf-8"),
        "social_media_links": links,
        "uploads": uploads
    }

    return profile_dict