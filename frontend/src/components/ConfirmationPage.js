import React, { useState, useEffect } from 'react';
import BounceLoader from "react-spinners/BounceLoader";
import { withRouter, useHistory } from "react-router-dom";
import { PrimaryButton, SecondaryButton, TertiartyButton } from '../shared/ButtonComponents.js';


function ConfirmationPage(props) {

    const [isLoaded, setIsLoaded] = useState(false);
    const [responseCode, setResponseCode] = useState(0);
    const [error, setError] = useState(false);
    const history = useHistory();

    useEffect(() => {
        makePaymentCall();
    }, []);

    const header = {
        display: "flex",
        flex: "1",
        height: "50vh",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "15%",
    }

    const loader = {
        marginTop: "5%",
    }

    const loadingContainer = {
        height: "50vh",
        marginTop: "15%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    }

    const siteNotWorkingContainer = {
        height: "50vh",
        marginTop: "15%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    }

    const support = {
        color: "#828282",
        fontFamily: "sans-serif",
        marginTop: "5%",
    }

    const bigText = {
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: "48px",
        lineHeight: "70px",
        marginBottom: "2%",
    }

    const descriptionText = {
        fontFamily: "Abril Tilting",
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: "24px",
        lineHeight: "27px",
        color: "#828282",
        marginBottom: "3%",
    }


    const makePaymentCall = async () => {
        console.log(props);

        const data = {
            sender_first_name: props.formVals.firstName,
            sender_last_name: props.formVals.lastName,
            sender_email: props.formVals.email,
            sender_address: props.formVals.address1 + " " + props.formVals.address2,
            city: props.formVals.city,
            state: props.formVals.state,
            zipcode: props.formVals.zipcode,
            cardholder_name: props.formVals.first_name + " " + props.formVals.last_name,
            card_number: props.cardNum,
            exp_date: props.exp.trim(),
            cvc: props.cvc,
            dollars: props.amount,
        }

        fetch('https://care37-cors-anywhere.herokuapp.com/https://care37.herokuapp.com/makeDonation', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)
        }).then(
            function (response) {
                setIsLoaded(true);
                console.log(response);
                setResponseCode(response.status);
            }
        )
    }

    if (!isLoaded) {
        return (
            <div style={loadingContainer}>
                <h1>One moment please. We are processing your donation.</h1>
                <div style={loader}>
                    <BounceLoader color={"#999999"} size={100} />
                </div>
            </div>
        );
    } else if (responseCode == 400) {
        return (
            <div style={header}>
                <h1 style={bigText}>There was an error with your payment info</h1>
                <h1 style={descriptionText}>Please review your payment info and give it another go.</h1>
                <SecondaryButton text="Review payment info" onClick={props.handleBackToPaymentInfo} />
            </div>
        );
    } else if (responseCode == 200) {
        return (
            <div style={header}>
                <h1 style={bigText}>Thank you for your donation</h1>
                <h1 style={descriptionText}>You should receive an email shortly.</h1>
                <a style={support} href="https://www.patreon.com/care37">Click here to support us!</a>
            </div>
        );
    } else if (responseCode == 500) {
        return (
        <div style={siteNotWorkingContainer}>
            <h1 style={bigText}>Looks like our website isn't working right :( </h1>
            <h1 style={descriptionText}>Your card wasn't charged. Please retry your request and contact us if the issue persists.</h1>
            <SecondaryButton text="Retry" onClick={props.handleBackToPaymentInfo} />
        </div>
        );
    } else {
        return (
            <div style={siteNotWorkingContainer}>
                <h1 style={bigText}>Looks like our website encoutered an unexpected issue :( </h1>
                <h1 style={descriptionText}>Your card wasn't charged. Please retry your request and contact us if the issue persists.</h1>
                <h1></h1>
                <SecondaryButton text="Retry" onClick={props.handleBackToPaymentInfo} />
            </div>
        );
    }
}

export default ConfirmationPage;