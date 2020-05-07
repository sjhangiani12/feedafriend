import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import GoogleLogin from 'react-google-login';
import RecipientForm from './RecipientInfo/RecipientForm';
import RecipientPortal from './RecipientPortal';
import Landing from '../components/RecipientInfo/Landing';
import Profile from '../components/Profile.js';

function ReceivePage() {

    // state is the user is new, if so display them the login page
    const [isNewUser, setIsNewUser] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [idtoken, setIdtoken] = useState("");

    function responseGoogle(response) {
        setIdtoken(response.getAuthResponse().id_token);
        console.log("TOKEN = ", response.getAuthResponse().id_token)
        const data = {
            idtoken: response.getAuthResponse().id_token
        }
        // fetch('http://care37-cors-anywhere.herokuapp.com/http://lvh.me:5000/login', {
        fetch('https://care37-cors-anywhere.herokuapp.com/https://care37.herokuapp.com/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)
        }).then(
            function (res) {
                if (res.status == 200) {
                    res.json().then(data => {
                        // sets if the user who logged in is new or not
                        console.log(data.user_exists);
                        setIsNewUser(!data.user_exists);
                        setIsLoggedIn(true);
                    });
                } else if (res.status == 400) {
                    alert("The server was unable to authenticate you");
                } else {
                    alert("The server was unable to authenticate you");
                }
            }
        )
    }

    const container = {
        marginBottom: "10%",
        display: "flex",
        justifyContent: "center",
    }
    // props:
    // firstName
    // lastName
    // profilePic
    // fb
    // insta
    // twti
    // uploadURLs


    return (
        <div style={container}>
            {!isLoggedIn && (
                // <Profile idToken="eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc0YmQ4NmZjNjFlNGM2Y2I0NTAxMjZmZjRlMzhiMDY5YjhmOGYzNWMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMjg5MzY4OTA5NjQ0LWhucGFpNTFmYnM5ZmRiYm9kOThvbWhkZ2M2ZTYyb2xoLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMjg5MzY4OTA5NjQ0LWhucGFpNTFmYnM5ZmRiYm9kOThvbWhkZ2M2ZTYyb2xoLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTAyMTEyODg2OTc0NDg5ODg3NTIzIiwiaGQiOiJ1dy5lZHUiLCJlbWFpbCI6InJsaW4yMEB1dy5lZHUiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IkFTNWh1bDh2bXR0WUhlNDdSN2l2UUEiLCJuYW1lIjoiUm9iZXJ0IFNhbXVlbCBLZWFvYWt1YSBMaW4iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDUuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy1xY0drWTlNWlU5VS9BQUFBQUFBQUFBSS9BQUFBQUFBQUFBQS9BQUtXSkpOU3FPMlhCcUVMYmNibUpGYTlFMk9UdWthUEZBL3M5Ni1jL3Bob3RvLmpwZyIsImdpdmVuX25hbWUiOiJSb2JlcnQgU2FtdWVsIEtlYW9ha3VhIiwiZmFtaWx5X25hbWUiOiJMaW4iLCJsb2NhbGUiOiJlbiIsImlhdCI6MTU4ODgxODA1NSwiZXhwIjoxNTg4ODIxNjU1LCJqdGkiOiJlZDM3NjNhYzg4ODcwYjljZTA4MmMyZTc5YmUzM2UwNDhjNTA4MTMzIn0.iRKaiPRgkkHIOuDGIiBdNdEX9GWOa7jhbAbvTX_YgSUjy_HY6MhPDi0KScIwAFiQNTQpyPjveAeLKP33U54F3WTSPrywgQGrVa4hYy09aF50fRe9AWgcLZ0QNFWyM9pzroFmJH1tViLitXGxj_rwJrqPJbN9jsoGrcFO8vyDwTTlGnb2n3Kp7PUKJaMdaDwzY7HJafZEtWKfrTWaLX2uWkZNNHCXaw9SsfyX13vcwlwF1NxGHD9auDAQKO3nuWA-wdo9dKB8ZPk76z42-VVIncSjNrVMIPCjXbkxZoG7vcDTAtyiZK8FLJTC69wUogvPwZBgSBIZV3A3LjB0CR7T8w" />

                <Landing googleButton={
                    <GoogleLogin
                        clientId="289368909644-hnpai51fbs9fdbbod98omhdgc6e62olh.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                }
                /> 
            )}

            {isLoggedIn && isNewUser && (
                <div>
                    <RecipientForm
                        isLoggedIn={isLoggedIn}
                        idtoken={idtoken}
                        setIsLoggedIn={setIsLoggedIn}

                    />
                </div>
            )}

            {isLoggedIn && !isNewUser && (
                <div>
                    <Profile
                        idtoken={idtoken} 
                    />
                </div>
            )}
        </div>
    );
}

export default ReceivePage;