import React, { useState } from "react";
import "./progress-helper.css";
import axios from "axios";
import { Button } from "reactstrap";
import FeedbackHelper from "../feedback_helper/feedback_helper";

// ID received from Rachita's code:

var id = localStorage.getItem("helperJobId");

const Filler = (props) => {
  return <div className="filler" style={{ width: `${props.percentage}%` }} />;
};

const ProgressBar = (props) => {
  const [] = useState(true); // what does this do?

  return (
    <div className="progress-bar">
      <Filler percentage={props.percentage} />
    </div>
  );
};

class ProgressBarExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      percentage: 0,
      feedback: false,
    };

    this.nextStep = this.nextStep.bind(this);
    this.finalStep = this.finalStep.bind(this);
    this.exampleReqs = this.exampleReqs.bind(this);
  }

  nextStep() {
    this.setState({ percentage: 50 });
    this.exampleReqs();
  }

  finalStep() {
    this.setState({ percentage: 100, feedback: true });
    this.finalReqs();
  }

  exampleReqs() {
    axios
      .patch("http://localhost:7000/items/" + id + "/", {
        status: "inprog",
      })
      .then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  finalReqs() {
    axios
      .patch("http://localhost:7000/items/" + id + "/", {
        status: "completed",
      })
      .then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );

    /////
    axios
      .post("http://localhost:7000/mail/", {
        email_id: "darshan.sheth@numerator.com",
      })
      .then(function (response) {
        console.log(response);
      });
  }

  render() {
    return (
      <div className="main-prog-helper">
        <br />
        <br />
        <center>
          {" "}
          <h2>What's the status of your assigned job ?</h2>
          <br />
        </center>
        <center>
          <ProgressBar percentage={this.state.percentage} />
        </center>

        <div style={{ marginTop: "20px" }}>
          <Button color="info" onClick={this.nextStep}>
            In Progress
          </Button>
        </div>

        <div style={{ marginTop: "20px" }}>
          <Button color="danger" onClick={this.finalStep}>
            Complete
          </Button>
        </div>
        <br />
        <br />
        <br />
        {/* prettier-ignore */}
        {this.state.feedback ? <FeedbackHelper></FeedbackHelper> : <></>}
      </div>
    );
  }
}

export default ProgressBarExample;
