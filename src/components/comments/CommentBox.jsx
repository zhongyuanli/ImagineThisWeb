import React from "react";
import Badge from "react-bootstrap/Badge";
import axios from "axios";
import moment from "moment";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import { LOCAL_HOST } from "../../consts";
import DropdownButton from "react-bootstrap/DropdownButton";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import Dropdown from "react-bootstrap/Dropdown";
import { v4 as uuidv4 } from 'uuid';

class CommentBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { comments: [], votedComments: {}, userID: "", userName: "" };

    this.getComments = this.getComments.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    this.createAnonymousUser = this.createAnonymousUser.bind(this);
    this.getVotesForUser = this.getVotesForUser.bind(this);

    // check if there is a user credential stored in localStorage
    // if not, create a new user credential
    let storedUserStr = localStorage.getItem('user');
    if (storedUserStr === null) {
      this.createAnonymousUser();
    } else {
      // get user credential from localStorage
      let storedUser = JSON.parse(storedUserStr);
      this.state.userID = storedUser.userID;
      this.state.userName = storedUser.userName;
      // check if there's any vote associated to the current user
      this.getVotesForUser()
    }
    
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
            timestamp,
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

  async getVotesForUser() {
    await axios
      .get(`${LOCAL_HOST}/api/v1/users/${this.state.userID}/votes`)
      .then(res => {
        if (res.status == 200 && res.data.length > 0) {
          res.data.map(vote => {
            this.state.votedComments[vote.feedbackId] = { voteID: vote.voteId, voteValue: vote.voteValue }
          })
        }
      })
      .catch(err => console.log)
  }

  async createAnonymousUser() {
    // create an anonymous user
    console.log('Generating new user credential');
    let userName = 'Anonymous User';
    let userID = uuidv4();
    // send a request to the server
    await axios
      .post(`${LOCAL_HOST}/api/v1/users`, {userId: userID, userName})
      .then(res => {
        if (res.data.success) {
          console.log('Setting up local Storage');
          // update localStorage
          localStorage.setItem('user', JSON.stringify({ userID, userName }));
          this.state.userID = userID;
          this.state.userName = userName;
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  /**
   * Sorts feedback by the option the user chose to perform.
   */
  sortComments(e){
    const allComments = this.state.comments;
    if(e == "1"){
      let sortedArray = allComments.sort(this.sortByTime('timestamp'));
      this.setState({comments: sortedArray});
    }else if(e == "2"){
      let sortedArray = allComments.sort(this.sortByVotes('votes'));
      this.setState({comments: sortedArray});
    }else if(e == "3"){
      let sortedArray = allComments.sort(this.sortByTwoFields('votes','timestamp'));
      this.setState({comments: sortedArray});
    }

  }

  /**
   * Sorts the feedback by the time they are committed
   */
  sortByTime(field){
      return function(a,b) {
        return b[field] - a[field]
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
        return b[field2] - a[field2];
      }
      else{
        return b[field1] - a[field1];
      }
    }
  }

  render() {
    return (
      <div className="container">
        {/*<br />*/}
        <div className="commentBox panel panel-default">
          <div className="panel-body">
            {/*<h3>*/}
            {/*  Feedback Board for the Project ID:{" "}*/}
            {/*  <Badge variant="primary" id="projectID">*/}
            {/*    {this.props.projectID}*/}
            {/*  </Badge>*/}
            {/*</h3>*/}
            <h4>Post Feedback / Vote on Feedback</h4>
            <span>
              In this section, you can post feedback about this project's prototype (see "Run App" tab for more details), and also view feedback posted from other people.
              You can also up vote/down vote comments to signify their importance.
            </span>
            <hr />

            <CommentForm 
              onCommentSubmit={this.handleCommentSubmit}
              projectID={this.props.projectID}
              userID={this.state.userID}
              userName={this.state.userName}
            />

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


            <CommentList comments={this.state.comments} votedComments={this.state.votedComments} />
          </div>
        </div>
      </div>
    );
  }
}
export default CommentBox;
