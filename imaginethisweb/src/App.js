import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {AuthenticateHomePage} from "./views/AuthenticateHomePage"
import {Authenticated} from "./views/Authenticated"
import { Route, Switch } from 'react-router-dom'

function App() {
    return (
        <div className="App">
            <Switch>
                <Route exact path='/' component={AuthenticateHomePage}/>
                <Route exact path='/auth' component={Authenticated}/>
            </Switch>
        </div>
    );
}

export default App;
