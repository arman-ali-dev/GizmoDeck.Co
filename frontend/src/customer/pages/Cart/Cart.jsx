import React, { useState } from "react";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { teal } from "@mui/material/colors";
import { Button, IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import PricingCard from "./PricingCard";

const Cart = () => {
  const [couponCode, setCouponCode] = useState("");
  const handleChange = (e) => {
    setCouponCode(e.target.value);
  };

  return (
    <>
      <div className="lg:py-12 py-6 px-4 lg:px-14 min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="cartItemSection lg:col-span-2 space-y-3">
            {[1, 1].map((elem) => (
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
                  >
                    Apply
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
    </>
  );
};

export default Cart;
