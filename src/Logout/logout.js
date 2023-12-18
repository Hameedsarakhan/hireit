import React from "react";

function Logout() {
  const handleSubmitLogout = async (e) => {
    e.preventDefault();
    await localStorage.clear();
    window.location.href = "/jobListings";
  };
  return <button onClick={handleSubmitLogout}>Logout</button>;
}

export default Logout;
