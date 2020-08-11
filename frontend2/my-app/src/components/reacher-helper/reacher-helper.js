import React, { useState } from "react";
import {
  Nav,
  NavItem,
  NavLink,
  Col,
  TabPane,
  Row,
  Container,
  TabContent,
} from "reactstrap";
import "./reacher-helper.css";
import axios from "axios";
import { Link } from "react-router-dom";
import classnames from "classnames";
import ReacherComponent from "../reacher-component/reacher-component";
import HelperComponent from "../helper-component/helper-component";
import SideNav from "../side-nav/side-nav";

const ReacherHelper = (props) => {
  if (localStorage.getItem("username") === "#") {
    //restrict unauthorized users from logging in
    window.location.href = "/";
  }

  var username = localStorage.getItem("username");
  var username_modified = username.charAt(0).toUpperCase() + username.slice(1);

  axios.get("http://127.0.0.1:8000/api/users/").then((response) => {
    for (var i = 0; i < response.data.length; i++) {
      if (response.data[i].username === username) {
        localStorage.setItem("id", response.data[i].id); //set user id
        localStorage.setItem("location", response.data[i].location); //set user location
        localStorage.setItem("phonenumber", response.data[i].phone); //set user phonenumber
        console.log(response.data[i].id, response.data[i].username);
      }
    }
  });

  var id = localStorage.getItem("id");

  console.log(
    localStorage.getItem("location"), //location check
    localStorage.getItem("username"), //username check
    localStorage.getItem("phonenumber"), //phonenumber check
    localStorage.getItem("id"), //id check
    localStorage.getItem("jobId"), //jobId check
    localStorage.getItem("helperJobId") //helperJobId check
  );
  const [activeTab, setActiveTab] = useState();
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  return (
    <div id="main-div">
      <div className="text">
        So what do you feel like doing today <u>{username_modified}</u> ?
      </div>
      <Nav tabs className="nav">
        <NavItem className="nav-item-1">
          <Link to="/loggedin/reacher">
            <NavLink
              className={classnames({ active: activeTab === "1" })}
              onClick={() => {
                toggle("1");
              }}
            >
              Reacher
            </NavLink>
          </Link>
        </NavItem>
        <NavItem className="nav-item-2">
          <Link to="/loggedin/helper">
            <NavLink
              className={classnames({ active: activeTab === "2" })}
              onClick={() => {
                toggle("2");
              }}
            >
              Helper
            </NavLink>
          </Link>
        </NavItem>
      </Nav>
    </div>
  );
};

export default ReacherHelper;
