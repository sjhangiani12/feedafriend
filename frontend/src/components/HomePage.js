import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { useAuth0 } from "../contexts/react-auth0-spa";

function HomePage () {

  const root = {
    position: "absolute",
    top: "25%",
    left: "20%",
    width: "60%"
  }

  const header = {
    display: "flex",
    justifyContent: "space-between"
  }

  const content = {
    marginTop: "50px"
  }

  return (
    <div style={root}>
      <div style={header}>
        <div>
          <h1>Care 37</h1>
          <p>Donate today!</p>
        </div>
        <img src="blank" alt="header image" />
      </div>

      <div style={content}>
        <Link to="/donate"><button>Donate</button></Link>
        <Link to="/receive"><button>Receive</button></Link>
        <br />
        <br />
        <Link to="/about_us">What's Care37?</Link>
      </div>
    </div>
  );

}

export default HomePage;
