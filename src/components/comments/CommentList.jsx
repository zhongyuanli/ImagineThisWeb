import React, { Component } from "react";
import Comment from "./Comment.jsx";

class CommentList extends Component {
  render() {
    const commentNodes = this.props.comments.map((comment, i) => (
      <Comment
        key={i}
        feedbackId={comment.feedbackID}
        userName={comment.userName}
        created={comment.created}
        votes={comment.votes}
        projectId={comment.projectID}
        userID={comment.userID}
        upvoted={Object.keys(this.props.votedComments).includes(comment.feedbackID)
          && this.props.votedComments[comment.feedbackID].voteValue === 1}
        downvoted={Object.keys(this.props.votedComments).includes(comment.feedbackID)
          && this.props.votedComments[comment.feedbackID].voteValue === -1}
        voteID={Object.keys(this.props.votedComments).includes(comment.feedbackID)
          ? this.props.votedComments[comment.feedbackID].voteID : null}
      >
        {comment.text}
      </Comment>
    ));
    return <div className="commentList">{commentNodes}</div>;
  }
}

export default CommentList;
