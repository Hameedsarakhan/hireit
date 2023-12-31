import React, { useState } from "react";
import "./Addjob.css";
import axios from "axios";
import JobForm from "../JobForm/JobForm";
import App from "../Login/Login";

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
    const postJob = async () => {
      try {
        let postResponse = axios.post(
          "http://localhost:5000/admin/Job",
          jobData
        );
        await postResponse;
        window.location.href = "/jobListings";
      } catch (e) {
        console.error(e);
      }
    };
    //Yahan par we can add an alert types thing
    postJob();
  };

  if (localStorage.getItem("loggedIn") == "true") {
    return (
      <JobForm
        heading="Job Postings"
        handleChange={handleChange}
        jobData={jobData}
        handleSubmit={handleSubmit}
        buttonTitle="Add Job"
      />
    );
  } else {
    console.log(localStorage.getItem("loggedIn"));
    return <App />;
  }
};

export default AddJob;
