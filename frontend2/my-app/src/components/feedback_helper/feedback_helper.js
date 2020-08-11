import React, { Component } from "react";
import { useState } from "react";
import "./feedback_helper.css";
import { Button, ButtonGroup } from "reactstrap";
import axios from "axios";

// User logged in ID:
var id = localStorage.getItem("helperJobId");

function FeedbackHelper() {
  // function helperFunc() {
  //   local_data = this.rating;
  //   setLocal_data(local_data);
  //   this.submitAction();
  // }
  console.log(id);

  const submitAction = (item) => {
    console.log(item);
    axios
      .patch("http://localhost:7000/items/" + id + "/", {
        helper_score: item,
      })
      .then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  return (
    <div>
      <h5>Please rate your helper</h5>
      <ButtonGroup className="feedback-helper">
        <Button color="info" onClick={() => submitAction(0)}>
          0
        </Button>
        <Button color="info" onClick={() => submitAction(1)}>
          1
        </Button>
        <Button color="info" onClick={() => submitAction(2)}>
          2
        </Button>
        <Button color="info" onClick={() => submitAction(3)}>
          3
        </Button>
        <Button color="info" onClick={() => submitAction(4)}>
          4
        </Button>
        <Button color="info" onClick={() => submitAction(5)}>
          5
        </Button>
        <Button color="info" onClick={() => submitAction(6)}>
          6
        </Button>
        <Button color="info" onClick={() => submitAction(7)}>
          7
        </Button>
        <Button color="info" onClick={() => submitAction(8)}>
          8
        </Button>
        <Button color="info" onClick={() => submitAction(9)}>
          9
        </Button>
        <Button color="info" onClick={() => submitAction(10)}>
          10
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default FeedbackHelper;
