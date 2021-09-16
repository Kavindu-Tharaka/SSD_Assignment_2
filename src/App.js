import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';

import SigninPage from './Pages/SigninPage';
import CallbackPage from './Pages/CallbackPage';
import PageNotFoundPage from './Pages/PageNotFoundPage';

function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<Switch>
					<Route path='/' exact component={SigninPage} />
					<Route
						path='/facebookapp/callback'
						exact
						component={CallbackPage}
					/>
					<Route path='*' exact component={PageNotFoundPage} />
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
