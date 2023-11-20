import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./Home2.css"; // Custom CSS

function Home2() {
  return (
    <div className="home2">
      <Navbar />
      <div className="container main-content">
        <h1 className="animate-heading">
          Solution to your<span className="text-danger"> hiring needs!</span>
        </h1>

        <form className="search-form">
          <div className="form-group">
            <label className="homelabel">Enter to parse resume</label>
            <input
              className="form-control "
              type="text"
              placeholder="Keywords"
            />
          </div>
          <div className="form-group">
            <input
              className="form-control "
              type="text"
              placeholder="Custom Input"
            />
          </div>
          <button type="submit" className="blue-button">
            Search
          </button>
          <button type="submit" className="green-button">
            View Resume
          </button>
        </form>

        <div className="learnmore">
          <h1 className="learnmore_heading">Learn More about Hireit</h1>
          <p className="responsive-para">
            "Hire IT simplifies resume parsing for HR professionals. By
            inputting keywords and custom parameters, it swiftly extracts vital
            candidate information. This streamlines the selection process,
            saving time and enhancing precision. Whether it's technical skills
            or industry expertise, Hire IT ensures you find the ideal
            candidates. Say goodbye to manual screening and hello to an
            efficient hiring process."
          </p>
          <div className="centered-button">
            <button className=" blue-button">Get started now</button>
          </div>
        </div>

        <div className="learnmore">
          <h1 className="learnmore_heading">Why use Hireit ?</h1>
          <p className="responsive-para">
            {" "}
            "Say goodbye to manual screening and hello to an efficient hiring
            process."
          </p>
          <img
            className="img-fluid mainimage"
            src="main image.jpeg"
            alt="sample"
          />
          <div className="centered-button">
            <button className=" blue-button">Get started now</button>
          </div>
        </div>

        <div className="blue-div text-white text-center py-5">
          <p className="bold-para">
            "Say goodbye to dull and uninspiring hiring processes. With HireIt,
            you can craft engaging and authentic job listings that truly
            represent your company's personality. Hire naturally with HireIt."
          </p>
        </div>

        <div className="learnmore">
          <h1 className="learnmore_heading">
            What is Resume Parsing Feature ?
          </h1>
          <p className="responsive-para">
            Our AI-powered Resume Parser feature is designed to make it easier
            for you to select resumes. It's quicker, more efficient, and
            tailored to your specific needs.
          </p>
          <img
            className="img-fluid mainimage"
            src="resume parser icon.jpeg"
            alt="sample"
          />
          <div className="centered-button">
            <button className="blue-button ">Get started now</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home2;
