import { Divider } from "@mui/material";
import React from "react";

const PricingCard = () => {
  return (
    <>
      <div>
        <div className=" text-gray-500 space-y-3 py-3 px-5 lg:text-[16px] text-[14px]">
          <div className="flex justify-between items-center">
            <span>Subtotal</span>
            <span>₹899</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Discount</span>
            <span>₹599</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Shipping</span>
            <span>₹79</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Plateform Fee</span>
            <span>Free</span>
          </div>
        </div>

        <Divider />
        <div className="font-semibold space-y-3 py-3 px-5">
          <div className="flex justify-between items-center lg:text-[16px] text-[14px]">
            <span>Total</span>
            <span>₹799</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default PricingCard;
