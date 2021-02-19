import React, {Component} from "react";
import Button from "react-bootstrap/Button";

class DownloadTab extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Button input variant="primary" type="" value="Download">
        Download
      </Button>
    );
  }
}

export default DownloadTab;
