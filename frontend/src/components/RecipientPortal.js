import React from "react";
import ReactDOM from "react-dom";
import {Redirect} from 'react-router-dom';
import { useAuth0 } from "../contexts/react-auth0-spa";
import { PrimaryButton, SecondaryButton } from "../shared/ButtonComponents";

function RecipientPortal () {
  const { loading, isAuthenticated, loginWithRedirect, logout, user, text  } = useAuth0();

  return (
    <div style={header}>
      {isAuthenticated && (
          <div style={textHeader}>
            <h1 style={thankYou}>Thank you for signing up to be a recipient!</h1>
            <h4 style={infoBeenAdded}>Your information has been added to our database and you will 
                                      recieve an email when have been matched.</h4>
          <div style={last} >
            <SecondaryButton onClick={() => logout({})} text="Log out" />
          </div>
          </div>
          
        )
      }

        { !isAuthenticated &&
          (<Redirect  to="/" />)
      }
    </div>
  );

}

const last = {
  "color": "black",
  "font-family": "sans-serif",
  "text-decoration": "none",
  "&:hover": {
    textDecoration: "underline"
  },
  display: "flex",
  flexDirection: "column",
  width: "100px",
  marginTop: "5%"
}

const thankYou = {
  textAlign: "center",
  paddingBottom: "20px",
}

const infoBeenAdded = {
  textAlign: "center",
  marginLeft: "200px",
  marginRight: "200px",
}

const textHeader = {
  marginTop : "100px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center"

}

const header = {
  marginTop : "100px",
  display: "flex",
  justifyContent: "center",
  height: "100vh"

}

export default RecipientPortal;
