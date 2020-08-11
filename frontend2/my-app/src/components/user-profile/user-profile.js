import React, { useState, useEffect } from "react";
import { Container } from "reactstrap";
import "./user-profile.css";
import axios from "axios";
import { TabPane, Row, Col, Button } from "reactstrap";
import { Table } from "reactstrap";
import Score from "../score/score";

function UserProfile() {
  if (localStorage.getItem("username") === "#") {
    //restrict unauthorized users from logging in
    window.location.href = "/";
  }

  const [users, setUsers] = useState([]);
  var username = localStorage.getItem("username");

  useEffect(() => {
    axios
      .get("http://localhost:7000/api/users/")
      .then((res) => {
        console.log(res.data.length);
        console.log(res.data);

        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].username == username) {
            localStorage.setItem("location", res.data[i].location); //set updated user location
          }
        }

        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  var location = localStorage.getItem("location");
  var phone = localStorage.getItem("phonenumber");
  var username_modified = username.charAt(0).toUpperCase() + username.slice(1);
  var id = localStorage.getItem("id");

  console.log(
    localStorage.getItem("location"), //location check
    localStorage.getItem("username"), //username check
    localStorage.getItem("phonenumber"), //phonenumber check
    localStorage.getItem("id"), //id check
    localStorage.getItem("jobId"), //jobId check
    localStorage.getItem("helperJobId") //helperJobId check
  );
  return (
    <div>
      <Container>
        <TabPane tabId="2">
          <Row>
            <Col sm="2"></Col>
            <Col sm="8">
              <center>
                <h4 className="table-header">{username_modified}'s Profile</h4>
              </center>

              <Table>
                <tbody>
                  <tr>
                    <td className="td-1">Username</td>
                    <td className="td-3">{username}</td>
                  </tr>
                  <tr>
                    <td className="td-1">Unique Id</td>
                    <td className="td-3">{id}</td>
                  </tr>
                  <tr>
                    <td className="td-1">Phone</td>
                    <td className="td-3">{phone}</td>
                  </tr>
                  <tr>
                    <td className="td-1">Location</td>
                    <td className="td-3">{location}</td>
                  </tr>
                  <tr>
                    <td className="td-1">NPS Score</td>
                    <td className="td-3">
                      <Score></Score>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <Col sm="2"></Col>
          </Row>
        </TabPane>
      </Container>
      <br />
    </div>
  );
}

export default UserProfile;
