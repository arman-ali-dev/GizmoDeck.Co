import React from "react";
import { Link } from "react-router-dom";

const ShopByCategoryCard = () => {
  return (
    <>
      <Link>
        <img
          className="lg:h-[205px] lg:w-[205px] md:w-[150px] w-full h-[150px] mx-auto object-cover rounded-full"
          src="https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg"
          alt=""
        />

        <h2 className="text-center lg:mt-2 mt-1 lg:text-[18px] text-[14px] font-medium">
          Electronics
        </h2>
        <p className="text-center lg:text-[15px] text-[11px] -mt-0.5">
          Phones, gadgets, accessories
        </p>
      </Link>
    </>
  );
};

export default ShopByCategoryCard;
