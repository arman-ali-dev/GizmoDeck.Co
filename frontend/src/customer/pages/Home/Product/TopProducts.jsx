import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

const TopProducts = () => {
  return (
    <>
      <section className="xl:px-14 px-8 px-4 lg:py-20 py-7">
        <div className="md:flex text-center md:text-left justify-between items-end">
          <div className="md:w-[80%] xl:w-auto">
            <h2 className="lg:text-[26px] md:text-[24px] text-[20px] font-semibold">
              Top Products
            </h2>
            <p className="lg:text-[16px] md:text-[14px] text-[12px] md:w-[70%] lg:w-[70%] text-gray-700 font-medium ">
              Browse our carefully selected top picks, chosen to match your
              style, preferences, and needs for a seamless shopping experience.
            </p>
          </div>

          <div className="hidden md:inline-block">
            <Link className="border-gray-700 text-gray-700 font-medium border lg:px-6 px-4 lg:py-2 py-1 rounded-full text-[11px] lg:text-[14px]">
              View All
            </Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 xl:gap-10 md:gap-7 gap-4 md:mt-8 lg:mt-10 mt-5">
          {[1, 1, 1, 1].map(() => (
            <ProductCard />
          ))}
        </div>

        <div className="md:hidden text-center mt-8">
          <Link className="border-gray-700 text-gray-700 font-medium border lg:px-6 px-4 lg:py-2 py-1 rounded-full text-[11px] lg:text-[14px]">
            View All
          </Link>
        </div>
      </section>
    </>
  );
};

export default TopProducts;
