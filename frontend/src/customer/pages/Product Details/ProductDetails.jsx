import React, { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import { teal, yellow } from "@mui/material/colors";
import { Button, Divider } from "@mui/material";
import ShieldIcon from "@mui/icons-material/Shield";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import WalletIcon from "@mui/icons-material/Wallet";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ReviewCard from "../Review/ReviewCard";
import SimilarProduct from "./SimilarProducts";

const images = [
  "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/31101834/2024/12/26/bb7963ed-a03b-41ad-8b79-01354822587e1735204642505-Aeropostale-Men-Tshirts-961735204641834-1.jpg",
  "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/31101834/2024/12/26/57b4f393-01ba-4848-a94b-2450a8fcfe231735204642473-Aeropostale-Men-Tshirts-961735204641834-2.jpg",
  "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/31101834/2024/12/26/bf132fc5-d88e-46dc-bbe7-af3afb30e7a71735204642440-Aeropostale-Men-Tshirts-961735204641834-3.jpg",
  "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/31101834/2024/12/26/15c4ecb9-072a-402c-9408-0004328d96991735204642406-Aeropostale-Men-Tshirts-961735204641834-4.jpg",
];

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(2);

  const handleActiveImage = (value) => {
    setActiveImage(value);
  };

  return (
    <>
      <div className="px-4 lg:px-14 lg:pt-10 pt-5">
        <div className="grid  grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-10">
          <section className="flex flex-col md:flex-row gap-5">
            <div className="w-full md:w-[15%] flex md:flex-col gap-3">
              {images?.map((elem, index) => (
                <img
                  onClick={() => handleActiveImage(index)}
                  className="md:w-[90px] w-[25%] h-[70px] lg:h-[110px] object-cover object-top cursor-pointer rounded-md"
                  src={elem}
                  alt=""
                />
              ))}
            </div>

            <div className="w-full  md:w-[85%]">
              <img
                className="w-full lg:h-[600px] h-[370px] object-top object-cover  rounded-md"
                src={images[activeImage]}
                alt=""
              />
            </div>
          </section>

          <section>
            <h1 className="font-bold md:text-lg text-md ">Urban Threads</h1>

            <p className="text-gray-500 lg:text-[16px] md:text-[14px] text-[12px] font-medium">
              Stylish Cotton Oversized T-Shirt for Men
            </p>

            <div className="flex justify-between items-center py-2 rounded-sm border border-gray-300 w-[150px] lg:w-[180px] px-3 mt-3 lg:mt-5">
              <div className="flex gap-1 items-center">
                <span className="lg:text-[16px] text-[13px]">4</span>
                <StarIcon
                  sx={{
                    color: yellow[800],
                    fontSize: { xs: "14px", md: "17px" },
                    marginTop: "-2px",
                  }}
                />
              </div>

              <Divider orientation="vertical" flexItem />
              <span className="lg:text-[16px] text-[13px]">234 Ratings</span>
            </div>

            <div>
              <div className="price flex items-center gap-3 lg:mt-5 mt-3 text-[14px] md:text-md lg:text-xl">
                <span className="font-sans text-gray-800">₹ 799</span>
                <span className="line-through text-gray-400">₹ 1,299</span>
                <span className=" font-semibold">38%</span>
              </div>

              <p className="lg:text-sm md:text-[14px] text-[12px]">
                Inclusive of all taxes. Free Shipping above ₹1500.
              </p>
            </div>

            <div className="mt-4 space-y-2 lg:text-[15px] md:text-[14px] text-[13px]">
              <div className="flex items-center  md:gap-2 gap-1  ">
                <ShieldIcon sx={{ fontSize: { xs: 16, md: 18 } }} />
                <p>Authentic & Quality Assured</p>
              </div>
              <div className="flex items-center md:gap-2 gap-1  ">
                <WorkspacePremiumIcon sx={{ fontSize: { xs: 16, md: 18 } }} />
                <p>100% Money Back Guarantee</p>
              </div>
              <div className="flex items-center md:gap-2 gap-1  ">
                <LocalShippingIcon sx={{ fontSize: { xs: 16, md: 18 } }} />
                <p>Free Shipping & Returns</p>
              </div>
              <div className="flex items-center md:gap-2 gap-1  ">
                <WalletIcon sx={{ fontSize: { xs: 16, md: 18 } }} />
                <p>Pay On Delivery Might Be Available</p>
              </div>
            </div>

            <div className="lg:mt-4 mt-3 space-y-2">
              <h1 className="font-medium lg:text-[16px] text-[14px]">
                Quantity
              </h1>

              <div className="flex gap-4">
                <div className="flex lg:py-2 py-1 px-3 border-gray-300 border rounded-sm items-center gap-2 min-w-[120px] lg:min-w-[140px] justify-between">
                  <button
                    disabled={quantity === 1}
                    className={`${
                      quantity === 1
                        ? "cursor-not-allowed opacity-50"
                        : "cursor-pointer opacity-100"
                    }`}
                  >
                    <RemoveIcon sx={{ color: "black", fontSize: 16 }} />
                  </button>
                  <span className="lg:text-[16px] text-[13px]">1</span>
                  <button
                    disabled={false}
                    className={`${
                      false
                        ? "cursor-not-allowed opacity-50"
                        : "cursor-pointer opacity-100"
                    }`}
                  >
                    <AddIcon sx={{ color: "black", fontSize: 16 }} />
                  </button>
                </div>

                <Button
                  variant="outlined"
                  className="!border-gray-300 !text-black !capitalize"
                  sx={{
                    py: { xs: "8px", md: "10px" },
                    px: 2,
                  }}
                >
                  <FavoriteBorderIcon
                    sx={{ fontSize: { xs: "17px", lg: "19px" } }}
                  />
                </Button>
              </div>
            </div>

            <div className="lg:mt-5 mt-3 flex items-center gap-2 lg:gap-5">
              <Button
                fullWidth
                className="!border-black !border !text-white !bg-black !capitalize"
                variant="contained"
                sx={{
                  py: { xs: "8px", md: "10px" },
                  px: 2,
                }}
              >
                <span className="font-medium lg:text-[16px] text-[13px]">
                  {" "}
                  Buy Now
                </span>
              </Button>

              <Button
                fullWidth
                className="!border-gray-300 !text-black !capitalize"
                variant="outlined"
                sx={{
                  py: { xs: "8px", md: "10px" },
                  px: 2,
                }}
              >
                <span className="font-medium lg:text-[16px] text-[13px]">
                  {" "}
                  Add To Cart
                </span>
              </Button>
            </div>

            <div className="lg:mt-5 mt-3">
              <p className="lg:text-[15px] text-[12px]">
                Crafted from premium cotton fabric, this oversized t-shirt
                offers unmatched comfort and effortless style for daily wear.
              </p>
            </div>

            <div className="lg:mt-7 mt-4">
              <div className="border-t border-gray-300 pt-4 lg:pt-5">
                <h3 className="font-semibold lg:text-lg text-[14px] mb-2">
                  Customer Reviews
                </h3>
                <ReviewCard />
              </div>
            </div>
          </section>
        </div>

        <div className="lg:my-20 my-16">
          <h1 className="lg:text-2xl md:text-[24px] text-[20px] font-bold">
            Similar Products
          </h1>
          <div className="lg:pt-5 pt-3">
            <SimilarProduct />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
