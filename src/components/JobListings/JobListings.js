// File: JobListings.js
import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const JobListings = ({ loggedInUser, onDelete, onEdit }) => {
  const [job, setJob] = useState([]);
  useEffect(() => {
    axios.get("http://127.0.0.1:5000/user/JobListings").then((res) => {
      let js = res.data;
      setJob(js);
      console.log(js);
      console.log(job);
    });
    // let response = await job1;
    // let js = JSON.parse(job1);
    // console.log(js);
    // setjobs(js);
    // setjobs(response);
  }, []);
  return (
    <div className="container">
      <h2 className="text-center my-4">Job Listings</h2>
      <div className="row">
        {job.map((element) => {
          return (
            <>
              <div key={job.jobId} className="col-md-4 mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>{element.jobTitle}</Card.Title>
                    <Card.Text>{element.jobDescription}</Card.Text>
                    <Card.Text>Deadline: {element.jobDeadline}</Card.Text>
                    <Card.Title>{element.jobType}</Card.Title>
                    <Card.Text>{element.jobLevel}</Card.Text>
                    {/* <Card.Text>Deadline: {job.requirements}</Card.Text> */}
                    {loggedInUser && loggedInUser.isAdmin ? (
                      <>
                        <Link to={`/edit-job/${element.jobId}`}>
                          <Button
                            variant="warning"
                            onClick={() => onEdit(element.jobId)}
                          >
                            Edit
                          </Button>
                        </Link>
                        <Button
                          variant="danger"
                          onClick={() => onDelete(element.jobId)}
                        >
                          Delete
                        </Button>
                      </>
                    ) : (
                      <p>No administrative rights</p>
                    )}
                    <Button variant="primary">Apply</Button>
                  </Card.Body>
                </Card>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default JobListings;
