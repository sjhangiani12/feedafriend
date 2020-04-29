import React, { useState, useEffect } from 'react';


function RecipientInput(props) {

    function fileSelectedHandler(event) {
        var reader = new FileReader();
        reader.onload = function () {

            var arrayBuffer = this.result,
                array = new Uint8Array(arrayBuffer),
                binaryString = String.fromCharCode.apply(null, array);

            console.log(binaryString);

        }
        reader.readAsArrayBuffer(event.target.files[0]);
        console.log(event.target.files[0]);
    }

    return (
        <div>
            <input type="file" onChange={(event) => fileSelectedHandler(event)} />
        </div>
    );
}

export default RecipientInput;