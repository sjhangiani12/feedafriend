


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

chrome_options = Options()  
chrome_options.add_argument("--headless")  

PROJECT_ROOT = os.path.abspath(os.path.dirname('scrape.ipynb'))
DRIVER_BIN = os.path.join(PROJECT_ROOT, "chromedriver")
DRIVER_BIN

driver=selenium.webdriver.Chrome(executable_path=DRIVER_BIN, chrome_options=chrome_options)
driver.get('https://doordash.launchgiftcards.com/')

def purchase(sender_email, sender_address, city, state, zipcode, cardholder_name, card_number, exp_date, cvv):
    # Check to make sure only one order item
    if len(driver.find_elements_by_xpath("//div[@class='preview-order-item']")) == 1:
        # email
        driver.find_element_by_xpath("//input[@name='email']").send_keys(sender_email)
        # address
        driver.find_element_by_xpath("//input[@name='address']").send_keys(sender_address)
        # city
        driver.find_element_by_xpath("//input[@name='city']").send_keys(city)
        # state
        driver.find_element_by_xpath("//*[@id='pay-form']/form/div[2]/div/div[4]/div[1]/div/div/div/span[2]").click()
        driver.find_element_by_xpath("//input[@aria-activedescendant='react-select-2--option-0']").send_keys(state)
        driver.find_element_by_xpath("//input[@aria-activedescendant='react-select-2--option-0']").send_keys(Keys.ENTER)
        # zipcode
        driver.find_element_by_xpath("//input[@name='zip']").send_keys(zipcode)
        
        # cardholder_name
        zips = driver.find_element_by_xpath("//input[@name='zip']")
        zips.send_keys(Keys.TAB)
        cardHolder = driver.switch_to.active_element
        cardHolder.find_element_by_xpath("//input[@id='braintree__card-view-input__cardholder-name']").send_keys(cardholder_name)
        
        # card_number
        cardHolder.send_keys(Keys.TAB)
        cardNumber = driver.switch_to.active_element
        actions = ActionChains(driver)
        actions.send_keys(card_number)
        actions.perform()
        
        # exp_date
        cardNumber.send_keys(Keys.TAB)
        expDate = driver.switch_to.active_element
        actions = ActionChains(driver)
        actions.send_keys(exp_date)
        actions.perform()
        
        # cvv (security code of card)
        expDate.send_keys(Keys.TAB)
        securityCode = driver.switch_to.active_element
        actions = ActionChains(driver)
        actions.send_keys(cvv)
        actions.perform()
        
        # accept terms and conditions
        driver.find_element_by_xpath("//input[@name='terms']").click()
        while driver.find_element_by_xpath("//input[@name='terms']").get_attribute('value') == 'false':
            driver.find_element_by_xpath("//input[@name='terms']").click()
            sleep(randint(.02,1.5))
        
        # place order
        #driver.find_element_by_xpath("//button[@class='action-button action-button--purchase-now']").click()
        return 'Success!'
    else:
        print('Error - more than one order-item')
        return 'FAIL'


def preFill(dollars, recipient_name, recipient_email, sender_name):
    amounts = {25: 1, 50: 2, 100: 3, 200: 4 }
    amount = amounts[dollars]
    try: 
      gift_message = "Hi {}, please enjoy these credits! Courtesy of your donor, {}, brought to you by your friends at care37!".format(recipient_name, sender_name)
      driver.find_element_by_xpath("//span[@class='Select-arrow-zone']").click()
      driver.find_element_by_xpath("//*[@id='react-select-2--list']/div/div/div/div[{}]".format(amount)).click()
      driver.find_element_by_xpath("//*[@id='app']/div/div/div[2]/div[2]/div[2]/div/div[1]/div/div[3]/div/div/form/div[1]/label[1]").click()
      driver.find_element_by_xpath("//input[@name='recipient_name']").send_keys(recipient_name)
      driver.find_element_by_xpath("//input[@name='recipient_email']").send_keys(recipient_email)
      driver.find_element_by_xpath("//*[@id='app']/div/div/div[2]/div[2]/div[2]/div/div[1]/div/div[3]/div/div/form/div[4]/textarea").send_keys(gift_message)
      driver.find_element_by_xpath("//input[@name='sender_name']").send_keys(sender_name)
      driver.find_element_by_xpath("//button[@class='action-button']").click()
      return ('preFill success!')
    except:
      print('preFill failure')
      return ('FAILED, FUCK YOU!')