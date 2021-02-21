import React, { Component } from "react";
import QRCode from "qrcode.react";
import Tab from "react-bootstrap/Tab";
import "../../css/feedback-tab/QRtab.css";

class QRTab extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <div id="QRdiv">
          <a href="exp://exp.host/@imaginethis/testing-application-imaginethis">
            <QRCode id="QRCode" style={{ height: "150px", width: "150px", margin: "0px" }} value="exp://exp.host/@imaginethis/testing-application-imaginethis" />
          </a>
        </div>
        <div id="instructionDiv">
          <h3 className="QRTab_Title">QRcode Using Instructions</h3>
          {/* <p>In order to successfully run the prototype, please do the following steps</p> */}
          <ol>
            <p>In order to successfully run the prototype, please do the following steps</p>

            <li>
              To run this app, You are required to install the"
              <a href="https://expo.io/tools">Expo Go</a>
              " App on your personal devices
            </li>
            <li>After opening the App, select the "Scan QR Code" option on the top of the sceen</li>
            <li>Using the device cemera to scan the QRcode on the imagineThis website</li>
            <li>The builed prototype will be running on your phone soon</li>
            <p>
              <br />
              Please check for other related details：
              {' '}
              <a href="https://expo.io/">expo.io</a>
            </p>
          </ol>

        </div>
        <div className="clear" />
      </div>
    );
  }
}

export default QRTab;
