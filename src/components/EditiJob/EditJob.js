import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import JobForm from "../JobForm/JobForm";

function EditJob() {
  //This is to get the id that would be send via URL
  const { id } = useParams();

  const [editJob, setEditJob] = useState({
    jobTitle: "",
    jobDescription: "",
    jobDeadline: "",
    jobType: "",
    jobLevel: "",
  });

  //Used useEffect to make sure that the data that is to be edited is fetched as soon as webpage loads.
  //Declared function within useEffect to make it async.
  useEffect(() => {
    const getEditableData = async () => {
      try {
        let data = axios.get(`http://localhost:5000/admin/editJob/${id}`);
        let response = await data;
        setEditJob(response.data);
      } catch (e) {
        console.error(e);
      }
    };
    getEditableData();
  }, []);

  const handleChange = (e) => {
    setEditJob((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //YE CONFIRMATION WALE BOX KO ACHA BANANA HAI
    let confirmChanges = window.confirm(
      "Are you sure you want to make changes?"
    );
    if (confirmChanges) {
      const postEditedData = async () => {
        try {
          let response = axios.post(
            `http://localhost:5000/user/editJob/${id}`,
            editJob
          );
          await response;
          window.location.href = "/jobListings";
        } catch (e) {
          console.error(e);
        }
      };
      postEditedData();
    }
  };

  return (
    <JobForm
      heading="Edit Job"
      handleChange={handleChange}
      jobData={editJob}
      handleSubmit={handleSubmit}
      buttonTitle="Update Changes"
    />
  );
}

export default EditJob;
