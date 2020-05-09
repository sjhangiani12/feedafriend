import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import GoogleLogin from 'react-google-login';
import RecipientForm from './RecipientInfo/RecipientForm';
import RecipientPortal from './RecipientPortal';
import Landing from '../components/RecipientInfo/Landing';
import Profile from './Profile';
import BounceLoader from "react-spinners/BounceLoader";

function ReceivePage(props) {

    // state is the user is new, if so display them the login page
    const [isNewUser, setIsNewUser] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [idtoken, setIdtoken] = useState("");
    const [profileData, setProfileData] = useState(null);

    function responseGoogle(response) {
        let token = response.getAuthResponse().id_token;
        setIdtoken(response.getAuthResponse().id_token);
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
                        if (data.user_exists) {
                            getProfile(token)
                        }
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

    function googleLoginFailed() {
        alert("Looks like the Google login failed. Please try again.")
    }

    function getProfile(token) {
        const data = {
            idtoken: token
        }

        fetch(`https://care37-cors-anywhere.herokuapp.com/https://care37.herokuapp.com/getRecipientProfile?idtoken=${encodeURIComponent(data.idtoken)}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(
            function (response) {
                if (response.status == 200) {
                    response.json().then(json => {
                        console.log(json);
                        setProfileData(json);
                    })
                } else if (response.status == 500) {
                    // there was an error with the DB
                    response.json().then(json => {
                        console.log(json);
                    })
                } else {
                    // unexpected error
                    console.log(response);
                }
            }
        )
    }
    const container = {
        marginBottom: "10%",
        display: "flex",
        justifyContent: "center",
    }

    const loadingContainer = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        marginRight: "5%",
        marginLeft: "5%"
    }

    const loader = {
        marginTop: "5%",
    }

    return (
        <div style={container}>
            {!isLoggedIn && (
                <Landing googleButton={
                    <div>
                        <GoogleLogin
                            clientId="289368909644-hnpai51fbs9fdbbod98omhdgc6e62olh.apps.googleusercontent.com"
                            buttonText="Login with Google"
                            onSuccess={responseGoogle}
                            onFailure={googleLoginFailed}
                            cookiePolicy={'single_host_origin'}
                        />
                    </div>
                } />
            )}

            {isLoggedIn && isNewUser && (
                <div>
                    <RecipientForm
                        isLoggedIn={isLoggedIn}
                        idtoken={idtoken}
                    />
                </div>
            )}

            {isLoggedIn && !isNewUser && (profileData === null) && (
                <div style={loadingContainer}>
                    <h1>One moment, we are loading your profile.</h1>
                    <div style={loader}>
                        <BounceLoader color={"#999999"} size={100} />
                    </div>
                </div>
            )}

            {isLoggedIn && !isNewUser && (profileData !== null) && (
                <Profile
                    first_name={profileData.first_name}
                    last_name={profileData.last_name}
                    prof_pic={profileData.prof_pic}
                    social_media_links={profileData.social_media_links}
                    bio={profileData.bio}
                    uploads={profileData.uploads}
                />
            )}
        </div>
    );
}

export default ReceivePage;