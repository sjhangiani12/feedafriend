import React from "react";
import ReactDOM from "react-dom";
import {Redirect} from 'react-router-dom';
import { useAuth0 } from "../contexts/react-auth0-spa";

function RecipientPortal () {
  const { isAuthenticated } = useAuth0();

  console.log(isAuthenticated);
  return (
    <div style={{"marginTop" : "100px"}}>
      { isAuthenticated && (
          <div>
            <h1>Thank you for signing up to be a recipient!</h1>
            <h1>Your imformation has been added to our database and you will recieve an email when have been matched.</h1>
          </div>
        )
      }

      { !isAuthenticated &&
          (<Redirect  to="/" />)
      }
    </div>
  );

}

export default RecipientPortal;
