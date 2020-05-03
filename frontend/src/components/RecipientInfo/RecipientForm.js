import React, { useState, useEffect } from 'react';
import UploadForm from './UploadForm';

function RecipientForm(props) {

    const [step, setStep] = useState(1);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [bio, setBio] = useState("");
    const [socialMediaLinks, setSocialMediaLinks] = useState([]);
    const [uploads, setUploads] = useState([]);
    const [profPic, setProfPic] = useState("");

    function createProfile() {
        const data = {
            idtoken: props.idtoken,
            first_name: firstName,
            last_name: lastName,
            zip_code: 12345,
            bio: bio,
            social_media_links: socialMediaLinks,
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

    return (
        <div>
            <UploadForm />            
        </div>
    );
}

export default RecipientForm;