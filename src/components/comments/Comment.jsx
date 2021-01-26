import React, { Component } from "react";
import Card from "react-bootstrap/Card";

class Comment extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <br />
        <Card bg="light">
          <Card.Header>
            {this.props.author} - {this.props.created}
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
