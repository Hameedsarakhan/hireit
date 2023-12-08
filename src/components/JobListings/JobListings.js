import React, { useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import MyNavbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import useDataLoader from "./useDataLoader";
import axios from "axios";
import ResumeUploadModal from "../Upload/Upload";
import "./JobListings.css";

const JobListings = () => {
  const { data: job, loading, error } = useDataLoader("http://127.0.0.1:5000/admin/Job");

  useEffect(() => {
    const getData = async () => {
      try {
        let res = await axios.get("http://127.0.0.1:5000/admin/Job");
        let response = await res;
        let jobJson = response.data;
        // No need to set jobJson as useDataLoader already handles this
      } catch (e) {
        console.error(e);
      }
    };
    getData();
  }, []);

  const handleDelete = async (jobId) => {
    const deleteConfirmation = window.confirm("Do you want to delete?");
    if (deleteConfirmation) {
      try {
        await axios.get(`http://127.0.0.1:5000/admin/deleteJob/${jobId}`);
        // it's managed by useDataLoader
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (loading) {
    return (
      <>
        <MyNavbar />
        <div className="container">
          <h2 className="text-center my-4">Job Listings</h2>
          <div className="row">
            {/* Conditional rendering for loading state */}
            <div className="text-center">Loading...</div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <MyNavbar />
      <div className="container">
        <h2 className="text-center my-4">Job Listings</h2>
        <div className="row">
          {job.map((element, index) => {
            return (
              <div key={index} className="col-md-4 mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>{element.jobTitle}</Card.Title>
                    <Card.Text>{element.jobDescription}</Card.Text>
                    <Card.Text>Deadline: {element.jobDeadline}</Card.Text>
                    <Card.Title>{element.jobType}</Card.Title>
                    <Card.Text>{element.jobLevel}</Card.Text>
                    <>
                      <Link to={`/edit-job/${element.jobId}`}>
                        <Button className="editbtn">Edit</Button>
                      </Link>

                      <Button
                        onClick={() => handleDelete(element.jobId)}
                        className="deletebtn"
                      >
                        Delete
                      </Button>
                    </>

                    <p></p>
                      <ResumeUploadModal jobId={element.jobId} className="applybtn" />

                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default JobListings;
