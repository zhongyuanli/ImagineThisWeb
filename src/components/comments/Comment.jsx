import React, { Component } from "react";
import Card from "react-bootstrap/Card";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      upvote: false,
      downvote: false,
      voteCount: 0,
    };
  }

  render() {
    return (
      <div>
        <br />
        <Card bg="light">
          <Card.Header>
            {this.props.author} - {this.props.created}
            <span>
              <i
                className={`icon icon-downvote ${
                  this.state.downvote ? "voted" : null
                }`}
                onClick={
                  !this.state.downvote &&
                  (() =>
                    this.setState({
                      downvote: !this.state.downvote,
                      upvote: false,
                      voteCount: this.state.voteCount - 1,
                    }))
                }
              ></i>
            </span>
            <span>{this.state.voteCount}</span>
            <span>
              <i
                className={`icon icon-upvote ${
                  this.state.upvote ? "voted" : null
                }`}
                onClick={
                  !this.state.upvote &&
                  (() =>
                    this.setState({
                      upvote: !this.state.upvote,
                      downvote: false,
                      voteCount: this.state.voteCount + 1,
                    }))
                }
              ></i>
            </span>
          </Card.Header>
          <Card.Body>
            {/* <Card.Title>{this.props.children}</Card.Title> */}
            <Card.Text>{this.props.children}</Card.Text>
          </Card.Body>

          {/* <Card.Footer className="text-muted">2 days ago</Card.Footer> */}
        </Card>
      </div>
    );
  }
}

export default Comment;
