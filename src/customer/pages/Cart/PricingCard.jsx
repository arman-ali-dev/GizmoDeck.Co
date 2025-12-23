import { Divider } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const PricingCard = () => {
  const { cart } = useSelector((state) => state.cart);
  
  return (
    <>
      <div>
        <div className=" text-gray-500 space-y-3 py-3 px-5 lg:text-[16px] text-[14px]">
          <div className="flex justify-between items-center">
            <span>Subtotal</span>
            <span>₹{cart?.subTotal}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Discount</span>
            <span>₹{cart?.discount}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Shipping</span>
            <span>Free</span>
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
            <span>₹{cart?.totalPrice}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default PricingCard;
