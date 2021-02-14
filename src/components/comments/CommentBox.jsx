import React from "react";
import Badge from "react-bootstrap/Badge";
import axios from "axios";
import moment from "moment";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import { LOCAL_HOST } from "../../consts";

class CommentBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { comments: [] };

    this.getComments = this.getComments.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
  }

  componentDidMount() {
    this.getComments();
  }

  handleCommentSubmit(newComment) {
    const comments = this.state.comments;
    const newComments = comments.concat([newComment]);
    this.setState({ comments: newComments });
  }

  getComments() {
    axios
      .get(`${LOCAL_HOST}/api/v1/projects/${this.props.projectID}/feedback`)
      .then((res) => {
        const commentlist = [];

        for (const i in res.data) {
          const {
            userId,
            projectId,
            feedbackId,
            downvotes,
            text,
            timestamp,
            upvotes,
            userName,
          } = res.data[i];
          
          const comment = {
            userID: userId,
            projectID: projectId,
            feedbackID: feedbackId,
            userName,
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

            <CommentForm onCommentSubmit={this.handleCommentSubmit} projectID={this.props.projectID} />
            <CommentList comments={this.state.comments} />
          </div>
        </div>
      </div>
    );
  }
}
export default CommentBox;
