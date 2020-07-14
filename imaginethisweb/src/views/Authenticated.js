import React, {
    Component,
    Fragment,
} from 'react'
import Navigation from "../components/Navigation"
import "../css/authenticatehomepage.css"
import {Tab, Tabs} from 'react-bootstrap'

export class Authenticated extends Component{
    constructor(props) {
        super(props);
    }


    render() {
        return(
            <Fragment>
                <Navigation/>

            </Fragment>
        )
    }
}

export default Authenticated