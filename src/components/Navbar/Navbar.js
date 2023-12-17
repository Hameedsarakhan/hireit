import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import "./Navbar.css";

const MyNavbar = () => {
  return (
    <Navbar className="custom-navbar" expand="lg" variant="dark">
      <Container>
        {/* Logo on the left */}
        <Navbar.Brand href="/home">
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
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/contact" className="nav-link">
              Contact
            </Link>
            <Link to="/AddJob" className="nav-link">
              Add Job
            </Link>
            <Link to="/JobListings" className="nav-link">
              Job Listings
            </Link>
            <Link to="/Home2" className="nav-link">
              Home
            </Link>
            <Link to="/Emails" className="nav-link">
              Help
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
