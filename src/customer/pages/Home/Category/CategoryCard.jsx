import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
  return (
    <Link>
      {/* <div className="lg:h-[68px] lg:w-[68px] w-[40px] mx-auto h-[40px] rounded-full flex justify-center items-center bg-black">
        <img
          className="object-cover lg:w-[58px] lg:h-[58px] w-[30px] h-[30px] mx-auto rounded-full"
          src={category.image}
          alt={category.name}
        />
      </div> */}
      <h1 className="text-center bg-black px-6 py-1.5 text-white rounded-full lg:text-[14px] text-[10px] lg:mt-1 mt-0.5 font-medium">
        {category.name}
      </h1>
    </Link>
  );
};

export default CategoryCard;
