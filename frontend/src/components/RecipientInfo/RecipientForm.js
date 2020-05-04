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

    function handleBack() {
        setStep(step - 1);
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

    // const toRender = {
    //     0: <Step0 button={<PrimaryButton onClick={() => handleNext()} text="Next"></PrimaryButton>}/>,
    // 1: <Step1 handle={handleChange} button={<PrimaryButton onClick={() => handleNext()} text="Next"></PrimaryButton>} back={<SecondaryButton onClick={() => handleBack()} text="Back"></SecondaryButton>}/>,
    //     2: <Step2 handle={handleChange} button={<PrimaryButton onClick={() => handleNext()} text="Next"></PrimaryButton>} back={<SecondaryButton onClick={() => handleBack()} text="Back"></SecondaryButton>}/>,
    //     3: <Step3 handle={handleChange} button={<PrimaryButton onClick={() => handleNext()} text="Next"></PrimaryButton>} back={<SecondaryButton onClick={() => handleBack()} text="Back"></SecondaryButton>}/>,
    //     4: <UploadForm></UploadForm>,
    //     6: <Done onClick={handleFinish}/>
    // }

    const toRender = {
        0: <Step0 button = {< PrimaryButton onClick = {() => handleNext()} text = "Next" ></PrimaryButton >}/>,
        1: <GenericStep 
            title="Hi. What is your full name?"
            forms={<>
            <div style={{display: "flex", flexDirection: "column"}}>
                    <div > <input style={form} placeholder="First Name" name="firstName" onChange={(e) => props.handle(e)}></input></div>
                    <div > <input style={form} placeholder="Last Name" name="lastName" onChange={(e) => props.handle(e)}></input> </div>
            </div>
                </>}
            handle={handleChange} 
            button={<PrimaryButton onClick={() => handleNext()} text="Next"></PrimaryButton>} 
            back={<SecondaryButton onClick={() => handleBack()} text="Back"></SecondaryButton>}
            />,
        2: <GenericStep 
            title = "What are you going through?"
            subTitle={<h3 style={{ color: "#828282", fontFamily: "sans-serif", fontSize: "1em"}}>How has COVID-19 effected you and your loved ones? </h3>}
            forms={<>
                <div><input style={form} placeholder="Your Story" name="bio" onChange={(e) => props.handle(e)}></input></div>
                </>}
            handle={handleChange}
            button={<PrimaryButton onClick={() => handleNext()} text="Next"></PrimaryButton>}
            back={<SecondaryButton onClick={() => handleBack()} text="Back"></SecondaryButton>}
            />,
        3: <GenericStep 
            title= "Where can people find you?"
            forms={<>
                <div ><input style={form} placeholder="@yourFB" name="fb" onChange={(e) => props.handle(e)}></input></div>
                <div ><input style={form} placeholder="@yourInstagram" name="insta" onChange={(e) => props.handle(e)}></input></div>
                <div ><input style={form} placeholder="@yourTwitter" name="twit" onChange={(e) => props.handle(e)}></input></div>
                </>}
            handle={handleChange}
            button={<PrimaryButton onClick={() => handleNext()} text="Next"></PrimaryButton>}
            back={<SecondaryButton onClick={() => handleBack()} text="Back"></SecondaryButton>}
            />, 
        4: <UploadForm 
                button={<PrimaryButton onClick={() => handleNext()} text="Next"></PrimaryButton>}
                back={<SecondaryButton onClick={() => handleBack()} text="Back"></SecondaryButton>}>
            </UploadForm>,
        5: <Done onClick={handleFinish} />
    }
    const stepStyles = [
        { 
            title1: currentStepTitle,
            text1:  currentStepText,
            title2: stepTitle ,
            text2:  stepText ,
            title3: stepTitle ,
            text3: stepText ,
            title4:  stepTitle ,
            text4: stepText 
        },
        {
            title1: stepTitle ,
            text1: stepText ,
            title2:  currentStepTitle ,
            text2:  currentStepText ,
            title3: stepTitle ,
            text3: stepText,
            title4: stepTitle,
            text4: stepText 
        },
        {
            title1: stepTitle,
            text1: stepText ,
            title2: stepTitle ,
            text2: stepText,
            title3: currentStepTitle ,
            text3: currentStepText ,
            title4:  stepTitle ,
            text4: stepText 
        },
        {
            title1:  stepTitle ,
            text1:  stepText ,
            title2: stepTitle ,
            text2:  stepText ,
            title3: stepTitle ,
            text3:  stepText ,
            title4:  currentStepTitle ,
            text4:  currentStepText 
        }
    ]
    return (
        <>
            <div style={root}>
                <div className="container-fluid" style={{height: "80vh", width: "100vw", marginLeft: "5%"}}>
                    <div className="row flex-wrap" style={header1}>
                        {toRender[step]}
                        <div className="col-md-4 col-sm mr-0 ml-auto" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "left", width: "100%", marginTop: "5%", alignSelf: "flex-start" }}>
                            {step == 0 ? 
                            <>
                                    <div>
                                        <h1 style={currentStepTitle}>STEP 1</h1>
                                        <span style={currentStepText} align="left">Create your profile</span>
                                    </div>
                                    <div >
                                        <h1 style={currentStepTitle}>STEP 2</h1>
                                        <span style={currentStepText} align="left">Share your story</span>
                                    </div>
                                    <div >
                                        <h1 style={currentStepTitle}>STEP 3</h1>
                                        <span style={currentStepText} align="left">Enjoy a meal delivered to your door!</span>
                                    </div>
                            </> :
                            <>
                                <div>
                                    <h1 style={stepStyles[step-1].title1}>STEP 1</h1>
                                    <span style={stepStyles[step-1].text1} align="left">Name</span>
                                </div>
                                <div >
                                    <h1 style={stepStyles[step-1].title2}>STEP 2</h1>
                                    <span style={stepStyles[step-1].text2} align="left">Your Story</span>
                                </div>
                                <div >
                                    <h1 style={stepStyles[step-1].title3}>STEP 3</h1>
                                    <span style={stepStyles[step-1].text3} align="left">Social Media</span>
                                </div>
                                <div >
                                    <h1 style={stepStyles[step-1].title4}>STEP 3</h1>
                                    <span style={stepStyles[step-1].text4} align="left">Document Upload</span>
                                </div>
                            </>
                         }
                        </div>
                    </div>
                </div>
            </div>
        </>

    );

}
function GenericStep(props) {
    return (
        <div className="col-md-8 col-sm-12 " style={{ marginTop: "5%", justifyContent: "left" }} >
            {/* <p style={{ color: "#828282", fontFamily: "sans-serif", fontWeight: "bold" }}>WHAT WE DO</p> */}
            <h1 style={{ fontSize: "3em", margin: "0px"}}>{props.title}</h1>
            {props.subTitle}
            {props.forms}
            <br></br>
            {props.button}
            {props.back}

        </div>
    )
}

