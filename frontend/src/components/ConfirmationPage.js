import React, { useState, useEffect } from 'react';
import BounceLoader from "react-spinners/BounceLoader";
import { withRouter, useHistory } from "react-router-dom";
import { PrimaryButton, SecondaryButton, TertiartyButton } from '../shared/ButtonComponents.js';


function ConfirmationPage(props) {

    const [isLoaded, setIsLoaded] = useState(false);
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
        alignItems: "flex-start"
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

    const support = {
        color: "#828282",
        fontFamily: "sans-serif",
        marginTop: "5%",
    }

    const makePaymentCall = async () => {
        console.log(props);

        const data = {
            sender_first_name: props.location.state.formVals.firstName,
            sender_last_name: props.location.state.formVals.lastName,
            sender_email: props.location.state.formVals.email,
            sender_address: props.location.state.formVals.address1 + " " + props.location.state.formVals.address2,
            city: props.location.state.formVals.city,
            state: props.location.state.formVals.state,
            zipcode: props.location.state.formVals.zipcode,
            cardholder_name: props.location.state.formVals.first_name + " " + props.location.state.formVals.last_name,
            card_number: props.location.state.cardNum,
            exp_date: props.location.state.exp.trim(),
            cvc: props.location.state.cvc,
            dollars: props.location.state.amount,
        }

        fetch('https://care37-cors-anywhere.herokuapp.com/https://care37.herokuapp.com/makeDonation', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)
        }).then(res => setError(!res.ok))
            .then(
                (result) => {
                    setIsLoaded(true);
                    console.log("is there an error: " + result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                    console.log("look an error: " + error);
                }
            )
    }

    function handleBackToPaymentInfo() {
        history.push({
            pathname: "/donate",
            state: {
            }
        });

    }

    if (!isLoaded) {
        return (
            <div style={header}>
                <div style={loadingContainer}>
                    <h1>One moment please. We are processing your donation.</h1>
                    <div style={loader}>
                        <BounceLoader color={"#999999"} size={100} />
                    </div>
                </div>
            </div>
        );
    } else if (error) {
        return (
            <div style={header}>
                <h3>There was an error - your card wasn't charged. Please review your payment info and give it another go.</h3>
                <SecondaryButton text="Review payment info" onClick={() => handleBackToPaymentInfo()} />
            </div>
        );
    } else {
        return (
            <div style={loadingContainer}>
                <h1>Thank you for your donation.</h1>
                <a style={support} href="https://www.patreon.com/care37">Click here to support us!</a>
            </div>
        );
    }
}

export default withRouter(ConfirmationPage);