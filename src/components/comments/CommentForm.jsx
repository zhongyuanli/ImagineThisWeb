import React, { Component } from "react";
import ReactDOM from "react-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import QRCode from 'qrcode.react';
import {Col, Container, Row} from "react-bootstrap";



class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = { userID: uuidv4() };
  }

  handleSubmit(e) {
    e.preventDefault();
    const userName = ReactDOM.findDOMNode(this.refs.userName).value.trim();
    const text = ReactDOM.findDOMNode(this.refs.text).value.trim();
    if (!text || !userName) {
      alert("Please enter your name and comment");
      return;
    }

    this.setComment(text, userName);
  }

  // eslint-disable-next-line class-methods-use-this
  setComment(text, userName) {
    // firstly get the project ID
    const projectID = document.getElementById("projectID").innerHTML;
    const date = new Date();
    const data = {
      upvotes: 0,
      downvotes: 0,
      feedbackID: uuidv4(),
      projectID,
      text,
      timestamp: date.getTime().toString(),
      userID: this.state.userID,
      userName,
    };

    axios
      .post(`http://localhost:8080/api/v1/projects/${projectID}/feedback`, data)
      .then((res) => {
        console.log(res);
        this.props.onCommentSubmit(data);
        ReactDOM.findDOMNode(this.refs.userName).value = "";
        ReactDOM.findDOMNode(this.refs.text).value = "";
        ReactDOM.findDOMNode(this.refs.userName).focus();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    return (
      <div className="commentForm panel panel-default">
        <div className="panel-body">
          <br />
          <Container>
            <Row>
              <Col>
                <Form className="form" onSubmit={this.handleSubmit.bind(this)}>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  input
                  placeholder="Username"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  ref="userName"
                  className="form-control"
                  type="text"
                />
              </InputGroup>

              <InputGroup>
                <FormControl
                  rows={4}
                  input
                  className="form-control"
                  type="text"
                  placeholder="Leave your feedback here.."
                  ref="text"
                  as="textarea"
                  aria-label="With textarea"
                />
              </InputGroup>
              <br />
              <Button input variant="primary" type="submit" value="Post">
                Post
              </Button>
                </Form>
              </Col>
              <Col className="d-none d-sm-block">
                <Row>
                  <h4>Scan to run prototype on mobile device</h4>
                </Row>
                <Row>
                  <Col md="auto">
                    <QRCode value="exp://exp.host/@imaginethis/testing-application-imaginethis" />
                  </Col>
                    <Col>
                      <p>To run the prototype for this project directly on your device, scan this QR code with the your device's built-in camera app.</p>
                      <p><i>Prerequisite: Expo App must be installed for this to work.</i></p>
                    </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
export default CommentForm;
