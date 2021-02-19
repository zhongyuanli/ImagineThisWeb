import React, { Component } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import QRCode from 'qrcode.react';
import Button from "react-bootstrap/Button";
import axios from "axios";
import "../css/feedbackpage.css";
import Badge from "react-bootstrap/Badge";
import CommentBox from "./comments/CommentBox";
import { LOCAL_HOST } from "../consts";

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = { projectID: this.props.projectID, projectName: "" };
  }

  componentDidMount() {
    this.getProjectDetails();
  }

  getProjectDetails() {
    axios
      .get(`${LOCAL_HOST}/api/v1/projects/${this.state.projectID}`)
      .then((res) => {
        this.setState({ projectName: res.data.projectName });
      });
  }

  render() {
    return (
      <div className="container">
        <div className="feedback-header">
            <h3>
              Project Name: {this.state.projectName}
              <br />
            </h3>
              Project ID:
              <Badge variant="primary" id="projectID">
                {this.state.projectID}
              </Badge>
        </div>

        <Tabs defaultActiveKey="project" id="uncontrolled-tab-example">
          <Tab eventKey="project" title="Project">
            <CommentBox />
          </Tab>
          <Tab eventKey="run" title="Run App">
            <div className="container" style={{overflow:"hidden"}}>
                <div style={{float:"left",position:"relative",left:"4%"}}>
                    <a   href="exp://exp.host/@imaginethis/testing-application-imaginethis">
                        <QRCode style={{height:"200px",width:"200px",float:"left",marginTop:"10%"}} value="exp://exp.host/@imaginethis/testing-application-imaginethis" />
                    </a>
                </div>
                <div style={{float:"left",position:"relative",left:"50px",width:"70%"}}>
                    <h3 style={{textAlign:"center"}}>QRcode Using Instructions</h3>
                    {/*<p style={{fontSize:"18px"}}>In order to successfully run the prototype, please do the following steps</p>*/}
                    <ol style={{fontSize:"18px",textAlign:"justify"}}>
                        <p style={{fontSize:"18px"}}>In order to successfully run the prototype, please do the following steps</p>

                        <li>To run this app, You are required to install the"
                            <a href="https://expo.io/tools">Expo Go</a>" App on your personal devices</li>
                        <li>After opening the App, select the "Scan QR Code" option on the top on the sceen</li>
                        <li>Using the device cemera to scan the QRcode on the imagineThis website</li>
                        <li>The builed prototype will be running on your phone soon</li>
                    </ol>
                    {/*<p>To run the prototype for this project directly on your device, scan this QR code with the your device's built-in camera app.</p>*/}
                    {/*<p><i>Prerequisite: Expo App must be installed for this to work.</i></p>*/}
                </div>
                <div className="clear" style={{clear:"both"}}></div>
            </div>
          </Tab>
          <Tab eventKey="download" title="Download" >
            <Button input variant="primary" type="" value="Download">
               Download
            </Button>
          </Tab>
        </Tabs>
          </div>
    );
  }
}

export default Feedback;
