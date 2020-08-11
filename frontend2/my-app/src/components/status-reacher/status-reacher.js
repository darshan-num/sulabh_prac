import React, { Component } from "react";
import { Progress } from "reactstrap";
import "./status-reacher.css";
import axios from "axios";

class ReacherProgress extends Component {
  state = {
    joke: "",
  };

  fetchHelpers() {
    axios.get("http://127.0.0.1:8000/api/jobs/").then((response) => {
      for (var i = 0; i < response.data.length; i++) {
        if (response.data[i].id == localStorage.getItem("jobId")) {
          console.log(response.data[i].status);
          this.setState({
            joke: response.data[i].status,
          });
        }
      }
      /*localStorage.setItem("jobId", response.data[response.data.length - 1].id);
      this.setState({
        joke: response.data[response.data.length - 1].status,
      });*/
    });
  }

  componentDidMount() {
    //Fetch the API request every 4 seconds
    console.log(this.fetchHelpers());
    this.interval = setInterval(() => {
      this.fetchHelpers();
    }, 4000);
  }

  render() {
    return (
      <div>
        <div className="text-center">{0}%</div>
        <Progress value={0} />
        {this.state.joke}
      </div>
    );
  }
}

export default ReacherProgress;
