import { Button, Divider, IconButton } from "@mui/material";
import React from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

const CartItem = () => {
  return (
    <>
      <div className="border rounded-md relative border-gray-300">
        <div className="flex lg:p-5 p-3 gap-3">
          <div>
            <img
              className="lg:w-[100px] w-[85px] h-[100px] object-cover object-top lg:h-[135px] rounded-md"
              src="https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/31101834/2024/12/26/bb7963ed-a03b-41ad-8b79-01354822587e1735204642505-Aeropostale-Men-Tshirts-961735204641834-1.jpg"
              alt="Aeropostale T-Shirt"
            />
          </div>

          <div className="lg:space-y-2 space-y-1">
            <h1 className="font-semibold text-[14px] lg:text-[17px]">
              Urban Threads
            </h1>
            <p className="text-gray-600 font-medium  text-[11px] lg:text-sm">
              Stylish Cotton Oversized T-Shirt for Men
            </p>
            <p className="text-gray-400 text-[9px] lg:text-xs my-1">
              <strong>Sold By:</strong> Natural Lifestyle Products Private
              Limited
            </p>
            <p className="lg:text-sm text-[11px] font-semibold">
              7 Days Replacement Available
            </p>
            <p className="lg:text-sm text-[11px] text-gray-500 mt-1">
              <strong>Quantity: </strong> 1
            </p>
          </div>

          <Divider />
        </div>

        <div className="lg:px-5 px-3 lg:py-2 py-1.5 flex justify-between items-center w-full border-t border-gray-300">
          <div className="flex items-center gap-2 w-[85px] lg:w-[140px] justify-between">
            <button
              disabled
              className="disabled:cursor-not-allowed cursor-pointer opacity-50"
            >
              <RemoveIcon
                sx={{ color: "black", fontSize: { xs: 17, md: 20 } }}
              />
            </button>
            <span className="lg:text-[16px] text-[14px]">1</span>
            <button className="disabled:cursor-not-allowed cursor-pointer">
              <AddIcon sx={{ color: "black", fontSize: { xs: 17, md: 20 } }} />
            </button>
          </div>

          <div>
            <p className="text-gray-700 font-medium lg:text-[16px] text-[14px]">
              ₹799
            </p>
          </div>
        </div>

        <div className="absolute top-0 lg:top-2 right-1 lg:right-3">
          <IconButton>
            <CloseIcon color="primary" sx={{ fontSize: 20, color: "black" }} />
          </IconButton>
        </div>
      </div>
    </>
  );
};

export default CartItem;
