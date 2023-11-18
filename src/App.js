import React from "react";

import Login from "./components/Login/Login";
import AddJob from "./components/AddJob/Addjob";
import JobListings from "./components/JobListings/JobListings";

function App() {
  return (
    <div className="App2">
      {/* <AddJob /> */}
      <JobListings />
    </div>
  );
}
export default App;
