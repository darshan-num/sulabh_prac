import React, { useState } from "react";
import { Navbar, NavbarBrand, Button, Container, Row, Col } from "reactstrap";
import "./nav-bar-loggedin.css";
import { Link } from "react-router-dom";
import { Collapse, NavbarToggler, Nav, NavItem, NavLink } from "reactstrap";
import logo from "../images/errandslogo.jpeg";

const NavbarLoggedIn = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div>
      <Navbar>
        <NavbarBrand href="/loggedin" className="mr-auto">
          <img src={logo} alt="logo" className="logo-nav-bar" />
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-3" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem className="nav-links">
              <NavLink href="http://localhost:3000/userProfile">
                Profile
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="http://localhost:3000/userHistory">
                History
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/">
                <Button className="logout-btn" color="danger">
                  Logout
                </Button>
              </NavLink>
            </NavItem>
            <NavItem></NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavbarLoggedIn;
