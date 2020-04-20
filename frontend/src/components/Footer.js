import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
// import {FootModal, About, Built} from '../components/ExpModal.js';

//Render the footer of both Home and REsources page

const sty = {
  marginLeft: "-12px",
  marginRight: "-12px",
  backgroundolor: "#f1f1ff"
}
const useStyles = makeStyles(() => ({
  root: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#333333",
    boxShadow: "none",
    color: "white",
    bottom: "0",
  },

  phantom: {
    display: "block",
    padding: "5%",
    height: "5%",
    width: "100%",
  }
}));
function Footer() {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.phantom} />
      <div className={classes.root} positive="static">
        <section className=" pt-4" style={{ " background-color": "#f1f1ff" }}>
          <footer className="container">
            <div className="row pt-4">
              <div className="col-12 col-md-4 pb-4">
                <p className="font-weight-bold">Project</p>
                <div className="d-flex flex-column">
                  <a> All Rights Reserved, 2020</a>
                  {/* <About />
            <Built /> */}
                </div>
              </div>
              <div className="col-12 col-md-4 text-left text-md-center pb-4">

              </div>
              <div className="col-12 col-md-4 text-left text-md-right pb-4">
                <p className="font-weight-bold">Contact</p>
                <div className="d-flex flex-column">
                  <a href="/">info@care37.org</a>
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
export default Footer;
