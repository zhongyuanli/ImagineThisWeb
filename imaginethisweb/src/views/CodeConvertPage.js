import React, {Component} from "react";
import Navigation from "../components/Navigation";
import NHSLogo from "../images/nhs.jpeg"

export class CodeConvertPage extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <Navigation/>
                <h2>Show the choosen code here</h2>
            </div>
        )
    }
}

export default CodeConvertPage
