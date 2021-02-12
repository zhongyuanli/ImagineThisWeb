import React, { Component } from "react";
import Comment from "./Comment.jsx";

class CommentList extends Component {
  render() {
    const commentNodes = this.props.comments.map((comment) => (
      <Comment
        feedbackId={comment.feedbackID}
        author={comment.author}
        created={comment.created}
        votes={comment.votes}
        projectId={comment.projectID}
        userID={comment.userID}
      >
        {comment.text}
      </Comment>
    ));
    return <div className="commentList">{commentNodes}</div>;
  }
}

export default CommentList;
