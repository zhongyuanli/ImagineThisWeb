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
import QRTab from "./feedback-tabs/QRTab";
import DownloadTab from "./feedback-tabs/DownloadTab";

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

        <Tabs defaultActiveKey="feedback" id="uncontrolled-tab-example">
          <Tab eventKey="feedback" title="Feedback">
            <CommentBox />
          </Tab>
          <Tab eventKey="run" title="Run App">
           <QRTab/>
          </Tab>
          <Tab eventKey="download" title="Download" >
            <DownloadTab/>
          </Tab>
        </Tabs>
          </div>
    );
  }
}

export default Feedback;
