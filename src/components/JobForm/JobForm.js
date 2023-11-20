import React from "react";
import { Form, Button } from "react-bootstrap";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

function JobForm(props) {
  return (
    <>
      <Navbar />

      <div className="container">
        {/* Custom styling for the heading */}
        <div className="custom-heading">{props.heading}</div>

        <Form onSubmit={props.handleSubmit} className="custom-form">
          <Form.Group controlId="title">
            {/* Custom styling for the label */}
            <Form.Label className="custom-label">Job Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter job title"
              name="jobTitle"
              value={props.jobData.jobTitle}
              onChange={props.handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label className="custom-label">Job Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter job description"
              name="jobDescription"
              value={props.jobData.jobDescription}
              onChange={props.handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="type">
            <Form.Label className="custom-label">Job Type</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter job type (Onsite/Remote/Hybrid)"
              name="jobType"
              value={props.jobData.jobType}
              onChange={props.handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="level">
            <Form.Label className="custom-label">Job Level</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter job level (Entry/Mid/Experienced)"
              name="jobLevel"
              value={props.jobData.jobLevel}
              onChange={props.handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="deadline">
            <Form.Label className="custom-label">Deadline</Form.Label>
            <Form.Control
              type="date"
              name="jobDeadline"
              value={props.jobData.jobDeadline}
              onChange={props.handleChange}
              required
            />
          </Form.Group>

          {/* Custom styling for the button */}
          <Button type="submit" className="custom-button">
            {props.buttonTitle}
          </Button>
        </Form>
      </div>
      <Footer />
    </>
  );
}

export default JobForm;
