import React from "react";
import { Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { teal } from "@mui/material/colors";

const WishlistProductCard = () => {
  return (
    <div className="relative">
      <div className="w-full">
        <img
          src="https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/31101834/2024/12/26/bb7963ed-a03b-41ad-8b79-01354822587e1735204642505-Aeropostale-Men-Tshirts-961735204641834-1.jpg"
          className="object-cover lg:h-[360px] h-[180px] rounded-md object-top w-full"
          alt="Aeropostale T-Shirt"
        />
      </div>

      <div className="space-y-1 lg:pt-3 pt-1.5">
        <p className="lg:text-[16px] text-[13px]">
          Aeropostale Men’s Cotton T-Shirt
        </p>
        <div className="price flex lg:text-[16px] text-[14px] items-center gap-3">
          <span
            className="font-sans text-gray-800 font-medium
          "
          >
            ₹ 799
          </span>
          <span className="thin-line-through text-gray-400">₹ 1,299</span>
          <span className=" font-semibold">38%</span>
        </div>
      </div>

      <div className="absolute top-2 right-2">
        <IconButton>
          <CloseIcon sx={{ fontSize: "1.3rem" }} />
        </IconButton>
      </div>
    </div>
  );
};

export default WishlistProductCard;
