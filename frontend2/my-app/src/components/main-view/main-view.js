import React from "react";
import "./main-view.css";
import LoginComponent from "../login-component/login-component";
//import SlideShowComponent from "../slide-show/slide-show";
import Carousel from "../carousel/carousel";
import "./main-view.css";
import { Row, Col } from "reactstrap";

function MainView() {
  localStorage.setItem("location", "#"); //location reset
  localStorage.setItem("username", "#"); //username reset
  localStorage.setItem("phonenumber", "#"); //phonenumber reset
  localStorage.setItem("id", "#"); //id reset
  localStorage.setItem("jobId", "#"); //jobId reset
  localStorage.setItem("helperJobId", "#"); //helperJobId reset

  console.log(
    localStorage.getItem("location"), //location reset
    localStorage.getItem("username"), //username reset
    localStorage.getItem("phonenumber"), //phonenumber reset
    localStorage.getItem("id"), //id reset
    localStorage.getItem("jobId"), //jobId reset
    localStorage.getItem("helperJobId") //helperJobId reset
  );

  return (
    <div className="MainView">
      <Row>
        <Col>
          <Carousel />
        </Col>
        <Col>
          <LoginComponent className="login-component" />
        </Col>
      </Row>
      <br />
    </div>
  );
}

export default MainView;
