import React, { Component, Fragment } from "react";
import Navigation from "../components/Navigation";
import CommentBox from "../components/comments/CommentBox";

export class CommentsPage extends Component {
  componentDidMount() {}



  render() {
    return (
      <Fragment>
        <Navigation />
        <CommentBox url="data.json" projectID = {this.props.match.params.projectID}/>,
      </Fragment>
    );
  }
}

export default CommentsPage;
