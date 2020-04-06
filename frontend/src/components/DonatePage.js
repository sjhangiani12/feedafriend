import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { PrimaryButton, SecondaryButton } from "../shared/ButtonComponents.js"

function DonatePage() {

  const donateHeader = {
    display: "flex",
    flexDirection: "row",
    flex: "1",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10%"
  }

  const bigTextFlex = {
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
    width: "378px",
    height: "40px",
  }

  const step = {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "18px", 
    lineHeight: "21px" 
  }
   
  const enterDonation = {
    fontFamily: "Abril Titling",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "36px",
    lineHeight: "40px"
  }

  const supportSiteText = {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "300",
    fontSize: "18px",
    lineHeight: "21px"
  }

  return (
    <div style={donateHeader}>
      <div style={bigTextFlex}>
        <h1 style={bigText}>You are making the world better.</h1>
      </div>
      <div style={donationText}>
        <h1 style={step}>STEP 1</h1>
        <h1 style={enterDonation}>Enter donation amount</h1>
        <h1 style={supportSiteText}>Would you like to help support this site?</h1>
        <PrimaryButton text="Next: Payment information"/>
      </div>
    </div>
  );
}

export default DonatePage;
