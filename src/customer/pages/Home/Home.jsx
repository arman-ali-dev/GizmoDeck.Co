import React, { useEffect } from "react";
import CategoryGrid from "./CategoryGrid/CategoryGrid";
import ShopByCategory from "./ShopByCategory/ShopByCategory";
import { Link } from "react-router-dom";
import TopProducts from "./Product/TopProducts";
import TrendingProducts from "./Product/TrendingProducts";
import { useDispatch } from "react-redux";
import { fetchCategories } from "../../../store/admin/categorySlice";
import {
  fetchBestSellerProducts,
  fetchFeaturedProducts,
} from "../../../store/customer/productSlice";
import { fetchUserProfile } from "../../../store/customer/userSlice";
import { fetchCart } from "../../../store/customer/cartSlice";
import deadline from "../../../assets/deadline.png";
import shopping from "../../../assets/shopping.png";
import easyReturn from "../../../assets/return.png";
import premium from "../../../assets/premium.png";
import LaptopDealImage from "../../../assets/laptop-deal.png";
import { fetchWishlistItems } from "../../../store/customer/wishlistSlice";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      dispatch(fetchUserProfile());
      dispatch(fetchCart());
      dispatch(fetchWishlistItems());
    }

    dispatch(fetchCategories());
    dispatch(fetchFeaturedProducts());
    dispatch(fetchBestSellerProducts());
  }, [dispatch]);

  return (
    <>
      <CategoryGrid />

      <ShopByCategory />

      <section className="lg:px-10 px-4 md:mt-16 mt-8">
        <div className="grid lg:grid-cols-4 px-3 lg:px-0 grid-cols-2 gap-y-8 lg:gap-y-0 bg-[#F8F8F8] py-10 lg:rounded-lg rounded-md">
          <div className="col-span-1 text-center">
            <div className="bg-black mx-auto h-[56px] w-[56px] rounded-full flex items-center justify-center">
              <img
                className="lg:w-[33px] w-[26px] filter invert brightness-0"
                src={deadline}
                alt=""
              />
            </div>
            <h2 className="lg:text-[14px] text-[13px] font-medium mt-1">
              Fast & Free Delivery
            </h2>
            <p className="lg:text-[12px] text-[11px]">
              Free shipping on all eligible orders
            </p>
          </div>

          <div className="col-span-1 text-center">
            <div className="bg-[#000] mx-auto h-[56px] w-[56px] rounded-full flex items-center justify-center">
              <img
                className="lg:w-[30px] w-[26px] filter invert brightness-0"
                src={shopping}
                alt=""
              />
            </div>
            <h2 className="lg:text-[14px] text-[13px] font-medium text-black mt-1">
              100% Secure Payments
            </h2>
            <p className="text-black lg:text-[12px] text-[11px]">
              Safe & encrypted payment methods
            </p>
          </div>

          <div className="col-span-1 text-center">
            <div className="bg-[#000] mx-auto h-[56px] w-[56px] rounded-full flex items-center justify-center">
              <img
                className="lg:w-[30px] w-[26px] filter invert brightness-0"
                src={easyReturn}
                alt=""
              />
            </div>
            <h2 className="lg:text-[14px] text-[13px] font-medium text-black mt-1">
              Easy Returns
            </h2>
            <p className="text-black lg:text-[12px] text-[11px]">
              Hassle-free returns within 30 days
            </p>
          </div>

          <div className="col-span-1 text-center">
            <div className="bg-[#000] mx-auto h-[56px] w-[56px] rounded-full flex items-center justify-center">
              <img
                className="lg:w-[30px] w-[26px] filter invert brightness-0"
                src={premium}
                alt=""
              />
            </div>
            <h2 className="lg:text-[14px] text-[13px] font-medium text-black mt-1">
              Premium Quality Products
            </h2>
            <p className="text-black lg:text-[12px] text-[11px]">
              Top-quality materials & craftsmanship
            </p>
          </div>
        </div>
      </section>

      <TopProducts />

      <section className="bg-[#0E0E0E] py-[40px] xl:px-0 px-4 xl:mt-5  mt-10">
        <div className="grid md:grid-cols-2  items-center">
          <div className="col-span-1">
            <img
              src={LaptopDealImage}
              alt=""
              className="xl:h-[270px] h-[180px] mx-auto object-center"
            />
          </div>

          <div className="text-center xl:mt-0 mt-5">
            <p className="text-white xl:text-[17px] lg:text-[13px]  text-[11px] xl:w-[80%] mx-auto">
              Get high-performance desktops at unbeatable prices. Perfect for
              gaming, work, and multitasking — don’t miss out on this special
              offer!
            </p>

            <h1 className="xl:text-[52px] lg:text-[32px] text-[26px] mt-1 mb-1 text-[#eee] opacity-70 categoryHeading">
              30% OFF
            </h1>
            <Link className="text-[#000] text-[10px] xl:text-[15px]  bg-[#fff]  xl:px-8 px-5 py-[5px] xl:py-[8px] rounded-full  inline-block  -mt-2">
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      <TrendingProducts />

      <section className="lg:px-10 px-4 mb-5 lg:mb-0 ">
        <div className="grid lg:grid-cols-4 px-3 lg:px-0 grid-cols-2 gap-y-8 lg:gap-y-0 bg-[#F8F8F8] py-10 lg:rounded-lg rounded-md">
          <div className="col-span-1 text-center">
            <div className="bg-black mx-auto h-[56px] w-[56px] rounded-full flex items-center justify-center">
              <img
                className="lg:w-[33px] w-[26px] filter invert brightness-0"
                src={deadline}
                alt=""
              />
            </div>
            <h2 className="lg:text-[14px] text-[13px] font-medium mt-1">
              Fast & Free Delivery
            </h2>
            <p className="lg:text-[12px] text-[11px]">
              Free shipping on all eligible orders
            </p>
          </div>

          <div className="col-span-1 text-center">
            <div className="bg-[#000] mx-auto h-[56px] w-[56px] rounded-full flex items-center justify-center">
              <img
                className="lg:w-[30px] w-[26px] filter invert brightness-0"
                src={shopping}
                alt=""
              />
            </div>
            <h2 className="lg:text-[14px] text-[13px] font-medium text-black mt-1">
              100% Secure Payments
            </h2>
            <p className="text-black lg:text-[12px] text-[11px]">
              Safe & encrypted payment methods
            </p>
          </div>

          <div className="col-span-1 text-center">
            <div className="bg-[#000] mx-auto h-[56px] w-[56px] rounded-full flex items-center justify-center">
              <img
                className="lg:w-[30px] w-[26px] filter invert brightness-0"
                src={easyReturn}
                alt=""
              />
            </div>
            <h2 className="lg:text-[14px] text-[13px] font-medium text-black mt-1">
              Easy Returns
            </h2>
            <p className="text-black lg:text-[12px] text-[11px]">
              Hassle-free returns within 30 days
            </p>
          </div>

          <div className="col-span-1 text-center">
            <div className="bg-[#000] mx-auto h-[56px] w-[56px] rounded-full flex items-center justify-center">
              <img
                className="lg:w-[30px] w-[26px] filter invert brightness-0"
                src={premium}
                alt=""
              />
            </div>
            <h2 className="lg:text-[14px] text-[13px] font-medium text-black mt-1">
              Premium Quality Products
            </h2>
            <p className="text-black lg:text-[12px] text-[11px]">
              Top-quality materials & craftsmanship
            </p>
          </div>
        </div>
      </section>

      <div className="bg-black xl:pt-[80px] xl:pb-[40px] lg:py-[50px] px-4 lg:px-0 py-[30px] text-white text-center lg:mt-10 mt-2 flex flex-col items-center justify-center">
        <h2 className="lg:text-4xl md:text-[26px] text-[20px] font-semibold lg:mb-4 mb-1 drop-shadow-lg">
          Become a Seller on GizmoDeck.Co
        </h2>
        <p className="lg:text-[17px] md:text-[14px] text-[10px] md:max-w-xl lg:max-w-2xl lg:mb-6 mb-2.5 px-6 drop-shadow-md">
          Start your online business journey today. Reach thousands of customers
          across India and grow your brand effortlessly with us.
        </p>
        <Link
          to="/become-seller"
          className="bg-white text-black lg:text-[16px] md:text-[13px] text-[11px] font-medium md:px-6 lg:px-8 px-4 lg:py-2.5 py-1.5 rounded-sm hover:bg-gray-100 transition"
        >
          Start Selling Now
        </Link>
      </div>
    </>
  );
};

export default Home;
