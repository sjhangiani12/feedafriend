import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  Link
} from 'react-router-dom';

import { PrimaryButton, SecondaryButton } from "../shared/ButtonComponents";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import logo from "../static/CARE_37.svg";
import { useAuth0 } from "../contexts/react-auth0-spa";
import MediaQuery from 'react-responsive'

const links = {
  "color" : "black",
  "font-family" : "sans-serif",
  "text-decoration"  : "none",
  "&:hover": {
      textDecoration: "underline"
  },
  "position": "relative",
}
const last = {
  "color": "black",
  "font-family": "sans-serif",
  "text-decoration": "none",
  "&:hover": {
    textDecoration: "underline"
  },
  "position": "relative",
}

const forLogo = {
  "color": "black",
  "font-family": "sans-serif",
  "text-decoration": "none",

  "&:hover": {
    textDecoration: "underline"
  },
  "position": "relative",
  "left": "10%"

}

const useStyles = makeStyles(() => ({
  root: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems:  "center",
      height: "90px",
      backgroundColor: "#FFFFFF",
      boxShadow: "none",

  }
}));


function NavBar () {
  const classes = useStyles();
  const { isAuthenticated } = useAuth0();

  return (
    <AppBar className={classes.root} positive="static" style={{"margin-bottom" : "100px"}}>
        <MediaQuery minDeviceWidth={700} >
          <Link style={forLogo} to="/" ><img src={logo} alt="logo" /></Link>
          <div style = {{position: "relative", display: "flex", justifyContent: "space-evenly", width: "30%", alignItems: "baseline"}}>
            <Link style={links} to="/about_us">About</Link>
            <Link style={links} to="/receive"><SecondaryButton text="Receive"/></Link>
            <Link style={last} to="/donate"><PrimaryButton text="Donate"/></Link>
            {isAuthenticated && <Link style={links} to="/recipient_portal">Your Portal</Link>}
          </div>
        </MediaQuery>
        <MediaQuery maxDeviceWidth={699} >
          <div style = {{position: "relative", display: "flex", justifyContent: "space-evenly", width: "100%", alignItems: "baseline"}}>
            <Link style={links} to="/about_us">About</Link>
            <Link style={links} to="/receive"><SecondaryButton text="Receive"/></Link>
            <Link style={last} to="/donate"><PrimaryButton text="Donate"/></Link>
            {isAuthenticated && <Link style={links} to="/recipient_portal">Your Portal</Link>}
          </div>
        </MediaQuery>


    </AppBar>
  );

}

export default NavBar;
