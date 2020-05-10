import React, { useState, useEffect } from 'react';
import Delete from '@material-ui/icons/Delete';

function UploadProfPic(props) {
    var fileInput = document.getElementById("profile");

    const [profPic, setProfPic] = useState("");
    const [displayImage, setDisplayImage] = useState(false);

    useEffect(() => {
        parseUploadDataURLS();
    }, [profPic]);

    function fileSelectedHandler(event) {
        if (profPic != "") {
            alert("You have already uploaded a profile picture. Remove it to upload another");
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            var binaryString = e.target.result;
            setProfPic(binaryString);
        }
        reader.readAsDataURL(event.target.files[0]);
    }

    function removeUpload(event) {
        setProfPic("");
    }

    function parseUploadDataURLS() {
        props.setProfPic(profPic.substring(profPic.indexOf(",") + 1));
    }

    const imgContainer = {
        width: "150px",
        height: "150px",
        position: "relative",
        marginLeft: "3%",
        marginRight: "3%",
    }

    const img = {
        objectFit: "cover",
        width: "100%",
        height: "100%",
    }

    const uploadInput = {
        display: "none",
    }

    const uploadButton = {
        background: "#1136FC",
        borderRadius: "3px",
        padding: "12px 24px",
        color: "white",
        fontFamily: "sans-serif",
        fontSize: "18px",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textAlign: "center",
        width: "100px",
    }

    const uploadsContainer = {
        display: "flex",
        flexDirection: "row",
    }

    const deleteUploadButton = {
        position: "absolute",
        right: 0,
        top: 0,
        zIndex: 1,
    }

    fileInput.onchange = function (e) {
        e.preventDefault();

        // get the file someone selected
        var file = fileInput.files && fileInput.files[0];

        // create an image element with that selected file
        var img = new Image();
        img.src = window.URL.createObjectURL(file);

        // as soon as the image has been loaded
        img.onload = function () {
            var width = img.naturalWidth,
                height = img.naturalHeight;

            // unload it
            window.URL.revokeObjectURL(img.src);

            // check its dimensions
            if (width <= 800 && height <= 800) {
                // it fits 
            } else {
                // it doesn't fit, unset the value 
                // post an error
                fileInput.value = ""
                alert("max image size is 800x800")
            }
        };
    }

    return (
        <div className="col-md-8 col-sm-12 " style={{ marginTop: "5%", justifyContent: "left" }} >
            {/* <p style={{ color: "#828282", fontFamily: "sans-serif", fontWeight: "bold" }}>WHAT WE DO</p> */}
            <h1 style={{ fontSize: "3em", margin: "0px" }}>Upload a profile picture.</h1>
            <label style={uploadButton} >
                <input type="file"
                    accept='image/*'
                    multiple
                    onChange={(event) => fileSelectedHandler(event)}
                    style={uploadInput} />
                Upload
                        </label>
            <div style={uploadsContainer} >
                {profPic != "" && (
                    <div style={imgContainer}>
                        <img style={img} src={profPic} id="profile" />
                        <button style={deleteUploadButton} onClick={(event) => removeUpload(event)} >
                            <Delete color="secondary" onClick={(event) => removeUpload(event)} />
                        </button>
                    </div>

                )}
            </div>
            <br></br>
            {props.button}
            {props.back}

        </div>

    );
}

export default UploadProfPic;