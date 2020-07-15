import React, {Component} from "react";
import Navigation from "../components/Navigation";
import WireframeCard from "../components/WireframeCard";
import NHSLogo from "../images/nhs.jpeg"
import '../css/wireframespage.css'
import $ from 'jquery'


export class WireframesPage extends Component{
    constructor(props) {
        super(props);
        if(this.props.history.location.state.wireframeList === undefined){
            window.location.href = 'http://localhost:3000'
        }
        this.state = {
            projectName : this.props.history.location.state.projectName,
            wireframeList : this.props.history.location.state.wireframeList
        }
    }
    render() {
        return(
            <div>
                <Navigation/>
                <div className={'card-container row'}>
                    {
                        this.state.wireframeList.map(function (item,index) {
                            return(
                                <div className={'col-12 col-sm-6 col-lg-4 col-xl-3 card-wrapper'}>
                                <WireframeCard title={item.name} image = {item.imageURL}/>
                                </div>
                                )
                        })
                    }
                </div>
            </div>
        )
    }
}