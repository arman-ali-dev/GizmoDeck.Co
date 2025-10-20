import React from "react";
import ReviewCard from "./ReviewCard";

const Review = () => {
  return (
    <>
      <div className="p-4 lg:px-14 flex flex-col md:flex-row lg:gap-12 gap-5">
        <section className="w-full  md:w-1/2 lg:w-[30%] space-y-2">
          <img
            className="rounded-sm w-full object-cover lg:h-[550px] h-[300px] object-top"
            src="https://i.pinimg.com/736x/cd/a4/f0/cda4f03ca3634bd2d155aa32520e8e4b.jpg"
            alt=""
          />
          <div>
            <div>
              <p className="font-bold lg:text-xl text-md">Ram Clothing</p>
              <p className="lg:text-lg text-sm text-gray-600">
                Men's White Shirt
              </p>
            </div>

            <div className="price flex items-center gap-3 lg:text-xl text-md mt-2 lg:mt-5">
              <span className="font-sans text-gray-800">₹ 400</span>
              <span className="thin-line-through text-gray-400">₹ 900</span>
              <span className="text-[#00927c] font-semibold">90%</span>
            </div>
          </div>
        </section>

        <section className="md:w-[70%]">
          <div className="space-y-3">
            {[1, 1, 1, 1].map((elem) => (
              <ReviewCard />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Review;