function Step0(props) {
    return (
        <div className="col-md-8 col-sm-12" style={{ marginTop: "5%" }} >
            {/* <p style={{ color: "#828282", fontFamily: "sans-serif", fontWeight: "bold" }}>WHAT WE DO</p> */}
            <h1 style={{ fontSize: "2.4em", margin: "0px", marginRight: "3%" }}>You’re under a lot of pressure right now.<br></br>People want to help.</h1>
            <h3 style={{ color: "#828282", fontFamily: "sans-serif", marginRight: "10%", marginTop: "5%" }}>Share your COVID-19 story with thousands who want to donate a meal to you and your family.</h3>
            <PrimaryButton text="THIS IS WHERE THE SIGNUP BUTTON SHOULD BE THAT LINKS TO GOOGLE"></PrimaryButton>
            {props.button}
        </div>
    )
}



function Done(props) {
    return (
        <div style={root}>
            <div className="container-fluid" >
                <div className="row flex-wrap" style={header}>
                    <div className="col-md-8 col-sm-12" style={{ marginTop: "5%" }} >
                        {/* <p style={{ color: "#828282", fontFamily: "sans-serif", fontWeight: "bold" }}>WHAT WE DO</p> */}
                        <h1 style={{ fontSize: "2.4em", margin: "0px", marginRight: "3%" }}>Hell yeah bitch!</h1>
                        <PrimaryButton text="eat a dick!" onClick={() => props.onClick()}></PrimaryButton>
                        <br></br>

                        {props.button}
                        {props.back}
                    </div>
                    <div className="col-md-4 col-sm-12 mt-5" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "left" }}>
                        <div>
                            <h1 style={currentStepTitle}>STEP 1</h1>
                            <span style={currentStepText} align="left">Create your profile</span>
                        </div>
                        <div >
                            <h1 style={currentStepTitle}>STEP 2</h1>
                            <span style={currentStepText} align="left">Share your story</span>
                        </div>
                        <div >
                            <h1 style={currentStepTitle}>STEP 3</h1>
                            <span style={currentStepText} align="left">Enjoy a meal delivered to your door!</span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
const form = {
    border: "none",
    width: "85%",
    fontSize: "2rem",
    borderBottom: "1px ",
    borderBottomStyle: "solid",
    backgroundColor: "#FFFBF4"

}
const header = {
    display: "flex",
    flexWrap: "wrap",
    marginLeft: "5%",
    marginRight: "5%",
}
const header1 = {
    display: "flex",
    flexWrap: "wrap",
    height: "100%",
    marginLeft: "5%",
    marginRight: "5%",
}
const root = {
    position: "relative",
    marginTop: "120px",
    height: "100vh",
    // left: "20%",
    // width: "70%"
    marginLeft: "40px",
    marginRight: "40px"
}

const stepText = {
    color: "#919191",
    fontSize: "2.2vmax",
    width: "100%"
}

const stepTitle = {
    marginTop: "5%",
    marginBottom: "0px",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "18px",
    color: "#828282",
}

