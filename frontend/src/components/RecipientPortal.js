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

  useEffect(() => {
    checkIfPhoneNumberAdded();
    checkIsVerified();
  }, []);

  const checkIfPhoneNumberAdded = async () => {
    var data;
    if (typeof user === 'undefined') {
      data = {
        email: ""
      }
    } else {
      data = {
        email: user.email
      }
    }

    fetch(`https://care37-cors-anywhere.herokuapp.com/https://care37.herokuapp.com/getPhoneNumber?email=${encodeURIComponent(data.email)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(
      function (response) {
        // check if phone number is not 0
        console.log(response);
        response.json().then(json => {
          setAddedPhoneNumber(json != 0);
        })
      }
    )
  }

  const checkIsVerified = async () => {
    var data;
    if (typeof user === 'undefined') {
      data = {
        email: ""
      }
    } else {
      data = {
        email: user.email
      }
    }


    fetch(`https://care37-cors-anywhere.herokuapp.com/https://care37.herokuapp.com/getIsVerified?email=${encodeURIComponent(data.email)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(
      function (response) {
        console.log(response);
        // check if user is verified
        response.json().then(json => {
          console.log(json);
          setIsVerified(json);
        })
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
          if (response.status != 200) {
            alert("Adding phone number failed. Try again and contact us if the issues persits");
          } else {
            setAddedPhoneNumber(true);
          }
        }
      )
    } else {
      alert("pleae enter a valid phone number");
    }
  }

  return (
    <div style={header}>
      {!addedPhoneNumber && (
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

      {addedPhoneNumber && isVerified && (
        <div style={header}>
          <h1 style={thankYou}>Thank you, you are all set!</h1>
          <h1 style={infoBeenAdded}>Once a match is found, you will receive an email with your donation.</h1>
          <div style={last} >
            <SecondaryButton onClick={() => logout({})} text="Log out" />
          </div>
        </div>
      )}
      {/*
      {isAuthenticated && (
          <div style={textHeader}>
            <h1 style={thankYou}>Thank you for signing up to be a recipient!</h1>
            <h4 style={infoBeenAdded}>Your information has been added to our database and you will 
                                      recieve an email when have been matched with a donor.</h4>
          </div>
          
        )
      }

        { !isAuthenticated &&
          (<Redirect  to="/" />)
      }
    */}
    </div>
  );

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
}

const infoBeenAdded = {
  textAlign: "center",
  marginLeft: "200px",
  marginRight: "200px",
}

const header = {
  marginTop: "8%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}

export default RecipientPortal;
