import React, { useState, useEffect } from 'react';
import { ImageBanner } from '../shared/banner';
import { PrimaryButton, SecondaryButton } from "../shared/ButtonComponents";

const immm = "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAAEEfUpiAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo3NzdjMDA3Ny03N2RkLTM2NDItODY3ZC1mMTY3YmQ0ZjAxOGEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QkI3N0VGRkNEMkRBMTFFNkE0MTA4NDhCMTA5MThEMjQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QkI3N0VGRkJEMkRBMTFFNkE0MTA4NDhCMTA5MThEMjQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Nzc3YzAwNzctNzdkZC0zNjQyLTg2N2QtZjE2N2JkNGYwMThhIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjc3N2MwMDc3LTc3ZGQtMzY0Mi04NjdkLWYxNjdiZDRmMDE4YSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuUV09MAAAVySURBVHjaYqyrq2P49u0bAxAwA/FfFhBn//79/xmggAkk8+vXLwYzMzMGERERBhaQMjY2NoZTp06BVQAEEGNJSQkDMmBB1g8ED0FmMPz9+5dBR0cHxJQHCzAzMzNcuXIFxIwHCED2FJwAEIOweOhurnFbOkw38WGNtPe5QEBDDGYy+oxL4Q95zlCZCfKiavx1DTAzqCrcHfxbRL4iE9VcFCMC7NF4qW8BhOEPFAcANbDs27cPxMgF8iehy4N8A7KCFYsk3FcgBb9sbGzgon/+/AEHDBT0gh3JxcXFEBISwuDt7Q326o8fP8AYCCIZjYyM/sO8BPJ7SkoKw9y5cxmgIRoAUgByJLZQBClgRA4HDF+CCIAAAofD3r174SEHilIgPgzEFlg05QDxVCQbICEN0gzEOSCnAPFvILaAiqHjKVA1/2FiLFDDTgOxCciTSC4hBED+5oYZYAIi3N3dGbZs2cIgLCzMYGpqyvD9+3cwGwR27drFEB4eDk4wc+bMATsfCC4wIRv59u1bhsjISIaPHz8yCAkJMTx9+pTh8+fPDExMTGCNIE0gNSA+FLwEByIwvWQBnT4VqzuB3gJhJE1Yo2kajqgChwkWzWth6llACkBOgwYezBAuIG4CYh8g5gPiW0A8AYg3oLmAASAAZVXMkiEURW/xoYvfL3AVbIpo+YZWpeYGR5ttaXIpqLGt0RAHG1wlwSHIybEhjVyaFVoLoaAlevf1rryvPiMPHBB89z7ffecc13zfJ3utAm79OfYSNTwry5IrXMIB49WK9Q+MO4zvNBvLsr6PIN39B6MysuEW45s42pks2yUD/gOnou5EDo17mIZjMVzeALkN0/FIDY7wARPAMIxBPBQbOGC6JTkYMWdpBvtUhHmHhZgaGI5hGILrumCaJhRFAZqmQVVV0Pc9NVHW6SwE3CXLMoiiiOdUkiRQ1zXous5zw7ZteTl34xPjJsp1sVjw3wg6cD6fQxAE4Hkef87zHBzHgTRN5QYv2OCC0VFVFeI4XpoSFqL7mqaBruugbdtfeYEN7kYTg80Fdxbe/1l8Lutgd6wJFY9oYWhwy3g5QQOK7DbCIV3pH3gWlh8EMcNPlOx8LRbsMfqMG8J9N8IDr/J8cCZfAtReBS0JBFF4Cg+aEHUwWRAvgoEGEUGBl/wD6bVLFw9WPyAwutTFunQN6tZf6FCdg4UOSqcOQrdE1rpVVhZJ73u8kWXaFRf0wceuM8PMm9k33/fJfGDbNlfcEIy8RFgjLEslTsuCb4Qnwj3hVlj+d9DHAcdCNEO67H0SyEmZrA55thvG7wc5iWszAf2c9JnoQOjFDrC4V2QJVzLXqR/lugOLfbsJb4SxI4ms+yWwSbgTxzPOuCRUzARA9xemHAawCUHjSF9+ncCuW5dhKWAzMpkM06rmZVy5VCql4vE4t6OI0J5MJpktQYhIutvtMimC3+FfDdHUUXEryoLZ2+v1+tWKhIrFospms6per6tms6lKpRInCIYFWTYaDW5LJBKqXC4rx3FUrVZT6XRaFQoFnsOIecJMSHT/3ezVXkg7k06nw7vCjrThQhtEJhwO8xPtWAjj8Q6Vi8Vi7K88PicU/jPkKoyc7olEIn0Wh0wg4NdxlEgCigbpQB+cHpJinmy1uA9KCHXE4nCF6EeSRtzAhugaOBHS+KcC+BQAdoVJ9VFiUhBYNBpVlmXxicG8ozbkrwiPxbvH7h3TlqBKVsTDDR2YGBLebrf7iw0RL4RFwqvJAx9SGIdj5IBzwhzh2Y8JNQ3jzKojXPhMNHjLk4q1iTewT5ggzBL2CI8+47zQJFQJlsyxTfgxx/Ftg8XO5/ODLDo0/FhguoopOS1U5lfQ+sFt+wM8kkHzBg5NeAAAAABJRU5ErkJggg=="

