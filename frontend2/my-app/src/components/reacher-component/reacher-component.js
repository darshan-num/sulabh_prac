import React, { useState, setState, Component } from "react";
import { Container } from "reactstrap";
import "./reacher-component.css";
import axios from "axios";
import { TabPane, Button, Row, Col } from "reactstrap";
import { Table } from "reactstrap";
import { Form, FormGroup, Label, Input } from "reactstrap";
import { Link } from "react-router-dom";

class ReacherComponent extends Component {
  get() {
    axios.get("http://127.0.0.1:8000/api/users/").then((response) => {
      console.log(response.data[0]);
    });
  }

  //fetch code
  state = {
    joke: "",
    location: localStorage.getItem("location"),
    id: localStorage.getItem("id"),
  };

  serviceState = {
    serviceDetails: {
      itemdesc: "",
      reacher_id: localStorage.getItem("id"),
      status: "matching",
      helper_id: "0",
      reacher_score: 0,
      helper_score: 0,
      price: "",
      bargain_price: 0,
    },
  };

  postService = (event) => {
    console.log(this.serviceState.serviceDetails);
    const ValidateService = this.serviceState.serviceDetails;
    const Itemdesc = ValidateService.itemdesc;
    const price = ValidateService.price;

    const user = {
      location: this.state.location,
    };
    console.log("userlocation", user.location);
    console.log("userprice", this.serviceState.serviceDetails.price);

    axios
      .patch("http://localhost:7000/api/users/" + this.state.id + "/", {
        //patch location
        location: user.location,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    if (Itemdesc === "") {
      alert("Please specify a job");
    } else if (price === "") {
      alert("Please specify a price");
    } else {
      //this.getCoordinates(user.location); //get the user coordinates
      localStorage.setItem("reacherInitialPrice", ValidateService.price); //set the initial price for reacher
      window.location.href = "/matching";
    }

    fetch("http://127.0.0.1:8000/api/jobs/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.serviceState.serviceDetails),
    })
      .then((data) => data.json())
      .catch((error) => console.error(error));
  };

  // patchService = (event) => {
  //   console.log(this.state.id);
  //   event.preventDefault();
  //   const user = {
  //     location: this.state.location,
  //   };
  //   axios
  //     .patch("http://localhost:7000/api/users/" + this.state.id + "/", {
  //       location: user.location,
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       console.log(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  // getCoordinates = (place) => {
  //   //set the user coordinates

  //   axios
  //     .get(
  //       "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
  //         place +
  //         ".json?access_token=pk.eyJ1IjoiZGFzaC1udW0iLCJhIjoiY2tkNXNtMDduMGF2djJ0cmE1MjJ0aHNpOSJ9.4FgclywHobtPkxbpi_c-DQ"
  //     )

  //     .then((response) => {
  //       console.log("resp", response.data.features[1].center);
  //       localStorage.setItem(
  //         "reacherLat",
  //         parseFloat(response.data.features[1].center[1])
  //       );
  //       localStorage.setItem(
  //         "reacherLong",
  //         parseFloat(response.data.features[1].center[0])
  //       );
  //       console.log(
  //         "lat, long",
  //         localStorage.getItem("reacherLat"),
  //         localStorage.getItem("reacherLong")
  //       );
  //     })

  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  //Location patch event
  handleChange = (patchevent) => {
    this.setState({ location: patchevent.target.value });
  };

  //Price patch event
  inputChangedPrice = (event) => {
    const cred = this.serviceState.serviceDetails;
    cred[event.target.name] = event.target.value;
    this.setState({ serviceDetails: cred });
  };

  //service event
  inputChanged = (event) => {
    const cred = this.serviceState.serviceDetails;
    cred[event.target.name] = event.target.value;
    this.setState({ serviceDetails: cred });
  };

  render() {
    return (
      <div className="main-div-reacher">
        <Container>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <center>
                  <h4>What service do you require?</h4>
                </center>
              </Col>
            </Row>
            <Row>
              <Col sm="2"></Col>
              <Col sm="8">
                <Table>
                  <thead>
                    <tr>
                      <th>Enter Job Description</th>
                      <th>Enter Current Location</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <Form>
                          <FormGroup>
                            <Label for="jobDescription"></Label>
                            <Input
                              className="jobdesc-input"
                              type="text"
                              name="itemdesc"
                              id="itemdesc"
                              placeholder="Please specify the type of service you require!"
                              value={this.serviceState.serviceDetails.itemdesc}
                              onChange={this.inputChanged}
                            />
                          </FormGroup>
                        </Form>
                      </td>
                      <td>
                        <Form>
                          <FormGroup>
                            <Label for="Location"></Label>
                            <Input
                              type="text"
                              name="location"
                              id="location"
                              placeholder="Where are you currently?"
                              value={this.state.location}
                              onChange={this.handleChange}
                            />
                          </FormGroup>
                        </Form>
                      </td>

                      <td>
                        <Form>
                          <FormGroup>
                            <Label for="Price"></Label>
                            <Input
                              type="number"
                              name="price"
                              id="price"
                              placeholder="$"
                              value={this.state.price}
                              onChange={this.inputChangedPrice}
                            />
                          </FormGroup>
                        </Form>
                      </td>
                    </tr>
                  </tbody>
                </Table>

                <Button onClick={this.postService}>Find Helpers!</Button>
              </Col>
              <Col sm="3"></Col>
            </Row>
          </TabPane>
        </Container>
        <p>{this.state.joke}</p>
      </div>
    );
  }
}

export default ReacherComponent;
