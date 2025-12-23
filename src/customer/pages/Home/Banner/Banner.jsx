import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import bannerImage from "../../../../assets/banner.png";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Banner = () => {
  const banners = [
    "https://img.freepik.com/free-vector/modern-black-friday-sale-banner-background_1361-3734.jpg?t=st=1766060841~exp=1766064441~hmac=2b59c9cee3591af416f4a1a9e6922f6e9a31bcffb3a4a45dafae8df9bb015675&w=740",
    "https://img.freepik.com/free-photo/black-friday-sale-concept-with-shopping-cart_23-2148281066.jpg",
    "https://img.freepik.com/free-photo/online-shopping-banner_23-2148281064.jpg",
  ];

  return (
    <section className="px-7 py-6">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation
        className="rounded-lg"
      >
        <SwiperSlide>
          <img
            src={
              "https://img.freepik.com/free-vector/realistic-black-friday-social-media-promo-template_23-2149110140.jpg?uid=R212559553&ga=GA1.1.241622013.1755336345&semt=ais_hybrid&w=740&q=80"
            }
            alt={`banner`}
            className="w-full h-[570px] object-cover object-center rounded-lg"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src={bannerImage}
            alt={`banner`}
            className="w-full h-[570px] object-cover object-center rounded-lg"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src={bannerImage}
            alt={`banner`}
            className="w-full h-[570px] object-cover object-center rounded-lg"
          />
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Banner;
