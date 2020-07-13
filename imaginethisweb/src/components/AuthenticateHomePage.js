import React, {Component} from "react";

export class AuthenticateHomePage extends Component{
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>
                <p>
                We need to obtain your authorization to access your figma project
                </p>
                <a className="btn btn-primary" href="/"> Authenticate With Token</a>
                <a className="btn btn-primary" href="/">Oauth 2.0 authentication</a>
            </div>
        )
    }
}

export default AuthenticateHomePage