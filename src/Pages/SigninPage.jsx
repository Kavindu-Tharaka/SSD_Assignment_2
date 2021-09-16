import React from 'react';
import logo from '../Images/logo.png';

function SigninPage() {
	var clientId =
		'292393918085-j29elmvnrmuomuep37j5umufmegilqnp.apps.googleusercontent.com';

	var redirect_uri = 'http://localhost:3000/uploadfiles';

	var scope = 'https://www.googleapis.com/auth/drive';

	const url =
		'https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=' +
		redirect_uri +
		'&prompt=consent&response_type=code&client_id=' +
		clientId +
		'&scope=' +
		scope +
		'&access_type=offline';

	async function handleClick() {
		window.location.href =
			'http://www.facebook.com/v11.0/dialog/oauth?response_type=code&client_id=579207406764914&redirect_uri=http://localhost:3000/facebookapp/callback&scope=public_profile%20user_posts%20user_friends%20user_photos%20user_photos&state=123';
	}

	const handleGoogleAuth = () => {
		window.location.href = url;
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
							<div className='pr-2 d-inline-block align-text-middle'>
								<h5>Profile Manager</h5>
							</div>
						</a>
					</div>
					<button
						type='button'
						className='btn btn-danger btn-lg mt-2'
						onClick={handleGoogleAuth}
					>
						Upload Files
					</button>

					<button
						onClick={handleClick}
						className='btn-fb-login'
						type='button'
					>
						<i className='fa fa-facebook m-3' />
						Login With Facebook
					</button>
				</div>
			</nav>

			<br />
		</div>
	);
}

export default SigninPage;
