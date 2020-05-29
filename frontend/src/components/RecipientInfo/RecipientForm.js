import React, { useState, useEffect } from 'react';
import UploadForm from './UploadForm.js';
import UploadProfPic from './UploadProfPic';
import { PrimaryButton, SecondaryButton } from "../../shared/ButtonComponents";
import forDonor from "../../static/forRecip.svg"
import Profile from '../Profile';
import BounceLoader from "react-spinners/BounceLoader";
import { useHistory } from "react-router-dom";
import '../../style.css';

function RecipientForm(props) {

    const [step, setStep] = useState(0);
    const [clickedCreateProfile, setClickedCreateProfile] = useState(false);
    const [uploadsArray, setUploads] = useState([]);
    const [profPic, setProfPic] = useState("");
    const [isCreatingProf, setIsCreatingProf] = useState(false);
    const [canCreateProf, setCanCreateProf] = useState(false);
    const [userState, setUserState] = useState("");
    const [userCity, setUserCity] = useState("");
    const [userCountry, setUserCountry] = useState("");
    let history = useHistory();

    const formDefaultValues = {
        firstName: "",
        lastName: "",
        zip: "",
        bio: "",
        fb: "",
        insta: "",
        twit: "",
        uploads: [],
        profPic: "",
        email: "",
    }

    const [formValues, setFormValues] = useState(formDefaultValues);
    const { firstName, lastName, zip,  bio, fb, insta, twit } = formValues

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

    function validateZip(zip) {

        let url = 'https://ctp-zip-api.herokuapp.com/zip/'+ zip
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },


        }).then(
            function (res) {
                if (res.status == 200) {
                    res.json().then(json => {
                        console.log(json[0])
                        setUserCity(json[0].City);
                        setUserState(json[0].State);
                        setUserCountry(json[0].Country);
                        if(json[0].Country == "US") {
                            setCanCreateProf(true);
                        }
                    });
                } else {
                    alert("Error: Zip Code invalid - We only operate in the US at this time due to limited meal delivery options.");
                }
            }
        )

    }

    function createProfile() {
        if (canCreateProf) {
            const data = {
                idtoken: props.idtoken,
                first_name: formValues.firstName,
                last_name: formValues.lastName,
                zip_code: formValues.zip,
                bio: formValues.bio,
                social_media_links: [formValues.fb, formValues.insta, formValues.twit],
                prof_pic: profPic,
                uploads: uploadsArray,
            }
            console.log(JSON.stringify(data));
            fetch('https://care37-cors-anywhere.herokuapp.com/https://care37.herokuapp.com/createProfile', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },

                body: JSON.stringify(data)
            }).then(
                function (res) {
                    if (res.status == 200) {
                        res.json().then(json => {
                            setIsCreatingProf(false);
                            props.setIsNewUser(false);
                            props.setProfileData(json);
                            setClickedCreateProfile(false);
                        });
                    } else if (res.status == 400) {
                        alert("error 400");
                    } else {
                        alert("error not 400");
                    }
                }
            )   
        } else {
            alert("We cannot create your profile - probably because you do not reside in the US")
            history.push("/")

        }
    }

    function handleNext() {
        if (step == 0) {  // enter name
            if (formValues.firstName == "" || formValues.lastName == "") {
                alert("Please fill out the name feilds.");
                return;
            }
        } else if (step == 1) {  // zip
            validateZip(formValues.zip)
            // if (userCountry != "US") {
            //     alert("Your Zip Code is invalid - we only operate in the US.");
            //     return;
            // }
        } else if (step == 2) {  // bio
            if (formValues.bio == "") {
                alert("Please fill out the bio.");
                return;
            }
        } else if (step == 3) {  // social media
            // optional
        } else if (step == 4) {  // prof pic
            // optional
        } else if (step == 5) {  // uploads
            // optional
        }
        // advance to the next screen
        setStep(step + 1);
    }

    function handleBack() {
        setStep(step - 1);
    }

    function handleChange(e) {

        const target = e.target
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })

    }

    function handleFinish() {
        if (!clickedCreateProfile) {
            setClickedCreateProfile(true);
            setIsCreatingProf(true);
            createProfile();
        }
    }

    const toRender = {
        0: <GenericStep
            title="Hi. What is your full name?"
            forms={<>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div > <input style={form} maxlength="30" placeholder="First Name" name="firstName" value={firstName} onChange={(e) => handleChange(e)}></input></div>
                    <div > <input style={form} maxlength="30" placeholder="Last Name" name="lastName" value={lastName} onChange={(e) => handleChange(e)}></input> </div>
                </div>
            </>}
            handle={handleChange}
            button={<PrimaryButton onClick={() => handleNext()} text="Next"></PrimaryButton>}
        />,
        1: <GenericStep
            title="What is your Zip Code?"
            forms={<>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <h3 style={{ fontSize: "70%", color: "#828282", fontFamily: "sans-serif", marginRight: "10%", marginTop: "5%" }}>Note: We only operate in the USA due to meal delivery coverage</h3>
                    <div > <input style={form} maxlength="5" placeholder="Zip Code" name="zip" value={zip} onChange={(e) => handleChange(e)}></input></div>
                </div>
            </>}
            handle={handleChange}
            button={<PrimaryButton onClick={() => handleNext()} text="Next"></PrimaryButton>}
            back={<SecondaryButton onClick={() => handleBack()} text="Back"></SecondaryButton>}

        />,
        2: <GenericStep
            title="What are you going through?"
            subTitle={<h3 style={{ color: "#828282", fontFamily: "sans-serif", fontSize: "1em" }}>How has COVID-19 effected you and your loved ones? </h3>}
            forms={<>
                <div><textarea style={bioForm} maxlength="300" placeholder="Your Story" name="bio" value={bio} onChange={(e) => handleChange(e)} /></div>
            </>}
            handle={handleChange}
            button={<PrimaryButton onClick={() => handleNext()} text="Next"></PrimaryButton>}
            back={<SecondaryButton onClick={() => handleBack()} text="Back"></SecondaryButton>}
        />,
        3: <GenericStep
            title="Where can people find you?"
            forms={<>
                <h3 style={{ fontSize: "70%", color: "#828282", fontFamily: "sans-serif"}}>Provide the <stong>link</stong> to your social medias.</h3>
                <div ><input style={form} placeholder="Your Facebook" name="fb" value={fb} onChange={(e) => handleChange(e)}></input></div>
                <div ><input style={form} placeholder="Your Instagram" name="insta" value={insta} onChange={(e) => handleChange(e)}></input></div>
                <div ><input style={form} placeholder="Your Twitter" name="twit" value={twit} onChange={(e) => handleChange(e)}></input></div>
            </>}
            handle={handleChange}
            button={<PrimaryButton onClick={() => handleNext()} text="Next"></PrimaryButton>}
            back={<SecondaryButton onClick={() => handleBack()} text="Back"></SecondaryButton>}
        />,
        4: <UploadProfPic
            button={<PrimaryButton onClick={() => handleNext()} text="Next"></PrimaryButton>}
            back={<SecondaryButton onClick={() => handleBack()} text="Back"></SecondaryButton>}
            profPic={profPic}
            setProfPic={setProfPic}>
        </UploadProfPic>,
        5: <UploadForm
            button={<PrimaryButton onClick={() => handleNext()} text="Review Profile"></PrimaryButton>}
            back={<SecondaryButton onClick={() => handleBack()} text="Back"></SecondaryButton>}
            uploadsArray={uploadsArray}
            setUploads={setUploads}>
        </UploadForm>,
        6: <Done
            onClick={handleFinish}
            firstName={formValues.firstName}
            lastName={formValues.lastName}
            bio={formValues.bio}
            socialMediaLinks={[formValues.fb, formValues.insta, formValues.twit]}
            profPic={profPic}
            uploads={uploadsArray}
        />
    }
    const stepStyles = [
        {
            title1: currentStepTitle,
            text1: currentStepText,
            title2: stepTitle,
            text2: stepText,
            title3: stepTitle,
            text3: stepText,
            title4: stepTitle,
            text4: stepText,
            title5: stepTitle,
            text5: stepText,
        },
        {
            title1: currentStepTitle,
            text1: currentStepText,
            title2: stepTitle,
            text2: stepText,
            title3: stepTitle,
            text3: stepText,
            title4: stepTitle,
            text4: stepText,
            title5: stepTitle,
            text5: stepText,
        },
        {
            title1: stepTitle,
            text1: stepText,
            title2: currentStepTitle,
            text2: currentStepText,
            title3: stepTitle,
            text3: stepText,
            title4: stepTitle,
            text4: stepText,
            title5: stepTitle,
            text5: stepText,
        },
        {
            title1: stepTitle,
            text1: stepText,
            title2: stepTitle,
            text2: stepText,
            title3: currentStepTitle,
            text3: currentStepText,
            title4: stepTitle,
            text4: stepText,
            title5: stepTitle,
            text5: stepText,
        },
        {
            title1: stepTitle,
            text1: stepText,
            title2: stepTitle,
            text2: stepText,
            title3: stepTitle,
            text3: stepText,
            title4: currentStepTitle,
            text4: currentStepText,
            title5: stepTitle,
            text5: stepText,
        },
        {
            title1: stepTitle,
            text1: stepText,
            title2: stepTitle,
            text2: stepText,
            title3: stepTitle,
            text3: stepText,
            title4: stepTitle,
            text4: stepText,
            title5: currentStepTitle,
            text5: currentStepText
        }
    ]

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
        // Becasuse <Profile> is formatted as the whole page, 
        // add an 'if' check to render it alone
        <>
            {(step == 6) ? (
                <>
                    {isCreatingProf && (
                        <div style={loadingContainer}>
                            <h1>One moment. We are creating your profile.</h1>
                            <div style={loader}>
                                <BounceLoader color={"#999999"} size={100} />
                            </div>
                        </div>
                    )}
                    <Done
                        onClick={handleFinish}
                        firstName={formValues.firstName}
                        lastName={formValues.lastName}
                        bio={formValues.bio}
                        socialMediaLinks={[formValues.fb, formValues.insta, formValues.twit]}
                        profPic={profPic}
                        uploads={uploadsArray}
                        handleBack={handleBack}
                    />
            </>
            ) : (
                    <>
                        <div style={root}>
                            <div className="container-fluid" id="genericStep" style={{ height: "80vh", width: "100vw", marginLeft: "5%" }}>
                                <div className="row flex-wrap" style={header1}>
                                    {toRender[step]}
                                    {step < 6 && (
                                        <div className="col-md-4 col-sm mr-0 ml-auto" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "left", width: "100%", marginTop: "5%", alignSelf: "flex-start" }}>
                                            <>
                                                <div id="recipSteps">
                                                    <h1 style={stepStyles[step].title1}>STEP 1</h1>
                                                    <span style={stepStyles[step].text1} align="left">Name and Zip Code</span>
                                                </div>
                                                <div >
                                                    <h1 style={stepStyles[step].title2}>STEP 2</h1>
                                                    <span style={stepStyles[step].text2} align="left">Your Story</span>
                                                </div>
                                                <div >
                                                    <h1 style={stepStyles[step].title3}>STEP 3</h1>
                                                    <span style={stepStyles[step].text3} align="left">Social Media</span>
                                                </div>
                                                <div >
                                                    <h1 style={stepStyles[step].title4}>STEP 4</h1>
                                                    <span style={stepStyles[step].text4} align="left">Profile Picture</span>
                                                </div>
                                                <div >
                                                    <h1 style={stepStyles[step].title5}>STEP 5</h1>
                                                    <span style={stepStyles[step].text5} align="left">Document Upload</span>
                                                </div>
                                            </>
                                        </div>

                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                )}
        </>
    );

}
function GenericStep(props) {
    return (
        <div className="col-md-8 col-sm-12 " style={{ marginTop: "5%", justifyContent: "left" }} >
            {/* <p style={{ color: "#828282", fontFamily: "sans-serif", fontWeight: "bold" }}>WHAT WE DO</p> */}
            <h1 style={{ fontSize: "3em", margin: "0px" }}>{props.title}</h1>
            {props.subTitle}
            {props.forms}
            <br></br>
            {props.button}
            {props.back}
        </div>
    )
}

function Done(props) {
    return (
        <>
            <Profile
                first_name={props.firstName}
                last_name={props.lastName}
                prof_pic={props.profPic}
                social_media_links={props.socialMediaLinks}
                bio={props.bio}
                uploads={props.uploads}
                uploadText="Your Uploads"
            />

            <div style={{ marginLeft: "10%", marginTop: "3%" }}>
                <PrimaryButton text="Create my profile" onClick={() => props.onClick()}></PrimaryButton>
                <SecondaryButton text="Back" onClick={() => props.handleBack()} />
            </div>
            <div >
                <span style={{ fontSize: ".5rem", marginLeft: "10%" }}>By continuing you agree to Feed-A-Friend's Terms and Privacy Policy</span>
            </div>
            {/* <br></br>
            {props.button}
            {props.back} */}
        </>
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

const bioForm = {
    border: "none",
    width: "85%",
    fontSize: "1rem",
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
    // left: "20%",
    // width: "70%"
    marginLeft: "5%",
    marginRight: "5%"
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

export default RecipientForm;