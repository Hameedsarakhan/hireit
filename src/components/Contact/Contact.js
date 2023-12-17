import React, { useState } from "react";
import "./Contact.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import axios from "axios";

function ContactForm() {
  const initialFormData = {
    name: "",
    email: "",
    message: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false); // Added the 'loading' state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting the form
    try {
      const response = await axios.post(
        "http://localhost:5000/admin/contact",
        formData
      );
      setFormData(initialFormData);
      alert(response.data.msg);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false after form submission completes
    }
  };

  return (
    <>
      <Navbar />
      <div className="contact-form container d-flex align-items-center justify-content-center">
        <div className="col-md-6">
          <h2>Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group formdiv">
              <label>Name:</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group formdiv">
              <label>Email:</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group formdiv">
              <label>Message:</label>
              <textarea
                className="form-control"
                name="message"
                value={formData.message}
                onChange={handleChange}
              />
            </div>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ContactForm;
