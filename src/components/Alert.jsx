import React, {
  Component,
  useState
} from "react";

// import Button from "react-bootstrap/Button"
// import Alert from "react-bootstrap/Alert"
import Toast from "react-bootstrap/Toast"

export class MyAlert extends Component {
  render() {
    return(
    <Toast>
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
        <strong className="mr-auto">Bootstrap</strong>
        <small>11 mins ago</small>
      </Toast.Header>
      <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
    </Toast>
      );
  }
}
export default MyAlert;