import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from '../Images/logo.png';
import imagePlaceholder from '../Images/img_ph.png';
import Swal from 'sweetalert2';

function FileUploadPage(props) {
	const [imageSrc, setImageSrc] = useState();

	const [accessToken, setAccessToken] = useState({});
	const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

	const onFileChange = (event) => {
		setSelectedFile(event.target.files[0]);
		setImageSrc(URL.createObjectURL(event.target.files[0]));
		console.log(URL.createObjectURL(event.target.files[0]));
		setIsFilePicked(true);
	};

	useEffect(() => {
		handleResponse();
	}, []);

	/**
	 * Send file to the server to handle Google drive save
	 */
	const onFileUpload = () => {
		const formData = new FormData();

		formData.append('token', `${JSON.stringify(accessToken)}`);
		formData.append('file', selectedFile);

		const requestOptions = {
			method: 'POST',
			body: formData,
			redirect: 'follow',
		};

		fetch('http://localhost:5000/fileUpload', requestOptions)
			.then((response) => response.text())
			.then((result) => {
				Swal.fire({
					title: 'Upload Completed',
					text: 'Photo Saved to Google Drive',
					imageUrl: imageSrc,
					imageHeight: 400,
					imageAlt: 'Uploaded image',
					confirmButtonColor: '#808080',
					confirmButtonText: 'Done',
				}).finally(() => {
          setIsFilePicked(false);
				});

				console.log(result);
			})
			.catch((error) => console.log('error', error));
	};

	/**
	 * Handles call back response from Facebook authorization
	 */
	const handleResponse = async () => {
		// Separate the authorization code from URL
		const authCode = props.location.search
			.split('?code=')[1]
			.split('&scope=')[0];

		console.log(`Auth code received successfully. Code: ${authCode}`);

		// Request the user images by using Access token
		const res = await axios.post('http://localhost:5000/getToken', {
			code: authCode,
		});

		setAccessToken(res.data);
		console.log(
			`Access token received successfully. Access token: ${authCode}`
		);
	};

	return (
		<section>
			{' '}
			<nav className='navbar navbar-light bg-light'>
				<div className='container-fluid'>
					<div>
						<a className='navbar-brand' href='/'>
							<img
								src={logo}
								alt='FB Manager'
								width='30'
								height='30'
								className='d-inline-block align-text-top'
							/>
							<span className='m-1'></span>
							<div className='pr-2 d-inline-block align-text-middle'>
								<h5>Photo Saver</h5>
							</div>
						</a>
					</div>
				</div>
			</nav>
			<div className='container'>
				<br />
				<br />
				<div className='mb-3'>
					<input
						className='form-control'
						type='file'
						onChange={onFileChange}
					/>
				</div>

				{isFilePicked ? (
					<div className='mb-3 img-placeholder'>
						<img
							src={imageSrc}
							alt='selected file'
							className='d-inline-block img-selected-pic'
						/>
					</div>
				) : (
					<div className='mb-3 img-placeholder'>
						<img
							src={imagePlaceholder}
							alt='selected file'
							className='d-inline-block img-selected-placeholder'
						/>
						<h6>Select an image to preview</h6>
					</div>
				)}

				<div className='mb-3'>
					{isFilePicked ? (
						<div>
							<p>Filename: {selectedFile.name}</p>
							<p>Filetype: {selectedFile.type}</p>
							<p>Size in bytes: {selectedFile.size}</p>
						</div>
					) : (
						<p>Select a file to show details</p>
					)}
				</div>
				<button
					type='button'
					className='btn-google-save'
					onClick={onFileUpload}
				>
					<i className='fa fa-google m-3' />
					Save to Drive
				</button>
			</div>
		</section>
	);
}

export default FileUploadPage;
