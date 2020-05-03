import React, { useState, useEffect } from 'react';
import Delete from '@material-ui/icons/Delete';


function UploadForm(props) {

    const [uploadsDataURLs, setUploadsDataURLs] = useState([]);

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
                setUploadsDataURLs(uploadsDataURLs => uploadsDataURLs.concat(binaryString));
            }
            reader.readAsDataURL(files[i]);
        }
    }

    function removeUpload(event, index) {
        console.log(index);
        var uploadsArray = [...uploadsDataURLs];
        console.log(uploadsArray);
        uploadsArray.splice(index, 1);
        console.log(uploadsArray);
        setUploadsDataURLs(uploadsArray);
    }

    const uploadContainer = {
        display: "flex",
        justifyContent: "space-evenly",
        flexDirection: "column",
    }

    const imgContainer = {
        width: "30%",
        height: "30%",
        position: "relative",
        marginLeft: "3%",
        marginRight: "3%",
    }

    const img = {
        objectFit: "cover",
        width: "100%",
        height: "100%",
    }

    const stepTitle = {
        marginTop: "5%",
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "18px",
        color: "#828282",
    }

    const currentStepTitle = {
        marginTop: "5%",
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "18px",
    }

    const stepText = {
        color: "#919191",
        fontSize: "2.2vmax",
        width: "100%"
    }

    const currentStepText = {
        fontSize: "2.2vmax",
        width: "100%"
    }

    const pageContainer = {
        display: "flex",
        flexDirection: "row",
    }

    const uploadButton = {
        marginTop: "8%",
        marginBottom: "3%",
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
        background: "transparent",
        borderColor: "transparent",
    }

    return (
        <div style={pageContainer}>
            <div style={uploadContainer}>
                <h1>Upload up to 3 supoorting documents.</h1>
                <input type="file" 
                    accept='image/*' 
                    multiple 
                    onChange={(event) => fileSelectedHandler(event)} 
                    style={uploadButton} />
                <div style={uploadsContainer} >
                {
                    uploadsDataURLs.map(function (file, index) {
                        return (
                            <div style={imgContainer}>
                                <img key={index} style={img} src={file} />
                                <button style={deleteUploadButton} onClick={(event) => removeUpload(event, index)} >
                                    <Delete color="secondary" onClick={(event) => removeUpload(event, index)}/>
                                </button>
                            </div>
                        )
                    })
                }
                </div>
            </div>
            <div>
                <div>
                    <h1 style={stepTitle}>STEP 1</h1>
                    <span style={stepText} align="left">Name</span>
                </div>
                <div >
                    <h1 style={stepTitle}>STEP 2</h1>
                    <span style={stepText} align="left">Your Story</span>
                </div>
                <div >
                    <h1 style={stepTitle}>STEP 3</h1>
                    <span style={stepText} align="left">Social Media</span>
                </div>
                <div >
                    <h1 style={currentStepTitle}>STEP 4</h1>
                    <span style={currentStepText} align="left">Document Upload</span>
                </div>
            </div>
        </div>
    );
}

export default UploadForm;