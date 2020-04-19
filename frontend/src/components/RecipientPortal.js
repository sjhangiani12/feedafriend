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
      <div style={header}>
        {!addedPhoneNumber && !isVerified && (
          <div style={header}>
            <h1 style={thankYou}>Thank you for signing up to be a recipient!</h1>
            <h1 style={infoBeenAdded}>Please enter a phone number so we can call and verify you.</h1>
            <PhoneInput style={phoneInput} defaultCountry="US" placeholder="Phone Number" value={phoneNumber} onChange={setPhoneNumber}></PhoneInput>
            <div style={last} >
              <PrimaryButton text="Submit" onClick={() => submitPhoneNumber()} />
              <SecondaryButton onClick={() => logout({})} text="Log out" />
            </div>
          </div>
        )}

        {addedPhoneNumber && !isVerified && (
          <div style={header}>
            <h1 style={thankYou}>Thank you for adding your phone number!</h1>
            <h1 style={infoBeenAdded}>We are going to give you a call.</h1>
            <div style={last} >
              <SecondaryButton onClick={() => logout({})} text="Log out" />
            </div>
          </div>
        )}

        {isVerified && addedPhoneNumber && (
          <div style={header}>
            <h1 style={thankYou}>Thank you, you are all set!</h1>
            <h1 style={infoBeenAdded}>Once a match is found, you will receive an email with your donation.</h1>
            <div style={last} >
              <SecondaryButton onClick={() => logout({})} text="Log out" />
            </div>
          </div>
        )}
      </div>
    );
  }

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
  textAlign: "center",
  marginLeft: "200px",
  marginRight: "200px",
  fontSize: "1.5em",
}

const header = {
  marginTop: "8%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}

export default RecipientPortal;
