import React, { useEffect, useState } from 'react';
import path from 'path';
import axios from 'axios';

function FileUploadPage(props) {
	const [accessToken, setAccessToken] = useState({});
	const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

	const onFileChange = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

	const onFileUpload = () => {
		const formData = new FormData();

		formData.append('token', accessToken);
		formData.append('file', selectedFile);

		console.log(accessToken);
		console.log(`Form Details: ${formData}`);

		axios
			.post('http://localhost:5000/fileUpload', {
				data: formData,
				headers: { 'Content-Type': 'multipart/form-data' },
			})
			.then((res) => {
				console.log(res);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		handleResponse();
	}, []);

	/**
	 * Handles call back response from Facebook authorization
	 */
	const handleResponse = async () => {
		// Separate the authorization code from URL
		const authCode = props.location.search
			.split('?code=')[1]
			.split('&scope=')[0];

		console.log(authCode);

		// Request the user images by using Access token
		const res = await axios.post('http://localhost:5000/getToken', {
			code: authCode,
		});

		setAccessToken(res.data);
		console.log(res.data);
	};

	return (
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
			<div className='mb-3'>
				{isFilePicked ? (
					<div>
						<p>Filename: {selectedFile.name}</p>
						<p>Filetype: {selectedFile.type}</p>
						<p>Size in bytes: {selectedFile.size}</p>
						<p>
							lastModifiedDate:{' '}
							{selectedFile.lastModifiedDate.toLocaleDateString()}
						</p>
					</div>
				) : (
					<p>Select a file to show details</p>
				)}
			</div>
			<button
				type='button'
				className='btn btn-primary'
				onClick={onFileUpload}
			>
				Upload
			</button>
		</div>
	);
}

export default FileUploadPage;
