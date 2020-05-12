import React, { useState, useEffect } from 'react';
import Delete from '@material-ui/icons/Delete';
import BounceLoader from "react-spinners/BounceLoader";
import Resizer from 'react-image-file-resizer';


function UploadForm(props) {

    const [uploadsDataURLs, setUploadsDataURLs] = useState(props.uploadsArray);
    const [imagesLoaded, setImagesLoaded] = useState([false, false, false]);

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
            if (files[i].size > 200000) {
                Resizer.imageFileResizer(
                    files[i],
                    800,
                    800,
                    'JPEG',
                    100,
                    0,
                    uri => {
                        setUploadsDataURLs(uploadsDataURLs => uploadsDataURLs.concat([["", uri]]));
                    },
                    'base64'
                );
            } else {
                const reader = new FileReader();
                reader.onload = function (e) {
                    var binaryString = e.target.result;
                    setUploadsDataURLs(uploadsDataURLs => uploadsDataURLs.concat([["", binaryString]]));
                }
                reader.readAsDataURL(files[i]);
            }
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

    function handleImageLoaded(index) {
        console.log("at least it is getting called");
        var imagesLoadedTemp = [...imagesLoaded];
        imagesLoadedTemp[index] = true;
        setImagesLoaded(imagesLoadedTemp);
    }

    const uploadContainer = {
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
        marginBotton: "3%",
        height: "auto"

    }

    const deleteUploadButton = {
        position: "absolute",
        right: 0,
        top: 0,
        zIndex: 1,
    }

    const uploadCaption = {
        border: "none",
        width: "100%",
        fontSize: "1rem",
        borderBottom: "1px ",
        borderBottomStyle: "solid",
        backgroundColor: "#FFFBF4",
    }

    return (

        <div className="col-md-8 col-sm-12 " style={{ marginTop: "5%", justifyContent: "left" }} >
            {/* <p style={{ color: "#828282", fontFamily: "sans-serif", fontWeight: "bold" }}>WHAT WE DO</p> */}
            <h1 style={{ fontSize: "3em", margin: "0px" }}>Upload up to 3 supoorting documents. <a style={{fontSize: "70%", color: "#828282"}}>(Optional)</a></h1>
            <h3 style={{fontSize: "70%", color: "#828282", fontFamily: "sans-serif", marginRight: "10%", marginTop: "5%" }}>Provide some more color to your story. For example, a note about being laid off.</h3>
            <label style={uploadButton} >
                <input type="file"
                    accept='image/*'
                    multiple
                    onChange={(event) => fileSelectedHandler(event)}
                    style={uploadInput} />
                Upload
            </label>
            <div style={uploadsContainer} >
                {
                    uploadsDataURLs.map(function (file, index) {
                        return (
                            <div style={uploadContainer}>
                                {!imagesLoaded[index] && (
                                    <BounceLoader color={"#999999"} size={100} />
                                )}
                                <div style={{ display: imagesLoaded[index] ? "block" : "none" }}>
                                    <img
                                        key={index}
                                        style={img}
                                        onLoad={() => handleImageLoaded(index)}
                                        src={"data:*/*;base64," + file[1]}
                                    />
                                    <button style={deleteUploadButton} onClick={(event) => removeUpload(event, index)} >
                                        <Delete color="secondary" onClick={(event) => removeUpload(event, index)} />
                                    </button>
                                    <input style={uploadCaption} maxlength="60" placeholder="Upload Caption" onChange={(e) => addUploadCaption(e, index)} />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div style={{marginTop: "40px"}}>
                {props.button}
                {props.back}
            </div>

        </div>
    );
}

export default UploadForm;