import React, { useState, useEffect } from "react";
import { CircularProgress, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { grey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";

import {
  addItemToWishlist,
  removeItemFromWishlist,
} from "../../../../store/customer/wishlistSlice";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const variant = product?.variants?.[0] || {};
  const images = variant?.images || [];

  useEffect(() => {
    let interval;
    if (isHovered && images.length > 1) {
      interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isHovered, images]);

  const dispatch = useDispatch();

  const { wishlist, addingItemId, removingItemId } = useSelector(
    (state) => state.wishlist
  );

  const wishlistItem = wishlist?.wishlistItems?.find(
    (item) => item.product.id == product?.id
  );

  const handleWishlistClick = (e) => {
    e.stopPropagation();

    if (wishlistItem) {
      // REMOVE
      dispatch(removeItemFromWishlist(wishlistItem.id));
    } else {
      // ADD
      dispatch(addItemToWishlist(product?.id));
    }
  };
  return (
    <div
      onClick={() => navigate(`/product-details/${product?.id}`)}
      className="group mt-2 cursor-pointer transition-all duration-300 hover:scale-[1.02]"
    >
      <div
        className="card relative lg:h-[300px] h-[220px] overflow-hidden rounded-xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="card-images-wrapper lg:h-[300px] h-[220px] flex justify-center items-center bg-[#f8f8f8] transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentImage * (100 / images.length)}%)`,
            width: `${images.length * 100}%`,
          }}
        >
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${product?.name}-${index}`}
              className="card-media h-full  object-contain w-full"
              style={{ width: `${100 / images.length}%` }}
            />
          ))}
        </div>

        <IconButton
          size="small"
          onClick={handleWishlistClick}
          disabled={
            addingItemId === product?.id || removingItemId === wishlistItem?.id
          }
          sx={{
            position: "absolute",
            top: "12px",
            left: "12px",
            backgroundColor: "rgba(255,255,255,0.7)",
            "&:hover": { backgroundColor: "rgba(255,255,255,0.9)" },
          }}
        >
          {addingItemId === product?.id ? (
            <CircularProgress size={13} />
          ) : removingItemId === wishlistItem?.id ? (
            <CircularProgress size={13} />
          ) : wishlistItem ? (
            <FavoriteIcon
              sx={{
                color: "red",
                fontSize: { xs: 16, lg: 18 },
              }}
            />
          ) : (
            <FavoriteBorderIcon
              sx={{ color: grey[700], fontSize: { xs: 16, lg: 18 } }}
            />
          )}
        </IconButton>
      </div>
      <div className="px-2">
        <div className="lg:pt-3 pt-2 space-y-1 px-2">
          <h1 className="text-[13px] lg:text-[18px] font-medium line-clamp-1">
            {product?.name?.split(" ").slice(0, 4).join(" ")}
            {product?.name?.split(" ").length > 4 && " ..."}
          </h1>
          <p className="lg:text-[15px] text-[12px] text-gray-600 line-clamp-2">
            {product?.description?.split(" ").slice(0, 3).join(" ")}
            {product?.description?.split(" ").length > 4 && " ..."}
          </p>

          <div className="flex items-center gap-2 lg:text-[16px] text-[13px]">
            <span className="font-semibold text-gray-800">
              ₹ {variant?.sellingPrice}
            </span>

            <span className="line-through text-gray-400">
              ₹ {variant?.mrpPrice}
            </span>
            <span className="font-semibold text-gray-600">
              {Math.round(variant?.discount)}% off
            </span>
          </div>
        </div>

        <div className="mt-4 flex lg:gap-3 gap-1 mb-2 ">
          <button className="block w-full cursor-pointer py-2 rounded-full border text-[12px] lg:text-[14px]">
            Add to Cart
          </button>

          <button className="block w-full bg-black cursor-pointer text-white py-2 rounded-full border text-[12px] lg:text-[14px]">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
