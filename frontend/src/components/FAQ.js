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
      marginRight: "1%"
    }
    return (
      <div style={{ display: "flex", align: "center", alignItems: "center" }}>
        <div style={line} >
          <div style={{ display: "flex", alignItems: "baseline"}}>
            <span style={{ fontSize: "2.75em", marginLeft: "1%", color: "#1136FC", fontStyle: "bold", marginLeft: "5px", marginRight: "10px"}}>Q.  </span>
            <h2 align="left" style={{ whiteSpace: "nowrap" }}>{this.props.children}</h2>
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
            <span style={{ fontSize: "2.75em", marginLeft: "1%", color: "#919191", fontStyle: "bold", marginLeft: "5px", marginRight: "10px" }}>A.  </span>
            <span style={{fontSize: "1.7em"}} align="left">{this.props.children}</span>
          </div>
        </div>
      </div>
    )
  }
}

function FAQ () {
// tax bennies?
// who gets it and why?
// why does this exist?


  return (
    <div className="container-fluid" style={{marginTop: "15%"}}>
      <div className="row mx-5"  >
        <div className="col-12" style={{ display: "flex", alignItems: "baseline"}}>
        <Q> How can I benefit?</Q>
        </div>
        <div className="col-12" style={{ display: "flex", alignItems: "baseline" }}>
          <A> If you are under significant monetary stress due to the COVID-19 health crisis, you can sign up for care37 here. We will contact you and verify your status, at which point you will be placed in a queue to receive donated DoorDash credits.</A>


        </div>
      </div>

    </div>
  );
}
export default FAQ;
