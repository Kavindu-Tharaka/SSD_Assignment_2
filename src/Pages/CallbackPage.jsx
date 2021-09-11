import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';

function CallbackPage(props) {
	const [albums, setAlbums] = useState([]);
	const images = [];

	useEffect(() => {
		handleResponse();
	}, []);

	const handleResponse = async () => {
		const code = props.location.search
			.split('?code=')[1]
			.split('&state=')[0];

		const initResponse = await axios.get(
			`https://graph.facebook.com/v11.0/oauth/access_token?client_id=579207406764914&redirect_uri=http://localhost:3000/facebookapp/callback&client_secret=7713750fdf1076a02df161d4ec8444d9&code=${code}`
		);

		let url = `https://graph.facebook.com/me?fields=albums{photos{images,id}}&access_token=${initResponse.data.access_token}`;

		const response = await axios.get(url);

		extractImages(response);
	};

	const extractImages = (response) => {
		/* reading inner arrays using foreach loop */
		response.data.albums.data.forEach((element) => {
			if (element.photos.data.length !== 1) {
				console.log(`Array Size is ${element.photos.data.length}`);
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

	return (
		<div>
			<Navbar />
			{albums.map((image) => (
				<img
					src={image.url}
					key={image.id}
					alt={image.id}
					width='250'
				/>
			))}
		</div>
	);
}

export default CallbackPage;
