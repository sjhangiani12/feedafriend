import React, { useState, useEffect } from 'react';
import Delete from '@material-ui/icons/Delete';
import { PrimaryButton } from "../../shared/ButtonComponents";


function UploadForm(props) {

    const [uploadsDataURLs, setUploadsDataURLs] = useState([]);

    useEffect(() => {
        console.log(uploadsDataURLs);
        parseUploadDataURLS();
    }, [uploadsDataURLs]);

    function fileSelectedHandler(event) {
        if (uploadsDataURLs.length == 3) {
            alert("You have already uploaded 3 documents.");
            return;
        }

        var files = event.target.files;
        var max = files.length;
        if (files.length + uploadsDataURLs.length > 3) {
            max = 3 - uploadsDataURLs.length;
            alert("You added more than 3 files, only some will be uploaded.");
        }
        for (var i = 0; i < max; i++) {
            const reader = new FileReader();
            reader.onload = function (e) {
                var binaryString = e.target.result;
                var dataURLsArray = [...uploadsDataURLs];
                dataURLsArray.push();
                setUploadsDataURLs(uploadsDataURLs => uploadsDataURLs.concat([["", binaryString]]));
            }
            reader.readAsDataURL(files[i]);
        }
    }

    function removeUpload(event, index) {
        var uploadsArray = [...uploadsDataURLs];
        uploadsArray.splice(index, 1);
        setUploadsDataURLs(uploadsArray);
    }

    function parseUploadDataURLS() {
        var dataURLsArray = [...uploadsDataURLs];
        for (var i = 0; i < dataURLsArray.length; i++) {
            dataURLsArray[i][1] = dataURLsArray[i][1].substring(dataURLsArray[i][1].indexOf(",") + 1);
        }
        props.setUploads(dataURLsArray);
    }

    function addUploadCaption(event, index) {
        var dataURLsArray = [...uploadsDataURLs];
        dataURLsArray[index][0] = event.target.value;
        props.setUploads(dataURLsArray);
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

    const form = {
        border: "none",
        width: "85%",
        fontSize: "2rem",
        borderBottom: "1px ",
        borderBottomStyle: "solid",
        backgroundColor: "#FFFBF4"
    }

    return (

        <div className="col-md-8 col-sm-12 " style={{ marginTop: "5%", justifyContent: "left" }} >
            {/* <p style={{ color: "#828282", fontFamily: "sans-serif", fontWeight: "bold" }}>WHAT WE DO</p> */}
            <h1 style={{ fontSize: "3em", margin: "0px" }}>Upload up to 3 supoorting documents.</h1>
            <h3 style={{ color: "#828282", fontFamily: "sans-serif", marginRight: "10%", marginTop: "5%" }}>Some Examples / guidelines</h3>
            <label style={uploadButton} >
                <input type="file"
                    accept='image/*'
                    multiple
                    onChange={(event) => fileSelectedHandler(event)}
                    style={uploadInput} />
                Upload
                        </label>
            <div style={uploadsContainer} >
                {console.log(uploadsDataURLs)}
                {
                    uploadsDataURLs.map(function (file, index) {
                        return (
                            <div style={imgContainer}>
                                <img key={index} style={img} src={"data:*/*;base64," + file[1]} />
                                <button style={deleteUploadButton} onClick={(event) => removeUpload(event, index)} >
                                    <Delete color="secondary" onClick={(event) => removeUpload(event, index)} />
                                </button>
                                <input style={form} placeholder="Upload Caption" onChange={(e) => addUploadCaption(e, index)} />
                            </div>
                        )
                    })
                }
            </div>
            <br></br>
            {props.button}
            {props.back}

        </div>
    );
}

export default UploadForm;