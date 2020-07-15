import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {AuthenticateHomePage} from "./views/AuthenticateHomePage"
import OauthCallBackPage, {Authenticated} from "./views/OauthCallBackPage"
import { Route, Switch } from 'react-router-dom'

function App() {
    return (
        <div className="App">
            <Switch>
                <Route exact path='/' component={AuthenticateHomePage}/>
                <Route exact path='/auth' component={OauthCallBackPage}/>
            </Switch>
        </div>
    );
}

export default App;
