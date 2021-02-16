import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { LOCAL_HOST } from "../../consts";
import { v4 as uuidv4 } from "uuid";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      upvote: false,
      downvote: false,
      voteCount: this.props.votes ?? 0,
      voteID: "",
    };
  }

  voteFeedback(voteCount, requestType) {
    // WGkLkaYQV9c4ZsvrpFXrwt
    let userID;
    // get userID from localStorage
    if (localStorage.getItem("user") != null) {
      userID = JSON.parse(localStorage.getItem("user")).userID;
    } else {
      axios
        .post(`${LOCAL_HOST}/api/v1/users`)
        .then((res) => {
          console.log(res.data);
          // TODO: Retrieve userID and put in state
        })
        .catch((err) => {
          console.log(err);
        });
      return;
    }
    const { projectId, feedbackId } = this.props;
    let url = `${LOCAL_HOST}/api/v1/projects/${projectId}/feedback/${feedbackId}/vote`;
    const data = { userId: userID, voteValue: voteCount };

    url +=
      requestType === "patch" || requestType === "delete"
        ? `/${this.state.voteID}`
        : "";

    axios({
      method: requestType,
      url,
      data,
    })
      .then((res) => {
        if (res.data.voteId) {
          this.setState({voteID: res.data.voteId})
        }
      })
      .catch((err) => console.log({ err }));
  }

  setVoteState(upvote, downvote, voteCount, requestType) {
    this.setState({ upvote, downvote, voteCount, voteID: this.state.voteID }, () =>
      this.voteFeedback(voteCount, requestType)
    );
  }

  toggle = (vote) => {
    const { upvote, downvote, voteCount } = this.state;

    if (vote === "upvote") {
      if (!upvote && !downvote) {
        this.setVoteState(!upvote, false, voteCount + 1, "post");
      } else if (downvote && !upvote) {
        this.setVoteState(!upvote, false, voteCount + 2, "patch");
      } else {
        this.setVoteState(false, false, voteCount - 1, "delete");
      }
    } else {
      if (!downvote && !upvote) {
        this.setVoteState(false, !downvote, voteCount - 1, "post");
      } else if (!downvote && upvote) {
        this.setVoteState(false, !downvote, voteCount - 2, "patch");
      } else {
        this.setVoteState(false, false, voteCount + 1, "delete");
      }
    }
  };

  render() {
    return (
      <div>
        <br />
        <Card bg="light">
          <Card.Header>
            <b> {this.props.userName} </b> - {this.props.created ?? "just now"}{" "}
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
