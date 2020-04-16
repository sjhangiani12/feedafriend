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
    marginBottom: "5%"
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
    paddingTop: "10px"
  }

  const invoiceRow = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "3%",
  }

  const cardDetails = {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    padding: "0px 100px 0px 50px"
  }

  const allInvoiceRows = {
    marginTop: "10%",
    marginBottom: "15%",
  }

  const paymentInfoSections = {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "16px",
    lineHeight: "19px",
    color: "#000000",
  }

  const paymentFieldInput = {
    fontFamily: "Roboto",
    fontStyle: "normal",
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
    justifyContent: "space-between",
    width: "73%",
  }

  const buttonContainer = {
    display: "flex",
    justifyContent: "space-between",
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
      <div className="container-fliud">
        <div className="row">
          {/* if the user selected an amount give them the meals estimate */}
          {(donateAmount == 0) ? (
            <h1 style={bigText}>You are making the world better.</h1>
          ) : (
              <h1 style={bigText}>You are donating <br /> around <mark style={numOfMealsNumber}>
                {donateAmount / 12.5}</mark> meals</h1>
            )}
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
            <OverlayTrigger
              placement={'top'}
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
            <PrimaryButton onClick={() => handleNextClick(true)} text="Next: Payment information" />
          </div>
        </div>
      </div>


    </div>
    )
  } else if (!donateNowClicked) {
    return (

      // this is the second step,1G user enters payment info
      <div  id="donator">
        <div style={invoice}>
          <MediaQuery minDeviceWidth={700} >

          <h1 style={bigText}>Your support <br />means a lot.</h1>
            <div style={allInvoiceRows}>
              <div style={invoiceRow}>
                <h1 style={invoiceText}>Donation</h1>
                <h1 style={invoiceText}>${donateAmount}</h1>
              </div>
              {/*<div style={invoiceRow}>
                <h1 style={invoiceText}>Your support &#128150;</h1>
                <h1 style={invoiceText}>${supportUsAmount}</h1>
              </div>*/}
              <hr style={{ backgroundColor: "black" }} />
              <div style={invoiceRow}>
                <h1 style={invoiceSum}>Total Amount</h1>
                <h1 style={invoiceSum}>${supportUsAmount + donateAmount}</h1>
              </div>
            </div>
          </MediaQuery>
          <div>
            <h1 style={protectInfoHeader}>protecting your information</h1>
            <h1 style={protectInfoBody}>We never store your credit card information and your payment details are sent over a secure connection.</h1>
          </div>
        </div>
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
              <input type="text" onChange={(e) => handleChange(e)} style={paymentFieldInput} placeholder="Last Name" name={"lastName"} value={lastName}></input>
            </div>
            <input style={paymentFieldInput} type="text" onChange={(e) => handleChange(e)} placeholder="Email address" name={"email"} value={email}></input>
            <h1 style={paymentInfoSections}>Address</h1>
            <input style={paymentFieldInput} type="text" onChange={(e) => handleChange(e)} placeholder="Address 1" name={"address1"} value={address1}></input>
            <input style={paymentFieldInput} type="text" onChange={(e) => handleChange(e)} placeholder="Address 2" name={"address2"} value={address2}></input>
            <div style={nameContainer}>
              <input style={paymentFieldInput} type="text" onChange={(e) => handleChange(e)} placeholder="City" name={"city"} value={city}></input>
              <SelectSearch
                key="states"
                value={state}
                name={"state"}
                options={states}
                onChange={handleChangeState}
                placeholder="Your state"
                search
              />
            </div>
            <input style={paymentFieldInput} type="text" onChange={(e) => handleChange(e)} placeholder="Zip code" name={"zipcode"} value={zipcode}></input>
          </div>
          <h1 style={paymentInfoSections}>Payment information</h1>
          <CreditCardInput fieldStyle={creditCardField} inputStyle={creditCardInput}
            cardNumberInputProps={{ value: cardNumber, onChange: e => handleCardNumberChange(e.target.value) }}
            cardExpiryInputProps={{ value: exp, onChange: e => handleCardExpiryChange(e.target.value) }}
            cardCVCInputProps={{ value: cvc, onChange: e => handleCardCVCChange(e.target.value) }}
          />
          <div style={buttonContainer}>
            <SecondaryButton onClick={() => handleBackClick()} text="Back" />
            <PrimaryButton text="Donate now" onClick={() => handleDonateClick()} />
          </div>
          <h1 style={protectInfoBody}>By continuing, you are agreeing with CARE 37 terms and praivacy policy.</h1>
        </div>
      </div>
    )
  } else if (donateNowClicked) {
    return (
      <ConfirmationPage formVals={formValues} cardNum={cardNumber} exp={exp} cvc={cvc} amount={donateAmount} handleBackToPaymentInfo={() => handleBackFromConfirmation()}></ConfirmationPage>
    )
  }
}

