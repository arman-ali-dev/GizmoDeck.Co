import { CircularProgress } from "@mui/material";
import React from "react";

const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] bg-white flex items-center justify-center">
      <CircularProgress color="black" size="30px" />
    </div>
  );
};

export default PageLoader;
