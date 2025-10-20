import React, { useEffect, useState } from "react";
import { Button, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { grey, teal } from "@mui/material/colors";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const images = [
  "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/31101834/2024/12/26/bb7963ed-a03b-41ad-8b79-01354822587e1735204642505-Aeropostale-Men-Tshirts-961735204641834-1.jpg",
  "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/31101834/2024/12/26/57b4f393-01ba-4848-a94b-2450a8fcfe231735204642473-Aeropostale-Men-Tshirts-961735204641834-2.jpg",
  "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/31101834/2024/12/26/bf132fc5-d88e-46dc-bbe7-af3afb30e7a71735204642440-Aeropostale-Men-Tshirts-961735204641834-3.jpg",
  "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/31101834/2024/12/26/15c4ecb9-072a-402c-9408-0004328d96991735204642406-Aeropostale-Men-Tshirts-961735204641834-4.jpg",
];

const ProductCard = ({ product }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let interval;

    if (isHovered) {
      interval = setInterval(() => {
        setCurrentImage((prevImage) => (prevImage + 1) % images.length);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isHovered]);

  const handleAddToWishlist = async (e) => {};

  return (
    <div className="group cursor-pointer">
      <div
        className="card  relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="card-images-wrapper relative"
          style={{
            transform: `translateX(-${currentImage * (100 / images.length)}%)`,
            width: `${images.length * 100}%`,
          }}
        >
          {images.map((elem, index) => (
            <img
              src={elem}
              alt=""
              className="card-media lg:h-[290px] h-[170px] object-top w-full rounded-md"
              key={index}
              style={{ width: `${100 / images.length}%` }}
            />
          ))}
        </div>
        <IconButton
          size="small"
          sx={{ position: "absolute", top: "8px", left: "10px" }}
        >
          <FavoriteBorderIcon
            sx={{ color: grey[700], fontSize: { xs: 16, lg: 18 } }}
          />
        </IconButton>
      </div>
      <div className=" lg:pt-3 !pt-1.5 space-y-1 group-hover-effect !px-2 rounded-md">
        <div className="name">
          <h1 className="text-[13px] lg:text-[16px]">Urban Threads</h1>
          <p className="lg:text-[15px] text-[12px]  ">
            Stylish Cotton Oversized T-Shirt for Men
          </p>
        </div>

        <div className=" flex lg:text-[16px] text-[13px]  items-center gap-2">
          <span className="font-sans text-gray-800">₹ 799</span>
          <span className="thin-line-through text-gray-400">₹ 1,299</span>
          <span className="font-semibold">38%</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
