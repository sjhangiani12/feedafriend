import React, { useState } from 'react';
import ReactDOM from 'react-dom';

function DonatePage() {

  const header = {
    display: "flex",
    flexDirection: "row",
    flex: "1",
    justifyContent: "space-between"
  }

  const bigTextFlex = {
    flex: "1",
  }

  const bigText = {
    position: "absolute",
    width: "551px",
    height: "162px",
    left: "78px",
    top: "287px",
    fontFamily: "Abril Titling",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "72px",
    lineHeight: "81px"
  }
  
  const donationText = {
    flex: "1",
    position: "absolute",
    width: "378px",
    height: "40px",
    left: "786px",
    top: "315px"
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

  return (
    <div style={header}>
      <div style={bigTextFlex}>
        <h1 style={bigText}>You are making the world better.</h1>
      </div>
      <div style={donationText}>
        <h1 style={step}>STEP 1</h1>
        <h1 style={enterDonation}>Enter donation amount</h1>
      </div>
    </div>
  );

}

export default DonatePage;
