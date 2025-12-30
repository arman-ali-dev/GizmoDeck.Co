import { IconButton } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import bagIcon from "../../../assets/parcel.png";
import heartIcon from "../../../assets/heart3.png";
import storeIcon from "../../../assets/store.png";
import userIcon from "../../../assets/user-2.png";

const BottomNavBar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  return (
    <>
      <div className="py-2.5 bg-white/90 backdrop-blur border-gray-400 border-t flex lg:hidden justify-between z-[999]  px-4 sticky bottom-0 left-0 right-0">
        <IconButton onClick={() => navigate("/cart")}>
          <img className="w-[24px]" src={bagIcon} alt="" />
        </IconButton>

        <IconButton>
          <img className="w-[24px]" src={userIcon} alt="" />
        </IconButton>

        <IconButton onClick={() => navigate("/wishlist")}>
          <img className="w-[24px]" src={heartIcon} alt="" />
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
