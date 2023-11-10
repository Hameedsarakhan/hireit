import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "./Login.css";

function App() {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const database = [
    {
      username: "user1",
      password: "pass1",
    },
    {
      username: "user2",
      password: "pass2",
    },
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password",
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    var { uname, pass } = event.target.elements;
    const userData = database.find((user) => user.username === uname.value);
    if (userData) {
      if (userData.password !== pass.value) {
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
      }
    } else {
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <Alert variant="danger" className="error">
        {errorMessages.message}
      </Alert>
    );

  const renderForm = (
    <div className="form">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicUsername" className="input-container">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className="input-container">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="pass" required />
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

