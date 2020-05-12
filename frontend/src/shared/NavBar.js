import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  Link
} from 'react-router-dom';
import { PrimaryButton, SecondaryButton } from "../shared/ButtonComponents";
import Nav from './hamburger.js'
import { makeStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import logo from "../static/FAF.svg";
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
    <>
    <div id ="barNav">
        {/* <MediaQuery minDeviceWidth={"60em"} > */}
          <AppBar className={classes.root} positive="static" style={{ "margin-bottom": "100px" }}>
          <div style={forLogo}>
            <NavItem underline="false"><Link to="/" ><img style={{width: "70%"}} src={logo} alt="logo" /></Link></NavItem>

          </div>
            {!isAuthenticated && <div style={{ position: "relative", display: "flex", justifyContent: "space-evenly", width: "40%", alignItems: "baseline", marginRight: "5%"}}>

            <Link style={links} to="/about_us"><NavItem >About</NavItem></Link>
            <Link style={links} to="/faq"><NavItem >FAQ</NavItem></Link>
              {/* <Link style={links} to="/receive"><SecondaryButton text="Receive" /></Link> */}
            <Link style={links} to="/receive"><NavItem blue="true">Receive a meal</NavItem></Link>
            <Link style={last} to="/donate"><NavItem underline="true" donate="true" blue="true">Donate</NavItem></Link></div>}
            {isAuthenticated && <div style={{ position: "relative", display: "flex", justifyContent: "space-evenly", width: "40%", alignItems: "baseline" }}>
            <Link style={links} to="/about_us"><NavItem >About</NavItem></Link>
            <Link style={links} to="/faq"><NavItem >FAQ</NavItem></Link>
            {/* <Link style={links} to="/receive"><SecondaryButton text="Receive" /></Link> */}
            <Link style={links} to="/receive"><NavItem blue="true">Receive a meal</NavItem></Link>
            <Link style={last} to="/donate"><NavItem underline="true" donate="true" blue="true">Donate</NavItem></Link></div>}
          </AppBar>

        {/* </MediaQuery> */}
    </div>

      {/* <MediaQuery maxDeviceWidth={"60em"} > */}
        <Nav />
        {/* <div style = {{position: "relative", display: "flex", justifyContent: "space-evenly", width: "100%", alignItems: "baseline"}}>
            <Link style={links} to="/about_us">About</Link>
            <Link style={links} to="/receive"><SecondaryButton text="Receive"/></Link>
            <Link style={last} to="/donate"><PrimaryButton text="Donate"/></Link>
          {isAuthenticated && <Link style={links} to="/receive">Logged In!</Link>}
          </div> */}

      {/* </MediaQuery> */}
    </>




  );
}

class NavItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
    }
  }

  handleHover() {
    this.setState({ hover: !this.state.hover });
  }


  render() {
    const styles = {
      container: {
        opacity: 0,
        animation: '1s appear forwards',
        animationDelay: this.props.delay,
        marginLeft: "10px",
        marginRight: "10px",
      },
      menuItem: {
        fontFamily: `'Open Sans', sans-serif`,
        whiteSpace: "nowrap",
        fontSize: '1.5em',
        width: "100%",
        cursor: 'pointer',
        color: this.state.hover ? 'black' : 'black',
        color: this.props.blue ? '#1136FC' : 'black',
        fontWeight: this.props.donate ? 'bold' : '',
        transition: 'color 0.2s ease-in-out',
        animation: '0.5s slideIn forwards',
        animationDelay: this.props.delay,

      },
      line: {
        display: this.state.hover ? 'block' : 'none',
        width: '100%',
        height: '1px',
        background: 'gray',
        margin: '0 auto',
        animation: '0.5s shrink forwards',
        animationDelay: this.props.delay,

      }
    }
    return (
      <div style={styles.container}>
        <div
          style={styles.menuItem}
          onMouseEnter={() => { this.handleHover(); }}
          onMouseLeave={() => { this.handleHover(); }}
          onClick={this.props.onClick}
        >
          {this.props.children}
        </div>
        {(this.props.underline != "false") ? (
          <div style={styles.line} />
        ) : (
            <></>
          )}
      </div>
    )
  }
}

export default NavBar;
