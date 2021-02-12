import React, { Component } from "react";
import ReactDOM from "react-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = { userID: uuidv4() };
  }

  handleSubmit(e) {
    e.preventDefault();
    const author = ReactDOM.findDOMNode(this.refs.author).value.trim();
    const text = ReactDOM.findDOMNode(this.refs.text).value.trim();
    if (!text || !author) {
      alert("Please enter your name and comment");
      return;
    }

    this.setComment(text, author);

    this.props.onCommentSubmit({ author, text });
    ReactDOM.findDOMNode(this.refs.author).value = "";
    ReactDOM.findDOMNode(this.refs.text).value = "";
    ReactDOM.findDOMNode(this.refs.author).focus();
  }

  // eslint-disable-next-line class-methods-use-this
  setComment(text, author) {
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
      userName: author,
    };

    axios
      .post(`http://localhost:8080/api/v1/projects/${projectID}/feedback`, data)
      .then((res) => {
        console.log(res);
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
                ref="author"
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
        </div>
      </div>
    );
  }
}
export default CommentForm;
