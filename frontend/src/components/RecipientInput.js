import React, { useState, useEffect } from 'react';


function RecipientInput(props) {

    const [uploadBinary, setUploadBinary] = useState("");

    function fileSelectedHandler(event) {
        var file = event.target.files[0];

        const reader = new FileReader();
        reader.onload = function() {
            var binaryString = reader.result;
            setUploadBinary(binaryString);
            console.log(binaryString);
        }
        reader.readAsDataURL(file);
    }

    function createProfile() {
        const data = {
            email: "base64iswhack@urmom.com",
            first_name: "breh",
            last_name: "burg",
            zip_code: 12345,
            bio: "i hope this doesnt get out",
            social_media_links: ["link1", "link2", "link3"],
            prof_pic: uploadBinary.substring(uploadBinary.indexOf(',') + 1),
            uploads: [["bs upload", uploadBinary.substring(uploadBinary.indexOf(',') + 1)]] 
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
                getProfile();
            }
        )
    }

    function getProfile() {
        const data = {
            email: "base64iswhack@urmom.com",
        }
        fetch('https://care37-cors-anywhere.herokuapp.com/https://care37.herokuapp.com/getRecipientProfile', {
            method: "GET",
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
                        console.log(data);
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
            <input type="file" accept='image/*' onChange={(event) => fileSelectedHandler(event)} />
            <img src={uploadBinary}></img>
            <button onClick={() => createProfile()}>Submit</button>
        </div>
    );
}

export default RecipientInput;