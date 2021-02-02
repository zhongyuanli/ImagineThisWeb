import React from "react";
import CommentList from "./CommentList.jsx";
import CommentForm from "./CommentForm.jsx";
import Badge from "react-bootstrap/Badge";
import axios from "axios";
import moment from "moment";

class CommentBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { comments: [] };

    this.getComments = this.getComments.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
  }

  getComments = () => {
    const projectID = this.props.projectID;
    axios
      .get(`http://localhost:8080/api/v1/projects/${projectID}/feedback`)
      .then((res) => {
        let commentlist = [];

        for (let i in res.data) {
          const { downvotes, text, timestamp, upvotes, userName } = res.data[i];

          const comment = {
            author: userName,
            created: moment(timestamp).format("DD/MM/YY HH:mm"),
            text,
            votes: upvotes - downvotes,
          };

          commentlist.push(comment);
        }
        this.setState({ comments: commentlist });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  componentDidMount() {
    this.getComments();
  }

  handleCommentSubmit(newComment) {
    let comments = this.state.comments;
    let newComments = comments.concat([newComment]);
    this.setState({ comments: newComments });
  }

  render() {
    return (
      <div className="container">
        <br />
        <div className="commentBox panel panel-default">
          <div className="panel-body">
            <h3>
              Feedback Board for the Project ID:{" "}
              <Badge variant="primary" id="projectID">
                {this.props.projectID}
              </Badge>
            </h3>

            <CommentForm onCommentSubmit={this.handleCommentSubmit} />
            <CommentList comments={this.state.comments} />
          </div>
        </div>
      </div>
    );
  }
}
export default CommentBox;
