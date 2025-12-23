import React, { useEffect } from "react";
import ReviewCard from "./ReviewCard";
import { useDispatch, useSelector } from "react-redux";
import {
  clearProductDetails,
  fetchProductDetails,
} from "../../../store/customer/productSlice";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";
import { Skeleton } from "@mui/material";

const Review = () => {
  const navigate = useNavigate();
  const { reviews, loading } = useSelector((state) => state.review);
  const { productDetails } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const { productId } = useParams();

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductDetails(productId));
    }

    return () => {
      dispatch(clearProductDetails());
    };
  }, [productId, dispatch]);

  return loading ? (
    <ProductReviewSkeleton />
  ) : (
    <div className="p-4 lg:px-14 pt-4 pb-10 ">
      <IconButton onClick={() => navigate(-1)} sx={{ color: "black" }}>
        <ArrowBackIcon />
      </IconButton>
      <div className="flex mt-4 flex-col md:flex-row lg:gap-8 gap-5">
        <section className="w-full  md:w-1/2 lg:w-[30%] space-y-2">
          <img
            className="rounded-sm w-full object-cover lg:h-[550px]  h-[300px] object-top"
            src={productDetails?.variants[0]?.images[0]}
            alt=""
          />
          <div className="mt-5">
            <div>
              <p className="font-bold lg:text-xl text-md">
                {productDetails?.name}
              </p>
              <p className="lg:text-[16px] text-sm text-gray-600">
                {productDetails?.description}
              </p>
            </div>

            <div className="price flex items-center gap-3 lg:text-xl text-md mt-2 lg:mt-3">
              <span className="font-sans text-gray-800">
                ₹ {productDetails?.variants[0]?.sellingPrice}
              </span>
              <span className="thin-line-through text-gray-400">
                ₹ {productDetails?.variants[0]?.mrpPrice}
              </span>
              <span className="text-[#00927c] font-semibold">
                {Math.round(productDetails?.variants[0]?.discount)}%
              </span>
            </div>
          </div>
        </section>

        <section className="md:w-[70%] bg-gray-100 px-6 py-8 rounded-md">
          <div className="space-y-3">
            {reviews?.map((r) => (
              <ReviewCard review={r} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

const ProductReviewSkeleton = () => {
  return (
    <div className="p-4 lg:px-14 pt-4 pb-10">
      <Skeleton variant="circular" width={35} height={35} />

      <div className="flex mt-4 flex-col md:flex-row lg:gap-8 gap-5">
        <section className="w-full md:w-1/2 lg:w-[30%] space-y-2">
          <Skeleton
            variant="rectangular"
            className="w-full rounded-md"
            height={550}
          />

          <Skeleton variant="text" height={30} width="80%" />

          <Skeleton variant="text" height={22} width="95%" />
          <Skeleton variant="text" height={22} width="90%" />

          <div>
            <Skeleton variant="text" height={28} width="40%" />
            <Skeleton variant="text" height={20} width="30%" />
          </div>
        </section>

        <section className="md:w-[70%] bg-gray-100 px-6 py-8 rounded-md">
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-5 rounded-sm flex gap-4">
                <Skeleton variant="circular" width={45} height={45} />

                <div className="flex-1 space-y-2">
                  <Skeleton variant="text" height={20} width="30%" />

                  <Skeleton variant="rectangular" height={20} width="25%" />

                  <Skeleton variant="text" height={18} width="90%" />
                  <Skeleton variant="text" height={18} width="80%" />

                  <div className="flex gap-2 mt-2">
                    <Skeleton variant="rectangular" width={70} height={60} />
                    <Skeleton variant="rectangular" width={70} height={60} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
export default Review;
