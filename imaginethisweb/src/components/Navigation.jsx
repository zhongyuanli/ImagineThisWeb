import React, {
    Component,
} from 'react'
import NHSLogo from "../images/nhs.jpeg"
import Navbar from "react-bootstrap/Navbar"
import "../css/guidebar.css"

class Navigation extends Component {
    render() {
        return(
            <div className="guide-bar">
                <Navbar bg="primary" variant ="dark">
                    <Navbar.Brand href="/">
                        <img 
                            alt="nhs logo"
                            src={NHSLogo}
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
        )
    }
}

export default Navigation