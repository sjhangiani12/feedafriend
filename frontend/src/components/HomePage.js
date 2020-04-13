import React, { useState, useEffect } from 'react';

import geo2zip from 'geo2zip';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { useAuth0 } from "../contexts/react-auth0-spa";
import banner from "../static/banner.svg";
import { PrimaryButton, SecondaryButton } from "../shared/ButtonComponents";
import vec from "../static/Vector.svg";
import people from "../static/people.png";
import mun from "../static/money.png";
import food from "../static/food.png";
import flow from "../static/flow.png";
import big from "../static/value.png";
import MediaQuery from 'react-responsive'

const header = {
  display: "flex",
  justifyContent: "center"
}
const header2 = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "20%"
}
const root = {
  position: "relative",
  marginTop: "10%",
  // left: "20%",
  // width: "70%"
  marginLeft: "40px",
  marginRight: "40px"
}



function HomePage () {


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
    <div>
      <div style={root}>
        <MediaQuery minDeviceWidth={700} >
          <div style={header}>
            <div>
              <p style={{ color: "#828282", fontFamily: "sans-serif", fontWeight: "bold" }}>WHAT WE DO</p>
              <h1 style={{ fontSize: "48px", margin: "0px" }}>Help feed people in <br /> need and support<br /> local restaurants.</h1>
              <p style={{ color: "#828282", fontFamily: "sans-serif" }}>All of donated funds are used to purchase DoorDash<br /> credits for hungry people in need.</p>

              <div style={{ marginTop: "30px" }}>
                <Link to="/donate" style={{ marginRight: "20px" }}><PrimaryButton text="Donate" /></Link>
                <Link to="/receive"><SecondaryButton text="Receive" /></Link>
              </div>
            </div>
            <img style={{ marginLeft: "5%" }} src={banner} alt="header image" />
          </div>
        </MediaQuery>

        <MediaQuery maxDeviceWidth={699}>
          <div style={header2}>
            <div>
              <p style={{ color: "#828282", fontFamily: "sans-serif", fontWeight: "bold" }}>WHAT WE DO</p>
              <h1 style={{ fontSize: "48px", margin: "0px" }}>Help feed people in <br /> need and support<br /> local restaurants.</h1>
              <p style={{ color: "#828282", fontFamily: "sans-serif" }}>All of donated funds are used to purchase DoorDash<br /> credits for hungry people in need.</p>

              <div style={{ marginTop: "30px" }}>
                <Link to="/donate" style={{ marginRight: "20px" }}><PrimaryButton text="Donate" /></Link>
                <Link to="/receive"><SecondaryButton text="Receive" /></Link>
              </div>
            </div>
            <img style={{ marginTop: "10%" }} src={banner} alt="header image" />
          </div>
        </MediaQuery>
      </div>
      <div>
        <How />
      </div>
    </div>

  );

}
const money = {
  width: "30%",
  height: "auto",
  marginTop: "0%",
}
const peep = {
  width: "40%",
  height: "auto",
  marginTop: "0%",
}

const them = {
  width: "70%",
  height: "auto",
  marginTop: "0%"
}

const lines = {
  display: "flex",
  justifyContent: "center",
  align: "center",
  marginTop: "5%"
}

const headed = {
  display: "flex",
  justifyContent: "center",
  align: "center",
  marginLeft: "40px",
  marginRight: "40px",
  marginTop: "25%"
}
const ro = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "15%"
}

const who = {
  display: "flex",
  justifyContent: "center",
  marginTop: "20%"
}

const cap = {
  fontFamily: "Abril Titling",
  fontStyle: "italic",
  fontWeight: "bold",
  width: "400px",
  fontSize: "30px",
  textAlign: "center",
  marginTop: "10px"
}

function How () {
  return (
    <div>
      <div >
        <div className="row" align="center" style={headed}>
          <div className="col-xl-10">
            <h1>Here is how we use funds</h1>
            <br />
            <br />
            <img src={big} style={{ width: "30%", height: "auto" }} />
          </div>
        </div>
      </div>
      <MediaQuery minDeviceWidth={700} >
        <div style={lines}>
          <img style={them} src={flow} alt="line" />

        </div>
      </MediaQuery>
      <MediaQuery maxDeviceWidth={699}>
        <div style={ro}>
          <img style={money} src={mun}></img>
          <p style = {cap}>You donate</p>          
          <img style={peep} src={people}></img>
          <p style = {cap}>Our system selects someone in need</p>
          <img style={money} src={food}></img>
          <p style={cap}> They get a DoorDash gift card so they can enjoy a meal at home!</p>
        </div>
      </MediaQuery>

    <div className="container-fluid" style={who}>
      <div className="row" style={header} >
        <div className="col-xl-5 col-md-4 col-sm-12 mx-4 mt-3">
            <h2 align = "center">Step 1</h2>
            <p align="center " >People in need sign up on our platform and we call each and every one of them by phone to verify that they are in need. We add them to system and order them by how much they've been donated and how recently they've been donated to.</p>
          
        </div>
        <div className="col-xl-5 col-md-4 col-sm-12 mx-4 mt-3">
          <h2 align = "center">Step 2</h2>
          <p align="center">When you donate, our system selects the highest priority recipient. We securely port your credit card data and the recipient we selected directly into Door Dash using end-to-end encryption. The recipient gets 100% of the funds you donated and can enjoy a meal in the safety of their own home!</p>

        </div>
      </div>
    </div>
    </div>

  )
}

export default HomePage;
