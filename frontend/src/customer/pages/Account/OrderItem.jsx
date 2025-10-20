import { Avatar } from "@mui/material";
import React from "react";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import { teal } from "@mui/material/colors";

const OrderItem = () => {
  return (
    <>
      <div className="text-sm bg-white lg:p-5 p-3 space-y-4 border border-gray-300 rounded-md cursor-pointer">
        <div className="flex items-center gap-2 lg:gap-3">
          <div>
            <Avatar
              sizes="small"
              sx={{
                bgcolor: "#000",
                height: { xs: 34, md: 38 },
                width: { xs: 34, md: 38 },
              }}
            >
              <ElectricBoltIcon sx={{ fontSize: { xs: 18, md: 22 } }} />
            </Avatar>
          </div>

          <div>
            <h1 className="font-bold mt-0.5 lg:mt-0 text-[#000] text-[12px] lg:text-[14px]">
              PENDING
            </h1>
            <p className="font-medium text-gray-500 text-[12px] lg:text-[14px]">
              Arriving By Mon, 15 Jul
            </p>
          </div>
        </div>

        <div className="lg:p-5 p-3 bg-teal-50 gap-3 flex">
          <div>
            <img
              className="w-[90px] h-[90px] object-cover rounded-sm"
              src="https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/27194384/2024/1/25/d7fa9bec-c18e-40cb-89bf-d10c5316a4631706177408966GIORDANOMenEmbellishedDialStainlessSteelBraceletStyleStrapsA1.jpg"
              alt=""
            />
          </div>

          <div className="w-full space-y-1">
            <h1 className="font-bold lg:text-[16px] text-[12px]">
              Ram Clothing
            </h1>
            <p className="lg:text-[16px] text-[11px]">
              Men Embellished & Bracelet Style Straps Analogue Multi Function
              Watch GZ-50085-44 Watch GZ-50085-44
            </p>
            <p className="lg:text-[16px] text-[11px]">
              <strong>Size: </strong> FREE
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderItem;
