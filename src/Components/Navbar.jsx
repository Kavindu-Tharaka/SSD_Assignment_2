import React from 'react';
import logo from '../Images/logo.png';

function Navbar(props) {
	return (
		<nav className='navbar navbar-light bg-light'>
			<div className='container-fluid'>
				<a className='navbar-brand' href='/'>
					<img
						src={logo}
						alt='FB Manager'
						width='30'
						height='30'
						className='ml-5 d-inline-block align-text-top'
					/>
					Profile Manager
				</a>
			</div>
		</nav>
	);
}

export default Navbar;
