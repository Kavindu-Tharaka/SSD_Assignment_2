import React,{useState} from "react";
import path from 'path'

function DriveUploadPage() {
    const [imageDetails,setImageDetails] = useState()

    const onFileChange = (e) => {
        e.preventDefault()
       console.log(e.target.files[0].name)
       const image_base_64 = URL.createObjectURL(e.target.files[0])
       const image_file = e.target.files[0]

       setImageDetails({
         image:image_base_64,
         file:image_file
       })
    }


    const onSubmit = () => {
      console.log(imageDetails)
      const formdata =new FormData()
      formdata.append('data', imageDetails.image)
      formdata.append('file_details', imageDetails.file)
    }


  return (
    <>
    {/* <form onSubmit={onSubmitHandler}> */}
      <input type="file" onChange={onFileChange}/>
      <button className="btn btn-primary btn-lg mt-5" type="submit" onClick={onSubmit}>
        Upload Images to Drive
      </button>
      
    {/* </form> */}
    </>
  );
}

export default DriveUploadPage;
