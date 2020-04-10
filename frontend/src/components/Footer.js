import React from 'react';
// import {FootModal, About, Built} from '../components/ExpModal.js';

//Render the footer of both Home and REsources page

const sty = {
  marginLeft: "-12px",
  marginRight: "-12px"
}

export default () => (
  <section className="footer mt-4" style = {{sty}}>
    <footer className="container">
      <div className="row pt-4">
        <div className="col-12 col-md-4 pb-4">
          <p className="font-weight-bold">Project</p>
          <div className="d-flex flex-column">
            {/* <About />
            <Built /> */}
          </div>
        </div>
        <div className="col-12 col-md-4 text-left text-md-center pb-4">
          <p className="font-weight-bold">Resources</p>
          <div className="d-flex flex-column">
            <a href="https://en.wikipedia.org/wiki/Regression_analysis">Regression</a>
            <a href="https://www.r-project.org/">R</a>
            {/* <FootModal /> */}
          </div>
        </div>
        <div className="col-12 col-md-4 text-left text-md-right pb-4">
          <p className="font-weight-bold">Contact</p>
          <div className="d-flex flex-column">
            <a href="https://www.linkedin.com/in/robert-lin1/">Robi Lin</a>
            <a href="https://www.linkedin.com/in/oscar-avatare/">Oscar Avatare</a>
            <a href="https://www.linkedin.com/in/jacquesdebar/">Jacques DeBar</a>
            <a href="https://www.linkedin.com/in/lucas-woo-84103966/">Lucas Woo</a>

          </div>
        </div>
      </div>
    </footer>
  </section>
);
