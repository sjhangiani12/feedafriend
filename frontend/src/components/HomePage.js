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
  justifyContent: "center"
}

const who = {
  display: "flex",
  justifyContent: "center",
  marginTop: "20%"
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
      <div style={lines}>
        <img style={them} src={flow} alt="line" />

      </div>

    <div className="container-fluid" style={who}>
      <div className="row" style={ro} >
        <div className="col-xl-5 col-md-4 col-sm-12 mx-4 mt-3">
            <h2 align = "center">Step 1</h2>
            <p align = "center ">Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna.</p>
          
        </div>
        <div className="col-xl-5 col-md-4 col-sm-12 mx-4 mt-3">
          <h2 align = "center">Step 2</h2>
          <p align = "center">Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna.</p>

        </div>
      </div>
    </div>
    </div>

  )
}

export default HomePage;
