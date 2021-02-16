import React from "react";
import Badge from "react-bootstrap/Badge";
import axios from "axios";
import moment from "moment";
import DropdownButton from "react-bootstrap/DropdownButton";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import Dropdown from "react-bootstrap/Dropdown";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import { LOCAL_HOST } from "../../consts";
import DropdownButton from "react-bootstrap/DropdownButton";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import Dropdown from "react-bootstrap/Dropdown";

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

  /**
   * Gets feedback from database associated with ProjectID
   */
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
  };

  componentDidMount() {
    this.getComments();
  }



  /**
   * Sorts feedback by the option the user chose to perform.
   */
  sortComments(e){
    const allComments = this.state.comments;
    if(e == "1"){
      let sortedArray = allComments.sort(this.sortByTime('created'));
      this.setState({comments: sortedArray});
    }else if(e == "2"){
      let sortedArray = allComments.sort(this.sortByVotes('votes'));
      this.setState({comments: sortedArray});
    }else if(e == "3"){
      console.log("in the 3 option");
      let sortedArray = allComments.sort(this.sortByTwoFields('votes','created'));
      this.setState({comments: sortedArray});
    }

  }

  /**
   * Sorts the feedback by the time they are committed
   */
  sortByTime(field){
      return function(a,b) {
        let x = new Date(a[field])/1000;
        let y = new Date(b[field])/1000;
        return y - x;
      }
  }


  /**
   * Sort the feedback by calculating it vote count.
   */
  sortByVotes(field){
    return function(a,b){
      return b[field] - a[field];
    }
  }

  /**
   * Sorts the feedback based on two attribute, including the time and voting count.
   */
  sortByTwoFields(field1,field2){
    return function (a,b){
      if (a[field1] == b[field1]){
        let aDate = new Date(a[field2]/1000);
        let bDate = new Date(b[field2]/1000);
        return aDate - bDate;
      }
      else{
        return b[field1] - a[field1];
      }
    }
  }


  handleCommentSubmit(newComment) {
    let comments = this.state.comments;
    let newComments = comments.concat([newComment]);
    this.setState({ comments: newComments });
  }

  componentDidMount() {
    this.getComments();
  }

  /**
   * Sorts feedback by the option the user chose to perform.
   */
  sortComments(e) {
    const allComments = this.state.comments;
    if (e == "1") {
      let sortedArray = allComments.sort(this.sortByTime("created"));
      this.setState({ comments: sortedArray });
    } else if (e == "2") {
      let sortedArray = allComments.sort(this.sortByVotes("votes"));
      this.setState({ comments: sortedArray });
    } else if (e == "3") {
      console.log("in the 3 option");
      let sortedArray = allComments.sort(
        this.sortByTwoFields("votes", "created")
      );
      this.setState({ comments: sortedArray });
    }
  }

  /**
   * Sorts the feedback by the time they are committed
   */
  sortByTime(field) {
    return function (a, b) {
      let x = new Date(a[field]) / 1000;
      let y = new Date(b[field]) / 1000;
      return y - x;
    };
  }

  /**
   * Sort the feedback by calculating it vote count.
   */
  sortByVotes(field) {
    return function (a, b) {
      return b[field] - a[field];
    };
  }

  /**
   * Sorts the feedback based on two attribute, including the time and voting count.
   */
  sortByTwoFields(field1, field2) {
    return function (a, b) {
      if (a[field1] == b[field1]) {
        let aDate = new Date(a[field2] / 1000);
        let bDate = new Date(b[field2] / 1000);
        return aDate - bDate;
      } else {
        return b[field1] - a[field1];
      }
    };
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

            <Dropdown style={{top:"-40px",float: "right", height: "20px",position:"relative"}}>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Sort the Comments
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={this.sortComments.bind(this,"1")}>Sort by Time</Dropdown.Item>
                <Dropdown.Item onClick={this.sortComments.bind(this,"2")}>Sort by Votes Count</Dropdown.Item>
                <Dropdown.Item onClick={this.sortComments.bind(this,"3")}>Defualt</Dropdown.Item>
              </Dropdown.Menu>

            </Dropdown>


            <CommentList comments={this.state.comments} />
          </div>
        </div>
      </div>
    );
  }
}
export default CommentBox;
