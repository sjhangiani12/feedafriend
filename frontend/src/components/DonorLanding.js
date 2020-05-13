import React, { useState, useEffect } from 'react';
import forDonor from "../static/toDonate.svg"
import '../style.css';

function DonateLanding(props) {

  return (
    <>
      <div style={root}>
        <div className="container-fluid" style={{ marginBottom: "10%" }}>
          <div className="row flex-wrap" style={header}>
            <div className="col-md-7 col-sm-12" style={{ marginTop: "5%", paddingRight: "2%" }} >
              <h1 style={{ fontSize: "3em", margin: "0px" }}>Give the gift of a meal!</h1>

              {/* <p style={{ color: "#828282", fontFamily: "sans-serif", fontWeight: "bold" }}>WHAT WE DO</p> */}

              <h3 style={{ color: "#828282", fontFamily: "sans-serif", marginRight: "10%", marginTop: "5%" }}>You're about to see real people who need your help.</h3>
              <div style={{ marginTop: "5%" }}>
                {props.letsGo}
              </div>
              <img style={{ width: "50%", marginTop: "3%" }} src={forDonor} alt="header image" />


            </div>
            <div className="col-md-5 col-sm-12" style={{ marginTop: "5%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "left" }}>
              <h2 style={{ marginBottom: "50px", paddingTop: "50px" }}>It's easy as 1, 2, 3</h2>
              <div style={{ display: "flex", flexDirection: "column", marginBottom: "5%", align: "left" }}>
                <div style={{marginBottom: "3%"}}>
                  <Q number="1">Select a Recipient.</Q>
                </div>
                <div style={{ marginBottom: "3%" }}>
                  <Q number="2">Choose a donation amount.</Q>
                </div>
                <div style={{ marginBottom: "3%" }}>
                  <Q number="3">Smile because you're helping!</Q>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const root = {
  position: "relative",
  marginTop: "120px",
  height: "100vh",
  // left: "20%",
  // width: "70%"
  marginLeft: "5%",
  marginRight: "5%",
}
const header = {
  display: "flex",
  flexWrap: "wrap",
  marginLeft: "5%",
  marginRight: "5%",
}

// const how2col = {
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   marginBottom: "3%"

// }

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
      <div>
        <div style={{ display: "flex", align: "center", alignItems: "center", width: "100%" }}>
          <div style={line} >
            <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
              <span style={{ fontSize: "4em", marginLeft: "1%", color: "#1136FC", fontStyle: "bold", marginLeft: "5px", marginRight: "10px" }}>{this.props.number}. </span>
              <span align="left" style={{ fontSize: "2vmax", width: "100%", marginTop: "5%" }}>{this.props.children}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default DonateLanding;