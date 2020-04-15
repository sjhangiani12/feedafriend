import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useAuth0 } from "../contexts/react-auth0-spa";
import geo2zip from 'geo2zip';
import { PrimaryButton, SecondaryButton } from "../shared/ButtonComponents";

function ReceivePage() {
  const { loading, isAuthenticated, loginWithRedirect, logout, user, text } = useAuth0();

  const [userInfo, setUserInfo] = useState(user);

  useEffect(() => {
    createUser();
  }, [userInfo])

  const createUser = async () => {
    console.log("in create user");
    if (userInfo !== undefined) {
      let info = userInfo["https://example.com/geoip"];
      let location = { latitude: info.latitude, longitude: info.longitude };
      const zip = await geo2zip(location);

      const data = {
        first_name: userInfo.given_name,
        last_name: userInfo.family_name,
        email: userInfo.email,
        zip_code: zip[0]
      }

      const response = await fetch('https://care37-cors-anywhere.herokuapp.com/https://care37.herokuapp.com/createUser', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(data)
      });

      const text = await response.text();
      await console.log(text);
    }
  }

  return (
    <div style={header} className="sm-mx-5 l-mx-0">
      
      {!loading && !isAuthenticated && (
        <div style={textHeader}>
          <h1 style={thankYou}>Sign up to be added to our system!</h1>
          <h4 style={infoBeenAdded}>Once you create an account with us, you will be added to our donation queue and can expect a donation soon!</h4>
          <div style={last} >
            <PrimaryButton onClick={() => loginWithRedirect({})} text="Log In"/>
          </div>
        </div>
      )}

      {isAuthenticated && 
        <div style={textHeader}>
        <h1 style={thankYou}>Thank you for signing up to be a recipient!</h1>
        <h4 style={infoBeenAdded}>Your information has been added to our database and you will
                                      recieve an email when have been matched.</h4>
        <SecondaryButton onClick={() => logout({})} text="Log out" />
      </div>}
    </div>
  );
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

const textHeader = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center"
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
  width: "100px",
  marginTop: "5%"
}

const loginButton = {
  marginTop: "100px",
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
  justifyContent: "center",
  height: "100vh"
}

export default ReceivePage;