const root = {
  position: "relative",
  marginTop: "120px",
  // left: "20%",
  // width: "70%"
  marginLeft: "40px",
  marginRight: "40px",
}
const header = {
  display: "flex",
  flexWrap: "wrap",
  marginLeft: "5%",
  marginRight: "5%",
}

const img = {
  objectFit: "cover",
  width: "100%",
  height: "100%",
}

const uploadsContainer = {
  display: "flex",
  flexDirection: "row",
}

const imgContainer = {
  width: "150px",
  height: "150px",
  position: "relative",
  marginLeft: "3%",
  marginRight: "3%",
}


function Profile(props) {

  useEffect(() => {
    getProfile();
  }, [props])

  const [imageToPreview, setImageToPreview] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [uploadData, setUploadData] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [fb, setFB] = useState("");
  const [insta, setInsta] = useState("");
  const [twit, setTwit] = useState("");
  const [bio, setBio] = useState("");

  function getProfile() {
    const data = {
      idtoken: props.idtoken
    }

    fetch(`https://care37-cors-anywhere.herokuapp.com/https://care37.herokuapp.com/getRecipientProfile?idtoken=${encodeURIComponent(data.idtoken)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(
      function (response) {
        if (response.status == 200) {
          response.json().then(json => {
            console.log(json);
            setUploadData([[immm]]);
            setFirstName(json.first_name);
            setLastName(json.last_name);
            setProfilePic("data:*/*;base64," + json.prof_pic);
            setBio(json.bio);
          })
        } else if (response.status == 500) {
          // there was an error with the DB
          response.json().then(json => {
            console.log(json);
          })
        } else {
          // unexpected error
          console.log(response);
        }
      }
    )
    setToke(data.idtoken)
  }


  function deleteUser() {
    const data = {
      idtoken: props.idtoken
    }
    fetch(`https://care37-cors-anywhere.herokuapp.com/https://care37.herokuapp.com/deleteUser?idtoken=${encodeURIComponent(data.idtoken)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(
      function (response) {
        if (response.status == 200) {
          response.json().then(json => {
            console.log(json);
          })
        } else if (response.status == 500) {
          // there was an error with the DB
          response.json().then(json => {
            console.log(json);
          })
        } else {
          // unexpected error
          console.log(response);
        }
      }
    )
  }

  useEffect(() => {
    console.log(props);
    getProfile();
  }, [props])

  const [imageToPreview, setImageToPreview] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [uploadData, setUploadData] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [fb, setFB] = useState("");
  const [insta, setInsta] = useState("");
  const [twit, setTwit] = useState("");
  const [bio, setBio] = useState("");



  return (
    <div style={root}>
      {showModal && (
        <ImageBanner backgroundColor="rgba(200, 200, 200, .9)" >
          <div style={imgContainer} >
            <img style={img} src={imageToPreview} />
          </div>
        </ImageBanner>
      )}
      <div className="container-fluid">
        <div className="row flex-wrap" style={header}>
          <div className="col-md-7 col-sm-12" style={{ marginTop: "5%", paddingRight: "2%" }} >
            {/* <p style={{ color: "#828282", fontFamily: "sans-serif", fontWeight: "bold" }}>WHAT WE DO</p> */}
            <h1 style={{ fontSize: "3em", margin: "0px" }}>Hi! I'm {firstName} {lastName}</h1>
            <div className="row flex-wrap" >
              <div className="col-md-5 col-sm-12" >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <img src={profilePic}/>
                  <div className="row">
                    {fb != null ?
                      <>
                        <svg width="15%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10.152 21.6H13.6679V12.84H16.6079L17.0519 9.43202H13.6679V7.24802C13.6679 6.26402 13.9439 5.59202 15.3599 5.59202H17.1719V2.53202C16.8599 2.49602 15.7919 2.40002 14.5439 2.40002C11.9279 2.40002 10.152 3.99602 10.152 6.91202V9.43202H7.19995V12.84H10.152V21.6Z" fill="black" />
                        </svg>
                      </> : <> </>
                    }
                    {insta != null ?
                      <>
                        <svg width="15%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12.0003 0C8.73858 0 8.33208 0.01575 7.05558 0.06975C5.77383 0.13275 4.90683 0.3315 4.14183 0.6285C3.34118 0.930765 2.61608 1.40401 2.01708 2.01525C1.40414 2.61285 0.930629 3.33835 0.630331 4.14C0.333331 4.905 0.134581 5.772 0.0715811 7.05375C0.0138311 8.331 0.00183105 8.73675 0.00183105 11.9985C0.00183105 15.2603 0.0175811 15.6667 0.0715811 16.9432C0.134581 18.2212 0.333331 19.092 0.630331 19.857C0.932596 20.6577 1.40584 21.3828 2.01708 21.9818C2.61468 22.5947 3.34018 23.0682 4.14183 23.3685C4.90683 23.6618 5.77758 23.8642 7.05558 23.9272C8.33283 23.985 8.73858 23.997 12.0003 23.997C15.2621 23.997 15.6686 23.9812 16.9451 23.9272C18.2231 23.8642 19.0938 23.661 19.8588 23.3685C20.6595 23.0662 21.3846 22.593 21.9836 21.9818C22.5973 21.3848 23.0709 20.6591 23.3703 19.857C23.6636 19.092 23.8661 18.2212 23.9291 16.9432C23.9868 15.666 23.9988 15.2603 23.9988 11.9985C23.9988 8.73675 23.9831 8.33025 23.9291 7.05375C23.8661 5.77575 23.6628 4.9005 23.3703 4.14C23.0681 3.33935 22.5948 2.61425 21.9836 2.01525C21.3866 1.40152 20.6609 0.927885 19.8588 0.6285C19.0938 0.3315 18.2231 0.13275 16.9451 0.06975C15.6678 0.012 15.2621 0 12.0003 0ZM12.0003 2.16C15.2036 2.16 15.5861 2.17575 16.8521 2.22975C18.0198 2.2845 18.6558 2.4795 19.0781 2.6445C19.6001 2.83719 20.0726 3.14389 20.4611 3.54225C20.8588 3.92912 21.1643 4.40051 21.3551 4.9215C21.5201 5.34375 21.7151 5.97975 21.7698 7.1475C21.8238 8.4135 21.8396 8.79675 21.8396 11.9992C21.8396 15.2017 21.8238 15.585 21.7653 16.851C21.7023 18.0188 21.5073 18.6548 21.3431 19.077C21.1158 19.6403 20.8623 20.034 20.4438 20.46C20.054 20.8559 19.5818 21.1611 19.0608 21.354C18.6438 21.519 17.9988 21.714 16.8266 21.7687C15.5538 21.8227 15.1788 21.8385 11.9673 21.8385C8.75583 21.8385 8.38158 21.8227 7.10733 21.7642C5.93958 21.7012 5.29533 21.5062 4.87308 21.342C4.30308 21.1147 3.91233 20.8612 3.49383 20.4427C3.07158 20.0205 2.80308 19.6185 2.59608 19.0598C2.42808 18.6428 2.23608 17.9977 2.17383 16.8255C2.13108 15.5677 2.11083 15.1778 2.11083 11.9813C2.11083 8.78625 2.13108 8.3955 2.17383 7.122C2.23608 5.94975 2.42808 5.30625 2.59608 4.88775C2.80308 4.317 3.07233 3.927 3.49383 3.50475C3.91158 3.087 4.30308 2.817 4.87308 2.6055C5.29533 2.44125 5.92383 2.24625 7.09608 2.18775C8.36883 2.142 8.74383 2.1255 11.9508 2.1255L12.0003 2.16ZM12.0003 5.84025C11.1913 5.83995 10.3902 5.99908 9.64275 6.30853C8.89528 6.61798 8.21611 7.0717 7.64407 7.64374C7.07203 8.21578 6.61831 8.89495 6.30886 9.64242C5.99941 10.3899 5.84029 11.191 5.84058 12C5.84029 12.809 5.99941 13.6101 6.30886 14.3576C6.61831 15.1051 7.07203 15.7842 7.64407 16.3563C8.21611 16.9283 8.89528 17.382 9.64275 17.6915C10.3902 18.0009 11.1913 18.16 12.0003 18.1597C12.8093 18.16 13.6104 18.0009 14.3579 17.6915C15.1054 17.382 15.7845 16.9283 16.3566 16.3563C16.9286 15.7842 17.3823 15.1051 17.6918 14.3576C18.0012 13.6101 18.1604 12.809 18.1601 12C18.1604 11.191 18.0012 10.3899 17.6918 9.64242C17.3823 8.89495 16.9286 8.21578 16.3566 7.64374C15.7845 7.0717 15.1054 6.61798 14.3579 6.30853C13.6104 5.99908 12.8093 5.83995 12.0003 5.84025V5.84025ZM12.0003 15.9998C9.78933 15.9998 8.00058 14.211 8.00058 12C8.00058 9.789 9.78933 8.00025 12.0003 8.00025C14.2113 8.00025 16.0001 9.789 16.0001 12C16.0001 14.211 14.2113 15.9998 12.0003 15.9998ZM19.8483 5.59425C19.8479 5.9765 19.6958 6.34296 19.4254 6.61311C19.1549 6.88326 18.7883 7.035 18.4061 7.035C18.2171 7.035 18.0299 6.99777 17.8553 6.92544C17.6807 6.85311 17.522 6.7471 17.3884 6.61345C17.2547 6.47981 17.1487 6.32115 17.0764 6.14653C17.0041 5.97191 16.9668 5.78475 16.9668 5.59575C16.9668 5.40674 17.0041 5.21959 17.0764 5.04497C17.1487 4.87036 17.2547 4.71169 17.3884 4.57805C17.522 4.4444 17.6807 4.33839 17.8553 4.26606C18.0299 4.19373 18.2171 4.1565 18.4061 4.1565C19.1988 4.1565 19.8483 4.8015 19.8483 5.59425V5.59425Z" fill="black" />
                        </svg>
                      </> : <> </>
                    }
                    {twit != null ?
                      <>
                        <svg width="15%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12.0003 0C8.73858 0 8.33208 0.01575 7.05558 0.06975C5.77383 0.13275 4.90683 0.3315 4.14183 0.6285C3.34118 0.930765 2.61608 1.40401 2.01708 2.01525C1.40414 2.61285 0.930629 3.33835 0.630331 4.14C0.333331 4.905 0.134581 5.772 0.0715811 7.05375C0.0138311 8.331 0.00183105 8.73675 0.00183105 11.9985C0.00183105 15.2603 0.0175811 15.6667 0.0715811 16.9432C0.134581 18.2212 0.333331 19.092 0.630331 19.857C0.932596 20.6577 1.40584 21.3828 2.01708 21.9818C2.61468 22.5947 3.34018 23.0682 4.14183 23.3685C4.90683 23.6618 5.77758 23.8642 7.05558 23.9272C8.33283 23.985 8.73858 23.997 12.0003 23.997C15.2621 23.997 15.6686 23.9812 16.9451 23.9272C18.2231 23.8642 19.0938 23.661 19.8588 23.3685C20.6595 23.0662 21.3846 22.593 21.9836 21.9818C22.5973 21.3848 23.0709 20.6591 23.3703 19.857C23.6636 19.092 23.8661 18.2212 23.9291 16.9432C23.9868 15.666 23.9988 15.2603 23.9988 11.9985C23.9988 8.73675 23.9831 8.33025 23.9291 7.05375C23.8661 5.77575 23.6628 4.9005 23.3703 4.14C23.0681 3.33935 22.5948 2.61425 21.9836 2.01525C21.3866 1.40152 20.6609 0.927885 19.8588 0.6285C19.0938 0.3315 18.2231 0.13275 16.9451 0.06975C15.6678 0.012 15.2621 0 12.0003 0ZM12.0003 2.16C15.2036 2.16 15.5861 2.17575 16.8521 2.22975C18.0198 2.2845 18.6558 2.4795 19.0781 2.6445C19.6001 2.83719 20.0726 3.14389 20.4611 3.54225C20.8588 3.92912 21.1643 4.40051 21.3551 4.9215C21.5201 5.34375 21.7151 5.97975 21.7698 7.1475C21.8238 8.4135 21.8396 8.79675 21.8396 11.9992C21.8396 15.2017 21.8238 15.585 21.7653 16.851C21.7023 18.0188 21.5073 18.6548 21.3431 19.077C21.1158 19.6403 20.8623 20.034 20.4438 20.46C20.054 20.8559 19.5818 21.1611 19.0608 21.354C18.6438 21.519 17.9988 21.714 16.8266 21.7687C15.5538 21.8227 15.1788 21.8385 11.9673 21.8385C8.75583 21.8385 8.38158 21.8227 7.10733 21.7642C5.93958 21.7012 5.29533 21.5062 4.87308 21.342C4.30308 21.1147 3.91233 20.8612 3.49383 20.4427C3.07158 20.0205 2.80308 19.6185 2.59608 19.0598C2.42808 18.6428 2.23608 17.9977 2.17383 16.8255C2.13108 15.5677 2.11083 15.1778 2.11083 11.9813C2.11083 8.78625 2.13108 8.3955 2.17383 7.122C2.23608 5.94975 2.42808 5.30625 2.59608 4.88775C2.80308 4.317 3.07233 3.927 3.49383 3.50475C3.91158 3.087 4.30308 2.817 4.87308 2.6055C5.29533 2.44125 5.92383 2.24625 7.09608 2.18775C8.36883 2.142 8.74383 2.1255 11.9508 2.1255L12.0003 2.16ZM12.0003 5.84025C11.1913 5.83995 10.3902 5.99908 9.64275 6.30853C8.89528 6.61798 8.21611 7.0717 7.64407 7.64374C7.07203 8.21578 6.61831 8.89495 6.30886 9.64242C5.99941 10.3899 5.84029 11.191 5.84058 12C5.84029 12.809 5.99941 13.6101 6.30886 14.3576C6.61831 15.1051 7.07203 15.7842 7.64407 16.3563C8.21611 16.9283 8.89528 17.382 9.64275 17.6915C10.3902 18.0009 11.1913 18.16 12.0003 18.1597C12.8093 18.16 13.6104 18.0009 14.3579 17.6915C15.1054 17.382 15.7845 16.9283 16.3566 16.3563C16.9286 15.7842 17.3823 15.1051 17.6918 14.3576C18.0012 13.6101 18.1604 12.809 18.1601 12C18.1604 11.191 18.0012 10.3899 17.6918 9.64242C17.3823 8.89495 16.9286 8.21578 16.3566 7.64374C15.7845 7.0717 15.1054 6.61798 14.3579 6.30853C13.6104 5.99908 12.8093 5.83995 12.0003 5.84025V5.84025ZM12.0003 15.9998C9.78933 15.9998 8.00058 14.211 8.00058 12C8.00058 9.789 9.78933 8.00025 12.0003 8.00025C14.2113 8.00025 16.0001 9.789 16.0001 12C16.0001 14.211 14.2113 15.9998 12.0003 15.9998ZM19.8483 5.59425C19.8479 5.9765 19.6958 6.34296 19.4254 6.61311C19.1549 6.88326 18.7883 7.035 18.4061 7.035C18.2171 7.035 18.0299 6.99777 17.8553 6.92544C17.6807 6.85311 17.522 6.7471 17.3884 6.61345C17.2547 6.47981 17.1487 6.32115 17.0764 6.14653C17.0041 5.97191 16.9668 5.78475 16.9668 5.59575C16.9668 5.40674 17.0041 5.21959 17.0764 5.04497C17.1487 4.87036 17.2547 4.71169 17.3884 4.57805C17.522 4.4444 17.6807 4.33839 17.8553 4.26606C18.0299 4.19373 18.2171 4.1565 18.4061 4.1565C19.1988 4.1565 19.8483 4.8015 19.8483 5.59425V5.59425Z" fill="black" />
                        </svg>
                      </> : <> </>
                    }
                  </div>
                </div>
              </div>
              <div className="col-md-7 col-sm-12" >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <a style={{ fontSize: "1rem" }}>{bio}</a>
                  <div style={uploadsContainer} >
                    { uploadData.map(function (file, index) {
                        return (
                          <div key={index} style={imgContainer} onClick={() => {
                            console.log("hey im being clicked");
                            setImageToPreview("data:*/*;base64," + file[1]);
                            setShowModal(true);
                          }}>
                            <img style={img} src={"data:*/*;base64," + file[1]} />
                          </div>
                        )
                      })}
                  </div>
                </div>
              </div>
            </div>
            <div style={uploadsContainer} >
              {
                uploadData.map(function (file, index) {
                  return (
                    <div key={index} style={imgContainer} onClick={() => {
                      setImageToPreview(file);
                      setShowModal(true);
                    }}>
                      <img style={img} src={"data:*/*;base64," + file} />
                    </div>
                  )
                })
              }
            </div>
          </div>
          </div>
          <PrimaryButton onClick={() => deleteUser(toke)}></PrimaryButton>
        </div>
    </div>
  )
}

export default Profile;