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
const thankYou = {
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  paddingBottom: "20px",
}

class Q extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
    }
  }


  render() {
    let line = {
      borderLeft: "3px solid #1136FC",
      height: "100%",
      marginRight: "1%",
    }
    return (
      <div style={{ display: "flex", align: "center", alignItems: "center", width: "100%" }}>
        <div style={line} >
          <div style={{ display: "flex", alignItems: "center", width: "100%"}}>
            <span style={{ fontSize: "4em", marginLeft: "1%", color: "#1136FC", fontStyle: "bold", marginLeft: "5px", marginRight: "10px"}}>Q.  </span>
            <span align="left" style={{fontSize: "2.2vmax", width: "100%", marginTop: "5%"}}>{this.props.children}</span>
          </div>
        </div>
      </div>
    )
  }
}
class A extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
    }
  }

  render() {
    let line = {
      borderLeft: "3px solid #919191",
      height: "100%",
      marginRight: "1%"
    }
    return (
      <div style={{ display: "flex", align: "center", alignItems: "center" }}>
        <div style={line} >
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ fontSize: "4em", marginLeft: "1%", color: "#919191", fontStyle: "bold", marginLeft: "5px", marginRight: "10px" }}>A.  </span>
            <span style={{ fontSize: "2vmax", color: "#919191"}} align="left">{this.props.children}</span>
          </div>
        </div>
      </div>
    )
  }
}

function FAQ () {


  return (
    <div>
    <div style={{ marginTop: "120px", marginLeft: "5%", marginRight:" 5%"}}>
      < div className="row mx-5" style={{ alignItems: "center", justifyContent: "center" }} >
        <div style={{ marginBottom: "5%" }}>
          <h1 style={{textAlign: "center"}}>Frequently Asked Questions (FAQ)</h1>
        </div>
      </ div>
      < div className="row mx-5" style={{ alignItems: "center", justifyContent: "center"}} >
          <a href="#donors" style={{ whiteSpace: "nowrap", arginRight: "2%" }}>        
          <h2>
            For Donors
          </h2>
        </a>
          <a href="#recips" style={{ whiteSpace: "nowrap", marginLeft: "2%" }}>
          <h2>
            For Recipients
          </h2>
      </a>

      </div>
      < div className="row mx-5" style={{ alignItems: "center", justifyContent: "center" }} >

        <div className="col-12" style={{
          display: "flex", alignItems: "baseline", padding: "0"
        }}>
          <Q> Is this legit? </Q>
        </div>
        <div className="col-12" style={{ display: "flex", alignItems: "baseline", padding: "0" }}>
          <A> Yes! 100% of your donated funds become DoorDash gift cards for someone in need (we verify their situation by speaking to each and every person who signs up!)</A>
        </div>
      </div>
      <br></br>
      <br></br>
      <div className="row mx-5"  >
        <div className="col-12" style={{
          display: "flex", alignItems: "baseline", padding: "0"
        }}>
          <Q> How do you choose who gets the funds? </Q>
        </div>
        <div className="col-12" style={{ display: "flex", alignItems: "baseline", padding: "0" }}>
          <A> Our database orders recipients by how recently they've been donated to and how much money they've been donated. The recipient who has received the least gets the next donation that comes in. </A>
        </div>
      </div>

      < div id="donors" className="row mx-5" style={{ alignItems: "center", justifyContent: "left", marginTop: "5%" }} >
        <div  style={{ marginBottom: "2%" }}>
          <h2>For Donors</h2>
        </div>
      </ div>
      <div className="row mx-5"  >
        <div className="col-12" style={{
          display: "flex", alignItems: "baseline", padding: "0"
        }}>
          <Q> How can I trust my data is secure?</Q>
        </div>
        <div className="col-12" style={{ display: "flex", alignItems: "baseline", padding: "0" }}>
          <A> We use SSL and HTTPS for end-to-end encryption when handling your credit card information. We port your information directly into DoorDash so that we never have to store any of your data.</A>
        </div>
      </div>
      <br></br>
      <br></br>
      <div className="row mx-5"  >
        <div className="col-12" style={{
          display: "flex", alignItems: "baseline", padding: "0"
        }}>
          <Q> Who are the recipients?</Q>
        </div>
        <div className="col-12" style={{ display: "flex", alignItems: "baseline", padding: "0" }}>
          <A> Every person who signs up to be a care37 recipient gets screened. We call each and every person to make sure they are in need of your donations. 100% of donated funds becomes a DoorDash gift card so they can enjoy a meal in the safety of their own home.</A>
        </div>
      </div>
      <br></br>
      <br></br>
      <div className="row mx-5"  >
        <div className="col-12" style={{
          display: "flex", alignItems: "baseline", padding: "0"
        }}>
          <Q> Are donations tax deductible?</Q>
        </div>
        <div className="col-12" style={{ display: "flex", alignItems: "baseline", padding: "0" }}>
          <A> We are currently working to attain our 501c(3) non-profit status. That said, we do not want to take on any additional liability - therefore we do not recommend claiming your donation as a tax deduction.</A>
        </div>
      </div>

      <br></br>
      <br></br>
      <div className="row mx-5"  >
        <div className="col-12" style={{
          display: "flex", alignItems: "baseline", padding: "0"
        }}>
          <Q> Does a large donation get split among multiple recipients?</Q>
        </div>
        <div className="col-12" style={{ display: "flex", alignItems: "baseline", padding: "0" }}>
          <A> Because we don't store your credit card data or collect funds ourselves, we can't split up donations at this time. Any amount you donate is something that one person recieves!</A>
        </div>
      </div>

      < div id="recips" className="row mx-5" style={{ alignItems: "center", justifyContent: "left", marginTop: "5%" }} >
        <div style={{ marginBottom: "2%" }}>
          <h2>For Recipient</h2>
        </div>
      </ div>
      <div className="row mx-5"  >
        <div className="col-12" style={{
          display: "flex", alignItems: "baseline", padding: "0"
        }}>
          <Q> How can I be a recipient? </Q>
        </div>
        <div className="col-12" style={{ display: "flex", alignItems: "baseline", padding: "0" }}>
          <A> If you are under significant monetary stress due to the COVID-19 health crisis, you can sign up for care37 <Link to="/receive">here</Link>. We will contact you and verify your status, at which point you will be placed in a queue to receive donated DoorDash credits.</A>
        </div>
      </div>
        <br></br>
        <br></br>
        <div className="row mx-5"  >
          <div className="col-12" style={{
            display: "flex", alignItems: "baseline", padding: "0"
          }}>
            <Q> What will be asked of me? </Q>
          </div>
          <div className="col-12" style={{ display: "flex", alignItems: "baseline", padding: "0" }}>
            <A> In order to ensure that donated money has the highest impact, we ask questions about your employment status, health status, location, and dependency status. </A>
          </div>
        </div>
    </div>

  </div>

  );
}
export default FAQ;
