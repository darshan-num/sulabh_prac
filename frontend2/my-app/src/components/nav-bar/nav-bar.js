import React, { useState } from "react";
import { Navbar, NavbarBrand } from "reactstrap";
import "./nav-bar.css";
import logo from "../images/errandslogo.jpeg";

const Navbarr = (props) => {
  const [] = useState(true);

  return (
    <div>
      <Navbar className="bar" color="faded" light>
        <NavbarBrand href="/" className="mr-auto">
          <img src={logo} alt="logo" className="logo-nav-bar" />
        </NavbarBrand>
      </Navbar>
    </div>
  );
};

export default Navbarr;
