import React from 'react';
import ReactDOM from 'react-dom';

const sty = {
  position: "relative",
  marginTop: "100px",
  display: "flex",
  justifyContent: "center"
}

const ro = {
  display: "flex",
  justifyContent: "center"
}

function AboutPage () {

  return (
    <div className="container-fluid" style={sty}> 
      <div className="row" style = {ro}>
        <div className="col-sm-2">
          <div class="card border-0 shadow">
            <img src="https://source.unsplash.com/TMgQMXoglsM/500x350" class="card-img-top" alt="..." />
              <div class="card-body text-center">
                <h5 class="card-title mb-0">Robi</h5>
                <div class="card-text text-black-50">Web Developer</div>
              </div>
          </div>
        </div>
        <div className="col-sm-2">
          <div class="card border-0 shadow">
            <img src="https://source.unsplash.com/TMgQMXoglsM/500x350" class="card-img-top" alt="..." />
            <div class="card-body text-center">
              <h5 class="card-title mb-0">Saurav</h5>
              <div class="card-text text-black-50">Web Developer</div>
            </div>
          </div>
        </div>
        <div className=" col-sm-2">
          <div class="card border-0 shadow">
            <img src="https://source.unsplash.com/TMgQMXoglsM/500x350" class="card-img-top" alt="..." />
            <div class="card-body text-center">
              <h5 class="card-title mb-0">Nikhil</h5>
              <div class="card-text text-black-50">Web Developer</div>
            </div>
          </div>
        </div>
        <div className="col-sm-2">
          <div class="card border-0 shadow">
            <img src="https://source.unsplash.com/TMgQMXoglsM/500x350" class="card-img-top" alt="..." />
            <div class="card-body text-center">
              <h5 class="card-title mb-0">Sharan</h5>
              <div class="card-text text-black-50">Web Developer</div>
            </div>
          </div>
        </div>
        <div className="col-sm-2">
          <div class="card border-0 shadow">
            <img src="https://source.unsplash.com/TMgQMXoglsM/500x350" class="card-img-top" alt="..." />
            <div class="card-body text-center">
              <h5 class="card-title mb-0">John</h5>
              <div class="card-text text-black-50">Web Developer</div>
            </div>
          </div>
        </div>
      </div>
    </div>


      // <div style={sty}>
      //   {/* <about className="container"> */}

      //       {/* <div className="col-12 col-md-4 text-left text-md-center pb-4">
      //         <p className="font-weight-bold">Resources</p>
      //         <div className="d-flex flex-column">
      //           <a href="https://en.wikipedia.org/wiki/Regression_analysis">Regression</a>
      //           <a href="https://www.r-project.org/">R</a>
      //           <FootModal />
      //         </div>
      //       </div>
      //       <div className="col-12 col-md-4 text-left text-md-right pb-4">
      //         <p className="font-weight-bold">Contact</p>
      //         <div className="d-flex flex-column">
      //           <a href="https://www.linkedin.com/in/robert-lin1/">Robi Lin</a>
      //           <a href="https://www.linkedin.com/in/oscar-avatare/">Oscar Avatare</a>
      //           <a href="https://www.linkedin.com/in/jacquesdebar/">Jacques DeBar</a>
      //           <a href="https://www.linkedin.com/in/lucas-woo-84103966/">Lucas Woo</a>

      //         </div>
      //       </div>
      //     </div> */}
      //   {/* </about> */}
      // </div>
  );

}

export default AboutPage;
