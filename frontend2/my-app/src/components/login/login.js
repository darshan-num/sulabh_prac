import React, { Component } from "react";
import "./login.css";
import { Button } from "reactstrap";

class Login extends Component {
  loginstate = {
    credentials: { username: "", password: "" },
  };

  login = (event) => {
    console.log(this.loginstate.credentials.username);

    fetch("http://127.0.0.1:8000/auth/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.loginstate.credentials),
    })
      .then((data) => data.json()) //append the token to data
      .then((data) => {
        localStorage.setItem("username", this.loginstate.credentials.username); //set username
        this.props.userlogin(data); //pass the token to app.js
      })
      .catch((error) => console.error(error));
  };

  //Set State for event

  //login
  inputChanged = (event) => {
    const cred = this.loginstate.credentials;
    cred[event.target.name] = event.target.value;
    this.setState({ credentials: cred });
  };

  render() {
    return (
      <div className="Login">
        <div className="login-home">
          <h1>Login</h1>

          <label>Username</label>
          <br />
          <input
            type="text"
            name="username"
            value={this.loginstate.credentials.username}
            onChange={this.inputChanged}
          />

          <br />

          <label>Password</label>
          <br />
          <input
            type="password"
            name="password"
            value={this.loginstate.credentials.password}
            onChange={this.inputChanged}
            required
          />

          <br />
          <br />

          <Button onClick={this.login}>Login</Button>
        </div>
      </div>
    );
  }
}

export default Login;
