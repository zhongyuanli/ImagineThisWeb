import React from "react";
import CommentList from "./CommentList.jsx";
import CommentForm from "./CommentForm.jsx";
import Badge from "react-bootstrap/Badge";
import axios from "axios";
import moment from "moment";
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

  getComments = () => {
    const projectID = this.props.projectID;
    axios
      .get(`http://localhost:8080/api/v1/projects/${projectID}/feedback`)
      .then((res) => {
        const commentlist = [];

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

  sortComments = () => {
    const allComments = this.state.comments;
    let sortedArray = allComments.sort(this.sortByTime('created'));
    console.log(sortedArray);
    this.setState({comments:sortedArray });

  }

  test(e){
    const allComments = this.state.comments;
    if(e == "1"){
      let sortedArray = allComments.sort(this.sortByTime('created'));
      this.setState({comments: sortedArray});
    }else if(e == "2"){
      let sortedArray = allComments.sort(this.sortByVotes('votes'));
      this.setState({comments: sortedArray});
    }
  }


  sortByTime(field){
      return function(a,b) {
        let x = new Date(a[field])/1000;
        let y = new Date(b[field])/1000;
        return y - x;
      }
  }

  sortByVotes(field){
    return function(a,b){
      return a[field] - b[field];
    }
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
            {/*<button onClick={this.sortComments}>sort comments</button>*/}



            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Sort the Comments
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={this.test.bind(this,"1")}>Sort Comments by Time</Dropdown.Item>
                <Dropdown.Item onClick={this.test.bind(this,"2")}>Sort Comments by Votes Count</Dropdown.Item>
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
