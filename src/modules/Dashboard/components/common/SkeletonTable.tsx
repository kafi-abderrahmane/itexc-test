import React from "react";

//Material UI
import { Skeleton } from "@mui/material";

const SkeletonTable: React.FC = () => {
  return (
    <div>
      <Skeleton animation="wave" style={{ width: "100%", height: 70 }} />
      <Skeleton animation="wave" style={{ width: "100%" }} />
      <Skeleton animation="wave" style={{ width: "100%" }} />
      <Skeleton animation="wave" style={{ width: "100%" }} />
    </div>
  );
};

export default SkeletonTable;
