import React from "react";
import { useNavigate } from "react-router-dom";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { IconButton, Tooltip } from "@mui/material";
import storeIcon from "../assets/store.png";

const BecomeSellerButton = () => {
  const navigate = useNavigate();
  return (
    <Tooltip
      onClick={() => navigate("/become-seller")}
      title="Become a Seller"
      arrow
    >
      <div className="fixed bottom-4 lg:block hidden right-6 z-50 group">
        <IconButton
          sx={{
            background: "#000",
            color: "white",
            boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
            "&:hover": {
              boxShadow: "0 4px 10px rgba(0,0,0,0.35)",
              background: "#fff",
            },
          }}
          size="large"
        >
          <img
            src={storeIcon}
            alt=""
            className="
        w-[25px]
        filter invert brightness-0
        transition-all duration-300
        group-hover:invert-0
        group-hover:brightness-100
      "
          />
        </IconButton>
      </div>
    </Tooltip>
  );
};

export default BecomeSellerButton;
