// Loading.js
import React from "react";

const Loading = ({ loading }) => {
  return (
    loading ? <div className="text-center">Loading...</div> : null
  );
};

export default Loading;
