import React, {
    Component,
} from 'react'
import NHSLogo from "../images/nhs.jpeg"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"
import Nav from "react-bootstrap/Nav"
import "../css/guidebar.css"


class Navigation extends Component {
    render() {
        return(
            <div className="guide-bar">
                <Navbar collapseOnSelect expand="lg" className="navbar-style" variant="dark">
                    <Navbar.Brand href="#home">
                        <img
                          alt="NHS logo"
                          src={NHSLogo}
                          className="d-inline-block align-top"
                          width="70"
                          height="30"
                        />
                    </Navbar.Brand>
                    <Navbar.Text className="navbar-title">
                        Imagine This
                    </Navbar.Text>
                </Navbar>
            </div>
        )
    }
}

export default Navigation