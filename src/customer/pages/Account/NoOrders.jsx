import React from "react";

import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { useNavigate } from "react-router-dom";

const NoOrders = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-40 text-center">
      {/* Icon Circle */}
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <ShoppingBagOutlinedIcon sx={{ fontSize: 48, color: "#6b7280" }} />
      </div>

      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800">
        You have no orders yet
      </h2>

      {/* Subtitle */}
      <p className="text-gray-500 text-sm mt-2 max-w-xs">
        Looks like you haven’t made any purchases yet. Start shopping now!
      </p>

      {/* Button */}
      <button
        onClick={() => navigate("/")}
        className="mt-6 bg-black text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-black/90 transition"
      >
        Start Shopping
      </button>
    </div>
  );
};

export default NoOrders;
