import React from "react";
import location from "../../../assets/location.png";
import truck from "../../../assets/truck.png";

const Header = () => {
  return (
    <div class="bg-[#000] lg:flex hidden flex-wrap items-center justify-between py-3 px-4 sm:px-10">
      <p class="font-medium text-[13px] text-white">
        Free shipping on orders over ₹999 | Easy returns available
      </p>

      <ul class="flex gap-5 items-center text-white text-[14px] font-medium">
        <li className="flex items-start">
          <img
            src={location}
            alt=""
            className="w-4 h-4 mr-2 filter invert brightness-0"
          />
          Track Your Order
        </li>
        <li className="flex items-start">
          <img
            src={truck}
            alt=""
            className="w-6 h-5 mr-2 filter invert brightness-0"
          />{" "}
          Delivery Information
        </li>
        <li class="bg-white text-black px-3 py-[5px] rounded-md cursor-pointer">
          EN
        </li>
      </ul>
    </div>
  );
};

export default Header;
