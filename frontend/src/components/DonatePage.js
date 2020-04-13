import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { PrimaryButton, SecondaryButton } from '../shared/ButtonComponents.js';
import { ButtonToolbar, Button, Form } from 'react-bootstrap';
import CurrencyInput from 'react-currency-input';
import CreditCardInput from 'react-credit-card-input';

function DonatePage() {

  // state for the donation amount
  const [donateAmount, setDonateAmount] = useState(0);
  // state for when the user clicks the next button (may be unecessary but im lazy)
  const [nextToPaymentPressed, setNextToPaymentPressed] = useState(false);
  // state for wether to display a message that the user did not select a donation amount
  const [displayPickAmountMessage, setDisplayAmountMessage] = useState(false);
  // state for an amount the user wants to give to us
  const [supportUsAmount, setSupportUsAmount] = useState(0);

  // handles when the user select a donation amount
  function handleAmountClick(amount) {
    // set to false, so it does not auto nav when the use selects the new amount (trust me, i think we need it)
    setNextToPaymentPressed(false);
    setDonateAmount(amount);
    // they selected a new amount, so remove the error message
    setDisplayAmountMessage(false);
  }

  // handles when next: to payment info is clicked
  function handleNextClick() {
    setNextToPaymentPressed(true);
    // check if the user selected an amount, and sets the display message accordingly
    setDisplayAmountMessage(donateAmount == 0);
  }

  // handles when the user changes the amount they want to give to us
  function handleSupportUsAmountChange(event, maskedvalue, floatvalue) {
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
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "48px",
    lineHeight: "70px",
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
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "36px",
    lineHeight: "40px",
    paddingBottom: "20px",
  }

  const supportSiteText = {
    fontFamily: "sans-serif",
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

  const support = {
    color: "#828282", 
    fontFamily: "sans-serif" 
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

  const invoice = {
    display: "flex",
    flexDirection: "column",
    flex: "1",
  }

  const invoiceText = {
    fontFamily: "Abril Tilting",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "24px",
    lineHeight: "27px",
    color: "#828282",
  }

  const invoiceSum = {
    fontFamily: "Abril Tilting",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "24px",
    lineHeight: "27px",
    color: "#000000",
  }

  const protectInfoHeader = {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "14px",
    lineHeight: "16px",
    textTransform: "uppercase",
    color: "#000000",
  }

  const protectInfoBody = {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "300",
    fontSize: "14px",
    lineHeight: "16px",
    color: "#4F4F4F",
  }

  const invoiceRow = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "3%",
  }

  const cardDetails = {
    flex: "1",
  }

  const allInvoiceRows = {
    marginTop: "10%",
    marginBottom: "15%",
  }

  return (
    // this is step one of the donation process
    (true && (!nextToPaymentPressed || donateAmount == 0)) ? (
      <div style={donateHeader}>
        {/* if the user selected an amount give them the meals estimate */}
        <div style={{marginRight: "5%"}}>
          {(donateAmount == 0) ? ( <>
            <h1 style={bigText}>You are making the world better.</h1>
            <p style={support}>100% of donated funds are used to purchase DoorDash<br /> credits for hungry people in need.</p>

          </>) : (
              <h1 style={bigText}>You are donating <br /> around <mark style={numOfMealsNumber}>
                {donateAmount / 12.5}</mark> meals</h1>
            )}
        </div>

        <div>
          <h1 style={step}>STEP 1</h1>
          <h1 style={enterDonation}>Enter donation amount</h1>
          <ButtonToolbar style={buttonToolbar}>
            <Button onClick={() => handleAmountClick(25)} style={amountButton}>$25</Button>
            <Button onClick={() => handleAmountClick(50)} style={amountButton}>$50</Button>
            <Button onClick={() => handleAmountClick(100)} style={amountButton}>$100</Button>
            <Button onClick={() => handleAmountClick(200)} style={amountButton}>$200</Button>
          </ButtonToolbar>
          {/* error message if they next without selecting a donation amount */}
          {displayPickAmountMessage && <h1 style={pickAnAmountMessage} >Please select a donation amount</h1>}
          <p style={support}>Would you like to help support this site?</p>
          <div style={supportForm}>
            <CurrencyInput onChangeEvent={handleSupportUsAmountChange} style={supportInput} prefix="$" value={supportUsAmount} />
          </div>
          <PrimaryButton onClick={() => handleNextClick(true)} text="Next: Payment information" />
        </div>
      </div>
    ) : (
        // this is the second step,1G user enters payment info
        <div style={{...donateHeader, marginTop: "10%"}}>
          <div style={invoice}>
            <h1 style={bigText}>Your support <br />means a lot.</h1>
            <div style={allInvoiceRows}>
              <div style={invoiceRow}>
                <h1 style={invoiceText}>Donation</h1>
                <h1 style={invoiceText}>${donateAmount}</h1>
              </div>
              <div style={invoiceRow}>
                <h1 style={invoiceText}>Your support &#128150;</h1>
                <h1 style={invoiceText}>${supportUsAmount}</h1>
              </div>
              <hr style={{backgroundColor: "black"}}/>
              <div style={invoiceRow}>
                <h1 style={invoiceSum}>Total Amount</h1>
                <h1 style={invoiceSum}>${supportUsAmount + donateAmount}</h1>
              </div>
            </div>
            <div>
              <h1 style={protectInfoHeader}>protecting your information</h1>
              <h1 style={protectInfoBody}>We never store your credit card information and your payment details are sent over a secure connection.</h1>
            </div>
          </div>
          <div style={cardDetails}>
            <CreditCardInput></CreditCardInput>
          </div>
        </div>
      )
  );
}

export default DonatePage;
