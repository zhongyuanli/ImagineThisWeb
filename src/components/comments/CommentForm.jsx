import React, { Component } from "react";
import ReactDOM from "react-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import $ from "jquery";

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

    //firstly get the project ID
    let projectID = document.getElementById("projectID").innerHTML;
    var params = {
      "downvotes": 0,
      "feedbackID": "cb791e97-a402-4174-95ea-dab2c3f06b25",
      "projectID": projectID,
      "text": text,
      "timestamp": 1611660815823,
      "upvotes": 0,
      "userID": "bd96ccc0-eeff-48e8-8b4e-652675dbc9a2",
      "userName": author
    };

    // send the ajax request
    $.ajax({
      type:'POST',
      url: "http://localhost:8080/api/v1/projects/"+projectID+"/feedback",
      dataType:"json",
      contentType:'application/json;charset=UTF-8',
      data:JSON.stringify(params),
      crossDomain: true,
      success:function (resp){
        console.log(resp);
      }
    });

    this.props.onCommentSubmit({ author: author, text: text });
    ReactDOM.findDOMNode(this.refs.author).value = "";
    ReactDOM.findDOMNode(this.refs.text).value = "";
    ReactDOM.findDOMNode(this.refs.author).focus();
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
              {/* <InputGroup.Prepend>
                <InputGroup.Text>Feedback</InputGroup.Text>
              </InputGroup.Prepend> */}
              <FormControl
                input
                className="form-control"
                type="text"
                placeholder="Say somthing here..."
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
