import React, {Component,} from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import '../css/wireframespage.css'

class WireframeCard extends Component{

    constructor(props) {
        super(props);
    }

    clickedCard() {
        console.log('Clicked:', this.props.id);
    }

    render() {
        return(
            <div>
                <Card style = {{width: '18rem'}}>
                    <Card.Img varint="top" src={this.props.image}/>
                    <Card.Body>
                        <Card.Title>{this.props.title}</Card.Title>
                        <Button variant='primary' onClick={(e) => this.clickedCard()}>
                            Choose
                        </Button>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default WireframeCard;
