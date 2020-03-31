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
        raise Exception('Section {0} not found in the {1} file'.format(section, filename))
 
    return db


def insert_user(email, first_name, last_name, bio, zip_code):
    """ insert a new vendor into the vendors table """
    sql = """INSERT INTO recipients(uid, email, first_name, last_name, bio, zip_code, date_created,
             num_donations, total_recieved)

             VALUES(%s, %s, %s, %s, %s, %d, %s, %d, %d);"""
    conn = None
    vendor_id = None
    try:
        # read database configuration
        params = config()
        # connect to the PostgreSQL database
        conn = psycopg2.connect(**params)
        # create a new cursor
        cur = conn.cursor()
        # generate the Uid
        uuid = uuid.uuid5(NAMESPACE_OID, email)
        # get the date created (TIMESTAMP '2004-10-19 10:23:54')
        timestamp_string = time.strftime("%a, %d %b %Y %H:%M:%S +0000", datetime.fromtimestamp(int(time.time())).timetuple())
        # execute the INSERT statement
        cur.execute(sql, (uuid, email, first_name, last_name, bio, zip_code, timestamp_string, 0, 0))
        # get the generated id back
        vendor_id = cur.fetchone()[0]
        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        return "FAILED!! Nice going idiot: " + error.str()
    finally:
        if conn is not None:
            conn.close()
 
    return "user inserted with uid: " + uuid

