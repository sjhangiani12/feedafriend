import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { PrimaryButton, SecondaryButton, TertiartyButton } from '../shared/ButtonComponents.js';
import ConfirmationPage from './ConfirmationPage.js';
import { ButtonToolbar, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import CurrencyInput from 'react-currency-input';
import CreditCardInput from 'react-credit-card-input';
import SelectSearch from 'react-select-search';
import '../style.css';
import { useHistory, withRouter } from "react-router-dom";
import MediaQuery from 'react-responsive';
import Banner from '.././shared/banner.js';
import Mode from '.././shared/modal.js';

import Toolbar from '@material-ui/core/Toolbar';


function DonatePage() {

  // state for the donation amount
  const [donateAmount, setDonateAmount] = useState(0);
  // state for when the user clicks the next button (may be unecessary but im lazy)
  const [nextToPaymentPressed, setNextToPaymentPressed] = useState(false);
  // state for wether to display a message that the user did not select a donation amount
  const [displayPickAmountMessage, setDisplayAmountMessage] = useState(false);
  // state for an amount the user wants to give to us
  const [supportUsAmount, setSupportUsAmount] = useState(0);
  // state for donateNow clicked
  const [donateNowClicked, setDonateNowClicked] = useState(false);
  // state if there was an error w/ the payment info
  const [errorWithPayment, setErrorWithPayment] = useState(false);

  // payment info
  const [cardNumber, setCardNumber] = useState("");
  const [exp, setExp] = useState("");
  const [cvc, setCVC] = useState("");

  const formDefaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipcode: "",
  }
  const [formValues, setFormValues] = useState(formDefaultValues);
  const { firstName, lastName, email, country, address1, address2, city, state, zipcode } = formValues

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
    setSupportUsAmount(floatvalue);
  }

  // handles back to step 1
  function handleBackClick() {
    setNextToPaymentPressed(false);
    setDonateAmount(0);
  }

  function handleCardNumberChange(cardNum) {
    setCardNumber(cardNum);
    console.log(cardNum)
  }

  function handleCardExpiryChange(exp) {
    setExp(exp);
    console.log(exp)
  }

  function handleCardCVCChange(cvc) {
    setCVC(cvc);
    console.log(cvc)
  }

  function handleDonateClick() {
    if (checkAllFieldsFilled()) {
      setDonateNowClicked(true);
    } else {
      alert("Please fill out all the fields.");
    }
    console.log(cardNumber);
  }

  function checkAllFieldsFilled() {
    if (formValues.firstName != "" &&
        formValues.lastName != "" &&
        formValues.email != "" &&
        formValues.address1 != "" &&
        formValues.city != "" &&
        formValues.state != "" &&
        formValues.zipcode != "" &&
        cardNumber != "" &&
        exp != "" &&
        cvc != ""
    ) {
      return true;
    } else {
      return false;
    }
  }

  function handleChange(e) {
    const target = e.target
    setFormValues(prevState => ({
      ...prevState,
      [target.name]: target.value
    }))
    console.log(formValues)
  }

  function handleChangeCountry(value) {
    setFormValues(prevState => ({
      ...prevState,
      country: value
    }))
  }
  function handleChangeState(value) {
    setFormValues(prevState => ({
      ...prevState,
      state: value
    }))
  }

  function handleBackFromConfirmation() {
    setDonateNowClicked(false);
    setErrorWithPayment(true);
  }


 
  const donateHeaderMobile = {
    display: "flex",
    flexDirection: "column",
    flex: "1",
    height: "120vh",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: "15%",
    alignItems: "flex-start" 
  }

  const bigText = {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "2.5rem",
    lineHeight: "70px",
    paddingTop: "12px",
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
    diaply: "block",
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

  const whyTheseAmountsText = {
    fontFamily: "sans-serif",
    fontStyle: "normal",
    fontWeight: "300",
    fontSize: "18px",
    lineHeight: "21px",
    paddingBottom: "10px",
    textDecoration: "underline",
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
    marginBottom: "5%",
    marginRight: "5%",
    marginLeft: "5%"
  }

  const invoiceText = {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "24px",
    lineHeight: "27px",
    color: "#828282",
  }

  const invoiceSum = {
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
    fontSize: "1.1rem",
    lineHeight: "16px",
    textTransform: "uppercase",
    color: "#000000",
  }

  const protectInfoBody = {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "300",
    fontSize: "1.1rem",
    lineHeight: "16px",
    color: "#4F4F4F",
    paddingTop: "10px",
  }

  const invoiceRow = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "3%"
  }

  const cardDetails = {
    display: "flex",
    flexDirection: "column",
  }

  const paymentInfoSections = {
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "16px",
    lineHeight: "19px",
    color: "#000000",
  }

  const paymentFieldInput = {
    fontStyle: "normal",
    width: "51%",
    fontWeight: "normal",
    fontSize: "16px",
    lineHeight: "19px",
    fontColor: "#B0B0B0",
    height: "40px",
    background: "transparent",
    borderColor: "#828282",
    borderStyle: "solid",
    borderWidth: "1px",
    color: "#828282",
    marginBottom: "2%",
    marginRight: "1%",
    textIndent: "5px",
  }
  const lasty = {
    fontStyle: "normal",
    width: "51%",
    fontWeight: "normal",
    fontSize: "16px",
    lineHeight: "19px",
    fontColor: "#B0B0B0",
    height: "40px",
    background: "transparent",
    borderColor: "#828282",
    borderStyle: "solid",
    borderWidth: "1px",
    color: "#828282",
    marginBottom: "2%",
    textIndent: "5px",
  }
  const emailSection = {
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "16px",
    lineHeight: "19px",
    fontColor: "#B0B0B0",
    height: "40px",
    width: "90%",
    background: "transparent",
    borderColor: "#828282",
    borderStyle: "solid",
    borderWidth: "1px",
    color: "#828282",
    marginBottom: "2%",
    marginRight: "1%",
    textIndent: "5px",
  }

  const paymentInfoContainer = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  }

  const creditCardInput = {
    background: "transparent",
    borderColor: "#828282",
    borderStyle: "solid",
    borderWidth: "1px",
    height: "40px",
  }

  const creditCardField = {
    height: "65px",
    background: "transparent",
  }

  const donateTitleContainer = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }

  const nameContainer = {
    display: "flex",
    width: "73%",
  }

  const buttonContainer = {
    display: "flex",
    width: "50%",
  }

  const dropdown = {
    display: "block",
    width: "100%",
    height: "50px",
    border: "none",
    background: "none",
    outline: "none",
    fontSize: "16px",
    padding: " 0 20px",
    color: "#222f3e",
    boxSizing: "border-box",
    position: "relative"
  }


  

  // this is step one of the donation process
  if ((!nextToPaymentPressed || donateAmount == 0)) {
    return (<div id ="donator">
      <div className="container-fliud px-2" style={{width: "100%"}}>
        <div className="row justify-content-center" style={{ marginRight: "5%", marginLeft: "10%" }} id="payment">
          {/* if the user selected an amount give them the meals estimate */}
          {(donateAmount == 0) ? (
            <div className="col-xl-5 col-lg-5 col-sm-12">
              <h1 style={bigText}>You are making the world better.</h1>
            </div>
          ) : (
            <div className='col-xl-5 col-lg-5 col-sm-12'>
                <h1 style={bigText}>You're donating  around <mark style={numOfMealsNumber}>
                  {donateAmount / 12.5}</mark> meals</h1>
            </div>
            )}
          <div className='col-xl-6 col-lg-6 col-sm-12 ml-xl-2' >
            <h1 style={step}>STEP 1</h1>
            <h1 style={enterDonation}>Enter donation amount</h1>
            <ButtonToolbar id="buttonToolbar" className="col-xl-12 col-xs-2">
              <Button onClick={() => handleAmountClick(25)} style={amountButton}>$25</Button>
              <Button onClick={() => handleAmountClick(50)} style={amountButton}>$50</Button>
              <Button onClick={() => handleAmountClick(100)} style={amountButton}>$100</Button>
              <Button onClick={() => handleAmountClick(200)} style={amountButton}>$200</Button>
            </ButtonToolbar>
            {/* error message if they next without selecting a donation amount */}
            {displayPickAmountMessage && <h1 style={pickAnAmountMessage} >Please select a donation amount</h1>}
            <OverlayTrigger
              placement={'left'}
              overlay={
                <Tooltip>
                  These are the amounts that DoorDash allows for giftcards.
            </Tooltip>
              }
            >
              <h1 style={whyTheseAmountsText}>Why these amounts?</h1>

            </OverlayTrigger>

            {/*<h1 style={supportSiteText}>Would you like to help support this site?</h1>
        <div style={supportForm}>
          <CurrencyInput onChangeEvent={handleSupportUsAmountChange} style={supportInput} prefix="$" value={supportUsAmount} />
        </div>*/}
          <div>
            <PrimaryButton onClick={() => handleNextClick(true)} text="Next: Payment information" />
          </div>
          </div>
        </div>
      </div>
    </div>
    )
  } else if (!donateNowClicked) {
    return ( 

      // this is the second step,1G user enters payment info
      <>
        <div id="donator2">
          <Banner></Banner>

          <div className="container-fliud" style={{ width: "100%" }}>
            <div className="row justify-content-center mx-2" style={{ marginBottom: "10%" }}>
              <div className="col-lg-6 col-xl-6 col-md-12 col-sm-12 sm-mx-1 pr-5" id="yourSup">
                <h1 style={bigText}>Your support means a lot.</h1>
                <div id="allInvoice">
                  <div style={invoiceRow}>
                    <h1 style={invoiceText}>Donation</h1>
                    <h1 style={invoiceText}>${donateAmount}</h1>
                  </div>
                  <hr style={{ backgroundColor: "black" }} />
                  <div style={invoiceRow}>
                    <h1 style={invoiceSum}>Total Amount</h1>
                    <h1 style={invoiceSum}>${supportUsAmount + donateAmount}</h1>
                  </div>
                </div>
                <div id="protecting">
                  <h1 style={protectInfoHeader}>protecting your information</h1>
                  <h1 style={protectInfoBody}>We never store your credit card information and your payment details are sent over a secure connection.</h1>
                </div>
              </div>
              <div className="col-lg-5 col-xl-5 px-0">
                <div style={cardDetails}>
                  <h1 style={step}>STEP 2</h1>
                  <h1 style={enterDonation}>Enter payment details</h1>
                  {errorWithPayment && (
                    <h1 style={pickAnAmountMessage} >Please review your payment details.</h1>
                  )}
                  <div style={paymentInfoContainer}>
                    <h1 style={paymentInfoSections}>Your information</h1>
                    <div style={nameContainer}>
                      <input type="text" onChange={(e) => handleChange(e)} style={paymentFieldInput} placeholder="First Name" name={"firstName"} value={firstName}></input>
                      <input type="text" onChange={(e) => handleChange(e)} style={lasty} placeholder="Last Name" name={"lastName"} value={lastName}></input>
                    </div>
                    <input style={emailSection} type="text" onChange={(e) => handleChange(e)} placeholder="Email address" name={"email"} value={email}></input>
                    <h1 style={paymentInfoSections}>Address</h1>
                    <input style={emailSection} type="text" onChange={(e) => handleChange(e)} placeholder="Address 1" name={"address1"} value={address1}></input>
                    <input style={emailSection} type="text" onChange={(e) => handleChange(e)} placeholder="Address 2" name={"address2"} value={address2}></input>
                    <div style={nameContainer}>
                      <input style={paymentFieldInput} type="text" onChange={(e) => handleChange(e)} placeholder="City" name={"city"} value={city}></input>
                      <SelectSearch
                        style={paymentFieldInput}
                        key="states"
                        value={state}
                        name={"state"}
                        options={states}
                        onChange={handleChangeState}
                        placeholder="Your state"
                        search
                      />
                    </div>
                    <div style={nameContainer}>
                      <input style={paymentFieldInput} type="text" onChange={(e) => handleChange(e)} placeholder="Zip code" name={"zipcode"} value={zipcode}></input>

                    </div>
                  </div>
                  <h1 style={paymentInfoSections}>Payment information</h1>
                  <CreditCardInput fieldStyle={creditCardField} inputStyle={creditCardInput}
                    containerStyle={{ height: "100%" }}
                    cardNumberInputProps={{ value: cardNumber, onChange: e => handleCardNumberChange(e.target.value) }}
                    cardExpiryInputProps={{ value: exp, onChange: e => handleCardExpiryChange(e.target.value) }}
                    cardCVCInputProps={{ value: cvc, onChange: e => handleCardCVCChange(e.target.value) }}
                  />
                  <div>
                    <SecondaryButton onClick={() => handleBackClick()} text="Back" />
                    <a href="/"><PrimaryButton text="Pay Now" onClick={() => handleDonateClick()} /></a>
                  </div>
                  <h1 style={protectInfoBody}>By continuing, you are agreeing with CARE 37 terms and praivacy policy.</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>

    )
  }
  // } else if (donateNowClicked) {
  //   return (
  //     <ConfirmationPage formVals={formValues} cardNum={cardNumber} exp={exp} cvc={cvc} amount={donateAmount} handleBackToPaymentInfo={() => handleBackFromConfirmation()}></ConfirmationPage>
  //   )
  // }
}



