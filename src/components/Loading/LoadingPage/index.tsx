import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import "./loadingpage.scss";

const LoadingPage: React.FC = () => {
  return (
    <div className="loading-page">
      <CircularProgress />
    </div>
  );
};

export default LoadingPage;
