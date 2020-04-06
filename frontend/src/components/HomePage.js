import React, { useState, useEffect } from 'react';

import geo2zip from 'geo2zip';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { useAuth0 } from "../contexts/react-auth0-spa";

function HomePage () {

  const root = {
    position: "absolute",
    top: "25%",
    left: "20%",
    width: "60%"
  }

  const header = {
    display: "flex",
    justifyContent: "space-between"
  }

  const content = {
    marginTop: "50px"
  }

  const { loading, isAuthenticated, loginWithRedirect, logout, user, text } = useAuth0();

  const [userInfo, setUserInfo] = useState(user);

  useEffect(() => {
    createUser();
  }, [userInfo])

  const createUser = async () => {
    console.log("in create user");
    if (userInfo !== undefined) {
      let info = userInfo["https://example.com/geoip"];
      let location = {latitude: info.latitude, longitude: info.longitude};
      const zip = await geo2zip(location);

      const data = {
        first_name: userInfo.given_name,
        last_name: userInfo.family_name,
        email: userInfo.email,
        zip_code:  zip[0]
      }

      const response = await fetch('https://care37.herokuapp.com/createUser/', {
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
        },

        body: JSON.stringify (data)
      });

      const text = await response.text();
      await console.log(text);
    }
  }

  return (
    <div style={root}>
      <div style={header}>
        <div>
          <h1>Care 37</h1>
          <p>Donate today!</p>
        </div>
        <img src="blank" alt="header image" />
      </div>

      <div style={content}>
        <Link to="/donate"><button>Donate</button></Link>
        <Link to="/receive"><button>Receive</button></Link>
        <br />
        <br />
        <Link to="/about_us">What's Care37?</Link>
      </div>
    </div>
  );

}

export default HomePage;
