import React, { Component } from "react";
import {
  Spinner,
  Button,
  Table,
  TabPane,
  Row,
  Col,
  Container,
} from "reactstrap";
import "./spinner.css";
import { Link } from "react-router-dom";
import axios from "axios";
import SearchMaps from "../search-maps/search-maps";
class Spinnerr extends Component {
  state = {
    joke: "",
    newPrice: "",
    newPrice2: "",
  };

  setJobId() {
    axios.get("http://127.0.0.1:8000/api/jobs/").then((response) => {
      localStorage.setItem("jobId", response.data[response.data.length - 1].id);
      console.log(response);
    });
    console.log(localStorage.getItem("jobId"));
  }

  locationUser() {
    console.log(
      "user coords",

      localStorage.getItem("reacherLat"),
      localStorage.getItem("reacherLong")
    );
  }

  fetchHelpers() {
    axios.get("http://127.0.0.1:8000/api/jobs/").then((response) => {
      for (var i = 0; i < response.data.length; i++) {
        if (response.data[i].id == localStorage.getItem("jobId")) {
          localStorage.setItem("jobIndex", i); //set the job index
        }
      }
      console.log(
        response.data[localStorage.getItem("jobIndex")].id,
        response.data[localStorage.getItem("jobIndex")].status
      );
      //localStorage.setItem("jobId", response.data[response.data.length - 1].id);
      this.setState({
        joke: response.data[localStorage.getItem("jobIndex")].status,
      });
      // prettier-ignore
      if (response.data[localStorage.getItem("jobIndex")].status == "started") {
        window.location.href = "/reacherProgress"; //locate user to the job status
      } else if (response.data[localStorage.getItem("jobIndex")].status =="helperNegotiate") {
        console.log("negotiated price",response.data[localStorage.getItem("jobIndex")].bargain_price);
        this.setHelperLocation(response.data[localStorage.getItem("jobIndex")].helper_id);
        this.setState({
          newPrice:response.data[localStorage.getItem("jobIndex")].bargain_price
        })
      }
    });
  }
  setReacherCoordinates(place) {
    //set the helper coordinates

    axios
      .get(
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
          place +
          ".json?access_token=pk.eyJ1IjoiZGFzaC1udW0iLCJhIjoiY2tkNXNtMDduMGF2djJ0cmE1MjJ0aHNpOSJ9.4FgclywHobtPkxbpi_c-DQ"
      )
      /* preetier-ignore */
      .then((response) => {
        localStorage.setItem("reacherLat", response.data.features[1].center[1]);
        localStorage.setItem(
          "reacherLong",
          response.data.features[1].center[0]
        );
      });
  }

  setHelperCoordinates(place) {
    //set the helper coordinates

    axios
      .get(
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
          place +
          ".json?access_token=pk.eyJ1IjoiZGFzaC1udW0iLCJhIjoiY2tkNXNtMDduMGF2djJ0cmE1MjJ0aHNpOSJ9.4FgclywHobtPkxbpi_c-DQ"
      )
      .then((response) => {
        localStorage.setItem("helperCoords", 1);
        localStorage.setItem("helperLat", response.data.features[1].center[1]);
        localStorage.setItem("helperLong", response.data.features[1].center[0]);
      });
  }
  setHelperLocation(helper_id) {
    console.log("helper_id", helper_id);
    axios
      .get("http://127.0.0.1:8000/api/users/" + helper_id + "/")
      .then((response) => {
        this.setHelperCoordinates(response.data.location); //give --> response.data.location
        localStorage.setItem("tempHelper", response.data.username);
      });
  }

  componentDidMount() {
    //set reachers location
    axios
      .get(
        "http://127.0.0.1:8000/api/users/" + localStorage.getItem("id") + "/"
      )

      .then((response) => {
        console.log(response.data.location);
        this.setReacherCoordinates(response.data.location);
      });

    console.log(
      "lat, long",
      localStorage.getItem("reacherLat"),
      localStorage.getItem("reacherLong")
    );
    //setReacherCoordinates("NewYork");
    this.setJobId(); //set the jobId
    this.locationUser(); //check the coordinates
    //Fetch the API request every 4 seconds
    console.log(this.fetchHelpers());
    //location.reload();
    this.interval = setInterval(() => {
      this.fetchHelpers();
    }, 4000); //every 40sec
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  Accept() {
    //patch the job status to started
    var jobId = localStorage.getItem("jobId");
    var newPrice = this.state.newPrice;
    console.log("job", jobId, newPrice);

    axios
      .patch(
        "http://localhost:7000/items/" + localStorage.getItem("jobId") + "/",
        {
          //patch location
          status: "started",
          price: newPrice,
        }
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  Reject() {
    //patch job status to matching
    localStorage.setItem("helperCoords", 0);
    localStorage.setItem("tempHelper", "");
    axios
      .patch(
        "http://localhost:7000/items/" + localStorage.getItem("jobId") + "/",
        {
          //patch location
          status: "matching",
          helper_id: 0,
        }
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    //window.location.href=""
  }

  Negotiate() {
    //take input first
    var newPrice2 = prompt("Enter the final price");
    localStorage.setItem("newPriceReacher", newPrice2);

    axios
      .patch(
        "http://127.0.0.1:8000/api/jobs/" + localStorage.getItem("jobId") + "/",
        {
          //patch location
          status: "reacherNegotiate",
          bargain_price: localStorage.getItem("newPriceReacher"),
        }
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  DeleteRequest() {
    localStorage.setItem("helperCoords", 0);
    localStorage.setItem("reacherLat", 21.120221);
    localStorage.setItem("reacherLong", 72.74369);
    localStorage.setItem("tempHelper", "");
    axios
      .delete(
        "http://127.0.0.1:8000/api/jobs/" + localStorage.getItem("jobId") + "/"
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    localStorage.setItem("jobId", "#"); //reset jobId
    window.location.href = "/loggedin/reacher";
  }

  render() {
    return (
      <div className="loading">
        {/* <Spinner color="primary" />
        <br />
        <br />
        <h3>Looking for Helpers..</h3> */}
        <p>{this.state.joke}</p>

        <br />
        <div className="searchMaps">
          <SearchMaps
            lat={localStorage.getItem("reacherLat")}
            long={localStorage.getItem("reacherLong")}
          ></SearchMaps>
        </div>

        <br />
        <br />
        <Button color="danger" onClick={() => this.DeleteRequest()}>
          Cancel
        </Button>
        <br />
        <br />
        {this.state.joke === "helperNegotiate" ? (
          <Container>
            <TabPane tabId="2">
              <Row>
                <Col sm="2"></Col>
                <Col sm="8">
                  <Table>
                    <thead>
                      <tr>
                        <th>Offered Price</th>
                        <th></th>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    {/* prettier-ignore */}
                    <tbody>
              <tr>
                <td> {this.state.newPrice}$</td>
                <td> <Button color="success" onClick={() => this.Accept()}>Accept</Button></td>
                <td> <Button color="danger"  onClick={() => this.Reject()}>Reject</Button></td>
                <td> <Button color="info"    onClick={() => this.Negotiate()}>Negotiate</Button></td>
              </tr>
            </tbody>
                  </Table>
                </Col>
                <Col sm="2"></Col>
              </Row>
            </TabPane>
          </Container>
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default Spinnerr;
