import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import '../../assets/upvote-icon-11.jpg'
import '../../css/comments.css'

class Comment extends Component {
  constructor(props) {
    super(props);

    if (props.upvote == undefined && props.downvote == undefined) {
      this.state = { upCount: 0, downCount: 0, voted: false };
    }
    else {
      this.state = { upCount: props.upvote, downCount: props.downvote, voted: false };
    }
  }

  upvote = () => {
    var upcount = this.state.upCount;
    var downcount = this.state.downCount;
    if (this.state.voted == false) {
      this.setState({
        upCount: upcount + 1,
        voted: 'upvote'
      });
    }
    else if (this.state.voted == 'upvote') {
      this.setState({
        upCount: upcount - 1,
        voted: false
      });
    }
    else if (this.state.voted == 'downvote') {
      this.setState({
        downCount: downcount - 1,
        upCount: upcount + 1,
        voted: "upvote"
      })
    }


  }

  downvote = () => {
    var upcount = this.state.upCount;
    var downcount = this.state.downCount;
    if (this.state.voted == false) {
      this.setState({
        downCount: downcount + 1,
        voted: 'downvote'
      });
    }
    else if (this.state.voted == 'downvote') {
      this.setState({
        downCount: downcount - 1,
        voted: false
      });
    }
    else if (this.state.voted == 'upvote') {
      this.setState({
        downCount: downcount + 1,
        upCount: upcount - 1,
        voted: 'downvote'
      })
    }

  }


  render() {
    const { upCount, downCount } = this.state;
    return (
      <div>
        <br />
        <Card bg="light">
          <Card.Header>
            {this.props.author} - {this.props.created}
            <div className="vote_area" id="downvoting_area">
              <button className="vote_icon downvote_icon" onClick={this.downvote}></button>
              <span className="vote_count" id="downvote_count">{downCount}</span>
            </div>
            <div className="vote_area" id="upvoting_area">
              <button className="vote_icon upvote_icon" onClick={this.upvote}></button>
              <span className="vote_count" id="upvote_count" >{upCount}</span>
            </div>

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
