import React, { Component } from "react";
import Comment from "./Comment.jsx";
class CommentList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let commentNodes = this.props.comments.map(function (comment, index) {
      return (
        <Comment key={index} author={comment.userName} created={new Date(comment.timestamp).toDateString()}>
          {comment.text}
        </Comment>
      );
    });
    return <div className="commentList">{commentNodes}</div>;
  }
}

export default CommentList;
