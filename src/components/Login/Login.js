import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "./Login.css";
import axios from "axios";
import loginVideo from "./loginvideo.mp4";

function App() {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleOnchange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
    console.log(credentials);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      email: credentials.email,
      password: credentials.password,
    };
    axios
      .post("http://localhost:5000/admin/login", body)
      .then((res) => {
        console.log(res.data.authToken);
        const authToken = res.data.authToken;
        localStorage.setItem("authToken", authToken);
        window.location.href = "/";
      })
      .catch((error) => {
        setErrorMessages({ name: "pass", message: error.response.data.error });
        // console.log(error.response.data)
      });
  };

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <Alert variant="danger" className="error">
        {errorMessages.message}
      </Alert>
    );

  const renderForm = (
    <div className="form">
      <Form onSubmit={handleSubmit} method="POST">
        <Form.Group controlId="formBasicUsername" className="input-container">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="email"
            name="email"
            onChange={handleOnchange}
            required
          />
          {renderErrorMessage("uname")}
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className="input-container">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            onChange={handleOnchange}
            required
          />
          {renderErrorMessage("pass")}
        </Form.Group>

        <div className="button-container">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );

  return (
    <div className="app">
      <div className="videodiv">
        <video id="background-video" loop autoPlay>
          <source src={loginVideo} type="video/mp4" />
        </video>
      </div>
      <div className="login-form">
        <div className="title">Sign In</div>
        {isSubmitted ? (
          <Alert variant="success">User is successfully logged in</Alert>
        ) : (
          renderForm
        )}
      </div>
    </div>
  );
}

export default App;
