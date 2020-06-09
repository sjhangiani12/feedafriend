import React, { useState, useEffect } from 'react';
import Profile from '../components/Profile.js';
import { PrimaryButton, SecondaryButton } from '../shared/ButtonComponents.js';
import BounceLoader from "react-spinners/BounceLoader";
import { createGenerateClassName } from '@material-ui/core';
import { ButtonToolbar, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

function RecipientPicker(props) {

    useEffect(() => {
        getNextRecipient();
    }, []);

    const [recipientJSON, setRecipientJSON] = useState(null);

    function getNextRecipient() {
        setRecipientJSON(null);
        fetch("https://care37-cors-anywhere.herokuapp.com/https://care37.herokuapp.com/getNextRecipient", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(
            function (response) {
                if (response.status == 200) {
                    response.json().then(json => {
                        console.log(json);
                        setRecipientJSON(json);
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
    function reportProfile() {
        // setRecipientJSON(null);
        const data = {
            recipient_email: recipientJSON.email
        }
        fetch("https://care37-cors-anywhere.herokuapp.com/https://care37.herokuapp.com/report", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(
            function (response) {
                if (response.status == 200) {
                    response.json().then(json => {
                        console.log(json);
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
        getNextRecipient()
    }

    function recipientSelected() {
        props.setRecipientEmail(recipientJSON.email);
        props.setRecipientFirstName(recipientJSON.first_name);
        props.setRecipientLastName(recipientJSON.last_name);
    }

    const root = {
        position: "relative",
        marginTop: "120px",
        // left: "20%",
        // width: "70%"
        marginLeft: "40px",
        marginRight: "40px",
    }

    const header = {
        display: "flex",
        flexWrap: "wrap",
        marginLeft: "5%",
        marginRight: "5%",
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
        <>
            {recipientJSON == null && (
                <div style={loadingContainer}>
                    <h1>One moment, we are loading the next profile.</h1>
                    <div style={loader}>
                        <BounceLoader color={"#999999"} size={100} />
                    </div>
                </div>
            )}
            {recipientJSON !== null && (
                <div style={{height: "100vh"}}>
                <Profile
                    first_name={recipientJSON.first_name}
                    last_name={recipientJSON.last_name}
                    prof_pic={recipientJSON.prof_pic}
                    social_media_links={recipientJSON.social_media_links}
                    bio={recipientJSON.bio}
                    uploads={recipientJSON.uploads}
                    uploadText ="Documents"
                    private="false"
                />
                <div style={{ marginTop: "5%", marginLeft: "10%" }} >

                        <h3  onClick={(e) => { if (window.confirm('Click confirm this profile is inappropriate, contains sensitive information, or if this person is not in need.')) reportProfile(e) }} style={{fontSize: "18px", marginLeft: "2%", color: "blue"}}>Report This Profile</h3>

                        <div className="col-md-7 col-sm-12" >
                            <PrimaryButton text="Donate To" onClick={() => recipientSelected()} />
                            <SecondaryButton text="Next Profile" onClick={() => getNextRecipient()} />
                        </div>
                </div>

                </div>
            )}
        </>
    );
}


export default RecipientPicker;
