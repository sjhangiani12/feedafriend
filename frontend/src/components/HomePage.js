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
import MediaQuery from 'react-responsive';
import { ButtonToolbar, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';


const header = {
  display: "flex",
  flexWrap: "wrap",
  marginLeft: "5%",
  marginRight: "5%",
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

const support = {
  color: "#828282",
  fontFamily: "sans-serif"
}

const whyTheseAmountsText = {
  fontFamily: "sans-serif",
  fontStyle: "normal",
  fontWeight: "300",
  fontSize: "18px",
  lineHeight: "21px",
  paddingBottom: "10px",
  textDecoration: "underline",
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
          <div className="container-fluid">
            <div className="row flex-wrap" style={header}>
              <div className="col-md-7 col-sm-9" >
                {/* <p style={{ color: "#828282", fontFamily: "sans-serif", fontWeight: "bold" }}>WHAT WE DO</p> */}
                <h1 style={{ fontSize: "3em", margin: "0px" }}>Help feed people in <br /> need and support<br /> local restaurants.</h1>
                <p style={{ color: "#828282", fontFamily: "sans-serif", marginRight: "10%", marginTop: "5%" }}>People all over the nation are struggling to meet their basic food needs while self-isolating with little to no income. Meanwhile, your local restaurants are suffering as a result of depressed business due to the health crisis.
              Support your locals restaurants while giving people a meal by buying and donating a Door Dash gift card so they can enjoy a meal in the safety of their own home. </p>
                <a href="https://www.patreon.com/care37"> <h1 style={whyTheseAmountsText}>Click here to support us!</h1></a>
                <div style={{ marginTop: "30px" }}>
                  <Link to="/receive" style={{ marginRight: "20px" }}><SecondaryButton text="Receive" /></Link>
                  <Link to="/donate"><PrimaryButton text="Donate" /></Link>
                </div>
              </div>
              <div className="col-md-5 col-sm-8 mt-5">
                <img style={{ marginLeft: "5%", width: "120%"}} src={banner} alt="header image" />
              </div>
            </div>
          </div>

        </MediaQuery>

        <MediaQuery maxDeviceWidth={699}>
          <div style={header2}>
            <div>
              <p style={{ color: "#828282", fontFamily: "sans-serif", fontWeight: "bold" }}>WHAT WE DO</p>
              <h1 style={{ fontSize: "48px", margin: "0px" }}>Help feed people in <br /> need and support<br /> local restaurants.</h1>
            <p style={{ color: "#828282", fontFamily: "sans-serif", marginRight: "10%"}}>People all over the nation are struggling to meet their basic food needs while self-isolating with little to no income. Meanwhile, your local restaurants are suffering as a result of depressed business due to the health crisis.
              Support your locals restaurants while giving people a meal by buying and donating a Door Dash gift card so they can enjoy a meal in the safety of their own home. </p>

              <div style={{ marginTop: "30px" }}>
                <Link to="/receive"><SecondaryButton text="Receive" /></Link>
                <Link to="/donate" style={{ marginRight: "20px" }}><PrimaryButton text="Donate" /></Link>
              </div>
            </div>
            <img style={{ marginTop: "10%" }} src={banner} alt="header image" />
          </div>
        </MediaQuery>
      </div>
      <div>
        <How2/>
        {/* <How /> */}
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
  marginTop: "15%"
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
  marginTop: "15%"
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
      <div className="container-fluid" style={who}>
        <div className="row" style={header} >
          <div className="col-xl-5 col-md-4 col-sm-12 mx-4 mt-3">
            <h2 align="left">Step 1</h2>
            <p align="left " >People in need sign up on our platform and we call each and every one of them by phone to verify that they are in need. We add them to the system and prioritize them by how much they've been donated to and how recently they've been donated to.</p>

          </div>
          <div className="col-xl-5 col-md-4 col-sm-12 mx-4 mt-3">
            <h2 align="left">Step 2</h2>
            <p align="left">When you donate, our system selects the highest priority recipient. We securely port your credit card data and the recipient we selected directly into Door Dash using end-to-end encryption. The recipient gets 100% of the funds you donated and can enjoy a meal in the safety of their own home!</p>

          </div>
        </div>
      </div>
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

    </div>

  )
}

function How2() {
  return (
    <div style={{background: "#fff"}}>
    <div className="container-fluid" style={{paddingLeft: "10%", paddingRight: "10%", textAlign: "center", marginTop: "10%"}}>
      <h2 style={{marginBottom: "50px", paddingTop: "50px"}}>Helping is easy</h2>
      <div className="row" style={{display: "flex"}}>
        <div className="col-md-4 " style={how2col}>
          <img src={mun} style={money2}></img>
          <a style={cap2}>Choose to donate either 25, 50, 100, or 200 dollars.</a>
        </div>
        <div className="col-md-4 " style={how2col}>
          <img src={people} style={peep2}></img>
          <a style={cap2}>We pair you with someone in need.</a>
          <br></br>
            <OverlayTrigger
              placement={'bottom'}
              overlay={
              <Tooltip>
                100% of your money becomes DoorDash credits for a pre-vetted recipient in our system. We speak to everyone who signs up to ensure donor money goes to the right plcaes.
              </Tooltip>
              }>
              <h1 style={whyTheseAmountsText}>Where does the money go?</h1>

            </OverlayTrigger>
        </div>
        <div className="col-md-4 " style={how2col}>
          <img src={food} style={money2}></img>
          <a style={cap2}>They get a DoorDash gift card so they can enjoy a meal at home!</a>
        </div>
      </div>
    </div>
    <div className="container-fluid" style={who}>
      <div className="row" style={{display: "flex", justifyContent: "center"}} >
        <div className="col-xl-5 col-md-4 col-sm-12 px-50">
          <h2 align="left">Step 1</h2>
          <p align="left " >People in need sign up on our platform and we call each and every one of them by phone to verify that they are in need. We add them to the system and prioritize them by how much they've been donated to and how recently they've been donated to.</p>

        </div>
        <div className="col-xl-5 col-md-4 col-sm-12 px-50">
          <h2 align="left">Step 2</h2>
          <p align="left">When you donate, our system selects the highest priority recipient. We securely port your credit card data and the recipient we selected directly into Door Dash using end-to-end encryption. The recipient gets 100% of the funds you donated and can enjoy a meal in the safety of their own home!</p>

        </div>
      </div>
    </div>
    </div>
  )
}

const how2col = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

}

const cap2 = {
  fontWeight: "bold",
  width: "200px",
  fontSize: "17px",
  textAlign: "center",
  marginTop: "10px"
}
const money2 = {
  width: "30%",
  height: "auto",
  marginTop: "0%",
}
const peep2 = {
  width: "50%",
  height: "auto",
  marginTop: ".5%",
}
export default HomePage;
