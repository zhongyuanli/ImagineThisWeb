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
    fetch(this.props.url)
      .then(res => {
        if (res.ok) {
          res.json()
            .then(data => {
              console.log(data)
              this.setState({ comments: data })
            })
        }
      })
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
