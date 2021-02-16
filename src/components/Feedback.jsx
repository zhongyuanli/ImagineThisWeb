import React, { Component } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import QRCode from 'qrcode.react';
import Button from "react-bootstrap/Button";
import CommentBox from "./comments/CommentBox";


class Feedback extends Component {
  componentDidMount() {}

  render() {
    return (
      <div className="container">
        <Tabs defaultActiveKey="project" id="uncontrolled-tab-example">
          <Tab eventKey="project" title="Project">
            <CommentBox />
          </Tab>
          <Tab eventKey="run" title="Run App">
            <div className="container">
              <a href="exp://exp.host/@imaginethis/testing-application-imaginethis">
                <QRCode value="exp://exp.host/@imaginethis/testing-application-imaginethis" />
              </a>
              <p>To run the prototype for this project directly on your device, scan this QR code with the your device's built-in camera app.</p>
              <p><i>Prerequisite: Expo App must be installed for this to work.</i></p>
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
