import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";
import SkeletonCard from "./SkeletonCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, Autoplay } from "swiper/modules";

const TrendingProducts = () => {
  const { bestSellerProducts, loadingBestSeller, errorBestSeller } =
    useSelector((state) => state.product);

  const products = Array.isArray(bestSellerProducts) ? bestSellerProducts : [];

  const firstSliderProducts = products.slice(0, 6);
  const secondSliderProducts = products.slice(6, 12);

  return (
    <>
      <section className="xl:px-14 lg:px-8  px-4  lg:py-20 py-10">
        <div className="md:flex text-center md:text-left justify-between items-end  mb-10">
          <div className="md:w-[80%] xl:w-auto">
            <h2 className="lg:text-[28px] md:text-[24px] text-[20px] font-semibold">
              Trending Products
            </h2>
            <p className="lg:text-[16px] md:text-[14px] text-[12px] md:w-[70%] lg:w-[70%] text-gray-700 font-medium ">
              Browse our carefully selected top picks, chosen to match your
              style, preferences, and needs for a seamless shopping experience.
            </p>
          </div>

          <div className="hidden md:inline-block">
            <Link
              className="border-gray-700 text-gray-700 font-medium border lg:px-6 
            px-4 lg:py-2 py-1 rounded-full text-[11px] lg:text-[14px]"
            >
              View All
            </Link>

            {/* mysqldump -h mysql.railway.internal -u root -p railway > backup.sql
             */}
          </div>
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={10}
          slidesPerView={1}
          navigation
          autoplay={{ delay: 3000 }}
          breakpoints={{
            0: { slidesPerView: 1.6 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3.5, spaceBetween: 30 },
          }}
        >
          {loadingBestSeller ? (
            Array.from({ length: 4 }).map((_, i) => (
              <SwiperSlide key={i}>
                <SkeletonCard />
              </SwiperSlide>
            ))
          ) : errorBestSeller ? (
            <SwiperSlide>
              <p className="text-red-500 text-center">
                Failed to load products
              </p>
            </SwiperSlide>
          ) : (
            firstSliderProducts?.map((p) => (
              <SwiperSlide key={p.id}>
                <ProductCard product={p} />
              </SwiperSlide>
            ))
          )}
        </Swiper>
        <div className="lg:my-14 my-7"></div>
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={10}
          slidesPerView={1}
          navigation
          autoplay={{ delay: 3000 }}
          breakpoints={{
            0: { slidesPerView: 1.6 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3.5, spaceBetween: 30 },
          }}
        >
          {loadingBestSeller ? (
            Array.from({ length: 4 }).map((_, i) => (
              <SwiperSlide key={i}>
                <SkeletonCard />
              </SwiperSlide>
            ))
          ) : errorBestSeller ? (
            <SwiperSlide>
              <p className="text-red-500 text-center">
                Failed to load products
              </p>
            </SwiperSlide>
          ) : (
            secondSliderProducts?.map((p) => (
              <SwiperSlide key={p.id}>
                <ProductCard product={p} />
              </SwiperSlide>
            ))
          )}
        </Swiper>
        <div className="md:hidden text-center ">
          <Link
            className="border-gray-700 text-gray-700 font-medium border lg:px-6 
          px-4 lg:py-2 py-1 rounded-full text-[11px] lg:text-[14px]"
          >
            View All
          </Link>
        </div>
      </section>
    </>
  );
};

export default TrendingProducts;
