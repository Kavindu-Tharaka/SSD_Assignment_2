import React from 'react';
import logo from '../Images/logo.png';
import banner from '../Images/banner.gif';
import axios from 'axios';

function SigninPage() {
	/**
	 * Redirect user to login with Facebook
	 */
	async function handleFBLogin() {
		localStorage.clear();

		window.location.href =
			'http://www.facebook.com/v11.0/dialog/oauth?response_type=code&client_id=579207406764914&redirect_uri=http://localhost:3000/facebookapp/callback&scope=public_profile%20user_posts%20user_friends%20user_photos%20user_photos&state=123';
	}

	/**
	 * Redirect user to login with Google
	 */
	async function handleGoogleLogin() {
		localStorage.clear();

		// Get Auth URL from the server and redirect to login
		try {
			const res = await axios.get('http://localhost:5000/getAuthURL');
			console.log(res);
			window.location.href = res.data;
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div>
			<nav className='navbar navbar-light nav-bar shadow p-3 mb-5 bg-body'>
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
			</nav>{' '}
			<br />
			<div className='container home-container'>
				<h1 className='mt-5 text-primary'>Facebook Photo Saver</h1>{' '}
				<hr />
				<p className='mb-5 text-secondary'>
					Helps your to save all the Facebook photos to your Google
					Drive directly
				</p>
				<div className='card banner p-3 shadow p-3 mb-5 bg-body'>
					<img
						className='img-banner'
						src={banner}
						alt='FB Manager'
						width='500'
					/>
				</div>
				<h5 className='mt-5 text-secondary fw-light'>
					Login with Facebook to download or upload to the Google
					drive directly with FB Photo
				</h5>
				<br /> <br />
				<br />
				<button
					onClick={handleFBLogin}
					className='btn-fb-login'
					type='button'
				>
					<i className='fa fa-facebook m-3' />
					Download Photos
				</button>
				<span className='m-3'></span>
				<button
					onClick={handleGoogleLogin}
					className='btn-google-login'
					type='button'
				>
					<i className='fa fa-google m-3' />
					Upload Photos
				</button>
			</div>
		</div>
	);
}

export default SigninPage;
