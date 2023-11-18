import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './Navbar.css'; 

const MyNavbar = () => {
  return (
    <Navbar className="custom-navbar" expand="lg" variant="dark">
      <Container>
        {/* Logo on the left */}
        <Navbar.Brand href="#home">
          <img
            src="hireit logo.jpeg"
            width="100"
            height="50"
            className="d-inline-block align-top"
            alt="Your Logo"
          />
        </Navbar.Brand>

        {/* Toggle button for small screens */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Navigation links on the right */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#services">Services</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;





