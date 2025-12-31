import React from "react";
import { useSelector } from "react-redux";
import { Skeleton } from "@mui/material";
import ProductCard from "../Home/Product/ProductCard";
import SkeletonCard from "../Home/Product/SkeletonCard";
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
const SimilarProduct = () => {
  const { similarProducts, loadingSimilarProducts, errorSimilarProducts } =
    useSelector((state) => state.product);

  return (
    <>
      <div className="grid xl:grid-cols-3 md:grid-cols-4 grid-cols-2 justify-between gap-4 lg:gap-y-8">
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
          {loadingSimilarProducts ? (
            Array.from({ length: 4 }).map((_, i) => (
              <SwiperSlide key={i}>
                <SkeletonCard />
              </SwiperSlide>
            ))
          ) : errorSimilarProducts ? (
            <SwiperSlide>
              <p className="text-red-500 text-center">
                Failed to load products
              </p>
            </SwiperSlide>
          ) : (
            similarProducts?.map((p) => (
              <SwiperSlide key={p.id}>
                <ProductCard product={p} />
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </div>
    </>
  );
};

const SimilarProductSkeleton = () => {
  return (
    <div className="group cursor-pointer">
      <Skeleton
        variant="rectangular"
        sx={{
          width: "100%",
          height: { xs: 160, lg: 200 },
          borderRadius: "8px",
        }}
      />

      <div className="pt-3 space-y-2">
        <Skeleton variant="text" sx={{ width: "70%", height: 24 }} />
        <Skeleton variant="text" sx={{ width: "90%", height: 20 }} />

        <div className="flex items-center gap-3">
          <Skeleton variant="text" sx={{ width: 50, height: 20 }} />
          <Skeleton variant="text" sx={{ width: 40, height: 20 }} />
          <Skeleton variant="text" sx={{ width: 30, height: 20 }} />
        </div>
      </div>
    </div>
  );
};

export default SimilarProduct;
