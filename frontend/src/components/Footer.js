import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
// import {FootModal, About, Built} from '../components/ExpModal.js';
import TC from "../static/TC.js";
import PP from "../static/PP.js";
//Render the footer of both Home and REsources page

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {

    const sty = {
      marginLeft: "-12px",
      marginRight: "-12px",
      backgroundolor: "#f1f1ff"
    }
    const root = {
        position: "relative",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        backgroundColor: "#333333",
        boxShadow: "none",
        color: "white",
        bottom: "0",
    }

    const phantom = {
        backgroundColor: this.props.isHome ? '#fff' : null,
        display: "block",
        padding: "5%",
        height: "5%",
        width: "100%",
      }
    

    return (
      <div>
        <div style={phantom} />
        <div style={root} positive="static">
          <section className=" pt-4" style={{ " background-color": "#f1f1ff" }}>
            <footer className="container">
              <div className="row pt-4">
                <div className="col-12 col-md-4 pb-4">
                  <p className="font-weight-bold">Project</p>
                  <div className="d-flex flex-column">
                    <a href="/terms"> Terms and Agreements</a>
                    <a href="/privacy"> Privacy Policy</a>
                    <a> All Rights Reserved, 2020</a>
                  </div>
                </div>
                <div className="col-12 col-md-4 pb-4">
                  <p className="font-weight-bold">Pages</p>
                  <div className="d-flex flex-column">
                    <a href="/"> Home</a>
                    <a href="/about_us"> About</a>
                    <a href="/faq"> FAQ</a>
                    <a href="/donate">Donate</a>

                  </div>
                </div>
                {/* <div className="col-12 col-md-4 text-left text-md-center pb-4">

                </div> */}
                <div className="col-12 col-md-4 text-left text-md-right pb-4">
                  <p className="font-weight-bold">Contact</p>
                  <div className="d-flex flex-column">
                    <a href="mailto: info@care37.org">info@care37.org</a>
                    <a href="https://www.patreon.com/care37">Support Us!</a>

                  </div>
                </div>
              </div>
            </footer>
          </section>

        </div>
      </div>
    );
    }
  }
export default Footer;
