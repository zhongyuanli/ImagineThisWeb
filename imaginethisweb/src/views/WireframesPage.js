import React, {Component} from "react"
import Navigation from "../components/Navigation"
import WireframeCard from "../components/WireframeCard"
import NHSLogo from "../images/nhs.jpeg"
import '../css/wireframespage.css'

import Button from 'react-bootstrap/Button'

export class WireframesPage extends Component{
    constructor(props) {
        super(props)
        if(this.props.history.location.state.wireframeList === undefined){
            window.location.href = 'http://localhost:3000'
        }
        this.state = {
            projectName : this.props.history.location.state.projectName,
            wireframeList : this.props.history.location.state.wireframeList,
            selected:[]
        }
        this.onChangeHandle = this.onChangeHandle.bind(this)
    }

    toConvertPage() {
        this.props.history.push({
            pathname: '/convert',
            state:{
                selected:this.state.selected
            }
        })
    }

    onChangeHandle(newelement) {
        this.setState({
            selected:[...this.state.selected, newelement]
        });
        console.log('Clicked',newelement);
        console.log(this.state.selected);
    }

    render() {
        return(
            <div>
                <Navigation/>
                <Button className='redirect-Convert' onClick={(e) => this.toConvertPage()}>
                    Convert to code
                </Button>
                <div className={'card-container row'}>
                    {this.state.wireframeList.map((item, index) => (
                        <div className={'col-12 col-sm-6 col-lg-4 col-xl-3 card-wrapper'} key={index}>
                            <WireframeCard
                                title={item.name}
                                image = {item.imageURL}
                                id = {item.id}
                            />
                            <input
                                type="checkbox"
                                id={item.id}
                                onChange={() => this.onChangeHandle(item.id)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default WireframesPage
