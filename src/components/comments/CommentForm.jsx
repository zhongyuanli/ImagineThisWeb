import React, { Component } from "react";
import ReactDOM from "react-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { LOCAL_HOST } from "../../consts";

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = { userID: null, userName: "", isNewUser: false };
    // check if user record exist in localStorage
    if (localStorage.getItem("user") != null) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      this.state.userID = storedUser.userID;
      this.state.userName = storedUser.userName;
      this.setState(storedUser);
    } else {
      this.state.isNewUser = true;
      console.log("initilising new user");
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    const userName = ReactDOM.findDOMNode(this.refs.userName).value.trim();
    const text = ReactDOM.findDOMNode(this.refs.text).value.trim();
    if (!text || !userName) {
      alert("Please enter your name and comment");
      return;
    }
    // TODO: find a better way to store user credential
    // set state for current user credential
    if (this.state.isNewUser) {
      // setState operation is asynchronous, thus use async/await to wait for the state to update
      await this.setState({ userID: uuidv4() });
      console.log("after setState " + this.state.userID);
      // store user credential in localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({ userID: this.state.userID, userName })
      );
      // send a request to create new user first
      let newUser = {
        userId: this.state.userID,
        userName: this.state.userName,
      };
      axios
        .post(`${LOCAL_HOST}/api/v1/users`, newUser)
        .then((res) => {
          if (res.data.success) {
            console.log(res.data);
            // then update comment
            this.setComment(text, userName);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      this.setState({ isNewUser: false });
    } else {
      // user credential already exist
      this.setComment(text, userName);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  setComment(text, userName) {
    // firstly get the project ID
    const data = {
      text,
      userId: this.state.userID,
      userName,
    };

    axios
      .post(
        `${LOCAL_HOST}/api/v1/projects/${this.props.projectID}/feedback`,
        data
      )
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
                value={this.state.userName}
                onChange={(e) => {
                  this.setState({ userName: e.target.value });
                }}
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
        </div>
      </div>
    );
  }
}
export default CommentForm;
