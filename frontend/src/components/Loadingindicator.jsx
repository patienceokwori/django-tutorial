import React from "react";
import "../styles/Loadingindicator.css";

const Loadingindicator = () => {
  return (
    <div className="loading-indicator">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
}

export default Loadingindicator;
