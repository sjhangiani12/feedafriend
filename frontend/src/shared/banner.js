import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  Link
} from 'react-router-dom';
import { PrimaryButton, SecondaryButton } from "../shared/ButtonComponents";
import Nav from './hamburger.js'
import { makeStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import logo from "../static/CARE_37.svg";
import { useAuth0 } from "../contexts/react-auth0-spa";
import MediaQuery from 'react-responsive'

import PropTypes from 'prop-types';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
    backgroundColor: "#1136FC",
    boxShadow: "none",
    top: 'auto',
    opacity: 0.9,
    top: 90,
  }
}));


function Banner(props) {
  const classes = useStyles();
  const { isAuthenticated } = useAuth0();

  return (
    <div id="ban">
      <AppBar className={classes.root} style={{ "margin-bottom": "100px" }}>
        <div className="row pt-5" style={{ justifyContent: "center", display: "flex", marginTop: "10%" }}>
          <div className="col-lg-5 col-xs-12" style={{ justifyContent: "center", textAlign: "center" }}>
            <h2>Sorry, we're closed right now!</h2>
          </div>
          <div className="col-lg-5 col-xs-12" style={{ justifyContent: "center", textAlign: "center" }}>
            <p style={{ fontSize: "1.3rem" }}>
              We are gathering more recipients so we have paused donations at this time.
                </p>
          </div>
        </div>
        <div className="row pt-5" style={{ justifyContent: "center" }}>
          {props.children}
        </div>
      </AppBar>
    </div>




  );
}

export default Banner;
