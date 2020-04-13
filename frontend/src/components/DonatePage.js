import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { PrimaryButton, SecondaryButton } from '../shared/ButtonComponents.js';
import { ButtonToolbar, Button, Form } from 'react-bootstrap';
import CurrencyInput from 'react-currency-input';

function DonatePage() {

  var donateAmount = 0;

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
    lineHeight: "81px"
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
    border: "none",
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

  function handleAmountClick(amount) {
    donateAmount = amount;
  }

  return (
    <div style={donateHeader}>
      <h1 style={bigText}>You are making the world better.</h1>
      <div style={donationText}>
        <h1 style={step}>STEP 1</h1>
        <h1 style={enterDonation}>Enter donation amount</h1>
        <ButtonToolbar style={buttonToolbar}>
          <Button onClick={() => handleAmountClick(25)} style={amountButton}>$25</Button>
          <Button onClick={() => handleAmountClick(50)} style={amountButton}>$50</Button>
          <Button onClick={() => handleAmountClick(100)} style={amountButton}>$100</Button>
          <Button onClick={() => handleAmountClick(200)} style={amountButton}>$200</Button>
        </ButtonToolbar>
        <h1 style={supportSiteText}>Would you like to help support this site?</h1>
        <div style={supportForm}>
          <CurrencyInput style={supportInput} prefix="$" />
        </div>
        <PrimaryButton text="Next: Payment information" />
      </div>
    </div>
  );
}

export default DonatePage;
