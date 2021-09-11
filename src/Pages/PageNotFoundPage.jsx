import React from 'react';
import pageNotFoundImage from '../Images/notfound.gif'

function PageNotFoundPage() {
	return (
		<div id='notfound'>
            <img src={pageNotFoundImage} alt="not found" />
			<div class='notfound'>
				<div class='notfound-404'></div>
				<h2>Oops! Page Not Be Found</h2>
				<p>
					Sorry but the page you are looking for does not exist, have
					been removed. name changed or is temporarily unavailable
				</p>
				<a href='/'>Back to homepage</a>
			</div>
		</div>
	);
}

export default PageNotFoundPage;
