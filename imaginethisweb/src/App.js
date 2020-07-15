import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {AuthenticateHomePage} from "./views/AuthenticateHomePage"
import OauthCallBackPage, {Authenticated} from "./views/OauthCallBackPage"
import { Route, Switch } from 'react-router-dom'
import {WireframesPage} from "./views/WireframesPage";

function App() {
    return (
        <div className="App">
            <Switch>
                <Route exact path='/' component={AuthenticateHomePage}/>
                <Route exact path='/auth' component={OauthCallBackPage}/>
                <Route exact path='/wireframes' component={WireframesPage}/>
            </Switch>
        </div>
    );
}

export default App;
