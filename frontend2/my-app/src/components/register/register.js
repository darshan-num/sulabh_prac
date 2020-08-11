import React, { Component } from "react";
import "./register.css";
import { Button } from "reactstrap";

class Register extends Component {
  state = {
    credentials2: {
      username: "",
      password: "",
      location: "",
      phone: "",
      role: "none",
    },
  };
  register = (event) => {
    const ValidateCred = this.state.credentials2;
    const Username = ValidateCred.username;
    const Password = ValidateCred.password;
    const Phone = ValidateCred.phone;
    const Location = ValidateCred.location;
    var flag = 0;
    if (Phone === "" || Location === "" || Username === "" || Password === "") {
      console.log("All fields are required");
      flag = 1;
    } else if (Phone.length !== 10) {
      console.log("Phone Number must be 10 digits");
      flag = 1;
    } else if (Username.length > 10) {
      console.log("Username maximum limit is 10");
      flag = 1;
    } else {
      console.log(ValidateCred);
      fetch("http://127.0.0.1:8000/api/users/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.state.credentials2),
      })
        .then((data) => data.json()) //append the token to data
        .then((data) => {
          //this.props.userRegister("success"); //pass the token to app.js
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
          this.props.userRegister("error"); //pass the token to app.js
        });
    }

    if (flag === 1) {
      this.props.userRegister("error");
    } else {
      this.props.userRegister("success");
    }
  };

  //register
  inputChangedRegister = (event) => {
    const cred = this.state.credentials2;

    if (event.target.name === "phone") {
      //Phone number Validation

      const val = event.target.value;
      if (val[0] === "-") {
        console.log("Digits only !");
      } else if (val.length > 10) {
        console.log("Length is not Valid");
      } else if (val === "" || val === "-") {
        cred[event.target.name] = val;
        this.setState({ credentials2: val });
      } else if (event.target.validity.valid) {
        cred[event.target.name] = val;
        this.setState({ credentials2: cred });
      }
      console.log(val);
    } else {
      cred[event.target.name] = event.target.value;
      this.setState({ credentials2: cred });
    }
  };

  render() {
    return (
      <div className="Register">
        <div className="register-home">
          <h1>Register</h1>

          <label>Username</label>
          <br />
          <input
            type="text"
            name="username"
            value={this.state.credentials2.username}
            onChange={this.inputChangedRegister}
          />

          <br />
          <label>Phone</label>
          <br />
          <input
            type="tel"
            name="phone"
            pattern="^-?[0-9]\d*\.?\d*$"
            value={this.state.credentials2.phone}
            onChange={this.inputChangedRegister}
          />

          <br />
          <label>Location</label>
          <br />

          <select
            name="location"
            value={this.state.credentials2.location}
            onChange={this.inputChangedRegister}
          >
            <option value=""></option>
            <option value="Piplod">Piplod</option>
            <option value="Ichchanath">Ichchanath</option>
            <option value="Vesu">Vesu</option>
            <option value="VIP Road">VIP Road</option>
            <option value="Airport">Airport</option>
          </select>

          <br />

          <label>Password</label>
          <br />
          <input
            type="password"
            name="password"
            value={this.state.credentials2.password}
            onChange={this.inputChangedRegister}
            required
          />

          <br />
          <br />

          <Button onClick={this.register}>Register</Button>
        </div>
      </div>
    );
  }
}

export default Register;
