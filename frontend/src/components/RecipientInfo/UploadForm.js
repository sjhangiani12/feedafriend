import React, { useState, useEffect } from 'react';
import Delete from '@material-ui/icons/Delete';
import { PrimaryButton } from "../../shared/ButtonComponents";


function UploadForm(props) {

    const [uploadsDataURLs, setUploadsDataURLs] = useState([]);

    useEffect(() => {
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

    function parseUploadDataURLS() {
        var dataURLsArray = [...uploadsDataURLs];
        for (var i = 0; i < dataURLsArray.length; i++) {
            dataURLsArray[i] = dataURLsArray[i].substring(dataURLsArray[i].indexOf(",") + 1);
        }
        props.setUploads(dataURLsArray);
        console.log(dataURLsArray);
    }

    const uploadContainer = {
        display: "flex",
        justifyContent: "space-evenly",
        flexDirection: "column",
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

    const stepTitle = {
        marginTop: "5%",
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

    const header = {
        display: "flex",
        flexWrap: "wrap",
        marginLeft: "5%",
        marginRight: "5%",
    }
    const root = {
        position: "relative",
        marginTop: "120px",
        // left: "20%",
        // width: "70%"
        marginLeft: "40px",
        marginRight: "40px"
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
                {
                    uploadsDataURLs.map(function (file, index) {
                        return (
                            <div style={imgContainer}>
                                <img key={index} style={img} src={file} />
                                <button style={deleteUploadButton} onClick={(event) => removeUpload(event, index)} >
                                    <Delete color="secondary" onClick={(event) => removeUpload(event, index)} />
                                </button>
                            </div>
                        )
                    })
                }
            </div>
            <br></br>
            {props.button}
            {props.back}

        </div>

            // <div className="container-fluid" >
            //     <div className="row flex-wrap" style={header}>
            //         <div className="col-md-8 col-sm-12" style={{ marginTop: "5%" }} >
            //             {/* <p style={{ color: "#828282", fontFamily: "sans-serif", fontWeight: "bold" }}>WHAT WE DO</p> */}
            //             <h1 style={{ fontSize: "2.4em", margin: "0px", marginRight: "3%" }}>Upload up to 3 supoorting documents.</h1>
            //             <h3 style={{ color: "#828282", fontFamily: "sans-serif", marginRight: "10%", marginTop: "5%" }}>Some Examples / guidelines</h3>
            //             <label style={uploadButton} >
            //                 <input type="file"
            //                     accept='image/*'
            //                     multiple
            //                     onChange={(event) => fileSelectedHandler(event)}
            //                     style={uploadInput} />
            //                  Upload
            //             </label>
            //             <div style={uploadsContainer} >
            //                 {
            //                     uploadsDataURLs.map(function (file, index) {
            //                         return (
            //                             <div style={imgContainer}>
            //                                 <img key={index} style={img} src={file} />
            //                                 <button style={deleteUploadButton} onClick={(event) => removeUpload(event, index)} >
            //                                     <Delete color="secondary" onClick={(event) => removeUpload(event, index)} />
            //                                 </button>
            //                             </div>
            //                         )
            //                     })
            //                 }
            //             </div>
            //             {props.button}
            //         </div>
            //         <div className="col-md-4 col-sm-12 mt-5 ml-auto mr-3" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "left" }}>
            //             <div>
            //                 <h1 style={currentStepTitle}>STEP 1</h1>
            //                 <span style={currentStepText} align="left">Create your profile</span>
            //             </div>
            //             <div >
            //                 <h1 style={currentStepTitle}>STEP 2</h1>
            //                 <span style={currentStepText} align="left">Share your story</span>
            //             </div>
            //             <div >
            //                 <h1 style={currentStepTitle}>STEP 3</h1>
            //                 <span style={currentStepText} align="left">Enjoy a meal delivered to your door!</span>
            //             </div>

            //         </div>
            //     </div>
            //</div>

        // <div style={pageContainer}>
        //     <div style={uploadContainer}>
        //         <h1>Upload up to 3 supoorting documents.</h1>
        //         <label style={uploadButton} >
        //             <input type="file"
        //                 accept='image/*'
        //                 multiple
        //                 onChange={(event) => fileSelectedHandler(event)}
        //                 style={uploadInput} />
        //             Upload
        //         </label>
        //         <div style={uploadsContainer} >
        //             {
        //                 uploadsDataURLs.map(function (file, index) {
        //                     return (
        //                         <div style={imgContainer}>
        //                             <img key={index} style={img} src={file} />
        //                             <button style={deleteUploadButton} onClick={(event) => removeUpload(event, index)} >
        //                                 <Delete color="secondary" onClick={(event) => removeUpload(event, index)} />
        //                             </button>
        //                         </div>
        //                     )
        //                 })
        //             }
        //         </div>
        //     </div>
        //     <div>
        //         <div>
        //             <h1 style={stepTitle}>STEP 1</h1>
        //             <span style={stepText} align="left">Name</span>
        //         </div>
        //         <div >
        //             <h1 style={stepTitle}>STEP 2</h1>
        //             <span style={stepText} align="left">Your Story</span>
        //         </div>
        //         <div >
        //             <h1 style={stepTitle}>STEP 3</h1>
        //             <span style={stepText} align="left">Social Media</span>
        //         </div>
        //         <div >
        //             <h1 style={currentStepTitle}>STEP 4</h1>
        //             <span style={currentStepText} align="left">Document Upload</span>
        //         </div>
        //     </div>
        // </div>
    );
}

export default UploadForm;