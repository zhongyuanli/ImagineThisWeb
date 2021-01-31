import React, { Component } from "react";
import $ from "jquery";
import CommentList from "./CommentList.jsx";
import CommentForm from "./CommentForm.jsx";
import Badge from "react-bootstrap/Badge";

class CommentBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { comments: [] };
  }

  componentDidMount() {
    $.ajax({
      url: this.props.url,
      dataType: "json",
      cache: false,
      success: function (resp) {
        this.setState({ comments: resp });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this),
    });
  }

  handleCommentSubmit(newComment) {
    let comments = this.state.comments;
    let newComments = comments.concat([newComment]);
    this.setState({ comments: newComments });
  }

  render() {
    return (
      <div className="container">
        <br />
        <div className="commentBox panel panel-default">
          <div className="panel-body">
            <h3>
              Feedback System for the Project ID:{" "}
              <Badge variant="primary">ds345dtfdf4ff</Badge>
            </h3>

            <CommentForm
              onCommentSubmit={this.handleCommentSubmit.bind(this)}
            />
            <CommentList comments={this.state.comments} />
          </div>
        </div>
      </div>
    );
  }
}
export default CommentBox;
