import React, { useState, useEffect } from 'react';
import BounceLoader from "react-spinners/BounceLoader";
import { withRouter } from "react-router-dom";


function ConfirmationPage(props) {

    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);

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

    const data = {
        sender_first_name: props.location.state.formVals.firstName,
        sender_last_name: props.location.state.formVals.lastName,
        sender_email: props.location.state.formVals.email,
        sender_address: props.location.state.formVals.address,
        city: props.location.state.formVals.city,
        state: props.location.state.formVals.state,
        zipcode: props.location.state.formVals.zipcode,
        cardholder_name: props.location.state.formVals.first_name + " " + props.location.state.formVals.last_name,
        card_number: props.card_number,
        exp_date: props.exp_date,
        cvc: props.cvc,
        dollars: props.amount,
    }

    // async function makePaymentCall() {
    //     const response = await fetch('https://care37-cors-anywhere.herokuapp.com/https://care37.herokuapp.com/makeDonation',
    //         { method: 'POST', body: JSON.stringify(data), headers: { "Content-Type": "application/json" } }
    //     );
    //     const dat = await response.json()
    //     console.log(dat)
    // }

    const makePaymentCall = async () => {
        console.log(props);

        const data = {
            sender_first_name: props.location.state.formVals.firstName,
            sender_last_name: props.location.state.formVals.lastName,
            sender_email: props.location.state.formVals.email,
            sender_address: props.location.state.formVals.address,
            city: props.location.state.formVals.city,
            state: props.location.state.formVals.state,
            zipcode: props.location.state.formVals.zipcode,
            cardholder_name: props.location.state.formVals.first_name + " " + props.location.state.formVals.last_name,
            card_number: props.card_number,
            exp_date: props.exp_date,
            cvc: props.cvc,
            dollars: props.amount,
        }

        fetch('https://care37-cors-anywhere.herokuapp.com/https://care37.herokuapp.com/makeDonation', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)
        }).then(res => console.log(res))
            .then(
                (result) => {
                    setIsLoaded(true);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
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
                There was an error - your card wasn't charged but you'll have to try again.
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