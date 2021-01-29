import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import '../../assets/upvote-icon-11.jpg'
import '../../css/comments.css'

// const sectionStyle = {
//   width: '30px',
//   height: '30px',
//   backgroundImage: "url(../../ assets / upvote-icon-11.jpg')",
// }

class Comment extends Component {
  constructor(props) {

    super(props);
    this.state = { upCount: 0, downCount: 0 };
  }

  upvote = () => {
    var upcount = this.state.upCount;
    this.setState({ upCount: upcount + 1 });
    // var upSpan = document.getElementById("upvote_count");
    // var count = parseInt(upSpan.innerHTML);
    // upSpan.innerHTML = count + 1;

  }

  downvote = () => {
    var downcount = this.state.downCount;
    this.setState({ downCount: downcount + 1 });
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
