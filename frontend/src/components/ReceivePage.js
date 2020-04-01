import React from 'react';
import ReactDOM from 'react-dom';
import { useAuth0 } from "../contexts/react-auth0-spa";

function ReceivePage () {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div style={{"marginTop" : "100px"}}>
        {!isAuthenticated && (
         <button onClick={() => loginWithRedirect({})}>Log in</button>
       )}

       {isAuthenticated && <button onClick={() => logout()}>Log out</button>}
    </div>
  );

}

export default ReceivePage;
