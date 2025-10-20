import React from "react";
import SimilarProductCard from "./SimilarProductCard";

const SimilarProduct = () => {
  return (
    <>
      <div className="grid xl:grid-cols-6 md:grid-cols-4 grid-cols-2 justify-between gap-4  lg:gap-y-8">
        {[1, 1, 1, 1, 1, 1].map((elem) => (
          <SimilarProductCard />
        ))}
      </div>
    </>
  );
};

export default SimilarProduct;
