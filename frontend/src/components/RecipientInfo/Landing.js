import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import geo2zip from 'geo2zip';
import { PrimaryButton, SecondaryButton } from "../../shared/ButtonComponents";
import MediaQuery from 'react-responsive'
import forDonor from "../../static/forRecip.svg"

class Q extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
    }
  }


  render() {
    let line = {
      borderLeft: "3px solid #1136FC",
      height: "100%",
      marginRight: "1%",
    }
    return (
      <div style={{ display: "flex", align: "center", alignItems: "center", width: "100%" }}>
        <div style={line} >
          <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
            <span style={{ fontSize: "4em", marginLeft: "1%", color: "#1136FC", fontStyle: "bold", marginLeft: "5px", marginRight: "10px" }}>{this.props.number}. </span>
            <span align="left" style={{ fontSize: "2vmax", width: "100%", marginTop: "5%" }}>{this.props.children}</span>
          </div>
        </div>
      </div>
    )
  }
}

function Landing(props) {


  const bigText = {
    marginTop: "12px",  
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "2.5rem",
    paddingTop: "12px",
  }
  const step = {
    marginTop: "5%",
    fontFamily: "sans-serif",
    fontWeight: "bold",
    fontSize: "18px",
    color: "#828282",
  }
  const step1 = {
    
    fontFamily: "sans-serif",
    fontWeight: "bold",
    fontSize: "18px",
  }


  const enterDonation = {
    diaply: "block",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "1rem",
    paddingBottom: "20px",
  }
  const root = {
    position: "relative",
    marginTop: "120px",
    // left: "20%",
    // width: "70%"
    marginLeft: "5%",
    marginRight: "5%",
  }
  const how2col = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

  }
  return (
    <>
      <div style={root}>
          <div className="container-fluid">
            <div className="row flex-wrap" style={header}>
              <div className="col-md-7 col-sm-12" style={{ marginTop: "5%", paddingRight: "2%" }} >
                {/* <p style={{ color: "#828282", fontFamily: "sans-serif", fontWeight: "bold" }}>WHAT WE DO</p> */}
                <h1 style={{ fontSize: "3em", margin: "0px" }}>In need of a meal?</h1>

              <h3 style={{ color: "#5c5c5c", fontFamily: "sans-serif", marginRight: "10%", marginTop: "5%" }}> A lot of people are struggling right now. If you're one of them, create a profile and explain how Covid-19 has affected you. Potential donors will view your profile before sending you a gift card to a meal delivery service.</h3>
                <div style={{marginTop: "5%"}}>
                  {props.googleButton}
                </div>
                
              </div>
              <div className="col-md-5 col-sm-12 mt-5" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "left" }}>
                <img style={{ width: "100%" }} src={forDonor} alt="header image" />
              </div>
                <h2 style={{ marginBottom: "50px", paddingTop: "50px" }}>It's easy as 1, 2, 3</h2>
                <div className="row" style={{ display: "flex", marginBottom: "5%"}}>
                  <div className="col-md-4 " style={how2col}>
                  <Q number="1">Create an account with an email.</Q>
                  </div>
                  <div className="col-md-4 " style={how2col}>
                  <Q number="2">Describe how Covid-19 has affected you.</Q>
                  </div>
                  <div className="col-md-4 " style={how2col}>
                  <Q number="3">Recieve meal delivery credits!</Q>
                  </div>
                </div>
            </div>
          </div>  
      </div>
    </>




  );
}

const header = {
  display: "flex",
  flexWrap: "wrap",
  marginLeft: "5%",
  marginRight: "5%",
}

export default Landing;
