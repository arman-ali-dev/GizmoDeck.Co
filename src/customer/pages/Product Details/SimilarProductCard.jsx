import React from "react";
import { useNavigate } from "react-router-dom";

const SimilarProductCard = ({ product }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/product-details/${product?.id}`)}
      key={product?.id}
      className="group cursor-pointer"
    >
      <div className="card  relative">
        <div className="card-images-wrapper">
          <img
            src={product?.variants[0]?.images[0]}
            alt=""
            className="card-media lg:h-[200px] h-[160px] w-full rounded-md object-top"
          />
        </div>
      </div>
      <div className="details pt-3 space-y-1 group-hover-effect rounded-md">
        <div className="name lg:text-[14px] text-[13px]">
          <h1 className="lg:text-[15px] font-medium">
            {product?.name?.split(" ").slice(0, 3).join(" ") + "..."}
          </h1>
          <p>
            {product?.description?.split(" ").slice(0, 8).join(" ") + "..."}
          </p>
        </div>

        <div className="price flex items-center gap-3 text-[13px] lg:text-[15px]">
          <span className="font-sans text-gray-800 font-medium">
            ₹ {product?.variants[0]?.sellingPrice}
          </span>
          <span className="thin-line-through text-gray-400">
            ₹ {product?.variants[0]?.mrpPrice}
          </span>
          <span className=" font-semibold">
            {Math.round(product?.variants[0]?.discount)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default SimilarProductCard;
