import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useAuth0 } from "../contexts/react-auth0-spa";
import geo2zip from 'geo2zip';
import { PrimaryButton, SecondaryButton } from "../shared/ButtonComponents";
import MediaQuery from 'react-responsive'
import RecipientPortal from './RecipientPortal.js'

function ReceivePage() {
  const { loading, isAuthenticated, loginWithRedirect, logout, user, text } = useAuth0();

  const [userInfo, setUserInfo] = useState(user);

  useEffect(() => {
    createUser();
  }, [user])

  function handleLogInPressed() {
    loginWithRedirect({
      redirect_uri: 'http://localhost:3000/receive'
    });
    createUser();
  }

  const createUser = async () => {
    console.log(user);
    console.log(typeof user !== 'undefined');
    if (typeof user !== 'undefined') {
      let info = user["https://example.com/geoip"];
      let location = { latitude: info.latitude, longitude: info.longitude };
      const zip = await geo2zip(location);

      const data = {
        first_name: user.given_name,
        last_name: user.family_name,
        email: user.email,
        zip_code: zip[0]
      }

      fetch('https://care37-cors-anywhere.herokuapp.com/https://care37.herokuapp.com/createUser', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(data)
      }).then(
        function (response) {
          if (response.status == 200) {
            console.log(response);
            // created the user    
          } else if (response.status == 400) {
            console.log(response);
            // did not create the user
            // could be that the user already existed
          } else {
            console.log(response);
            // other error
          }
        }
      );
    }
  }

  return (
    <>
      <MediaQuery minDeviceWidth={700} >
        <div style={header} className="sm-mx-5 l-mx-0">

          {!loading && !isAuthenticated && (
            <div style={textHeader}>
              <h1 style={thankYou}>Sign up to be added to our system!</h1>
              <h4 style={infoBeenAdded}>Once you create an account with us, you will be added to our donation queue and can expect a donation soon!</h4>
              <div style={last} >
                <PrimaryButton onClick={() => handleLogInPressed()} text="Log In" />
              </div>
            </div>
          )}

          {isAuthenticated &&
            <RecipientPortal />
          }
        </div>
      </MediaQuery>
      <MediaQuery maxDeviceWidth={699} >
        <div style={header} className="sm-mx-5 l-mx-0">
          <div className="row" style={mobileRow}>
            {!loading && !isAuthenticated && (
              <div style={textHeader}>
                <h1 style={thankYou}>Sign up to be added to our system!</h1>
                <h4 style={infoBeenAdded}>Once you create an account with us, you will be added to our donation queue and can expect a donation soon!</h4>
                <div style={last} >
                  <PrimaryButton onClick={() => loginWithRedirect({})} text="Log In" />
                </div>
              </div>
            )}

            {isAuthenticated &&
              <RecipientPortal />
            }
          </div>
        </div>
      </MediaQuery>
    </>


  );
}
const thankYou = {
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  paddingBottom: "20px",
}

const infoBeenAdded = {
  textAlign: "center",
  marginLeft: "10%",
  marginRight: "10%",
}

const textHeader = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center"
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

const loginButton = {
  marginTop: "100px",
}

const mobileRow = {
  position: "absolute",
  top: "15%",
  padding: "5%",
  tesstAlign: "center"
}
const signUpMessage = {
  flexBasis: "40%",
  padding: "20px",
}

const logoutButton = {
  flexBasis: "40%",
  width: "150px",
  height: "28px",
}

const loggedInView = {
  marginTop: "100px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}

const header = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh"
}

export default ReceivePage;
