import React, { useState, useEffect } from 'react';
import Delete from '@material-ui/icons/Delete';
import Resizer from 'react-image-file-resizer';
import BounceLoader from "react-spinners/BounceLoader";

function UploadProfPic(props) {

    const [profPic, setProfPic] = useState(props.profPic);
    const [profPicLoaded, setProfPicLoaded] = useState(false);

    useEffect(() => {
        parseUploadDataURLS();
    }, [profPic]);

    function fileSelectedHandler(event) {
        if (profPic != "") {
            alert("You have already uploaded a profile picture. Remove it to upload another");
            return;
        }

        var file = event.target.files[0];

        if (file.size > 200000) {
            Resizer.imageFileResizer(
                file,
                500,
                500,
                'JPEG',
                100,
                0,
                uri => {
                    setProfPic(uri);
                },
                'base64'
            );
        } else {
            const reader = new FileReader();
            reader.onload = function (e) {
                var binaryString = e.target.result;
                setProfPic(binaryString);
            }
            reader.readAsDataURL(file);
        }
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
        borderRadius: "6px",
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

    return (
        <div className="col-md-8 col-sm-12 " style={{ marginTop: "5%", justifyContent: "left" }} >
            {/* <p style={{ color: "#828282", fontFamily: "sans-serif", fontWeight: "bold" }}>WHAT WE DO</p> */}
            <h1 style={{ fontSize: "3em", margin: "0px" }}>Upload a profile picture. <a style={{ fontSize: "70%", color: "#828282" }}>(Optional)</a></h1>
            <label style={uploadButton} >
                <input type="file"
                    accept='image/*'
                    multiple
                    onChange={(event) => fileSelectedHandler(event)}
                    style={uploadInput} />
                Upload
                        </label>
            <div style={uploadsContainer} >
                {profPic != "" && !profPicLoaded && (
                    <BounceLoader color={"#999999"} size={100} />
                )}
                {profPic != "" && (
                    <div style={{ display: profPicLoaded ? "block" : "none" }}>
                        <div style={imgContainer}>
                            <img
                                style={img}
                                src={profPic}
                                onLoad={() => setProfPicLoaded(true)} />
                            <button style={deleteUploadButton} onClick={(event) => removeUpload(event)} >
                                <Delete color="secondary" onClick={(event) => removeUpload(event)} />
                            </button>
                        </div>
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