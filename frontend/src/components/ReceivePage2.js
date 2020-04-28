import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import GoogleLogin from 'react-google-login';

function ReceivePage2() {

    // state is the user is new, if so display them the login page
    const [isNewUser, setIsNewUser] = useState(false);

    function responseGoogle(response) {
        console.log(response.getAuthResponse().id_token);
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
            function(res) {
                res.json().then(data => {
                    // sets if the user who logged in is new or not
                    setIsNewUser(data.user_exists);
                });
            }
        )
    }

    const container = {
        marginTop: "20%", 
        marginBottom: "10%", 
        display: "flex", 
        justifyContent: "center",
    }

    return (
        <div style={container}>
            <GoogleLogin
                clientId="289368909644-hnpai51fbs9fdbbod98omhdgc6e62olh.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    );
}

export default ReceivePage2;