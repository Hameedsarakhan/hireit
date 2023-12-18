import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Contact from "./components/Contact/Contact";
import Home2 from "./components/Home2/Home2";
import FAQS from "./components/FAQS/FAQS";
import EditJob from "./components/EditiJob/EditJob";
import JobListings from "./components/JobListings/JobListings";
import AddJob from "./components/AddJob/Addjob";
import ResumeUploadModal from "./components/Upload/Upload";
import DisplayResume from "./components/Displayresume/DisplayResume";

function App() {
  //ABHI ISKI NEED NHI HAI

  // const [jobList, setJobList] = useState([]);

  // const handleAddJob = (jobData) => {
  //   setJobList((prevJobs) => [...prevJobs, jobData]);
  // };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AddJob />} />
          <Route path="/edit-job/:id" element={<EditJob />} />
          <Route path="/JobListings" element={<JobListings />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/AddJob" element={<AddJob />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/Home2" element={<Home2 />} />
          <Route path="/  " element={<FAQS />} />
          <Route path="/upload" element={<ResumeUploadModal />} />
          <Route path="/displayresume" element={<DisplayResume/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<App />);
export default App;
