import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { PrimaryButton, SecondaryButton } from '../shared/ButtonComponents.js';
import { ButtonToolbar, Button, Form } from 'react-bootstrap';
import CurrencyInput from 'react-currency-input';
import CreditCardInput from 'react-credit-card-input';

function DonatePage() {

  const [donateAmount, setDonateAmount] = useState(0);
  const [nextToPaymentPressed, setNextToPaymentPressed] = useState(false);
  const [displayPickAmountMessage, setDisplayAmountMessage] = useState(false);
  const [supportUsAmount, setSupportUsAmount] = useState(0);
  
  function handleAmountClick(amount) {
    setNextToPaymentPressed(false);
    setDonateAmount(amount);
    setDisplayAmountMessage(false);
  }

  function handleNextClick() {
    setNextToPaymentPressed(true);
    setDisplayAmountMessage(donateAmount == 0);
  }

  function handleSupportUsAmountChange(event, maskedvalue, floatvalue){
    setSupportUsAmount(maskedvalue);
  }

  const donateHeader = {
    display: "flex",
    flexDirection: "row",
    flex: "1",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "15%",
    alignItems: "flex-start",
  }

  const bigText = {
    width: "551px",
    height: "142px",
    fontFamily: "Abril Titling",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "50px",
    lineHeight: "81px",
  }

  const donationText = {
  }

  const step = {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "18px",
    lineHeight: "21px",
    color: "#828282",
  }

  const enterDonation = {
    fontFamily: "Abril Titling",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "36px",
    lineHeight: "40px",
    paddingBottom: "20px",
  }

  const supportSiteText = {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "300",
    fontSize: "18px",
    lineHeight: "21px",
    paddingBottom: "10px",
  }

  const amountButton = {
    margin: "10px",
    width: "80px",
    height: "45px",
    background: "#F9F9F9",
    borderRadius: "41px",
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "#000000",
    color: "#000000",
    fontSize: "18px",
    lineHeight: "21px",
    fontWeight: "bold",
    fontFamily: "Roboto",
  }

  const supportForm = {
    paddingBottom: "40px",
  }

  const buttonToolbar = {
    paddingBottom: "20px",
  }

  const supportInput = {
    width: "60px",
    height: "30px",
    background: "transparent",
    borderColor: "#828282",
    borderStyle: "solid",
    borderWidth: "1px",
    color: "#828282",
  }

  const numOfMealsNumber = {
    color: "#1136FC",
    textDecoration: "underline",
    background: "transparent",
  }

  const pickAnAmountMessage = {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "14px",
    lineHeight: "16px",
    color: "#EB5757",
  }

  return (
      (!nextToPaymentPressed || donateAmount == 0) ? (
        <div style={donateHeader}>
          {(donateAmount == 0) ? (
            <h1 style={bigText}>You are making the world better.</h1>
          ) : (
            <h1 style={bigText}>You are donating <br/> around <mark style={numOfMealsNumber}>
                                                               {donateAmount / 12.5}</mark> meals</h1>
          )}
          <div style={donationText}>
            <h1 style={step}>STEP 1</h1>
            <h1 style={enterDonation}>Enter donation amount</h1>
            <ButtonToolbar style={buttonToolbar}>
              <Button onClick={() => handleAmountClick(25)} style={amountButton}>$25</Button>
              <Button onClick={() => handleAmountClick(50)} style={amountButton}>$50</Button>
              <Button onClick={() => handleAmountClick(100)} style={amountButton}>$100</Button>
              <Button onClick={() => handleAmountClick(200)} style={amountButton}>$200</Button>
            </ButtonToolbar>
            {displayPickAmountMessage && <h1 style={pickAnAmountMessage} >Please select a donation amount</h1>}
            <h1 style={supportSiteText}>Would you like to help support this site?</h1>
            <div style={supportForm}>
              <CurrencyInput onChangeEvent={handleSupportUsAmountChange} style={supportInput}  prefix="$" value={supportUsAmount}/>
            </div>
            <PrimaryButton onClick={() => handleNextClick(true)} text="Next: Payment information" />
          </div>
        </div>
      ) : ( 
        <div>
          <p style={{marginTop: "15%"}}>{supportUsAmount}</p>
        </div>
      )
  );
}

export default DonatePage;
