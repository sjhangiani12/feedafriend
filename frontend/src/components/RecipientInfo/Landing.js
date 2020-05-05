import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import geo2zip from 'geo2zip';
import { PrimaryButton, SecondaryButton } from "../../shared/ButtonComponents";
import MediaQuery from 'react-responsive'
import forDonor from "../../static/forRecip.svg"
import RecievePage from '../ReceivePage';


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
    marginLeft: "40px",
    marginRight: "40px",
  }
  const how2col = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

  }

  // state for when the user clicks the next button (may be unecessary but im lazy)
  const [nextToRegistartionPressed, setNextToRegistration] = useState(false);

  function handleNextClick() {
    setNextToRegistration(true);
    
  }
if((!nextToRegistartionPressed)){
  return (
    <>
      <div style={root}>
          <div className="container-fluid">
            <div className="row flex-wrap" style={header}>
              <div className="col-md-7 col-sm-12" style={{ marginTop: "5%", paddingRight: "2%" }} >
                {/* <p style={{ color: "#828282", fontFamily: "sans-serif", fontWeight: "bold" }}>WHAT WE DO</p> */}
                <h1 style={{ fontSize: "3em", margin: "0px" }}>In need of a meal?</h1>

                <h3 style={{ color: "#828282", fontFamily: "sans-serif", marginRight: "10%", marginTop: "5%" }}> A lot of people are struggling right now. If you're one of them, lets get in touch. Anyone can request credits to major food delivery services.</h3>
                {props.button}
                <PrimaryButton onClick={() => handleNextClick(true)} text="Next: Register/Login" />
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
                  <Q number="2">Enter your number, tell us your story.</Q>
                  </div>
                  <div className="col-md-4 " style={how2col}>
                  <Q number="3">Recieve meal delivary credits!</Q>
                  </div>
                </div>
            </div>
          </div>  
      </div>
    </>
  ); }
  else {

  }
}
const thankYou = {
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  paddingBottom: "20px",
  fontSize: "3em",
}

const infoBeenAdded = {
  textAlign: "center",
  marginLeft: "10%",
  marginRight: "10%",
  fontSize: "1.5em",
}

const textHeader = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center"
}

const last = {
  "color": "black",
  "font-family": "sans-serif",
  "text-decoration": "none",
  "&:hover": {
    textDecoration: "underline"
  },
  display: "flex",
  flexDirection: "column",
  marginTop: "5%"
}

const loginButton = {
  marginTop: "100px",
}

const mobileRow = {
  position: "absolute",
  top: "15%",
  margin: "2%",
  tesstAlign: "center"
}
const signUpMessage = {
  flexBasis: "40%",
  padding: "20px",
}

const logoutButton = {
  flexBasis: "40%",
  width: "150px",
  height: "28px",
}

const loggedInView = {
  marginTop: "100px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}

const header = {
  display: "flex",
  flexWrap: "wrap",
  marginLeft: "5%",
  marginRight: "5%",
}

export default Landing;