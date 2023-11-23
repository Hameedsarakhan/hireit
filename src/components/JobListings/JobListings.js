import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import MyNavbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import ResumeUploadModal from "../Upload/Upload";

const JobListings = () => {
  const [job, setJob] = useState([]);

  //Used useEffect to make sure that the data that is to be displayed is fetched as soon as webpage loads.
  //Declared function within useEffect to make it async.
  useEffect(() => {
    const getData = async () => {
      try {
        let res = axios.get("http://127.0.0.1:5000/admin/Job");
        let response = await res;
        let jobJson = response.data;
        setJob(jobJson);
      } catch (e) {
        console.error(e);
      }
    };
    getData();
  }, []);

  function OnDelete(jobId) {
    //Make Confirmation box prettier
    let deleteConfirmation = window.confirm("Do you want to delete?");
    const postData = async (jobId) => {
      try {
        let data = axios.get(`http://127.0.0.1:5000/user/deleteJob/${jobId}`);
        await data;
        setJob(job.filter((item) => item.jobId !== jobId));
      } catch (err) {
        console.error(err);
      }
    };
    if (deleteConfirmation) {
      postData(jobId);
    }
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
                        <Button variant="warning">Edit</Button>
                      </Link>

                      <Button
                        variant="danger"
                        onClick={() => OnDelete(element.jobId)}
                      >
                        Delete
                      </Button>
                    </>

                    <p></p>

                    <ResumeUploadModal jobId={element.jobId} />
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
