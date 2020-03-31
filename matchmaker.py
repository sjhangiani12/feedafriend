from datetime import datetime, timedelta

# object for the matchmaker queue


class recipientProfile(object):
    def __init__(self, recipient_name, recipient_email, amount_recieved, date_created, num_donations, user_id):
        self._user_id = user_id
        self._amount_receieved = amount_recieved
        self._date_created = date_created
        self._recipient_name = recipient_name
        self._recipient_email = recipient_email
        self._num_donations = num_donations

        # setting burn rate adjusted amount recieived
        # using a 20$ per week rate to drop the amount
        # in other words, drop amount by 0.119$ every hour
        hours_since_creation = (
            (datetime.now() - date_created).total_seconds() / 60)
        burn_rate = -0.119
        self._burn_adj_amount_recieved = amount_recieved*burn_rate*hours_since_creation

    def get_user_id(self):
        return self._user_id

    def get_name(self):
        return self._recipient_name

    def get_email(self):
        return self._recipient_email

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
        return "Name: %s | Email: %s | UID: %s" % (self._recipient_name, self._recipient_email, self._user_id)


# use to implement priority queue and house method that will actually return the desired tuple of
# userid and email
class Matchmaker:
    # this class builds the priority queue using the objects above

    def __init__(self):
        pass

    # get user data from SQL table
    # convert to recipientProfile objects and store in an array
    # put all the objects in priority queue
    # def get_user_data(self):

    a = recipientProfile("John Smit", "john@test.com",
                         45, datetime.date(2002, 3, 11), 4, 'ere33')

    c = recipientProfile("John Smit", "john@test.com",
                         45, datetime.date(2002, 3, 11), 4, 'ere33')

    b = recipientProfile("Alex Jo", "alex@test.com",
                         45, datetime.now(), 4, 'afdj33')

    print(a.get_date_created())
    print(c.get_date_created())

    print(a < c)
