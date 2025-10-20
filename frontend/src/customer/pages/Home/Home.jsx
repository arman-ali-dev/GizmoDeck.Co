import React from "react";
import CategoryGrid from "./CategoryGrid/CategoryGrid";
import Category from "./Category/Category";
import ShopByCategory from "./ShopByCategory/ShopByCategory";
import bannerImage from "../../../assets/banner.png";
import { Link } from "react-router-dom";
import TopProducts from "./Product/TopProducts";
import TrendingProducts from "./Product/TrendingProducts";

const Home = () => {
  return (
    <>
      <Category />
      <CategoryGrid />
      <ShopByCategory />
      <TopProducts />

      <div className="bg-black xl:py-[80px] lg:py-[50px] px-4 lg:px-0 py-[30px] text-white text-center lg:mt-10 mt-2 flex flex-col items-center justify-center">
        <h2 className="lg:text-4xl md:text-[26px] text-[20px] font-semibold lg:mb-4 mb-1 drop-shadow-lg">
          Become a Seller on GizmoDeck.Co
        </h2>
        <p className="lg:text-[17px] md:text-[14px] text-[10px] md:max-w-xl lg:max-w-2xl lg:mb-6 mb-2.5 px-6 drop-shadow-md">
          Start your online business journey today. Reach thousands of customers
          across India and grow your brand effortlessly with us.
        </p>
        <Link className="bg-white text-black lg:text-[16px] md:text-[13px] text-[11px] font-medium md:px-6 lg:px-8 px-4 lg:py-2.5 py-1.5 rounded-sm hover:bg-gray-100 transition">
          Start Selling Now
        </Link>
      </div>

      <TrendingProducts />
    </>
  );
};

export default Home;
