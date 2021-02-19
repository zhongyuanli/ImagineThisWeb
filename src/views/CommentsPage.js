import React, { Component, Fragment } from "react";
import Navigation from "../components/Navigation";
import CommentBox from "../components/comments/CommentBox";
import Feedback from "../components/Feedback";

export class CommentsPage extends Component {
  componentDidMount() {}

  render() {
    return (
      <>
        <Navigation />
        {/*<CommentBox projectID={this.props.match.params.projectID} />*/}
        <Feedback projectID={this.props.match.params.projectID} />
        ,
      </>
    );
  }
}

export default CommentsPage;
