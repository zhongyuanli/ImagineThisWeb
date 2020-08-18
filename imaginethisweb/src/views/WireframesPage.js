import React, {Component} from "react"
import Navigation from "../components/Navigation"
import WireframeCard from "../components/WireframeCard"
import NHSLogo from "../images/nhs.jpeg"
import '../css/wireframespage.css'
import $ from 'jquery'

import Button from 'react-bootstrap/Button'
import Cookies from "universal-cookie";

export class WireframesPage extends Component{
    constructor(props) {
        super(props)
        if(this.props.history.location.state.wireframeList === undefined){
            window.location.href = 'http://localhost:3000'
        }
        const cookie = new Cookies();
        this.state = {
            projectName : this.props.history.location.state.projectName,
            wireframeList : this.props.history.location.state.wireframeList,
            projectID: cookie.get('projectID'),
            accessToken: cookie.get('accessToken'),
            authType: cookie.get('authType'),
            selected:[]
        }
        this.onChangeHandle = this.onChangeHandle.bind(this);
        this.toConvertPage = this.toConvertPage.bind(this);
        this.addToSelected = this.addToSelected.bind(this);
        this.deleteFromSelected = this.deleteFromSelected.bind(this);

    }

    toConvertPage() {
        // this.props.history.push({
        //     pathname: '/convert',
        //     state:{
        //         selected:this.state.selected
        //     }
        // })
        console.log(this.state.selected);
        let responseData = undefined;
        $.ajax({
            type: "POST",
            url: 'http://localhost:8080/generatePage',
            contentType: 'application/json',
            dataType: "json",
            async: false,
            data: JSON.stringify({
                'accessToken': this.state.accessToken,
                'projectID': this.state.projectID,
                'authType': this.state.authType,
                'pageList': this.state.selected
            }),
            success: function (data) {
                responseData = data;
            },
            error: function (xhr, status, err) {
                console.log('error');
            }

        })
    }

    addToSelected(chosenID) {
      let IDlist = [];
      this.state.wireframeList.forEach(function (item) {
          IDlist = [...IDlist, item.id];
      });
      let chosenOne = IDlist.filter(element => element === chosenID);
      let newelement = chosenOne[0]
      this.setState({
          selected:[...this.state.selected, newelement]
      });
    }

    deleteFromSelected(chosenID) {
      let toFilter = this.state.selected;
      let selectOnce = toFilter.filter(element => element !== chosenID);
      this.setState({
          selected:selectOnce
      });
    }

    onChangeHandle(id) {
        let list = this.state.wireframeList;
        let exist = this.state.selected;
        if(exist.length == 0){
            console.log("select 1",id);
            this.addToSelected(id);
        }else{
            let selectOnce = exist.filter(element => element === id);
            if(selectOnce.length == 0){
                console.log("select 2",id);
                this.addToSelected(id);
            }else{
                console.log("delete",id);
                this.deleteFromSelected(id)
            }
        }
        console.log("Selected NOW:", this.state.selected)
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
