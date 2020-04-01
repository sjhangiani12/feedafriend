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
          <p>Hello</p>
        )
      }

      { !isAuthenticated &&
          (<Redirect  to="/" />)
      }
    </div>
  );

}

export default RecipientPortal;
