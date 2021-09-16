import React, { useState } from "react";
import path from "path";
// import { google } from "googleapis";
import axios from 'axios'

function UploadPage() {
  /*
  sending the selected image to backend for uploading
  */
  const onSubmit = async (url) => {
    try {
      const res =  await axios.post("http://localhost:5000/upload",{
        data:url
      })
    } catch (error) {
      console.log(error)
    }
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

export default UploadPage;
