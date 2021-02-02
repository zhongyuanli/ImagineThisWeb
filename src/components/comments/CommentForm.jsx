import React, { Component } from "react";
import ReactDOM from "react-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";

class CommentForm extends Component {
  constructor(props) {
    super(props);
  }

  handleSubmit(e) {
    e.preventDefault();
    let author = ReactDOM.findDOMNode(this.refs.author).value.trim();
    let text = ReactDOM.findDOMNode(this.refs.text).value.trim();
    if (!text || !author) {
      alert("Please enter your name and comment");
      return;
    }

    this.setComment(text, author);

    this.props.onCommentSubmit({ author: author, text: text });
    ReactDOM.findDOMNode(this.refs.author).value = "";
    ReactDOM.findDOMNode(this.refs.text).value = "";
    ReactDOM.findDOMNode(this.refs.author).focus();
  }

  setComment = (text, author) => {
    //firstly get the project ID
    let projectID = document.getElementById("projectID").innerHTML;
    let date = new Date();
    const data = {
      downvotes: 0,
      feedbackID: "cb791e97-a402-4174-95ea-dab2c3f06b25",
      projectID: projectID,
      text: text,
      timestamp: date.getTime().toString(),
      upvotes: 0,
      userID: "bd96ccc0-eeff-48e8-8b4e-652675dbc9a2",
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
  };

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
            {/* <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                Sort
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-2">Best</Dropdown.Item>
                <Dropdown.Item href="#/action-1">Newest</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> */}
          </Form>
        </div>
      </div>
    );
  }
}
export default CommentForm;
