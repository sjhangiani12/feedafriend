import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  Link
} from 'react-router-dom';
import { PrimaryButton, SecondaryButton } from "../shared/ButtonComponents";
import Nav from './hamburger.js'
import { makeStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';

export function Banner(props) {

  const root = {
    height: "100%",
    backgroundColor: "rgba(17, 54, 252, .9)",
    boxShadow: "none",
    top: 'auto',
    top: 90, 
    marginBottom: "100px",
  }

  return (
    <div id="ban">
      <AppBar style={root} >
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
        <div className="row pt-5" style={{ justifyContent: "center", }}>
          <div style={{ backgroundColor: "rgba(200, 200, 200, 1)" }}>
            {props.children}
          </div>
        </div>
      </AppBar>
    </div>
  );
}

export function ImageBanner(props) {

  const root = {
    height: "100%",
    backgroundColor: "rgba(200, 200, 200, .9)",
    boxShadow: "none",
    marginBottom: "100px",
  }

  return (
    <div id="ban" >
      <AppBar style={root} >
        <div className="row pt-5" style={{ justifyContent: "center", }}>
          <div style={{ backgroundColor: "rgba(200, 200, 200, 1)" }}>
            {props.children}
          </div>
        </div>
      </AppBar>
    </div>
  );
}
