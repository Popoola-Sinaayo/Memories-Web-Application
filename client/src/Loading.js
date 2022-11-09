import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import "./css/loading.css";
import memories from "./images/memories.png";
import './styles.css'
function Loading() {
  return (
    <div className="loadingComponent">
      <p>Loading ...</p>\
      <img className="image" src={memories} alt="icon" height="60" />
      <br />
      <CircularProgress />
    </div>
  );
}

export default Loading;
