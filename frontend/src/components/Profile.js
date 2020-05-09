import React, { useState, useEffect } from 'react';
import { ImageBanner } from '../shared/banner';
import { SecondaryButton } from '../shared/ButtonComponents.js';


function Profile(props) {

  const [imageToPreview, setImageToPreview] = useState("");
  const [captionToPreview, setCaptionToPreview] = useState("");
  const [showModal, setShowModal] = useState(false);

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

  const upload = {
    objectFit: "cover",
    maxHeight: "4rem",
    height: "auto",
    width: "10%vw",
    borderRadius: "6px",

  }

  const uploadsContainer = {
    display: "flex",
    flexDirection: "row",
  }

  const imgContainer = {
    width: "100%",
    height: "100%",
    position: "relative",
  }

  return (
    <div style={root}>
      {showModal && (
        <div onClick={() => setShowModal(false)}>
          <ImageBanner backgroundColor="rgba(200, 200, 200, .9)" >
            <div style={imgContainer} >
              <img style={{ ...upload, maxHeight: "30rem" }} src={imageToPreview} />
              {console.log(captionToPreview)}
              <h1>{captionToPreview}</h1>
            </div>
          </ImageBanner>
        </div>
      )}
      <div className="container-fluid">
        <div className="row flex-wrap" style={header}>
          <h1 style={{ fontSize: "3em", margin: "0px" }}>Hi! I'm {props.first_name} {props.last_name}</h1>
          <div className="row mt-2">
            <div className="col-md-4 col-sm-12" style={{ justifyContent: "center" }} >
              <img src={"data:*/*;base64," + props.prof_pic} style={{
                width: "25vw",
                borderRadius: "6px"
              }} />

              <div className="row mx-1 my-1">
                {props.social_media_links[0] != "" ?
                    <svg className="mr-1" width="2vw" height="auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <a target="_blank" href={props.social_media_links[0]}>

                      <path d="M10.152 21.6H13.6679V12.84H16.6079L17.0519 9.43202H13.6679V7.24802C13.6679 6.26402 13.9439 5.59202 15.3599 5.59202H17.1719V2.53202C16.8599 2.49602 15.7919 2.40002 14.5439 2.40002C11.9279 2.40002 10.152 3.99602 10.152 6.91202V9.43202H7.19995V12.84H10.152V21.6Z" fill="black" />
                    </a>
                    </svg>
                   : <> </>
                }
                {props.social_media_links[1] != "" ?
                  <svg className="mr-1" width="2vw" height="auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <a target="_blank" href={props.social_media_links[1]}>
                      <path d="M12.0003 0C8.73858 0 8.33208 0.01575 7.05558 0.06975C5.77383 0.13275 4.90683 0.3315 4.14183 0.6285C3.34118 0.930765 2.61608 1.40401 2.01708 2.01525C1.40414 2.61285 0.930629 3.33835 0.630331 4.14C0.333331 4.905 0.134581 5.772 0.0715811 7.05375C0.0138311 8.331 0.00183105 8.73675 0.00183105 11.9985C0.00183105 15.2603 0.0175811 15.6667 0.0715811 16.9432C0.134581 18.2212 0.333331 19.092 0.630331 19.857C0.932596 20.6577 1.40584 21.3828 2.01708 21.9818C2.61468 22.5947 3.34018 23.0682 4.14183 23.3685C4.90683 23.6618 5.77758 23.8642 7.05558 23.9272C8.33283 23.985 8.73858 23.997 12.0003 23.997C15.2621 23.997 15.6686 23.9812 16.9451 23.9272C18.2231 23.8642 19.0938 23.661 19.8588 23.3685C20.6595 23.0662 21.3846 22.593 21.9836 21.9818C22.5973 21.3848 23.0709 20.6591 23.3703 19.857C23.6636 19.092 23.8661 18.2212 23.9291 16.9432C23.9868 15.666 23.9988 15.2603 23.9988 11.9985C23.9988 8.73675 23.9831 8.33025 23.9291 7.05375C23.8661 5.77575 23.6628 4.9005 23.3703 4.14C23.0681 3.33935 22.5948 2.61425 21.9836 2.01525C21.3866 1.40152 20.6609 0.927885 19.8588 0.6285C19.0938 0.3315 18.2231 0.13275 16.9451 0.06975C15.6678 0.012 15.2621 0 12.0003 0ZM12.0003 2.16C15.2036 2.16 15.5861 2.17575 16.8521 2.22975C18.0198 2.2845 18.6558 2.4795 19.0781 2.6445C19.6001 2.83719 20.0726 3.14389 20.4611 3.54225C20.8588 3.92912 21.1643 4.40051 21.3551 4.9215C21.5201 5.34375 21.7151 5.97975 21.7698 7.1475C21.8238 8.4135 21.8396 8.79675 21.8396 11.9992C21.8396 15.2017 21.8238 15.585 21.7653 16.851C21.7023 18.0188 21.5073 18.6548 21.3431 19.077C21.1158 19.6403 20.8623 20.034 20.4438 20.46C20.054 20.8559 19.5818 21.1611 19.0608 21.354C18.6438 21.519 17.9988 21.714 16.8266 21.7687C15.5538 21.8227 15.1788 21.8385 11.9673 21.8385C8.75583 21.8385 8.38158 21.8227 7.10733 21.7642C5.93958 21.7012 5.29533 21.5062 4.87308 21.342C4.30308 21.1147 3.91233 20.8612 3.49383 20.4427C3.07158 20.0205 2.80308 19.6185 2.59608 19.0598C2.42808 18.6428 2.23608 17.9977 2.17383 16.8255C2.13108 15.5677 2.11083 15.1778 2.11083 11.9813C2.11083 8.78625 2.13108 8.3955 2.17383 7.122C2.23608 5.94975 2.42808 5.30625 2.59608 4.88775C2.80308 4.317 3.07233 3.927 3.49383 3.50475C3.91158 3.087 4.30308 2.817 4.87308 2.6055C5.29533 2.44125 5.92383 2.24625 7.09608 2.18775C8.36883 2.142 8.74383 2.1255 11.9508 2.1255L12.0003 2.16ZM12.0003 5.84025C11.1913 5.83995 10.3902 5.99908 9.64275 6.30853C8.89528 6.61798 8.21611 7.0717 7.64407 7.64374C7.07203 8.21578 6.61831 8.89495 6.30886 9.64242C5.99941 10.3899 5.84029 11.191 5.84058 12C5.84029 12.809 5.99941 13.6101 6.30886 14.3576C6.61831 15.1051 7.07203 15.7842 7.64407 16.3563C8.21611 16.9283 8.89528 17.382 9.64275 17.6915C10.3902 18.0009 11.1913 18.16 12.0003 18.1597C12.8093 18.16 13.6104 18.0009 14.3579 17.6915C15.1054 17.382 15.7845 16.9283 16.3566 16.3563C16.9286 15.7842 17.3823 15.1051 17.6918 14.3576C18.0012 13.6101 18.1604 12.809 18.1601 12C18.1604 11.191 18.0012 10.3899 17.6918 9.64242C17.3823 8.89495 16.9286 8.21578 16.3566 7.64374C15.7845 7.0717 15.1054 6.61798 14.3579 6.30853C13.6104 5.99908 12.8093 5.83995 12.0003 5.84025V5.84025ZM12.0003 15.9998C9.78933 15.9998 8.00058 14.211 8.00058 12C8.00058 9.789 9.78933 8.00025 12.0003 8.00025C14.2113 8.00025 16.0001 9.789 16.0001 12C16.0001 14.211 14.2113 15.9998 12.0003 15.9998ZM19.8483 5.59425C19.8479 5.9765 19.6958 6.34296 19.4254 6.61311C19.1549 6.88326 18.7883 7.035 18.4061 7.035C18.2171 7.035 18.0299 6.99777 17.8553 6.92544C17.6807 6.85311 17.522 6.7471 17.3884 6.61345C17.2547 6.47981 17.1487 6.32115 17.0764 6.14653C17.0041 5.97191 16.9668 5.78475 16.9668 5.59575C16.9668 5.40674 17.0041 5.21959 17.0764 5.04497C17.1487 4.87036 17.2547 4.71169 17.3884 4.57805C17.522 4.4444 17.6807 4.33839 17.8553 4.26606C18.0299 4.19373 18.2171 4.1565 18.4061 4.1565C19.1988 4.1565 19.8483 4.8015 19.8483 5.59425V5.59425Z" fill="black" />
                    </a>
                    </svg>
                   : <> </>
                }
                {props.social_media_links[2] != "" ?
                  <svg className="mr-1" width="2vw" height="auto" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <a target="_blank" href={props.social_media_links[2]}>
                      <path d="M21 2.22771L18.75 2.60113L20.25 0.734056L17.625 1.48089C14.25 -2.25326 9 1.8543 10.5 5.21503C4.5 5.21503 1.5 0.734056 1.5 0.734056C1.5 0.734056 -0.75 4.09479 3 6.70869L0.75 5.96186C0.75 8.20235 2.25 9.69601 4.875 10.4428H2.25C3.75 13.4302 6.375 13.4302 6.375 13.4302C6.375 13.4302 4.125 15.2972 0 15.2972C12.375 21.2719 19.875 10.0694 18.75 4.09479L21 2.22771Z" fill="black" />
                    </a>
                    </svg>

                   : <> </>
                }
              </div>
            </div>

              <div className="col-md-8 col-sm-12" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "left", alignSelf: "flex-start" }}>
                <a style={{ fontSize: "1rem" }}>{props.bio}</a>
                <hr></hr>
                <a style={{fontSize: "70%"}}>Your Uploads</a>
                <div style={uploadsContainer} >
                  {props.uploads != null &&
                    props.uploads.map(function (file, index) {
                      return (
                        <div key={index} style={{marginRight: "3%"}} onClick={() => {
                          setImageToPreview("data:*/*;base64," + file[1]);
                          setCaptionToPreview(file[0]);
                          setShowModal(true);
                        }}>
                          <img style={upload} src={"data:*/*;base64," + file[1]} />
                        </div>
                      )
                    })
                  }
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;