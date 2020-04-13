import React from 'react';
import ReactDOM from 'react-dom';
import john from "../static/john.jpg";
import nikhil from "../static/nikhil.jpg";
import saurav from "../static/saurav.jpg";
import sharan from "../static/sharan.jpg";
import robi from "../static/robi.jpg";


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
  marginTop: "75px"
}

class Team extends React.Component {
  render() {
    return (
      <div className="container-fluid" style={sty} >
        <div className="row" style={ro}>
          <div className="col-xl-3 col-md-4 mb-4 mx-xl-2 mx-sm-4">
            <div class="card border-0 shadow">
              <img src={robi} class="card-img-top" alt="..." />
              <div class="card-body text-center">
                <h5 class="card-title mb-0">Robi</h5>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-4 mb-4 mx-xl-2 mx-sm-4">
            <div class="card border-0 shadow">
              <img src={saurav} class="card-img-top" alt="..." />
              <div class="card-body text-center">
                <h5 class="card-title mb-0">Saurav</h5>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-4 mb-4 mx-xl-2 mx-sm-4">
            <div class="card border-0 shadow">
              <img src={nikhil} class="card-img-top" alt="..." />
              <div class="card-body text-center">
                <h5 class="card-title mb-0">Nikhil</h5>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-4 mb-4 mx-xl-2 mx-sm-4">
            <div class="card border-0 shadow">
              <img src={sharan} class="card-img-top" alt="..." />
              <div class="card-body text-center">
                <h5 class="card-title mb-0">Sharan</h5>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-4 mb-4 mx-xl-2 mx-sm-4">
            <div class="card border-0 shadow">
              <img src={john} class="card-img-top" alt="..." />
              <div class="card-body text-center">
                <h5 class="card-title mb-0">John</h5>
              </div>
            </div>
          </div>
        </div>
      </div >
    )
  }
}

class About extends React.Component {
render() {
  return (
    <div className="container-fluid" style={who}>
      <div className="row" style={ro} >
        <div className="col-xl-5 col-md-4 col-sm-12 mx-4">
            <h2 align = "center">Who we are</h2>
            <p align = "center ">Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna.</p>
          
        </div>
        <div className="col-xl-5 col-md-4 col-sm-12 mx-4">
          <h2 align = "center">Why we built this</h2>
          <p align = "center">Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna.</p>

        </div>
      </div>
    </div>
  )
}
}

function AboutPage () {

  return (
    <div>
      <Team />
      <About />
    </div>

  );

}

export default AboutPage;
