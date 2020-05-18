import React from 'react';
import ReactDOM from 'react-dom';
import john from "../static/john.jpg";
import nikhil from "../static/nikhil.jpg";
import saurav from "../static/saurav.jpg";
import sharan from "../static/sharan.jpg";
import robi from "../static/robi.jpg";
import MediaQuery from 'react-responsive'
import forDonor from "../static/forDonator.svg"
import { Link } from 'react-router-dom';
import { PrimaryButton, SecondaryButton } from "../shared/ButtonComponents";

const sty = {
  position: "relative",
  marginTop: "5%",
  display: "flex",
  justifyContent: "center"
}

const ro = {
  display: "flex",
  justifyContent: "center",
  marginTop: "5%",
}

const who = {
  display: "flex",
  justifyContent: "center",
}

const prof = {
  width: "100 %",
  height: "40vh",
  objectFit: "cover"
}

const profMobile = {
  width: "100 %",
  height: "50vw",
  objectFit: "cover"
}



class Team extends React.Component {
  render() {
    return (
      <>
        {/* <MediaQuery minDeviceWidth={700} >

          <div className="container-fluid" style={sty} >

            <div className="row" style={ro}>
              <div className="col-xl-3 col-md-4 mb-4 mx-xl-2 mx-sm-4">
                <div class="card border-0 shadow">
                  <img src={robi} class="card-img-top" alt="..." style={prof} />
                  <div class="card-body text-center">
                    <h5 class="card-title mb-0">Robi Lin</h5>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-4 mb-4 mx-xl-2 mx-sm-4">
                <div class="card border-0 shadow">
                  <img src={saurav} class="card-img-top" alt="..." style={prof} />
                  <div class="card-body text-center">
                    <h5 class="card-title mb-0">Saurav Pahadia</h5>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-4 mb-4 mx-xl-2 mx-sm-4">
                <div class="card border-0 shadow">
                  <img src={nikhil} class="card-img-top" alt="..." style={prof} />
                  <div class="card-body text-center">
                    <h5 class="card-title mb-0">Nikhil Sharma</h5>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-4 mb-4 mx-xl-2 mx-sm-4">
                <div class="card border-0 shadow">
                  <img src={sharan} class="card-img-top" alt="..." style={prof} />
                  <div class="card-body text-center">
                    <h5 class="card-title mb-0">Sharan Jhangiani</h5>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-4 mb-4 mx-xl-2 mx-sm-4">
                <div class="card border-0 shadow">
                  <img src={john} class="card-img-top" alt="..." style={prof} />
                  <div class="card-body text-center">
                    <h5 class="card-title mb-0">John Kim</h5>
                  </div>
                </div>
              </div>
            </div>
          </div >
        </MediaQuery>
        <MediaQuery maxDeviceWidth={699} >
          <div className="container-fluid" style={sty} >
            <div className="row" style={ro}>
              <div className="col-xl-3 col-md-4 mb-4 mx-xl-2 mx-sm-4">
                <div class="card border-0 shadow">
                  <img src={robi} class="card-img-top" alt="..." style={profMobile} />
                  <div class="card-body text-center">
                    <h5 class="card-title mb-0">Robi Lin</h5>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-4 mb-4 mx-xl-2 mx-sm-4">
                <div class="card border-0 shadow">
                  <img src={saurav} class="card-img-top" alt="..." style={profMobile} />
                  <div class="card-body text-center">
                    <h5 class="card-title mb-0">Saurav Pahadia</h5>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-4 mb-4 mx-xl-2 mx-sm-4">
                <div class="card border-0 shadow">
                  <img src={nikhil} class="card-img-top" alt="..." style={profMobile} />
                  <div class="card-body text-center">
                    <h5 class="card-title mb-0">Nikhil Sharma</h5>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-4 mb-4 mx-xl-2 mx-sm-4">
                <div class="card border-0 shadow">
                  <img src={sharan} class="card-img-top" alt="..." style={profMobile} />
                  <div class="card-body text-center">
                    <h5 class="card-title mb-0">Sharan Jhangiani</h5>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-4 mb-4 mx-xl-2 mx-sm-4">
                <div class="card border-0 shadow">
                  <img src={john} class="card-img-top" alt="..." style={profMobile} />
                  <div class="card-body text-center">
                    <h5 class="card-title mb-0">John Kim</h5>
                  </div>
                </div>
              </div>
            </div>
          </div >
        </MediaQuery> */}
      </>

    )
  }
}

class About extends React.Component {
render() {
  return (
    <>
    <div className="container-fluid" style={who}>
      <div className="row" style={ro} >
        <div className="col-xl-5 col-md-4 col-sm-12 mx-4">
            <h2 align = "left">Who are we?</h2>
            {/* <p align = "left ">We are five students from the University of Washington who love building things. We met through mutual friends and were lucky enough to find a common interest - designing and building useful stuff. We are studying engineering, computer science, informatics, and design.</p> */}
            <p align="left ">We are a group of five engineers and developers from the Seattle area who love to eat. While complaining over Zoom about how we couldn't grab dinner together, we came up with the idea to bring meals to the people who need it most - Feed-A-Friend was born! </p>

        </div>
        <div className="col-xl-5 col-md-4 col-sm-12 mx-4 mt-3">
          <h2 align = "left">How does this work?</h2>
            <p align="left">Anyone can create a Feed-A-Friend profile. They simply tell their story, and we leave it up to donors to decide who receives their money! 100% of donated funds become credits for a meal delivery service like DoorDash.</p>

        </div>
      </div>
    </div>
    </>)
}
}


const header = {
  display: "flex",
  flexWrap: "wrap",
  marginLeft: "5%",
  marginRight: "5%",
}
const root = {
  position: "relative",
  marginTop: "120px",
  // left: "20%",
  // width: "70%"
  marginLeft: "40px",
  marginRight: "40px"
}



function AboutPage () {

  return (
    <div style={root}>
      <div className="container-fluid" >
        <div className="row flex-wrap" style={header}>
          <div className="col-md-7 col-sm-12" style={{marginTop: "5%"}} >
            {/* <p style={{ color: "#828282", fontFamily: "sans-serif", fontWeight: "bold" }}>WHAT WE DO</p> */}
            <h1 style={{ fontSize: "48px", margin: "0px" }}>Give the gift of a meal and support local business.</h1>
            <h3 style={{ color: "#828282", fontFamily: "sans-serif", marginRight: "10%", marginTop: "5%" }}>Feed-A-Friend is a platform that lets you help both the hungry and restaurants by donating credits to major food delivery services. Anyone can request credits and donors choose who gets their money!</h3>
          </div>
          <div className="col-md-5 col-sm-12 mt-5" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <img style={{ width: "120%" }} src={forDonor} alt="header image" />
          </div>
        </div>
      </div>
      <div style={{marginTop: "10%"}}>
        <About />
      </div>
      <div className="row flex-wrap" style={{ justifyContent: "center", align: "center", marginTop: "7%"}}>
        <a href="/FAQ">Learn More</a>
      </div>
    </div>
  );

}

const bigText = {
  marginTop: "12px",
  fontSize: "3em",
  paddingTop: "12px",
}

export default AboutPage;