const currentStepTitle = {
    marginTop: "5%",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "18px",
}

const currentStepText = {
    fontSize: "2.2vmax",
    width: "100%"
}
// function Step1(props) {
//     return (

//         <div style={root}>
//             <div className="container-fluid" >
//                 <div className="row flex-wrap" style={header}>
//                     <div className="col-md-8 col-sm-12" style={{ marginTop: "5%" }} >
//                         {/* <p style={{ color: "#828282", fontFamily: "sans-serif", fontWeight: "bold" }}>WHAT WE DO</p> */}
//                         <h1 style={{ fontSize: "2.4em", margin: "0px", marginRight: "3%" }}>Hi. What's your name?</h1>
//                         <input placeholder="First Name" name="firstName" onChange={(e) => props.handle(e)}></input>
//                         <input placeholder="Last Name" name="lastName" onChange={(e) => props.handle(e)}></input>
//                         <br></br>
//                         {props.button}
//                     </div>
//                     <div className="col-md-4 col-sm-12 mt-5" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "left" }}>
//                         <div>
//                             <h1 style={currentStepTitle}>STEP 1</h1>
//                             <span style={currentStepText} align="left">Name</span>
//                         </div>
//                         <div >
//                             <h1 style={stepTitle}>STEP 2</h1>
//                             <span style={stepText} align="left">Your Story</span>
//                         </div>
//                         <div >
//                             <h1 style={stepTitle}>STEP 3</h1>
//                             <span style={stepText} align="left">Social Media</span>
//                         </div>
//                         <div >
//                             <h1 style={stepTitle}>STEP 3</h1>
//                             <span style={stepText} align="left">Document Upload</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// function Step2(props) {
//     return (

//         <div style={root}>
//             <div className="container-fluid" >
//                 <div className="row flex-wrap" style={header}>
//                     <div className="col-md-8 col-sm-12" style={{ marginTop: "5%" }} >
//                         {/* <p style={{ color: "#828282", fontFamily: "sans-serif", fontWeight: "bold" }}>WHAT WE DO</p> */}
//                         <h1 style={{ fontSize: "2.4em", margin: "0px", marginRight: "3%" }}>Tell us what you're going through.</h1>
//                         <h3 style={{ color: "#828282", fontFamily: "sans-serif", marginRight: "10%", marginTop: "5%" }}>How has COVID-19 effected you and your loved ones? </h3>

//                         <input placeholder="Your Story" name="bio" onChange={(e) => props.handle(e)}></input>
//                         <br></br>

//                         {props.button}
//                         {props.back}
//                     </div>
//                     <div className="col-md-4 col-sm-12 mt-5" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "left" }}>
//                         <div>
//                             <h1 style={stepTitle}>STEP 1</h1>
//                             <span style={stepText} align="left">Name</span>
//                         </div>
//                         <div >
//                             <h1 style={currentStepTitle}>STEP 2</h1>
//                             <span style={currentStepText} align="left">Your Story</span>
//                         </div>
//                         <div >
//                             <h1 style={stepTitle}>STEP 3</h1>
//                             <span style={stepText} align="left">Social Media</span>
//                         </div>
//                         <div >
//                             <h1 style={stepTitle}>STEP 3</h1>
//                             <span style={stepText} align="left">Document Upload</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// function Step3(props) {
//     return (

//         <div style={root}>
//             <div className="container-fluid" >
//                 <div className="row flex-wrap" style={header}>
//                     <div className="col-md-8 col-sm-12" style={{ marginTop: "5%" }} >
//                         {/* <p style={{ color: "#828282", fontFamily: "sans-serif", fontWeight: "bold" }}>WHAT WE DO</p> */}
//                         <h1 style={{ fontSize: "2.4em", margin: "0px", marginRight: "3%" }}>Where can people find you?</h1>
//                         <input placeholder="@yourFB" name="fb" onChange={(e) => props.handle(e)}></input>
//                         <input placeholder="@yourInstagram" name="insta" onChange={(e) => props.handle(e)}></input>
//                         <input placeholder="@yourTwitter" name="twit" onChange={(e) => props.handle(e)}></input>
//                         <br></br>

//                         {props.button}
//                         {props.back}
//                     </div>
//                     <div className="col-md-4 col-sm-12 mt-5" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "left" }}>
//                         <div>
//                             <h1 style={stepTitle}>STEP 1</h1>
//                             <span style={stepText} align="left">Name</span>
//                         </div>
//                         <div >
//                             <h1 style={stepTitle}>STEP 2</h1>
//                             <span style={stepText} align="left">Your Story</span>
//                         </div>
//                         <div >
//                             <h1 style={currentStepTitle}>STEP 3</h1>
//                             <span style={currentStepText} align="left">Social Media</span>
//                         </div>
//                         <div >
//                             <h1 style={stepTitle}>STEP 3</h1>
//                             <span style={stepText} align="left">Document Upload</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>

//     )
// }
export default RecipientForm;