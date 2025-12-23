import React, { useEffect, useState } from "react";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { teal } from "@mui/material/colors";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Button,
  CircularProgress,
  IconButton,
  Skeleton,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import PricingCard from "./PricingCard";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { applyCoupon, fetchCart } from "../../../store/customer/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const [couponCode, setCouponCode] = useState("");

  const handleChange = (e) => {
    setCouponCode(e.target.value);
  };

  const handleApplyCoupon = () => {
    dispatch(applyCoupon(couponCode));
  };

  const { cart, applyCouponLoading, loading } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (token) {
      ` `;
      dispatch(fetchCart());
    }
  }, [dispatch]);
  return loading ? (
    <CartPageSkeleton />
  ) : cart?.cartItems.length === 0 ? (
    <EmptyCart />
  ) : (
    <div className="lg:py-12 py-6 px-4 lg:px-14 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="cartItemSection md:col-span-2 space-y-3">
          {cart?.cartItems?.map((elem) => (
            <CartItem key={elem.id} item={elem} />
          ))}
        </div>

        <div className="col-span-1 text-sm space-y-3 ">
          <div className="border border-gray-300 rounded-md px-5 py-3 space-y-5">
            <div className="flex gap-3 text-sm items-center">
              <div className="flex gap-3 text-sm items-center">
                <LocalOfferIcon sx={{ fontSize: "17px" }} />
              </div>

              <span className="text-gray-500 lg:text-[16px] text-[14px]">
                Apply Coupons
              </span>
            </div>

            {true ? (
              <div className="flex  gap-2">
                <TextField
                  fullWidth
                  value={couponCode}
                  onChange={handleChange}
                  id="outlined-basic"
                  label="Coupon Code"
                  placeholder="Enter your coupon code"
                  variant="outlined"
                  size="small"
                  InputProps={{
                    sx: {
                      "& .MuiInputBase-input": {
                        fontSize: { xs: "14px", md: "16px" },
                        "&::placeholder": {
                          fontSize: { xs: "14px", md: "16px" },
                          color: "#888",
                          opacity: 1,
                        },
                      },
                    },
                  }}
                  InputLabelProps={{
                    sx: { fontSize: { xs: "14px", md: "15px" } },
                  }}
                />

                <Button
                  variant="contained"
                  size="small"
                  sx={{ px: 3, fontSize: { xs: "13px", md: "16px" } }}
                  className="!capitalize !bg-black"
                  onClick={handleApplyCoupon}
                  disabled={applyCouponLoading}
                >
                  {applyCouponLoading ? (
                    <CircularProgress size={14} sx={{ color: "white" }} />
                  ) : (
                    "Apply"
                  )}
                </Button>
              </div>
            ) : (
              <div className="flex">
                <div className="p-1 pl-5 pr-3 border border-gray-300 rounded-md flex gap-2 items-center">
                  <span className="">ARMAN5911 Applied</span>
                  <IconButton size="small">
                    <CloseIcon className="text-red-600" />
                  </IconButton>
                </div>
              </div>
            )}
          </div>

          <div className="border border-gray-300 rounded-md ">
            <PricingCard />
            <div className="px-5 py-3">
              <Link to="/checkout">
                <Button
                  className="!capitalize"
                  fullWidth
                  variant="contained"
                  sx={{ py: "8px", background: "black" }}
                >
                  <span className="font-medium lg:text-[16px] text-[14px]">
                    buy now
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function CartItemSkeleton() {
  return (
    <div className="border rounded-md border-gray-300 p-3 lg:p-5">
      <div className="flex gap-3">
        <Skeleton
          variant="rectangular"
          width={100}
          height={130}
          className="rounded-md"
        />

        <div className="flex flex-col w-full gap-2">
          <Skeleton variant="text" width="70%" height={22} />
          <Skeleton variant="text" width="90%" height={18} />
          <Skeleton variant="text" width="40%" height={16} />
          <Skeleton variant="text" width="30%" height={16} />
          <Skeleton variant="text" width="50%" height={18} className="mt-1" />
        </div>
      </div>

      <div className="flex justify-between items-center mt-3 border-gray-300 border-t  pt-3">
        <div className="flex items-center gap-3">
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton variant="text" width={25} height={22} />
          <Skeleton variant="circular" width={24} height={24} />
        </div>

        <Skeleton variant="text" width={60} height={22} />
      </div>
    </div>
  );
}

function CouponSkeleton() {
  return (
    <div className="border border-gray-300 rounded-md px-5 py-3 space-y-5">
      <div className="flex gap-3 items-center">
        <Skeleton variant="circular" width={22} height={22} />
        <Skeleton variant="text" width={120} height={20} />
      </div>

      <div className="flex gap-2">
        <Skeleton
          variant="rectangular"
          height={40}
          className="w-full rounded-md"
        />
        <Skeleton
          variant="rectangular"
          width={70}
          height={40}
          className="rounded-md"
        />
      </div>
    </div>
  );
}

function PricingCardSkeleton() {
  return (
    <div className="border border-gray-300 rounded-md p-5 space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex justify-between items-center">
          <Skeleton variant="text" width="40%" height={20} />
          <Skeleton variant="text" width="20%" height={20} />
        </div>
      ))}

      <hr class="border border-gray-300" />

      <div className="flex justify-between items-center pt-2">
        <Skeleton variant="text" width="35%" height={24} />
        <Skeleton variant="text" width="25%" height={24} />
      </div>

      <Skeleton variant="rectangular" height={40} className="rounded-md mt-3" />
    </div>
  );
}

function CartPageSkeleton() {
  return (
    <div className="lg:py-12 py-6 px-4 lg:px-14 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-3">
          {[1, 2, 3].map((i) => (
            <CartItemSkeleton key={i} />
          ))}
        </div>

        <div className="space-y-3">
          <CouponSkeleton />
          <PricingCardSkeleton />
        </div>
      </div>
    </div>
  );
}

function EmptyCart() {
  return (
    <div className="min-h-screen flex items-center justify-center px-5 ">
      <div className="text-center space-y-3 max-w-md">
        <div className="flex justify-center">
          <div className="p-6 bg-gray-100 rounded-full">
            <ShoppingCartIcon sx={{ fontSize: 70, color: "#888" }} />
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800">
          Your Cart is Empty
        </h2>

        <p className="text-gray-500 text-sm lg:text-base">
          Looks like you haven't added anything to your cart yet.
        </p>

        <Link to="/">
          <Button
            variant="contained"
            className="!capitalize !bg-black"
            sx={{ px: 4, py: 1.2, fontSize: "16px" }}
          >
            Shop Now
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Cart;
