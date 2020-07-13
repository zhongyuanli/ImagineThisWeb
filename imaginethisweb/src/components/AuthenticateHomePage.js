import React, {Component} from "react";
import "../css/authenticatehomepage.css"
export class AuthenticateHomePage extends Component{
    constructor(props) {
        super(props);
    }
    render() {
        return(
            // <div className="container">
            //     <div className="row">
            //         <div className='col align-self-center'>
            //             We need to obtain your authorization to access your figma project
            //         </div>
            //         <a className="col align-self-center btn btn-primary" href="/"> Authenticate With Token</a>
            //         <a className="col align-self-center btn btn-primary" href="/">Oauth 2.0 authentication</a>
            //     </div>
            //
            // </div>
            <div className="body-content" >
                    <div className="d-flex justify-content-center auth-content">
                        We need to obtain your authorization before accessing your Figma projects
                    </div>
                <div className="d-flex justify-content-center ">
                    <a className='btn btn-primary auth-button' href='/'>Authenticate with Token</a>
                </div>
                <div className="d-flex justify-content-center">
                    <a className='btn btn-primary auth-button' href='/'>Oauth 2.0 Authentication</a>
                </div>
            </div>
        )
    }
}

export default AuthenticateHomePage