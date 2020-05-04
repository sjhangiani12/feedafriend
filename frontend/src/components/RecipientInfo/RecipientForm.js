import React, { useState, useEffect } from 'react';
import UploadForm from './UploadForm.js';
import Landing from './Landing.js';
import { PrimaryButton, SecondaryButton } from "../../shared/ButtonComponents";

function RecipientForm(props) {

    const [step, setStep] = useState(0);
    const [completed, setCompleted] = useState(false);

    // const [firstName, setFirstName] = useState("");
    // const [lastName, setLastName] = useState("");
    // const [bio, setBio] = useState("");
    // const [socialMediaLinks, setSocialMediaLinks] = useState([]);
    // const [uploads, setUploads] = useState([]);
    // const [profPic, setProfPic] = useState("");
    // const [email, setEmail] = useState("");

    const formDefaultValues = {
        firstName: "",
        lastName: "",
        bio: "",
        fb: "",
        insta: "",
        twit: "",
        uploads: "",
        profPic: "",
        email: "",

    }
    const [formValues, setFormValues] = useState(formDefaultValues);
    const { firstName, lastName, bio, uploads, profPic, email, fb, insta, twit} = formValues

    function checkAllFieldsFilled() {
        if (formValues.firstName != "" &&
            formValues.lastName != "" &&
            formValues.email != "" &&
            formValues.bio != ""
        ) {
            return true;
        } else {
            return false;
        }
    }

    function createProfile() {
        const data = {
            idtoken: props.idtoken,
            first_name: firstName,
            last_name: lastName,
            zip_code: 12345,
            bio: bio,
            fb: fb,
            insta: insta,
            twit: twit,
            email: email,
            prof_pic: profPic, 
            uploads: uploads 
        }
        fetch('https://care37-cors-anywhere.herokuapp.com/https://care37.herokuapp.com/createProfile', {
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
                        console.log(res);
                    });
                } else if (res.status == 400) {
                    alert("error 400");
                } else {
                    alert("error not 400");
                }
            }
        )
    }

    function handleNext() {
        setStep(step+1);
    }
    
    function handleChange(e) {
        const target = e.target
        setFormValues(prevState => ({
            ...prevState,
            [target.name]: target.value
        }))
        console.log(formValues)
    }

    function handleFinish() {
        if (checkAllFieldsFilled()) {
            setCompleted(true);
            console.log(formValues)
        } else {
            alert("Please fill out all the fields.");
        }
    }

    const toRender = {
        0: <Step0 />,
        1: <Step1 handle={handleChange}/>,
        2: <Step2 handle={handleChange}/>,
        3: <Step3 handle={handleChange}/>,
        4: <Step4 handle={handleChange}/>,
        5: <Step5 handle={handleChange}/>,
        6: <Done onClick={handleFinish}/>
    }
    return (
        <>
            {step < 6 ?     <PrimaryButton onClick={() => handleNext()} text="Next"></PrimaryButton> : null }
        <div>
            {toRender[step]}
        </div>
        </>

    );

}

function Step0(props) {
    return (
        <>
            <h1>Welcome to your fucking doom</h1>
        </>
    )
}

function Step1(props) {
    return(
        <>
        <h1>Hi. What's your name?</h1>
            <input placeholder="First Name" name="firstName" onChange={(e) => props.handle(e)}></input>
            <input placeholder="Last Name" name="lastName" onChange={(e) => props.handle(e)}></input>

        </>
    )
}

function Step2(props) {
    return (
        <>
            <h1>Tell us what you're going through.</h1>
            <input placeholder="Your Story" name="bio" onChange={(e) => props.handle(e)}></input>

        </>
    )
}

function Step3(props) {
    return (
        <>
            <h1>Where can people find you?</h1>
            <input placeholder="@yourFB" name="fb" onChange={(e) => props.handle(e)}></input>
            <input placeholder="@yourInstagram" name="insta" onChange={(e) => props.handle(e)}></input>
            <input placeholder="@yourTwitter" name="twit" onChange={(e) => props.handle(e)}></input>

        </>
    )
}

function Step4(props) {
    return (
        <>
            <h1>What is your email?</h1>
            <input placeholder="ohHey@HowYou.doin" name="email" onChange={(e) => props.handle(e)}></input>

        </>
    )
}


function Step5(props) {
    return (
        <>
            <h1>Step5</h1>
        </>
    )
}


function Done(props) {
    return (
        <>
            <h1>Hell yeah bitch!</h1>
            <PrimaryButton onClick={() => props.onClick()}></PrimaryButton>
        </>
    )
}
export default RecipientForm;