import React from "react";
import ReactDOM from "react-dom";
import {Redirect} from 'react-router-dom';
import { useAuth0 } from "../contexts/react-auth0-spa";

function RecipientPortal () {
  const { isAuthenticated } = useAuth0();

  return (
    <div style={header}>
      {isAuthenticated && (
          <div style={textHeader}>
            <h1 style={thankYou}>Thank you for signing up to be a recipient!</h1>
            <h4 style={infoBeenAdded}>Your information has been added to our database and you will 
                                      recieve an email when have been matched.</h4>
          </div>
        )
      }

        { !isAuthenticated &&
          (<Redirect  to="/" />)
      }
    </div>
  );

}

const thankYou = {
  flex: "1",
  textAlign: "center",
  paddingBottom: "20px",
}

const infoBeenAdded = {
  flex: "1",
  textAlign: "center",
  marginLeft: "200px",
  marginRight: "200px",
}

const textHeader = {
  marginTop : "100px",
  display: "flex",
  flexDirection: "column",
}

const header = {
  marginTop : "100px",
  display: "flex",
}

export default RecipientPortal;
