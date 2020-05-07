from datetime import datetime, timedelta
import psycopg2
from db_manager import config

# this file handles interactions with the holding table
# the holding table is meant to prevent the same user being returned
# consecutively by the matching algo


# remove from table where their time is past
def refresh_table():
    """ remove all users past time in table"""
    sql = """ DELETE FROM holding_table
              WHERE entered_timestamp < %s;"""

    # read database configuration
    params = config()
    # connect to the PostgreSQL database
    conn = psycopg2.connect(**params)
    # create a new cursor
    cur = conn.cursor()
    # get the current time - 5 mins
    dt_5mins_ago = datetime.now() - timedelta(minutes=5)
    # execute the UPDATE statement
    cur.execute(sql, (dt_5mins_ago,))
    # commit the changes to the database
    conn.commit()
    # close communication with the database
    cur.close()


# adds someone to the holding table table
def hold_user(uid):
    # get the current timestamp
    # add time and uid to the table
    """ add user to the holding table """
    sql = """ INSERT INTO holding_table(uid, entered_timestamp) 
                  VALUES (%s, %s); """

    # read database configuration
    params = config()
    # connect to the PostgreSQL database
    conn = psycopg2.connect(**params)
    # create a new cursor
    cur = conn.cursor()
    # get the current time - 5 mins
    dt = datetime.now()
    # execute the UPDATE statement
    cur.execute(sql, (str(uid), str(dt)))
    # commit the changes to the database
    conn.commit()
    # close communication with the database
    cur.close()


# this method is meant to be used when all users are in the holding table
# it will remove the 10 users closes to being removed from the table
def early_release():
    """ remove up to 10 users soonest to getting out """
    sql = """ DELETE FROM holding_table
              WHERE uid = any (array(
                        SELECT uid 
                        FROM holding_table 
                        ORDER BY entered_timestamp 
                        LIMIT 10)) """

    # read database configuration
    params = config()
    # connect to the PostgreSQL database
    conn = psycopg2.connect(**params)
    # create a new cursor
    cur = conn.cursor()
    # get the current time - 5 mins
    dt_5mins_ago = datetime.now() - timedelta(minutes=5)
    # execute the UPDATE statement
    cur.execute(sql, (dt_5mins_ago,))
    # commit the changes to the database
    conn.commit()
    # close communication with the database
    cur.close()
