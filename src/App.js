import axios from "axios";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";

import SigninPage from './Pages/SigninPage'
import CallbackPage from './Pages/CallbackPage'
import PageNotFoundPage from './Pages/PageNotFoundPage'
import DriveUploadPage from "./Pages/DriveUploadPage";

function App() {
  return (
    <div className="App">

    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={SigninPage} />
        <Route path="/facebookapp/callback" exact component={CallbackPage} />
        <Route path="/driveapp/uploadpage"  component={DriveUploadPage} />
        <Route path="*" exact component={PageNotFoundPage} />
      </Switch>
    </BrowserRouter>

    </div>
  );
}

export default App;