const countries = [
  { name: "Andorra", value: "Andorra" },
  { name: "United Arab Emirates", value: "United Arab Emirates" },
  { name: "Afghanistan", value: "Afghanistan" },
  { name: "Antigua and Barbuda", value: "Antigua and Barbuda" },
  { name: "Anguilla", value: "Anguilla" },
  { name: "Albania", value: "Albania" },
  { name: "Armenia", value: "Armenia" },
  { name: "Angola", value: "Angola" },
  { name: "Antarctica", value: "Antarctica" },
  { name: "Argentina", value: "Argentina" },
  { name: "American Samoa", value: "American Samoa" },
  { name: "Austria", value: "Austria" },
  { name: "Australia", value: "Australia" },
  { name: "Aruba", value: "Aruba" },
  { name: "Åland Islands", value: "Åland Islands" },
  { name: "Azerbaijan", value: "Azerbaijan" },
  { name: "Bosnia and Herzegovina", value: "Bosnia and Herzegovina" },
  { name: "Barbados", value: "Barbados" },
  { name: "Bangladesh", value: "Bangladesh" },
  { name: "Belgium", value: "Belgium" },
  { name: "Burkina Faso", value: "Burkina Faso" },
  { name: "Bulgaria", value: "Bulgaria" },
  { name: "Bahrain", value: "Bahrain" },
  { name: "Burundi", value: "Burundi" },
  { name: "Benin", value: "Benin" },
  { name: "Saint Barthélemy", value: "Saint Barthélemy" },
  { name: "Bermuda", value: "Bermuda" },
  { name: "Brunei Darussalam", value: "Brunei Darussalam" },
  { name: "Bolivia, Plurinational State of", value: "Bolivia, Plurinational State of" },
  { name: "Bonaire, Sint Eustatius and Saba", value: "Bonaire, Sint Eustatius and Saba" },
  { name: "Brazil", value: "Brazil" },
  { name: "Bahamas", value: "Bahamas" },
  { name: "Bhutan", value: "Bhutan" },
  { name: "Bouvet Island", value: "Bouvet Island" },
  { name: "Botswana", value: "Botswana" },
  { name: "Belarus", value: "Belarus" },
  { name: "Belize", value: "Belize" },
  { name: "Canada", value: "Canada" },
  { name: "Cocos (Keeling) Islands", value: "Cocos (Keeling) Islands" },
  { name: "Congo, Democratic Republic of the", value: "Congo, Democratic Republic of the" },
  { name: "Central African Republic", value: "Central African Republic" },
  { name: "Congo", value: "Congo" },
  { name: "Switzerland", value: "Switzerland" },
  { name: "Côte d'Ivoire", value: "Côte d'Ivoire" },
  { name: "Cook Islands", value: "Cook Islands" },
  { name: "Chile", value: "Chile" },
  { name: "Cameroon", value: "Cameroon" },
  { name: "China", value: "China" },
  { name: "Colombia", value: "Colombia" },
  { name: "Costa Rica", value: "Costa Rica" },
  { name: "Cuba", value: "Cuba" },
  { name: "Cabo Verde", value: "Cabo Verde" },
  { name: "Curaçao", value: "Curaçao" },
  { name: "Christmas Island", value: "Christmas Island" },
  { name: "Cyprus", value: "Cyprus" },
  { name: "Czechia", value: "Czechia" },
  { name: "Germany", value: "Germany" },
  { name: "Djibouti", value: "Djibouti" },
  { name: "Denmark", value: "Denmark" },
  { name: "Dominica", value: "Dominica" },
  { name: "Dominican Republic", value: "Dominican Republic" },
  { name: "Algeria", value: "Algeria" },
  { name: "Ecuador", value: "Ecuador" },
  { name: "Estonia", value: "Estonia" },
  { name: "Egypt", value: "Egypt" },
  { name: "Western Sahara", value: "Western Sahara" },
  { name: "Eritrea", value: "Eritrea" },
  { name: "Spain", value: "Spain" },
  { name: "Ethiopia", value: "Ethiopia" },
  { name: "Finland", value: "Finland" },
  { name: "Fiji", value: "Fiji" },
  { name: "Falkland Islands (Malvinas)", value: "Falkland Islands (Malvinas)" },
  { name: "Micronesia, Federated States of", value: "Micronesia, Federated States of" },
  { name: "Faroe Islands", value: "Faroe Islands" },
  { name: "France", value: "France" },
  { name: "Gabon", value: "Gabon" },
  { name: "United Kingdom of Great Britain and Northern Ireland", value: "United Kingdom of Great Britain and Northern Ireland" },
  { name: "Grenada", value: "Grenada" },
  { name: "Georgia", value: "Georgia" },
  { name: "French Guiana", value: "French Guiana" },
  { name: "Guernsey", value: "Guernsey" },
  { name: "Ghana", value: "Ghana" },
  { name: "Gibraltar", value: "Gibraltar" },
  { name: "Greenland", value: "Greenland" },
  { name: "Gambia", value: "Gambia" },
  { name: "Guinea", value: "Guinea" },
  { name: "Guadeloupe", value: "Guadeloupe" },
  { name: "Equatorial Guinea", value: "Equatorial Guinea" },
  { name: "Greece", value: "Greece" },
  { name: "South Georgia and the South Sandwich Islands", value: "South Georgia and the South Sandwich Islands" },
  { name: "Guatemala", value: "Guatemala" },
  { name: "Guam", value: "Guam" },
  { name: "Guinea-Bissau", value: "Guinea-Bissau" },
  { name: "Guyana", value: "Guyana" },
  { name: "Hong Kong", value: "Hong Kong" },
  { name: "Heard Island and McDonald Islands", value: "Heard Island and McDonald Islands" },
  { name: "Honduras", value: "Honduras" },
  { name: "Croatia", value: "Croatia" },
  { name: "Haiti", value: "Haiti" },
  { name: "Hungary", value: "Hungary" },
  { name: "Indonesia", value: "Indonesia" },
  { name: "Ireland", value: "Ireland" },
  { name: "Israel", value: "Israel" },
  { name: "Isle of Man", value: "Isle of Man" },
  { name: "India", value: "India" },
  { name: "British Indian Ocean Territory", value: "British Indian Ocean Territory" },
  { name: "Iraq", value: "Iraq" },
  { name: "Iran, Islamic Republic of", value: "Iran, Islamic Republic of" },
  { name: "Iceland", value: "Iceland" },
  { name: "Italy", value: "Italy" },
  { name: "Jersey", value: "Jersey" },
  { name: "Jamaica", value: "Jamaica" },
  { name: "Jordan", value: "Jordan" },
  { name: "Japan", value: "Japan" },
  { name: "Kenya", value: "Kenya" },
  { name: "Kyrgyzstan", value: "Kyrgyzstan" },
  { name: "Cambodia", value: "Cambodia" },
  { name: "Kiribati", value: "Kiribati" },
  { name: "Comoros", value: "Comoros" },
  { name: "Saint Kitts and Nevis", value: "Saint Kitts and Nevis" },
  { name: "Korea, Democratic People's Republic of", value: "Korea, Democratic People's Republic of" },
  { name: "Korea, Republic of", value: "Korea, Republic of" },
  { name: "Kuwait", value: "Kuwait" },
  { name: "Cayman Islands", value: "Cayman Islands" },
  { name: "Kazakhstan", value: "Kazakhstan" },
  { name: "Lao People's Democratic Republic", value: "Lao People's Democratic Republic" },
  { name: "Lebanon", value: "Lebanon" },
  { name: "Saint Lucia", value: "Saint Lucia" },
  { name: "Liechtenstein", value: "Liechtenstein" },
  { name: "Sri Lanka", value: "Sri Lanka" },
  { name: "Liberia", value: "Liberia" },
  { name: "Lesotho", value: "Lesotho" },
  { name: "Lithuania", value: "Lithuania" },
  { name: "Luxembourg", value: "Luxembourg" },
  { name: "Latvia", value: "Latvia" },
  { name: "Libya", value: "Libya" },
  { name: "Morocco", value: "Morocco" },
  { name: "Monaco", value: "Monaco" },
  { name: "Moldova, Republic of", value: "Moldova, Republic of" },
  { name: "Montenegro", value: "Montenegro" },
  { name: "Saint Martin, (French part)", value: "Saint Martin, (French part)" },
  { name: "Madagascar", value: "Madagascar" },
  { name: "Marshall Islands", value: "Marshall Islands" },
  { name: "North Macedonia", value: "North Macedonia" },
  { name: "Mali", value: "Mali" },
  { name: "Myanmar", value: "Myanmar" },
  { name: "Mongolia", value: "Mongolia" },
  { name: "Macao", value: "Macao" },
  { name: "Northern Mariana Islands", value: "Northern Mariana Islands" },
  { name: "Martinique", value: "Martinique" },
  { name: "Mauritania", value: "Mauritania" },
  { name: "Montserrat", value: "Montserrat" },
  { name: "Malta", value: "Malta" },
  { name: "Mauritius", value: "Mauritius" },
  { name: "Maldives", value: "Maldives" },
  { name: "Malawi", value: "Malawi" },
  { name: "Mexico", value: "Mexico" },
  { name: "Malaysia", value: "Malaysia" },
  { name: "Mozambique", value: "Mozambique" },
  { name: "Namibia", value: "Namibia" },
  { name: "New Caledonia", value: "New Caledonia" },
  { name: "Niger", value: "Niger" },
  { name: "Norfolk Island", value: "Norfolk Island" },
  { name: "Nigeria", value: "Nigeria" },
  { name: "Nicaragua", value: "Nicaragua" },
  { name: "Netherlands", value: "Netherlands" },
  { name: "Norway", value: "Norway" },
  { name: "Nepal", value: "Nepal" },
  { name: "Nauru", value: "Nauru" },
  { name: "Niue", value: "Niue" },
  { name: "New Zealand", value: "New Zealand" },
  { name: "Oman", value: "Oman" },
  { name: "Panama", value: "Panama" },
  { name: "Peru", value: "Peru" },
  { name: "French Polynesia", value: "French Polynesia" },
  { name: "Papua New Guinea", value: "Papua New Guinea" },
  { name: "Philippines", value: "Philippines" },
  { name: "Pakistan", value: "Pakistan" },
  { name: "Poland", value: "Poland" },
  { name: "Saint Pierre and Miquelon", value: "Saint Pierre and Miquelon" },
  { name: "Pitcairn", value: "Pitcairn" },
  { name: "Puerto Rico", value: "Puerto Rico" },
  { name: "Palestine, State of", value: "Palestine, State of" },
  { name: "Portugal", value: "Portugal" },
  { name: "Palau", value: "Palau" },
  { name: "Paraguay", value: "Paraguay" },
  { name: "Qatar", value: "Qatar" },
  { name: "Réunion", value: "Réunion" },
  { name: "Romania", value: "Romania" },
  { name: "Serbia", value: "Serbia" },
  { name: "Russian Federation", value: "Russian Federation" },
  { name: "Rwanda", value: "Rwanda" },
  { name: "Saudi Arabia", value: "Saudi Arabia" },
  { name: "Solomon Islands", value: "Solomon Islands" },
  { name: "Seychelles", value: "Seychelles" },
  { name: "Sudan", value: "Sudan" },
  { name: "Sweden", value: "Sweden" },
  { name: "Singapore", value: "Singapore" },
  { name: "Saint Helena, Ascension and Tristan da Cunha", value: "Saint Helena, Ascension and Tristan da Cunha" },
  { name: "Slovenia", value: "Slovenia" },
  { name: "Svalbard and Jan Mayen", value: "Svalbard and Jan Mayen" },
  { name: "Slovakia", value: "Slovakia" },
  { name: "Sierra Leone", value: "Sierra Leone" },
  { name: "San Marino", value: "San Marino" },
  { name: "Senegal", value: "Senegal" },
  { name: "Somalia", value: "Somalia" },
  { name: "South Sudan", value: "South Sudan" },
  { name: "Sao Tome and Principe", value: "Sao Tome and Principe" },
  { name: "El Salvador", value: "El Salvador" },
  { name: "Sint Maarten, (Dutch part)", value: "Sint Maarten, (Dutch part)" },
  { name: "Syrian Arab Republic", value: "Syrian Arab Republic" },
  { name: "Eswatini", value: "Eswatini" },
  { name: "Turks and Caicos Islands", value: "Turks and Caicos Islands" },
  { name: "Chad", value: "Chad" },
  { name: "French Southern Territories", value: "French Southern Territories" },
  { name: "Togo", value: "Togo" },
  { name: "Thailand", value: "Thailand" },
  { name: "Tajikistan", value: "Tajikistan" },
  { name: "Tokelau", value: "Tokelau" },
  { name: "Timor-Leste", value: "Timor-Leste" },
  { name: "Turkmenistan", value: "Turkmenistan" },
  { name: "Tunisia", value: "Tunisia" },
  { name: "Tonga", value: "Tonga" },
  { name: "Turkey", value: "Turkey" },
  { name: "Trinidad and Tobago", value: "Trinidad and Tobago" },
  { name: "Tuvalu", value: "Tuvalu" },
  { name: "Taiwan, Province of China", value: "Taiwan, Province of China" },
  { name: "Tanzania, United Republic of", value: "Tanzania, United Republic of" },
  { name: "Ukraine", value: "Ukraine" },
  { name: "Uganda", value: "Uganda" },
  { name: "United States Minor Outlying Islands", value: "United States Minor Outlying Islands" },
  { name: "United States of America", value: "United States of America" },
  { name: "Uruguay", value: "Uruguay" },
  { name: "Uzbekistan", value: "Uzbekistan" },
  { name: "Holy See", value: "Holy See" },
  { name: "Saint Vincent and the Grenadines", value: "Saint Vincent and the Grenadines" },
  { name: "Venezuela, Bolivarian Republic of", value: "Venezuela, Bolivarian Republic of" },
  { name: "Virgin Islands, British", value: "Virgin Islands, British" },
  { name: "Virgin Islands, U.S.", value: "Virgin Islands, U.S." },
  { name: "Viet Nam", value: "Viet Nam" },
  { name: "Vanuatu", value: "Vanuatu" },
  { name: "Wallis and Futuna", value: "Wallis and Futuna" },
  { name: "Samoa", value: "Samoa" },
  { name: "Yemen", value: "Yemen" },
  { name: "Mayotte", value: "Mayotte" },
  { name: "South Africa", value: "South Africa" },
  { name: "Zambia", value: "Zambia" }
]

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