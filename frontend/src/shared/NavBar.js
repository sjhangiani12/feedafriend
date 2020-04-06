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

const links = {
  "color" : "black",
  "font-family" : "sans-serif",
  "text-decoration"  : "none",
  "marginLeft" : "18px",
  "margin-right" : "18px",
  "&:hover": {
      textDecoration: "underline"
  }
}

const useStyles = makeStyles(() => ({
  root: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems:  "center",
      height: "90px",
      backgroundColor: "#FFFFFF",
      boxShadow: "none"

  }
}));


function NavBar () {
  const classes = useStyles();
  const { isAuthenticated } = useAuth0();

  return (
    <AppBar className={classes.root} positive="static" style={{"margin-bottom" : "100px"}}>
          <Link style={links} to="/" ><img src={logo} alt="logo" /></Link>
          <div>
            <Link style={links} to="/about_us">About</Link>
            <Link style={links} to="/receive"><SecondaryButton text="Receive"/></Link>
            <Link style={links} to="/donate"><PrimaryButton text="Donate"/></Link>
            {isAuthenticated && <Link style={links} to="/recipient_portal">Your Portal</Link>}
          </div>


    </AppBar>
  );

}

export default NavBar;
