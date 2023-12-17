import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./emails.css";
const EmailComponent = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('Dear [Candidate Name],');
  const [intro, setIntro] = useState('We are pleased to inform you that after careful consideration of your application for the [Job Position] at Lineax, you have been shortlisted for an interview.');
  const [mainBody, setMainBody] = useState('Your qualifications and experience have impressed our hiring team, and we believe that your skills align well with what we are seeking for this role. We would like to invite you for an interview to further discuss your background, experience, and how you can contribute to our team.\nInterview Details:\nDate: [Interview Date]\nTime: [Interview Time]\nLocation: [Interview Location/Online Meeting Link]\nDuring the interview we will delve deeper into your professional journey and discuss your accomplishments and explore how your expertise can be an asset to our company.');
  const [lastLines, setLastLines] = useState('We look forward to meeting with you and discussing this exciting opportunity at Lineax.\nWarm regards,\n [Your Name]\n[Your Position]\nLineax.');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleIntroChange = (e) => {
    setIntro(e.target.value);
  };

  const handleMainBodyChange = (e) => {
    setMainBody(e.target.value);
  };

  const handleLastLinesChange = (e) => {
    setLastLines(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Email: ${email}, Name: ${name}, Intro: ${intro}, Main Body: ${mainBody}, Last Lines: ${lastLines}`);
    // api stuff
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center font-weight-bold mb-4">Email Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="emailInput"><b>Email Address:</b></label>
          <input
            type="email"
            id="emailInput"
            className="form-control"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="nameInput"><b>Recipient Name:</b></label>
          <input
            type="text"
            id="nameInput"
            className="form-control"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="introInput"><b>Intro Lines:</b></label>
          <textarea
            id="introInput"
            className="form-control"
            value={intro}
            onChange={handleIntroChange}
            rows={4}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="mainBodyInput"><b>Main Body:</b></label>
          <textarea
            id="mainBodyInput"
            className="form-control"
            value={mainBody}
            onChange={handleMainBodyChange}
            rows={8}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastLinesInput"><b>Last Lines:</b></label>
          <textarea
            id="lastLinesInput"
            className="form-control"
            value={lastLines}
            onChange={handleLastLinesChange}
            rows={4}
            required
          />
        </div>
        <button type="submit" className="emailbtn">Send Email</button>
      </form>
    </div>
  );
};

export default EmailComponent;
