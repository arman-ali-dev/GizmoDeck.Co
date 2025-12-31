import React from "react";
import SimilarProductCard from "./SimilarProductCard";
import { useSelector } from "react-redux";
import { Skeleton } from "@mui/material";
import ProductCard from "../Home/Product/ProductCard";

const SimilarProduct = () => {
  const { similarProducts, loadingSimilarProducts } = useSelector(
    (state) => state.product
  );

  return (
    <>
      <div className="grid xl:grid-cols-5 md:grid-cols-4 grid-cols-2 justify-between gap-4 lg:gap-y-8">
        {loadingSimilarProducts
          ? Array.from({ length: 10 }).map((_, i) => (
              <SimilarProductSkeleton key={i} />
            ))
          : similarProducts?.map((product) => (
              <ProductCard key={product?.id} product={product} />
            ))}
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
