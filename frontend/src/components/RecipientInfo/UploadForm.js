import React, { useState, useEffect } from 'react';


function UploadForm(props) {

    const [uploadBinary, setUploadBinary] = useState("");
    const [retrievedBinary, setRetrivedBinary] = useState("");

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


    function getProfile() {
        var url = new URL('https://care37-cors-anywhere.herokuapp.com/https://care37.herokuapp.com/getRecipientProfile');
        var params = {idtoken:props.idtoken}
        url.search = new URLSearchParams(params).toString();
        fetch(url).then(
            function (res) {
                if (res.status == 200) {
                    res.json().then(data => {
                        // sets if the user who logged in is new or not
                        var dataurl = "data:image/png;base64," + data.prof_pic; 
                        console.log(dataurl);
                        setRetrivedBinary(dataurl);
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
            <img src={uploadBinary} />
            <button onClick={() => createProfile()}>Submit</button>
            <img src={retrievedBinary} />
        </div>
    );
}

export default UploadForm;