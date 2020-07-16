import React, {Component} from "react";
import Navigation from "../components/Navigation";
import WireframeCard from "../components/WireframeCard";
import NHSLogo from "../images/nhs.jpeg"
import '../css/wireframespage.css'
import $ from 'jquery'

import Button from 'react-bootstrap/Button'

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

    toConvertPage() {
        this.props.history.push({
            pathname: '/convert',
        })
    }


    render() {
        return(
            <div>
                <Navigation/>
                <Button className='redirect-Convert' onClick={(e) => this.toConvertPage()}>
                    Convert to code
                </Button>
                <div className={'card-container row'}>
                    {
                        this.state.wireframeList.map(function (item,index) {
                            return(
                                <div className={'col-12 col-sm-6 col-lg-4 col-xl-3 card-wrapper'}>
                                <WireframeCard
                                    title={item.name}
                                    image = {item.imageURL}
                                    id = {item.id}
                                />
                                </div>
                                )
                        })
                    }
                </div>
            </div>
        )
    }
}
