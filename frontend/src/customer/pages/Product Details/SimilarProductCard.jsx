import React from "react";

const SimilarProductCard = () => {
  return (
    <div className="group cursor-pointer">
      <div className="card  relative">
        <div className="card-images-wrapper">
          <img
            src="https://i.pinimg.com/736x/cd/a4/f0/cda4f03ca3634bd2d155aa32520e8e4b.jpg"
            alt=""
            className="card-media lg:h-[200px] h-[160px] w-full rounded-md object-top"
          />
        </div>
      </div>
      <div className="details pt-3 space-y-1 group-hover-effect rounded-md">
        <div className="name lg:text-[15px] text-[13px]">
          <h1>Nike</h1>
          <p>Blue Shirt</p>
        </div>

        <div className="price flex items-center gap-3 text-[13px] lg:text-[15px]">
          <span className="font-sans text-gray-800 font-medium">₹ 400</span>
          <span className="thin-line-through text-gray-400">₹ 900</span>
          <span className=" font-semibold">90%</span>
        </div>
      </div>
    </div>
  );
};

export default SimilarProductCard;
