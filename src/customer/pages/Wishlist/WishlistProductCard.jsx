import React from "react";
import { Button, CircularProgress, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { teal } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeItemFromWishlist } from "../../../store/customer/wishlistSlice";

const WishlistProductCard = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { removingItemId } = useSelector((state) => state.wishlist);

  const handleRemoveItemFromWishlist = (e) => {
    e.stopPropagation();
    dispatch(removeItemFromWishlist(item?.id));
  };

  return (
    <div
      onClick={() => navigate(`/product-details/${item?.product?.id}`)}
      className="relative cursor-pointer"
    >
      <div className="w-full">
        <img
          src={item?.product?.variants[0]?.images[0]}
          className="object-cover lg:h-[250px] h-[180px] rounded-md object-center w-full"
          alt="Aeropostale T-Shirt"
        />
      </div>

      <div className="space-y-1 lg:pt-3 pt-1.5">
        <p className="lg:text-[16px] text-[13px]">{item?.product?.name}</p>
        <div className="price flex lg:text-[16px] text-[14px] items-center gap-3">
          <span
            className="font-sans text-gray-800 font-medium
          "
          >
            ₹ {item?.product?.variants[0]?.sellingPrice}
          </span>
          <span className="thin-line-through text-gray-400">
            ₹ {item?.product?.variants[0]?.mrpPrice}
          </span>
          <span className=" font-semibold">
            {Math.round(item?.product?.variants[0]?.discount)}%
          </span>
        </div>
      </div>

      <div className="absolute top-2 right-2">
        <IconButton
          className="z-[99999]"
          onClick={handleRemoveItemFromWishlist}
          disabled={removingItemId === item?.id}
        >
          {removingItemId === item?.id ? (
            <CircularProgress size={13} />
          ) : (
            <CloseIcon sx={{ fontSize: "1.3rem" }} />
          )}
        </IconButton>
      </div>
    </div>
  );
};

export default WishlistProductCard;
