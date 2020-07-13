import React, {Component} from "react";
import Navbar from "react-bootstrap/Navbar";
import "../css/guidebar.css"
import AuthenticateHomePage from "./AuthenticateHomePage";
import {Route} from "react-router-dom";

export class Root extends Component{
    constructor(props) {
        super(props);

    }

    routePage(){
        return(
            <div className='root-body'>
                <Route exact path= '/' render={() => (<AuthenticateHomePage/>)}/>
            </div>
        )
    }
    render() {
        return(
            <div>
                <div className="guide-bar">
                    <Navbar bg="primary" variant ="dark">
                        <Navbar.Brand href="#">
                            <img alt="nhs logo"
                                 src= {require('../images/nhs.jpeg')}
                                 className="d-inline-block align-top"
                                 width="70"
                                 height="30"
                            />
                        </Navbar.Brand>
                        <Navbar.Text className="imagine-this-text">
                            Imagine This
                        </Navbar.Text>
                        <Navbar.Text className= 'ml-auto'>
                            This is our slogan
                        </Navbar.Text>
                    </Navbar>
                </div>
                <div>
                    {this.routePage()}
                </div>
            </div>

        )
    }
}

export default Root

