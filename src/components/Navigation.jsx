import React, {
    Component,
} from 'react'
import Logo from "../images/ImagineThisLogo.png"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"
import Nav from "react-bootstrap/Nav"
import "../css/guidebar.css"

/*
* Top navigation containing links to all external pages
*/
class Navigation extends Component {
    render() {
        return(
            <div className="guide-bar">
                <Navbar collapseOnSelect expand="lg" className="navbar-style" variant="dark">
                    <Navbar.Brand href="/" className="navbar-brand">
                        <img
                          alt="Imagine This logo"
                          src={Logo}
                          className="d-inline-block align-top"
                          width="165"
                          height="30"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="https://imaginethisucl.github.io/getting%20started/how%20to%20use.html">Get Started</Nav.Link>
                            <Nav.Link href="https://imaginethisucl.github.io/guidelines/design%20introduction.html">Guidelines</Nav.Link>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <button
                                        className="btn btn-light search-button"
                                        onClick=""
                                        type="button">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             width="16" height="16"
                                             fill="currentColor"
                                             className="bi bi-search"
                                             viewBox="0 0 16 16">
                                            <path
                                                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                        </svg>

                                    </button>
                                </div>

                                <input
                                    className={"form-control navbar-input"}
                                    placeholder="Find Project With ID"/>
                            </div>

                        </Nav>
                        <Nav>
                            <NavDropdown
                              alignRight
                              title="GitHub"
                              id="collapsible-nav-dropdown"
                            >
                                <NavDropdown.Item href="https://github.com/ImagineThisUCL/ImagineThisWeb">Web App</NavDropdown.Item>
                                <NavDropdown.Item href="https://github.com/ImagineThisUCL/ImagineThisServer">Server</NavDropdown.Item>
                                <NavDropdown.Item href="https://github.com/ImagineThisUCL/ImagineThis-Mobile">Mobile Components</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default Navigation