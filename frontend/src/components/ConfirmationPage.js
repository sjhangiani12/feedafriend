import React, { useState } from 'react';
import BounceLoader from "react-spinners/BounceLoader";
import { css } from "@emotion/core";


function ConfirmationPage(props) {

    const [loading, setLoading] = useState(true);

    const header = {
        display: "flex",
        flex: "1",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "15%",
        alignItems: "flex-start"
    }

    const loader = {
        marginTop: "5%",
    }

    const loadingContainer = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
    }

    const makePaymentCall = async () => {

        const data = {
            sender_first_name: props.first_name,
            sender_last_name: props.last_name,
            sender_email: props.email,
            sender_address: props.address,
            city: props.city,
            state: props.state,
            zipcode: props.zipcode,
            cardholder_name: props.first_name + " " + props.last_name,
            card_number: props.card_number,
            exp_date: props.exp_date,
            cvc: props.cvc,
            dollars: props.amount,
        }

        const response = await fetch('https://care37-cors-anywhere.herokuapp.com/https://care37.herokuapp.com/makeDonation', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)
        });
    }

    return (
        <div style={header}>
            {loading ? (
                <div style={loadingContainer}>
                    <h1>One moment please. We are processing your donation.</h1>
                    <div style={loader}>
                        <BounceLoader color={"#999999"} size={100}/>
                    </div>
                </div>
            ) : (
                    <div>
                        <h1 style={{ marginTop: "10%", }}>Thank you for making the world better.</h1>
                    </div>
                )}
        </div>
    );
}

export default ConfirmationPage;