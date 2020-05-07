import React, { useState, useEffect } from 'react';
import Profile from '../components/Profile.js';
import { PrimaryButton, SecondaryButton } from '../shared/ButtonComponents.js';

function RecipientPicker(props) {

    useEffect(() => {
        getNextRecipient();
    }, []);

    const [recipientJSON, setRecipientJSON] = useState(null);

    function getNextRecipient() {
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
    return (
        <>
            <div style={root}>
                <div className="container-fluid">
                    <div className="row flex-wrap" style={header}>
                        <div className="col-md-7 col-sm-12" style={{ marginTop: "5%", paddingRight: "2%" }} >
                            { console.log(recipientJSON) }
                            <Profile data={recipientJSON} />
                        </div>
                        <div className="col-md-7 col-sm-12" style={{ marginTop: "5%", paddingRight: "2%" }} >
                            <PrimaryButton text="Donate To" onClick={console.log("tits")} />
                            <SecondaryButton text="Next Profile" onClick={() => getNextRecipient()} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export default RecipientPicker;
