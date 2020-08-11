import Login from "../login/login";
import Register from "../register/register";
import { Row, Col } from "reactstrap";
import "./login-component.css";
import Alertt from "../alert/alert";
import React, { useState } from "react";

import { TabContent, TabPane, Nav, NavItem, NavLink, Button } from "reactstrap";
import classnames from "classnames";

function Temp() {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const [showError, setShow] = useState(false);

  const [showRegistrationError, setShow3] = useState(false);
  const [showRegistrationSuccess, setShow4] = useState(false);

  const userLogin = (token) => {
    var a = token;

    var resp = [];
    if (token.token) {
      window.location.href = "/loggedin";
    } else {
      setShow(true); //
    }
  };

  const userRegister = (status) => {
    if (status === "error") {
      setShow3(true);
    } else {
      setShow4(true);
    }
  };

  return (
    <div id="main-div">
      {/* prettier-ignore */}
      <Row> 
        {showError ? ( <Alertt className="alert" type={"danger"} message={"login failed"}  />) : (<></>)}
         
      </Row>
      {/* prettier-ignore */}
      <Row> 
        {showRegistrationError ? ( <Alertt className="alert" type={"danger"} message={"registration failed"} />) : (<></>)}
      </Row>
      {/* prettier-ignore */}
      <Row>
      {showRegistrationSuccess ? ( <Alertt className="alert" type={"success"} message={"registration success"} />) : (<></>)}
      </Row>
      <div className="login-component">
        <Nav tabs className="nav">
          <NavItem className="nav-item-1">
            <NavLink
              className={classnames({ active: activeTab === "1" })}
              onClick={() => {
                toggle("1");
              }}
            >
              Login
            </NavLink>
          </NavItem>
          <NavItem className="nav-item-2">
            <NavLink
              className={classnames({ active: activeTab === "2" })}
              onClick={() => {
                toggle("2");
              }}
            >
              Register
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Login userlogin={userLogin} />
          </TabPane>
          <TabPane tabId="2">
            <Register userRegister={userRegister} />
          </TabPane>
        </TabContent>
      </div>
    </div>
  );
}

export default Temp;
