import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./Upload.css";

const ResumeUploadModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (
      selectedFile &&
      selectedFile.type === "application/pdf" &&
      selectedFile.size <= 2 * 1024 * 1024
    ) {
      setFile(selectedFile);
      setError("");
    } else {
      setFile(null);
      setError("Please upload a PDF file (Max 2MB)");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name && email && file) {
      // file submission
      console.log("Name:", name);
      console.log("Email:", email);
      console.log("File:", file);
      handleClose();
    } else {
      setError("Please fill in all fields and upload a PDF file");
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setName("");
    setEmail("");
    setFile(null);
    setError("");
  };

  return (
    <>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Apply
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Resume</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="file">
              <Form.Label>Upload Resume (Max 2MB)</Form.Label>
              <Form.Control
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                required
              />
              {error && <Form.Text className="text-danger">{error}</Form.Text>}
            </Form.Group>
            <Button className="uploadbtn" type="submit">
              Upload
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ResumeUploadModal;
