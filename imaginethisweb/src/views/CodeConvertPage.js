import React, {Component} from "react";
import Navigation from "../components/Navigation";
import NHSLogo from "../images/nhs.jpeg"

export class CodeConvertPage extends Component{
    constructor(props) {
        super(props);
        if(this.props.history.location.state.selected === undefined){
            window.location.href = 'http://localhost:3000'
        }
        this.state = {
            selected : this.props.history.location.state.selected
        }
    }

    render() {
        return(
            <div>
                <Navigation/>
                {this.state.selected.map((wireframe) => (
                    <div>
                    {JSON.stringify(wireframe)}
                    </div>
                ))}
            </div>
        )
    }
}

export default CodeConvertPage
