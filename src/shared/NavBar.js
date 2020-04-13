import React from 'react';
import ReactDOM from 'react-dom';
import {
  Link
} from 'react-router-dom';

import { makeStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import { useAuth0 } from "../contexts/react-auth0-spa";

const links = {
  "color" : "white",
  "font-family" : "sans-serif",
  "text-decoration"  : "none",
  "&:hover": {
      textDecoration: "underline"
  }
}

const useStyles = makeStyles(() => ({
  root: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems:  "center",
      height: "50px",
      backgroundColor: "#f39c12"
  }
}));


function NavBar () {
  const classes = useStyles();
  const { isAuthenticated } = useAuth0();

  return (
    <AppBar className={classes.root} positive="static" style={{"margin-bottom" : "100px"}}>
      <Link style={links} to="/" >Home</Link>
      <Link style={links} to="/donate">Donate</Link>
      <Link style={links} to="/receive">Receive</Link>
      <Link style={links} to="/about_us">About Us</Link>
      {isAuthenticated && <Link style={links} to="/recipient_portal">Your Portal</Link>}
    </AppBar>
  );

}

export default NavBar;
