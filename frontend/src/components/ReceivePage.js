import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useAuth0 } from "../contexts/react-auth0-spa";
import geo2zip from 'geo2zip';

function ReceivePage () {
  const { loading, isAuthenticated, loginWithRedirect, logout, user, text } = useAuth0();

  const [userInfo, setUserInfo] = useState(user);

  useEffect(() => {
    createUser();
  }, [userInfo])

  const createUser = async () => {
    console.log("in create user");
    if (userInfo !== undefined) {
      let info = userInfo["https://example.com/geoip"];
      let location = {latitude: info.latitude, longitude: info.longitude};
      const zip = await geo2zip(location);

      const data = {
        first_name: userInfo.given_name,
        last_name: userInfo.family_name,
        email: userInfo.email,
        zip_code:  zip[0]
      }

      const response = await fetch('https://care37-cors-anywhere.herokuapp.com/https://care37.herokuapp.com/createUser', {
        method: "POST",
        mode : "no-cors",
        headers: {
          "Content-Type" : "application/json"
        },

        body: JSON.stringify (data)
      });

      const text = await response.text();
      await console.log(text);
    }
  }

  return (
    <div style={{"marginTop" : "100px"}}>
        {!loading && !isAuthenticated && (
         <button onClick={() => loginWithRedirect({})}>Log in</button>
       )}

       {isAuthenticated && <button onClick={() => logout()}>Log out</button>}
    </div>
  );

}

export default ReceivePage;
