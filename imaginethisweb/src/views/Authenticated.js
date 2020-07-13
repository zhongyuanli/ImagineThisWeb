import React, {
    Component,
    Fragment,
} from 'react'
import Navigation from "../components/Navigation"
import "../css/authenticatehomepage.css"

export class Authenticated extends Component{
    render() {
        return(
            <Fragment>
                <Navigation/>
                <div className="body-content" >
                        <div className="d-flex justify-content-center auth-content">
                            Test
                        </div>
                    <div className="d-flex justify-content-center ">
                        <a className='btn btn-primary auth-button' href='/'>Authenticate with Token</a>
                    </div>
                    <div className="d-flex justify-content-center">
                        <a className='btn btn-primary auth-button' href='/'>Oauth 2.0 Authentication</a>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Authenticated