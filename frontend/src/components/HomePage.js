import React, { useState, useEffect } from 'react';

import geo2zip from 'geo2zip';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { useAuth0 } from "../contexts/react-auth0-spa";
import banner from "../static/banner.svg";
import { PrimaryButton, SecondaryButton } from "../shared/ButtonComponents";

function HomePage () {

  const root = {
    position: "relative",
    marginTop: "10%",
    // left: "20%",
    // width: "70%"
    marginLeft: "40px",
    marginRight: "40px"
  }

  const header = {
    display: "flex",
    justifyContent: "center"
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
          <p style={{color: "#828282", fontFamily: "sans-serif", fontWeight: "bold"}}>WHAT WE DO</p>
          <h1 style={{fontSize: "48px", margin: "0px"}}>Help feed people in <br /> need and support<br /> local restaurants.</h1>
          <p style={{color: "#828282", fontFamily: "sans-serif"}}>All of donated funds are used to purchase DoorDash<br /> credits for hungry people in need.</p>

          <div style={{marginTop: "30px"}}>
            <Link to="/donate" style={{marginRight: "20px"}}><PrimaryButton text="Donate" /></Link>
            <Link to="/receive"><SecondaryButton text="Receive" /></Link>
          </div>
        </div>
        <img style={{ marginLeft: "5%" }} src={banner} alt="header image" />
      </div>
    </div>
  );

}

export default HomePage;
