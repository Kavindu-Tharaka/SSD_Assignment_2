import React, { useState } from "react";
import path from "path";
// import { google } from "googleapis";
import axios from 'axios'

function DriveUploadPage() {
  const [imageDetails, setImageDetails] = useState();


  const onFileChange = async (e) => {
    e.preventDefault();
    const image = e.target.files[0]
    let base64 = await convertToBase64(image)
    base64 = base64.split(',')[1]
    console.log(base64)
    // console.log(e.target.files[0].name);
    // const image_base_64 = URL.createObjectURL(e.target.files[0]);
    // const image_file = e.target.files[0];

    setImageDetails({
      image: base64,
      file: 'data',
    });
  };


  const convertToBase64 = file => {
    return new Promise((resolve,reject) => {
      const filereader = new FileReader();
      filereader.readAsDataURL(file);

      filereader.onload = () => {
        resolve(filereader.result)
      }

      filereader.onerror = error => {
        reject(error)
      }
    })
  }


  const onSubmit = async () => {
    try {
      console.log('shdbaj')
      const res =  await axios.post("/upload",{
        data:imageDetails
      })
    } catch (error) {
      
    }
    // console.log(imageDetails);
    // const formdata = new FormData();
    // formdata.append("data", imageDetails.image);
    // formdata.append("file_details", imageDetails.file);
    // uploadtoDrive();
  };

  return (
    <>
      {/* <form onSubmit={onSubmitHandler}> */}
      <input type="file" onChange={onFileChange} />
      <button
        className="btn btn-primary btn-lg mt-5"
        type="submit"
        onClick={onSubmit}
      >
        Upload Images to Drive
      </button>

      {/* </form> */}
    </>
  );
}

export default DriveUploadPage;
