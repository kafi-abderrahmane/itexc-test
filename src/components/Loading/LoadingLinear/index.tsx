import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import "./loadinglinear.scss";

const LoadingLinear: React.FC = () => {
  return (
    <div className="loading-linear">
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    </div>
  );
};

export default LoadingLinear;