const states = [
  { name: "Alaska", value: "Alaska" },
  { name: "Alabama", value: "Alabama" },
  { name: "Arkansas", value: "Arkansas" },
  { name: "American Samoa", value: "American Samoa" },
  { name: "Arizona", value: "Arizona" },
  { name: "California", value: "California" },
  { name: "Colorado", value: "Colorado" },
  { name: "Connecticut", value: "Connecticut" },
  { name: "District of Columbia", value: "District of Columbia" },
  { name: "Delaware", value: "Delaware" },
  { name: "Florida", value: "Florida" },
  { name: "Georgia", value: "Georgia" },
  { name: "Guam", value: "Guam" },
  { name: "Hawaii", value: "Hawaii" },
  { name: "Iowa", value: "Iowa" },
  { name: "Idaho", value: "Idaho" },
  { name: "Illinois", value: "Illinois" },
  { name: "Indiana", value: "Indiana" },
  { name: "Kansas", value: "Kansas" },
  { name: "Kentucky", value: "Kentucky" },
  { name: "Louisiana", value: "Louisiana" },
  { name: "Massachusetts", value: "Massachusetts" },
  { name: "Maryland", value: "Maryland" },
  { name: "Maine", value: "Maine" },
  { name: "Michigan", value: "Michigan" },
  { name: "Minnesota", value: "Minnesota" },
  { name: "Missouri", value: "Missouri" },
  { name: "Northern Mariana Islands", value: "Northern Mariana Islands" },
  { name: "Mississippi", value: "Mississippi" },
  { name: "Montana", value: "Montana" },
  { name: "North Carolina", value: "North Carolina" },
  { name: "North Dakota", value: "North Dakota" },
  { name: "Nebraska", value: "Nebraska" },
  { name: "New Hampshire", value: "New Hampshire" },
  { name: "New Jersey", value: "New Jersey" },
  { name: "New Mexico", value: "New Mexico" },
  { name: "Nevada", value: "Nevada" },
  { name: "New York", value: "New York" },
  { name: "Ohio", value: "Ohio" },
  { name: "Oklahoma", value: "Oklahoma" },
  { name: "Oregon", value: "Oregon" },
  { name: "Pennsylvania", value: "Pennsylvania" },
  { name: "Puerto Rico", value: "Puerto Rico" },
  { name: "Rhode Island", value: "Rhode Island" },
  { name: "South Carolina", value: "South Carolina" },
  { name: "South Dakota", value: "South Dakota" },
  { name: "Tennessee", value: "Tennessee" },
  { name: "Texas", value: "Texas" },
  { name: "United States Minor Outlying Islands", value: "United States Minor Outlying Islands" },
  { name: "Utah", value: "Utah" },
  { name: "Virginia", value: "Virginia" },
  { name: "Virgin Islands U.S.", value: "Virgin Islands U.S." },
  { name: "Vermont", value: "Vermont" },
  { name: "Washington", value: "Washington" },
  { name: "Wisconsin", value: "Wisconsin" },
  { name: "West Virginia", value: "West Virginia" },
  { name: "Wyoming", value: "Wyoming" }
]

export default DonatePage;