import React from "react";
import { Link } from "react-router-dom";

const ShopByCategoryCard = ({ category }) => {
  return (
    <>
      <Link to={`/products/`} className="group">
        <div className="bg-[#F8F8F8] mx-auto flex justify-center items-center rounded-full md:w-[80px] md:h-[80px] w-[60px] h-[60px] overflow-hidden">
          <img
            className="
        mx-auto
        lg:w-[37px] w-[25px]
        object-cover rounded-full
        transition-transform duration-300 ease-out
        group-hover:scale-110
      "
            src={category.icon}
            alt=""
          />
        </div>

        <h2 className="text-center lg:mt-2 mt-1 md:text-[14px] text-[10px] font-medium whitespace-nowrap">
          {category.label}
        </h2>
      </Link>
    </>
  );
};

export default ShopByCategoryCard;
