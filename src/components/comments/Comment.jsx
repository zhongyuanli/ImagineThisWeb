import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { LOCAL_HOST } from "../../consts";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      upvote: false,
      downvote: false,
      voteCount: this.props.votes ?? 0,
    };
  }

  voteFeedback = (vote) => {
    console.log(this.state.voteCount);
    const { projectID, feedbackID, author } = this.props;
    // axios
    // .post(`${LOCAL_HOST}/api/v1/projects/${projectID}/${feedbackID}`, {
    axios
      .post(
        `${LOCAL_HOST}/api/v1/projects/test/feedback/cb791e97-a402-4174-95ea-dab2c3f06b25/vote`,
        {
          userID: "bd96ccc0-eeff-48e8-8b4e-652675dbc9a2",
          vote,
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  toggle = (vote) => {
    if (vote === "upvote") {
      if (!this.state.upvote && !this.state.downvote) {
        this.setState(
          {
            downvote: false,
            upvote: !this.state.upvote,
            voteCount: this.state.voteCount + 1,
          },
          () => this.voteFeedback(this.state.voteCount)
        );
      } else if (this.state.downvote && !this.state.upvote) {
        this.setState(
          {
            downvote: false,
            upvote: !this.state.upvote,
            voteCount: this.state.voteCount + 2,
          },
          () => this.voteFeedback(this.state.voteCount)
        );
      } else {
        this.setState(
          {
            downvote: false,
            upvote: false,
            voteCount: this.state.voteCount - 1,
          },
          () => this.voteFeedback(this.state.voteCount)
        );
      }
    } else {
      if (!this.state.downvote && !this.state.upvote) {
        this.setState(
          {
            downvote: !this.state.downvote,
            upvote: false,
            voteCount: this.state.voteCount - 1,
          },
          () => this.voteFeedback(this.state.voteCount)
        );
      } else if (!this.state.downvote && this.state.upvote) {
        this.setState(
          {
            downvote: !this.state.downvote,
            upvote: false,
            voteCount: this.state.voteCount - 2,
          },
          () => this.voteFeedback(this.state.voteCount)
        );
      } else {
        this.setState(
          {
            downvote: false,
            upvote: false,
            voteCount: this.state.voteCount + 1,
          },
          () => this.voteFeedback(this.state.voteCount)
        );
      }
    }
  };

  render() {
    return (
      <div>
        <br />
        <Card bg="light">
          <Card.Header>
            <b> {this.props.author} </b> - {this.props.created ?? "just now"}{" "}
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
