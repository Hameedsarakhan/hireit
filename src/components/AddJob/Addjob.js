import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./Addjob.css";
import axios from "axios";

const AddJob = () => {
  const [jobData, setJobData] = useState({
    jobTitle: "",
    jobDescription: "",
    jobDeadline: "",
    jobType: "",
    jobLevel: "",
  });

  const handleChange = (e) => {
    setJobData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/user/addJob", jobData).then((res) => {
      console.log(res.data);
      setJobData({
        jobTitle: "",
        jobDescription: "",
        jobDeadline: "",
        jobType: "",
        jobLevel: "",
      });
      alert("Jobs were updated"); //Yahan par we can add an alert types thing
    });
  };

  return (
    <>
      <Navbar />

      <div className="container">
        {/* Custom styling for the heading */}
        <div className="custom-heading">Job Postings</div>

        <Form onSubmit={handleSubmit} className="custom-form">
          <Form.Group controlId="title">
            {/* Custom styling for the label */}
            <Form.Label className="custom-label">Job Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter job title"
              name="jobTitle"
              value={jobData.jobTitle}
              onChange={handleChange}
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
              value={jobData.jobDescription}
              onChange={handleChange}
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
              value={jobData.jobType}
              onChange={handleChange}
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
              value={jobData.jobLevel}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="deadline">
            <Form.Label className="custom-label">Deadline</Form.Label>
            <Form.Control
              type="date"
              name="jobDeadline"
              value={jobData.jobDeadline}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Custom styling for the button */}
          <Button type="submit" className="custom-button">
            Add Job
          </Button>
        </Form>
      </div>
      <Footer />
    </>
  );
};

export default AddJob;
