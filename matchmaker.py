from datetime import datetime, timedelta
import psycopg2
from db_manager import config
from queue import PriorityQueue


# object for the matchmaker queue
class recipientProfile(object):
    def __init__(self, first_name, last_name, recipient_email, amount_recieved, date_created, num_donations, recipient_user_id):
        self._recipient_user_id = recipient_user_id
        self._amount_receieved = amount_recieved
        self._date_created = date_created
        self._first_name = first_name
        self._last_name = last_name
        self._recipient_email = recipient_email
        self._num_donations = num_donations

        # setting burn rate adjusted amount recieived
        # using a 20$ per week rate to drop the amount
        # in other words, drop amount by 0.119$ every hour
        hours_since_creation = (
            (datetime.now() - date_created).total_seconds() / 3600)
        burn_rate = -0.119
        adjusted_amount = amount_recieved * burn_rate * hours_since_creation
        # makes sure the adjusted amount cannot be 0
        if adjusted_amount < 0:
            self._burn_adj_amount_recieved = 0
        else:
            self._burn_adj_amount_recieved = adjusted_amount

    def get_recipient_user_id(self):
        return self._recipient_user_id

    def get_first_name(self):
        return self._first_name

    def get_last_name(self):
        return self._last_name

    def get_email(self):
        return self._recipient_email

    def get_amount_recieved(self):
        return self._amount_receieved

    def get_burn_adj_amount_recieved(self):
        return self._burn_adj_amount_recieved

    def get_date_created(self):
        return self._date_created

    def get_num_donations(self):
        return self._num_donations

    def get_compare_value(self, other):
        return (self._burn_adj_amount_recieved == other._burn_adj_amount_recieved) & (self._num_donations == other._num_donations) & (self._date_created == other._date_created)

    # reference: https://portingguide.readthedocs.io/en/latest/comparisons.html

    def __eq__(self, other):
        return self.get_compare_value(self, other)

    def __ne__(self, other):
        return not self.get_compare_value(self, other)

    def __lt__(self, other):
        if (self._burn_adj_amount_recieved < other._burn_adj_amount_recieved) == True:
            return True
        elif (self._num_donations < other._num_donations) == True:
            return True
        # the sign is flipped here bc the older is considered "less" in this case as we want to support the individual with a greater date created but a lower balance and num donations
        elif (self._date_created > other._date_created) == True:
            return True
        else:
            return False

    def __le__(self, other):
        if (self._burn_adj_amount_recieved <= other._burn_adj_amount_recieved) == True:
            return True
        elif (self._num_donations <= other._num_donations) == True:
            return True
        # the sign is flipped here bc the older is considered "less" in this case as we want to support the individual with a greater date created but a lower balance and num donations
        elif (self._date_created >= other._date_created) == True:
            return True
        else:
            return False

    def __gt__(self, other):
        if (self._burn_adj_amount_recieved > other._burn_adj_amount_recieved) == True:
            return True
        elif (self._num_donations > other._num_donations) == True:
            return True
        # the sign is flipped here bc the older is considered "less" in this case as we want to support the individual with a greater date created but a lower balance and num donations
        elif (self._date_created < other._date_created) == True:
            return True
        else:
            return False

    def __ge__(self, other):
        if (self._burn_adj_amount_recieved >= other._burn_adj_amount_recieved) == True:
            return True
        elif (self._num_donations >= other._num_donations) == True:
            return True
        # the sign is flipped here bc the older is considered "less" in this case as we want to support the individual with a greater date created but a lower balance and num donations
        elif (self._date_created <= other._date_created) == True:
            return True
        else:
            return False

    def __repr__(self):
        return "First Name: %s | Email: %s | UID: %s" % (self._first_name, self._recipient_email, self._recipient_user_id)


# use to implement priority queue and house method that will actually return the desired tuple of
# userid and email
class Matchmaker:
    # this class builds the priority queue using the objects above

    def __init__(self):
        conn = None
        vendor_id = None
        try:
            # read database configuration
            params = config()
            # connect to the PostgreSQL database
            conn = psycopg2.connect(**params)
            # create a new cursor
            cur = conn.cursor()
            # get all the entries in the recipients table
            cur.execute(
                "SELECT first_name, last_name, email, total_recieved, date_created, num_donations, uid, is_verified FROM recipients ORDER BY date_created")
            all_users = cur.fetchall()
            cur.close()
        except (Exception, psycopg2.DatabaseError) as error:
            print(error)
        finally:
            if conn is not None:
                conn.close()

        self._queue = PriorityQueue()
        for user in all_users:
            if user[7]:
                curr = recipientProfile(
                    user[0], user[1], user[2], user[3], user[4], user[5], user[6])
                self._queue.put(curr)

    def get_recipientProfile(self):
        # get the recipient to be donated to
        # params: none
        # returns: recipient profile object that selected as the "lowest" or individual who requires donation the most
        if self._queue.qsize() == 0:
            return None
        else:
            obj = self._queue.get()
            return obj


matchmaker = Matchmaker()
print(matchmaker.get_recipientProfile())