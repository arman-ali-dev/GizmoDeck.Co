import { IconButton } from "@mui/material";
import React from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import StorefrontIcon from "@mui/icons-material/Storefront";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SearchIcon from "@mui/icons-material/Search";

const BottomNavBar = () => {
  return (
    <>
      <div className="py-2 bg-black flex lg:hidden justify-between  px-4 sticky bottom-0 left-0 right-0">
        <IconButton>
          <ShoppingCartOutlinedIcon sx={{ color: "white", fontSize: "20px" }} />
        </IconButton>

        <IconButton>
          <SearchIcon sx={{ color: "white", fontSize: "22px" }} />
        </IconButton>

        <IconButton>
          <FavoriteBorderOutlinedIcon
            sx={{ color: "white", fontSize: "22px" }}
          />
        </IconButton>

        <IconButton>
          <StorefrontIcon sx={{ color: "white", fontSize: "20px" }} />
        </IconButton>
      </div>
    </>
  );
};

export default BottomNavBar;
