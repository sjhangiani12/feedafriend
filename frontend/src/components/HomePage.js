import React, { useState, useEffect } from 'react';

import geo2zip from 'geo2zip';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { useAuth0 } from "../contexts/react-auth0-spa";
import banner from "../static/banner.svg";
import { PrimaryButton, SecondaryButton } from "../shared/ButtonComponents";
import vec from "../static/Vector.svg";
import people from "../static/people.png";
import flow from "../static/flow.png";
import big from "../static/value.png";

const header = {
  display: "flex",
  justifyContent: "center"
}
function HomePage () {

  const root = {
    position: "relative",
    marginTop: "10%",
    // left: "20%",
    // width: "70%"
    marginLeft: "40px",
    marginRight: "40px"
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
    <div>
      <div style={root}>
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
      </div>
      <div>
        <How />
      </div>
    </div>

  );

}


const cap1 = {
  position: "absolute",
  width: "auto",
  height: "28px",
  left: "240px",
  marginTop: "62%",
  fontFamily: "Abril Titling",
  fontStyle: "italic",
  fontWeight: "bold",
  fontSize: "24px",
  lineHeight: "28px",
  align: "center",
  letterSpacing: "0.02em",
  color: "#333333"
}
const cap2 = {
  position: "absolute",
  width: "300px",
  height: "28px",
  left: "552px",
  marginTop: "62%",
  fontFamily: "Abril Titling",
  fontStyle: "italic",
  fontWeight: "bold",
  fontSize: "24px",
  lineHeight: "28px",
  textAlign: "center",
  letterSpacing: "0.02em",
  color: "#333333"
}
const cap3 = {
  position: "absolute",
  width: "300px",
  height: "28px",
  left: "963px",
  marginTop: "62%",
  fontFamily: "Abril Titling",
  fontStyle: "italic",
  fontWeight: "bold",
  fontSize: "24px",
  lineHeight: "28px",
  textAlign: "center",
  letterSpacing: "0.02em",
  color: "#333333"
}
const how = {
  display: "flex",
  justifyContent: "center",
  position: "relative",
  marginTop: "20%",
  // left: "20%",
  // width: "70%"
  marginLeft: "40px",
  marginRight: "40px"
}

const them = {
  width: "70%",
  height: "auto"
}

function How () {
  return (
    <div>
      <div className="container-fluid" style={how}>

        <div >
          <div className="row" align="center" style={header}>
            <div className="col-xl-10">
              <h1>Here is how we use funds</h1>
              <br />
              <br />
              <img src={big}/>
            </div>
          </div>
        </div>
      </div>
      <div className="row" style={header}>
        <span style={cap1}>You donate</span>
        <span style={cap2}>Our system selects someone in need</span>
        <span style={cap3}>They get a DoorDash gift card so they can enjoy a meal at home!</span>
        <img style={them} src={flow} alt="line" />
      </div>
    </div>

  )
}

export default HomePage;
