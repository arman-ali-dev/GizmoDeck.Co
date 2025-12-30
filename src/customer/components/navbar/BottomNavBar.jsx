import { IconButton } from "@mui/material";
import React from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import StorefrontIcon from "@mui/icons-material/Storefront";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import bagIcon from "../../../assets/bag.png";
import searchIcon from "../../../assets/search.png";
import heartIcon from "../../../assets/heart2.png";
import storeIcon from "../../../assets/store.png";
import userIcon from "../../../assets/user.png";

const BottomNavBar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  return (
    <>
      <div className="py-2.5 bg-white/90 backdrop-blur border-gray-400 border-t flex lg:hidden justify-between z-[999]  px-4 sticky bottom-0 left-0 right-0">
        <IconButton onClick={() => navigate("/cart")}>
          <img src={bagIcon} alt="" />
        </IconButton>

        <IconButton>
          <img src={userIcon} alt="" />
        </IconButton>

        <IconButton onClick={() => navigate("/wishlist")}>
          <img className="w-[27px]" src={heartIcon} alt="" />
        </IconButton>

        <IconButton
          onClick={() =>
            navigate(user?.role == "SELLER" ? "/seller" : "/become-seller")
          }
        >
          <img className="w-[27px]" src={storeIcon} alt="" />
        </IconButton>
      </div>
    </>
  );
};

export default BottomNavBar;
