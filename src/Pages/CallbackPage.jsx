import axios from 'axios';
import React, { useEffect, useState } from 'react';
import logo from '../Images/logo.png';
import Swal from 'sweetalert2';

function CallbackPage(props) {
	let clientId =
		'292393918085-j29elmvnrmuomuep37j5umufmegilqnp.apps.googleusercontent.com';

	let redirect_uri = 'http://localhost:3000/facebookapp/callback';

	let scope = 'https://www.googleapis.com/auth/drive';

	const url =
		'https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=' +
		redirect_uri +
		'&prompt=consent&response_type=code&client_id=' +
		clientId +
		'&scope=' +
		scope +
		'&access_type=offline';

	const [albums, setAlbums] = useState([]);
	const [profilePictureUrl, setProfilePictureUrl] = useState('');
	const [userName, setUserName] = useState('');
	const images = [];

	useEffect(() => {
		handleResponse();
		if (localStorage.getItem('GAuth') === 'true') {
			Swal.fire('Hello world!');
		}
	}, []);

	const handleResponse = async () => {
		const code = props.location.search
			.split('?code=')[1]
			.split('&state=')[0];

		const initResponse = await axios.get(
			`https://graph.facebook.com/v11.0/oauth/access_token?client_id=579207406764914&redirect_uri=http://localhost:3000/facebookapp/callback&client_secret=7713750fdf1076a02df161d4ec8444d9&code=${code}`
		);

		let url = `https://graph.facebook.com/me?fields=id,name,picture.width(100).height(100).as(picture_small),albums{photos{images,id}}&access_token=${initResponse.data.access_token}`;

		const response = await axios.get(url);

		setUserName(response.data.name);
		setProfilePictureUrl(response.data.picture_small.data.url);

		extractImages(response);
	};

	const extractImages = (response) => {
		/* reading inner arrays using foreach loop */
		response.data.albums.data.forEach((element) => {
			if (element.photos.data.length !== 1) {
				element.photos.data.forEach((inElement) => {
					images.push({
						id: inElement.id,
						url: inElement.images[0].source,
					});
				});
				setAlbums([...images]);
			}
		});
	};

	const handleSaveToDriveClick = (url) => {
		if (localStorage.getItem('GAuth') !== 'true') {
			handleGoogleAuth();
		} else {
			saveToDrive(url);
		}
	};

	const handleGoogleAuth = () => {
		localStorage.setItem('GAuth', 'true');
		window.location.href = url;
	};

	const saveToDrive = async (url) => {
		axios
			.post('http://localhost:5000/upload', {
				data: url,
			})
			.then((response) => {
				console.log(response);
				Swal.fire({
					title: 'Upload Completed',
					text: 'Photo Saved to Google Drive',
					imageUrl: url,
					imageWidth: 400,
					imageHeight: 400,
					imageAlt: 'Uploaded image',
					confirmButtonColor: '#808080',
					confirmButtonText: 'Done',
				});
			})
			.error((error) => {
				console.log(error);
			});
	};

	return (
		<div>
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
					<div>
						<img
							src={profilePictureUrl}
							alt='profile'
							className='d-inline-block img-profile-pic'
						/>
						<h5 className='d-inline-block m-0'>{userName}</h5>
					</div>
				</div>
			</nav>

			<br />
			<div className='container'>
				<p className='text-left fw-bold'>You logged in as {userName}</p>
				<p className='text-left'>
					Download or Upload Your Facebook Photos to your Google Drive
					directly with Photo Saver
				</p>
				<hr />
				<h4 className='text-left'>
					Your Photos{' '}
					<span className='badge bg-secondarybadge bg-secondary'>
						{albums.length}
					</span>
				</h4>
				<br />

				<div className='row row-cols-1 row-cols-xl-4 row-cols-lg-4 row-cols-md-3 row-cols-sm-2'>
					{albums.map((image) => (
						<div className='col mb-4' key={image.id}>
							<div className='image-card card p-2 shadow-sm p-3 mb-5 bg-white rounded d-grid gap-2'>
								<img
									className='gallery-image'
									src={image.url}
									alt={image.id}
								/>

								<a
									className='m-0 btn btn-sm btn-primary'
									href={image.url}
									download
								>
									<i className='fa fa-download' />
									<span className='m-1'></span>
									Download
								</a>

								<button
									type='button'
									className='btn btn-sm btn-danger'
									onClick={() => {
										handleSaveToDriveClick(image.url);
									}}
								>
									<i className='fa fa-google' />
									<span className='m-1'></span>
									Save to Drive
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default CallbackPage;
