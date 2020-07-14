import React, {
    Component,
    Fragment,
} from 'react'
import Navigation from "../components/Navigation"
import "../css/authenticatehomepage.css"
import {Tab, Tabs} from "react-bootstrap";
import $ from 'jquery'

export class AuthenticateHomePage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            accessToken: '',
            projectID : '',
            tokenError: true,
            projectIDError: true
        }

        this.handleChangeProjectID = this.handleChangeProjectID.bind(this);
        this.handleChangeToken = this.handleChangeToken.bind(this);
        this.getFigmaProject = this.getFigmaProject.bind(this)

    }

    handleChangeToken(event) {
        this.setState({ accessToken: event.target.value });
    }

    handleChangeProjectID(event){
        this.setState({projectID: event.target.value});
        console.log(this.state.projectID);
    }

    validateForm() {
        let error = false;
        if (!(this.state.accessToken.length > 0)) {
            this.setState({ tokenError: true});
            error = true
        } else {
            this.setState({ tokenError: false})
        }
        if (!(this.state.projectID.length > 0)) {
            this.setState({ projectIDError: true});
            error = true
        } else {
            this.setState({ projectIDError: false});
        }
        return error
    }

    getFigmaProject(){
        if(!this.validateForm()){
            let result = false;
            $.ajax({
                type: "GET",
                url: 'http://localhost:8080/authToken',
                dataType: "json",
                async: false,
                data:{
                    'accessToken': this.state.accessToken,
                    'projectID': this.state.projectID
                },
                success: function (data){
                    result = true;
                    console.log(data)

                },
                error: function (xhr, status, err) {
                    console.log('error');
                    console.log(err)
                }
            })
        }
    }

    render() {
        return(
            <Fragment>
                <Navigation/>
                <div className="outline-box">
                <div className="auth-form">
                    <Tabs defaultActiveKey="auth-token" id="uncontrolled-tab-example">
                        <Tab eventKey="auth-token" title="Authenticate with Token">
                                <p className="auth-form-item">Please enter your Figma access token, see <a href="https://www.figma.com/developers/api#access-tokens" target="_blank">here</a> to learn how to generate your Figma access token</p>
                                <input className={'form-control auth-form-item ' + (this.state.tokenError ? 'is-invalid' : '')} placeholder="Enter your Figma access token" onChange={this.handleChangeToken}/>
                                <input className={'form-control auth-form-item ' + (this.state.projectIDError ? 'is-invalid' : '')} placeholder="Enter your Figma project ID" onChange={this.handleChangeProjectID}/>
                                <button className='btn btn-primary auth-form-item' onClick={(e) => this.getFigmaProject()}>Submit</button>
                        </Tab>
                        <Tab eventKey="Oauth2" title="Oauth 2.0 Authentication">
                            <p className="auth-form-item">Generate your Figma project access authorization with Oauth 2.0 protocol, see the detailed information <a href="https://oauth.net/2/" target="_blank">here.</a></p>
                            <button className='btn btn-primary auth-form-item'>Authenticate with Oauth 2.0</button>
                        </Tab>
                    </Tabs>
                </div>
                </div>
            </Fragment>
        )
    }
}

export default AuthenticateHomePage