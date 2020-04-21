import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Redirect } from 'react-router-dom';
import { useAuth0 } from "../contexts/react-auth0-spa";
import { PrimaryButton, SecondaryButton } from "../shared/ButtonComponents";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { isValidPhoneNumber } from 'react-phone-number-input'

function RecipientPortal() {
  const { loading, isAuthenticated, loginWithRedirect, logout, user, text } = useAuth0();
  const [addedPhoneNumber, setAddedPhoneNumber] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isDBWorking, setIsDBWorking] = useState(true);
  const [recievedUnexpectedError, setReceiveUnexpectedError] = useState(false);

  useEffect(() => {
    if (typeof user !== 'undefined') {
      checkIfPhoneNumberAdded();
      checkIsVerified();
    }
  }, [user]);

  function handleLogOutPressed() {
    logout({
      returnTo: 'https://www.care37.org/receive'
    })
  }

  const checkIfPhoneNumberAdded = async () => {
    var data;
    data = {
      email: user.email
    }

    fetch(`https://care37-cors-anywhere.herokuapp.com/https://care37.herokuapp.com/getPhoneNumber?email=${encodeURIComponent(data.email)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(
      function (response) {
        if (response.status == 200) {
          response.json().then(json => {
            // check if phone number is not 0
            setAddedPhoneNumber(json != 0);
            setIsDBWorking(true);
            setReceiveUnexpectedError(false);
          })
        } else if (response.status == 500) {
          // there was an error with the DB
          setIsDBWorking(false);
          response.json().then(json => {
            console.log(json);
          })
        } else {
          // unexpected error
          console.log(response);
          setReceiveUnexpectedError(true);
        }
      }
    )
  }

  const checkIsVerified = async () => {
    var data;
    data = {
      email: user.email
    }


    fetch(`https://care37-cors-anywhere.herokuapp.com/https://care37.herokuapp.com/getIsVerified?email=${encodeURIComponent(data.email)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(
      function (response) {
        if (response.status == 200) {
          response.json().then(json => {
            setIsDBWorking(true);
            setReceiveUnexpectedError(false);
            // check if user is verified, json is true or false
            setIsVerified(json);
          })
        } else if (response.status == 500) {
          // error with the db
          setIsDBWorking(false);
          response.json().then(json => {
            console.log(json);
          })
        } else {
          // unexpected error
          console.log(response);
          setReceiveUnexpectedError(true);
        }
      }
    )
  }

  function submitPhoneNumber() {
    if (typeof user === 'undefined') {
      alert("Error getting you email, try logging in again.")
      return;
    }
    const data = {
      phone_number: phoneNumber.substring(1),
      email: user.email
    }
    if (isValidPhoneNumber(phoneNumber) === true) {
      // make api call
      fetch('https://care37-cors-anywhere.herokuapp.com/https://care37.herokuapp.com/addPhoneNumber', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).then(
        function (response) {
          // if the call failed send an error message otherwise we good
          if (response.status == 200) {
            setAddedPhoneNumber(true);
            setIsDBWorking(true);
            setReceiveUnexpectedError(false);
          } else if (response.status == 500) {
            // db error, failed to add the phone number
            setIsDBWorking(false);
            response.json().then(json => {
              console.log(json);
            })
            alert("Adding phone number failed. Try again and contact us if the issues persits");
          } else {
            // unexpected error
            console.log(response);
            setReceiveUnexpectedError(true);
          }
        }
      )
    } else {
      alert("pleae enter a valid phone number");
    }
  }

  if (recievedUnexpectedError) {
    return (
      <div>
        <h1 style={thankYou}>We ecountered an unexpected error.</h1>
        <h1 style={infoBeenAdded}>Please try again, and contact us if the issue persists.</h1>
      </div>
    );
  } else if (!isDBWorking) {
    return (
      <div>
        <h1 style={thankYou}>Looks like our system is experiencing some issues.</h1>
        <h1 style={infoBeenAdded}>Please try again later, and contact us if the issue persists.</h1>
      </div>
    );
  } else {
    return (
      <div id="donator">
        {!addedPhoneNumber && !isVerified && (
          <div className="container-fliud px-2" style={{ width: "100%" }}>
            <div className="row justify-content-center" style={{ marginRight: "5%", marginLeft: "10%" }}>
              <div className="col-xl-5 col-lg-5 col-sm-12  pb-4">
                <h1 style={bigText}>Thank you for signing up to be a recipient!</h1>
                <h1 style={infoBeenAdded}>Please enter a phone number so we can talk!</h1>
              </div>
              <div className='col-xl-6 col-lg-6 col-sm-12 ml-xl-2'>
                <div>
                  <h1 style={step1}>STEP 1</h1>
                  <span style={{ color: "#919191", fontSize: "2.2vmax", width: "100%" }} align="left">Create an account with an email.</span>
                </div>
                <div >
                  <h1 style={curStep}>STEP 2</h1>
                  <span style={{fontSize: "2.2vmax", width: "100%" }} align="left"> Enter your phone number and tell us what you're going through.</span>
                </div>
                <div >
                  <h1 style={step}>STEP 3</h1>
                  <span style={{ color: "#919191", fontSize: "2.2vmax", width: "100%" }} align="left"> Recieve donated DoorDash credits!</span>
                </div>
                <PhoneInput style={phoneInput} defaultCountry="US" placeholder="Phone Number" value={phoneNumber} onChange={setPhoneNumber}></PhoneInput>

                <div style={last} >
                  <a style={{marginLeft: "1%"}}>
                    <PrimaryButton text="Submit" onClick={() => submitPhoneNumber()} />
                    <SecondaryButton onClick={() => handleLogOutPressed()} text="Log out" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {addedPhoneNumber && !isVerified && (
          <div className="container-fliud px-2" style={{ width: "100%" }}>
            <div className="row justify-content-center" style={{ marginRight: "5%", marginLeft: "10%" }}>
              <div className="col-xl-5 col-lg-5 col-sm-12  pb-4">
                <h1 style={bigText}>Thank you for adding your phone number!</h1>
                <h1 style={infoBeenAdded}>We are going to give you a call.</h1>
              </div>
              <div className='col-xl-6 col-lg-6 col-sm-12 ml-xl-2'>
                <div>
                  <h1 style={step1}>STEP 1</h1>
                  <span style={{ color: "#919191", fontSize: "2.2vmax", width: "100%" }} align="left">Create an account with an email.</span>
                </div>
                <div >
                  <h1 style={curStep}>STEP 2</h1>
                  <span style={{ fontSize: "2.2vmax", width: "100%" }} align="left"> Enter your phone number and tell us what you're going through.</span>
                </div>
                <div >
                  <h1 style={step}>STEP 3</h1>
                  <span style={{ color: "#919191", fontSize: "2.2vmax", width: "100%" }} align="left"> Recieve donated DoorDash credits!</span>
                </div>
                <div style={last} >
                  <SecondaryButton onClick={() => handleLogOutPressed()} text="Log out" />
                </div>
              </div>
            </div>
          </div>

        )}

        {isVerified && addedPhoneNumber && (

          <div className="container-fliud px-2" style={{ width: "100%" }}>
            <div className="row justify-content-center" style={{ marginRight: "5%", marginLeft: "10%" }}>
              <div className="col-xl-5 col-lg-5 col-sm-12  pb-4">
                <h1 style={bigText}>Thank you, you are all set!</h1>
                <h1 style={infoBeenAdded}>Once you are matched with a donor, you will receive an email with your DoorDash credits.</h1>
              </div>
              <div className='col-xl-6 col-lg-6 col-sm-12 ml-xl-2'>
                <div>
                  <h1 style={step1}>STEP 1</h1>
                  <span style={{ color: "#919191", fontSize: "2.2vmax", width: "100%" }} align="left">Create an account with an email.</span>
                </div>
                <div >
                  <h1 style={step}>STEP 2</h1>
                  <span style={{ color: "#919191", fontSize: "2.2vmax", width: "100%" }} align="left"> Enter your phone number and tell us what you're going through.</span>
                </div>
                <div >
                  <h1 style={curStep}>STEP 3</h1>
                  <span style={{ fontSize: "2.2vmax", width: "100%" }} align="left"> Recieve donated DoorDash credits!</span>
                </div>
                <div style={last} >
                  <SecondaryButton onClick={() => handleLogOutPressed()} text="Log out" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

}

const bigText = {
  marginTop: "12px",
  fontStyle: "normal",
  fontWeight: "600",
  fontSize: "2.5rem",
  paddingTop: "12px",
}
const step = {
  marginTop: "5%",
  fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: "bold",
  fontSize: "18px",
  color: "#828282",
}
const curStep = {
  marginTop: "5%",
  fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: "bold",
  fontSize: "18px",
}
const step1 = {
  fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: "bold",
  fontSize: "18px",
  color: "#828282",
}
const phoneInput = {
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

const last = {
  "color": "black",
  "font-family": "sans-serif",
  "text-decoration": "none",
  "&:hover": {
    textDecoration: "underline"
  },
  display: "flex",
  flexDirection: "row",
  marginTop: "5%"
}

const thankYou = {
  textAlign: "center",
  paddingBottom: "20px",
  fontSize: "3em",
}

const infoBeenAdded = {
  textAlign: "left",
  fontSize: "1.5em",
}

export default RecipientPortal;
