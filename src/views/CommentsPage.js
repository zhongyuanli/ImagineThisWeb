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
        {/*<CommentBox url="data.json" projectID={this.props.match.params.projectID} />*/}
        <Feedback />
        ,
      </>
    );
  }
}

export default CommentsPage;
