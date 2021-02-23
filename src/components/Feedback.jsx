import React, { Component } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import axios from "axios";
import "../css/projectpage.css";
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
            Project:{ this.state.projectName }
          </h3>
        </div>

        <Tabs defaultActiveKey="feedback" id="uncontrolled-tab-example">
          <Tab eventKey="feedback" title="Feedback">
            <CommentBox />
          </Tab>
          <Tab eventKey="run" title="Run App">
            <QRTab />
          </Tab>
          <Tab eventKey="download" title="Download Code">
            <DownloadTab />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default Feedback;
