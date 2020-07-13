import React, {Component} from "react";
import Root from "./Root";
import AuthenticateHomePage from "./AuthenticateHomePage";
import { Route } from 'react-router-dom';
import {BrowserRouter} from "react-router-dom";

export class Page extends Component{
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Root>
                        <Route exact path='/' component={AuthenticateHomePage}/>
                    </Root>
                </div>
            </BrowserRouter>
        );
    }
}