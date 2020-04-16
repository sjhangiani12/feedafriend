import React from 'react';
import ReactDOM from 'react-dom';
import john from "../static/john.jpg";
import nikhil from "../static/nikhil.jpg";
import saurav from "../static/saurav.jpg";
import sharan from "../static/sharan.jpg";
import robi from "../static/robi.jpg";
import MediaQuery from 'react-responsive'



const sty = {
  position: "relative",
  marginTop: "150px",
  display: "flex",
  justifyContent: "center"
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
        <MediaQuery minDeviceWidth={700} >

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
        </MediaQuery>
      </>

    )
  }
}

class About extends React.Component {
render() {
  return (
    <div className="container-fluid" style={who}>
      <div className="row" style={ro} >
        <div className="col-xl-5 col-md-4 col-sm-12 mx-4 mt-3">
            <h2 align = "left">Who we are</h2>
            <p align = "left ">We are five students from the University of Washington who love building things. We met through mutual friends and were lucky enough to find a common interest - designing and building useful stuff. We are studying engineering, computer science, informatics, and design.</p>
          
        </div>
        <div className="col-xl-5 col-md-4 col-sm-12 mx-4 mt-3">
          <h2 align = "left">Why we built this</h2>
          <p align = "left">We had been ideating on a number of project ideas for a few days when COVID-19 started to become a national emergency. We thought, 'What can we build that would help people?'. We started to think about what people need and how to get it to them. After a number of rounds of iteration, this idea emerged!</p>

        </div>
      </div>
    </div>
  )
}
}

function AboutPage () {

  return (
    <div>
      <About />

      <Team />
    </div>

  );

}

export default AboutPage;
