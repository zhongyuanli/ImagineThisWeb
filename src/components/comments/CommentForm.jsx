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
    this.state = { userID: null, userName: '' };
    /**
     * check if there is a user credential stored in localStorage
     * if not, create a new user credential
     *  */ 
    let storedUserStr = localStorage.getItem('user')
    if (storedUserStr === null) {
      // create an anonymous user
      console.log('Generating new user credential')
      let userName = 'Anonymous User'
      let userID = uuidv4()
      // send a request to the server
      axios
        .post(`${LOCAL_HOST}/api/v1/users`, {userId: userID, userName})
        .then(res => {
          if (res.data.success) {
            console.log('Setting up local Storage')
            // update localStorage
            localStorage.setItem('user', JSON.stringify({ userID, userName }))
            this.state.userID = userID
            this.state.userName = userName
          }
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      let storedUser = JSON.parse(storedUserStr)
      this.state = storedUser
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
    // check if the user has updated the user name
    let storedUser = JSON.parse(localStorage.getItem('user'))
    if (storedUser.userName != this.state.userName) {
      // send a request to update the user name
      await axios
        .patch(`${LOCAL_HOST}/api/v1/users/${this.state.userID}`, {userId: this.state.userID, userName})
        .then(res => {
          console.log(res.data)
          if (res.data.success) {
            // update localStorage
            storedUser.userName = this.state.userName
            localStorage.setItem('user', JSON.stringify(storedUser))
          }
        })
        .catch(err => console.log)
    }
    this.setComment(text, userName);
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
      .post(`${LOCAL_HOST}/api/v1/projects/${this.props.projectID}/feedback`, data)
      .then((res) => {
        console.log(res);
        this.props.onCommentSubmit(data);
        // ReactDOM.findDOMNode(this.refs.userName).value = "";
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
                onChange={e => {this.setState({userName: e.target.value})}}
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
