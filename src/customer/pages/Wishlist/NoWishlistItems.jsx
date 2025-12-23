import React from "react";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NoWishlistItems = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center text-center py-44">
      <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-5">
        <FavoriteBorderIcon sx={{ fontSize: 50, color: "#555" }} />
      </div>

      <h2 className="text-xl font-semibold mb-2">Your Wishlist is Empty</h2>

      <p className="text-gray-500 max-w-sm text-sm mb-6">
        Save your favorite products here. Add items to your wishlist to view
        them anytime and shop faster.
      </p>

      <Button
        onClick={() => navigate("/")}
        variant="contained"
        sx={{
          background: "#000",
          color: "#fff",
          textTransform: "capitalize",
          px: 4,
          py: 1.3,
          borderRadius: "8px",
        }}
      >
        Continue Shopping
      </Button>
    </div>
  );
};

export default NoWishlistItems;
