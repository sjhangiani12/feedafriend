from bs4 import BeautifulSoup
import re
import time
import pandas as pd
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
import os
import numpy as np
from random import randint
from time import sleep


from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver import ActionChains
from selenium.webdriver.chrome.options import Options

import selenium



class DoorDash():
    def __init__(self):
        chrome_options = Options()

        # PROJECT_ROOT = os.path.abspath(os.path.dirname('payment.py'))
        # DRIVER_BIN = os.path.join(PROJECT_ROOT, "chromedriver")
        # chrome_options.binary_location = os.environ.get("GOOGLE_CHROME_BIN")
        # chrome_options.add_argument("--headless")
        # chrome_options.add_argument("--disable-dev-shm-usage")
        # chrome_options.add_argument("--no-sandbox")
        # self.driver = webdriver.Chrome(executable_path=os.environ.get(
        #     "CHROMEDRIVER_PATH"), chrome_options=chrome_options)
        # self.driver.get('https://doordash.launchgiftcards.com/')

        chrome_options = Options()
        chrome_options.add_argument("--headless")
        PROJECT_ROOT = os.path.abspath(os.path.dirname('payment.py'))
        DRIVER_BIN = os.path.join(PROJECT_ROOT, "chromedriver")
        self.driver = selenium.webdriver.Chrome(
            executable_path=DRIVER_BIN, chrome_options=chrome_options)
        self.driver.get('https://doordash.launchgiftcards.com/')





    def purchase(self, sender_email, sender_address, city, state, zipcode, cardholder_name, card_number, exp_date, cvc):
        # Check to make sure only one order item
        for i in range(len(self.driver.find_elements_by_xpath("//div[@class='preview-order-item']")) - 1):
            self.driver.find_element_by_xpath("//button[@class='button item-button']").click()
        if len(self.driver.find_elements_by_xpath("//div[@class='preview-order-item']")) == 1:
            # email
            self.driver.find_element_by_xpath(
                "//input[@name='email']").send_keys(sender_email)
            # address
            self.driver.find_element_by_xpath(
                "//input[@name='address']").send_keys(sender_address)
            # city
            self.driver.find_element_by_xpath("//input[@name='city']").send_keys(city)
            # state
            # self.driver.find_element_by_xpath(
            #     "//*[@id='pay-form']/form/div[2]/div/div[4]/div[1]/div/div/div/span[2]").click()
            # self.driver.find_element_by_xpath(
            #     "//input[@aria-activedescendant='react-select-2--option-0']").send_keys(state)
            # self.driver.find_element_by_xpath(
            #     "//input[@aria-activedescendant='react-select-2--option-0']").send_keys(Keys.ENTER)
            cit = self.driver.find_element_by_xpath("//input[@name='city']")
            cit.send_keys(Keys.TAB)
            st = self.driver.switch_to.active_element
            actions = ActionChains(self.driver)
            actions.send_keys(state)
            actions.send_keys(Keys.ENTER)
            actions.perform()
            # zipcode
            self.driver.find_element_by_xpath("//input[@name='zip']").send_keys(zipcode)

            # cardholder_name
            zips = self.driver.find_element_by_xpath("//input[@name='zip']")
            zips.send_keys(Keys.TAB)
            cardHolder = self.driver.switch_to.active_element
            cardHolder.find_element_by_xpath(
                "//input[@id='braintree__card-view-input__cardholder-name']").send_keys(cardholder_name)

            # card_number
            cardHolder.send_keys(Keys.TAB)
            cardNumber = self.driver.switch_to.active_element
            actions = ActionChains(self.driver)
            actions.send_keys(card_number)
            actions.perform()

            # exp_date
            cardNumber.send_keys(Keys.TAB)
            expDate = self.driver.switch_to.active_element
            actions = ActionChains(self.driver)
            actions.send_keys(exp_date)
            actions.perform()

            # cvc (security code of card)
            expDate.send_keys(Keys.TAB)
            securityCode = self.driver.switch_to.active_element
            actions = ActionChains(self.driver)
            actions.send_keys(cvc)
            actions.perform()

            # accept terms and conditions
            self.driver.find_element_by_xpath("//input[@name='terms']").click()
            while self.driver.find_element_by_xpath("//input[@name='terms']").get_attribute('value') == 'false':
                self.driver.find_element_by_xpath("//input[@name='terms']").click()
                sleep(randint(.02, 1.5))

            # place order
            self.driver.find_element_by_xpath("//button[@class='action-button action-button--purchase-now']").click()
            try:
                confirm = self.driver.find_element_by_xpath("//p[@class='success__body-text success__body-text--large']").text
                return ({'status': True, 'message': confirm })
            except: 
                return ({'status': False, 'message': 'there was an issue with the information you provided'})
        else:
            return ({'status': False, 'message': 'more than 1 item'})


    def preFill(self, dollars, recipient_name, recipient_email, sender_name):
        dollars = int(dollars)
        amounts = {25: 1, 50: 2, 100: 3, 200: 4}
        amount = amounts[dollars]
        try:
            gift_message = "Hi {}, please enjoy these credits! Courtesy of your donor, {}, brought to you by your friends at care37!".format(
                recipient_name, sender_name)

            # Dollars
            self.driver.find_element_by_xpath(
                "//span[@class='Select-arrow-zone']").click()
            sleep(randint(1, 2))
            self.driver.find_element_by_xpath(
                "//*[@id='react-select-2--list']/div/div/div/div[{}]".format(amount)).click()
            self.driver.find_element_by_xpath(
                "//*[@id='app']/div/div/div[2]/div[2]/div[2]/div/div[1]/div/div[3]/div/div/form/div[1]/label[1]").click()
            
            # Recipient Name
            self.driver.find_element_by_xpath(
                "//input[@name='recipient_name']").send_keys(recipient_name)
            # Recipient Email
            self.driver.find_element_by_xpath(
                "//input[@name='recipient_email']").send_keys(recipient_email)
            
            # Gift Message
            self.driver.find_element_by_xpath(
                "//*[@id='app']/div/div/div[2]/div[2]/div[2]/div/div[1]/div/div[3]/div/div/form/div[4]/textarea").send_keys(gift_message)
            
            # Sender Name
            self.driver.find_element_by_xpath(
                "//input[@name='sender_name']").send_keys(sender_name)
            
            sleep(randint(1, 2))
            
            # Add to Cart
            self.driver.find_element_by_xpath(
                "//button[@class='action-button']").click()
            return True
        except Exception as e:
            print(e)
            print('preFill failure')
            return False

        # def update_user_table(self, user_object, dollars):
        #     # TODO need to add last donation date to schema to get a more accurate burn rate adjusted amount
        #     # after the payment is made, update the user's amount and number of donations
        #             "SELECT first_name, last_name, email, total_recieved, date_created, num_donations, uid FROM recipients ORDER BY date_created")
