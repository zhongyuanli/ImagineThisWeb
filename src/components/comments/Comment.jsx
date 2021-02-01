import React, { Component } from "react";
import Card from "react-bootstrap/Card";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      upvote: false,
      downvote: false,
      voteCount: this.props.votes ?? 0,
    };
  }

  toggle = (vote) => {
    if (vote === "upvote") {
      if (!this.state.upvote && !this.state.downvote) {
        this.setState({
          downvote: false,
          upvote: !this.state.upvote,
          voteCount: this.state.voteCount + 1,
        });
      } else if (this.state.downvote && !this.state.upvote) {
        this.setState({
          downvote: false,
          upvote: !this.state.upvote,
          voteCount: this.state.voteCount + 2,
        });
      } else {
        this.setState({
          downvote: false,
          upvote: false,
          voteCount: this.state.voteCount - 1,
        });
      }
    } else {
      if (!this.state.downvote && !this.state.upvote) {
        this.setState({
          downvote: !this.state.downvote,
          upvote: false,
          voteCount: this.state.voteCount - 1,
        });
      } else if (!this.state.downvote && this.state.upvote) {
        this.setState({
          downvote: !this.state.downvote,
          upvote: false,
          voteCount: this.state.voteCount - 2,
        });
      } else {
        this.setState({
          downvote: false,
          upvote: false,
          voteCount: this.state.voteCount + 1,
        });
      }
    }
  };

  render() {
    return (
      <div>
        <br />
        <Card bg="light">
          <Card.Header>
            {this.props.author} - {this.props.created ?? "just now"}
            <span>
              <i
                className={`icon icon-downvote ${
                  this.state.downvote ? "voted" : null
                }`}
                onClick={() => this.toggle("downvote")}
              ></i>
            </span>
            <span>{this.state.voteCount}</span>
            <span>
              <i
                className={`icon icon-upvote ${
                  this.state.upvote ? "voted" : null
                }`}
                onClick={() => this.toggle("upvote")}
              ></i>
            </span>
          </Card.Header>
          <Card.Body>
            <Card.Text>{this.props.children}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Comment;
