import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useAuth0 } from "../contexts/react-auth0-spa";
import geo2zip from 'geo2zip';

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
    <div style={header}>
      {!loading && !isAuthenticated && (
        <button style={loginButton} onClick={() => loginWithRedirect({})}>Log in</button>
      )}

      {isAuthenticated && 
      <div style={loggedInView}>
        <h1 style={signUpMessage}>Thank you for signing up!</h1>
        <button style={logoutButton} onClick={() => logout()}>Log out</button>
      </div>}
    </div>
  );
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
  marginTop: "100px",
  display: "flex",
  justifyContent: "center",
}

export default ReceivePage;
