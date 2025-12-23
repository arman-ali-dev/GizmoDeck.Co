import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-5">
      <h1 className="text-7xl font-bold text-black mb-4">404</h1>

      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
        Page Not Found
      </h2>

      <p className="text-gray-600  mb-6">
        Sorry! The page you're looking for doesn't exist or has been moved.
      </p>

      <Button
        variant="contained"
        onClick={() => navigate("/")}
        sx={{
          textTransform: "capitalize",
          backgroundColor: "black",
          paddingX: 4,
          paddingY: 1.3,
          fontSize: "16px",
          "&:hover": { backgroundColor: "#333" },
        }}
      >
        Go to Home
      </Button>
    </div>
  );
};

export default NotFound;
