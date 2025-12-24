import { Button, IconButton, Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReviewCard from "../Review/ReviewCard";
import Modal from "@mui/material/Modal";
import ReviewForm from "./ReviewForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductReviews } from "../../../store/customer/reviewSlice";
import { Link } from "react-router-dom";
import { Skeleton } from "@mui/material";

const Reviews = ({ productId }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductReviews(productId));
  }, [productId, dispatch]);

  const { reviews, loading } = useSelector((state) => state.review);

  const ratingCounts = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };

  reviews.forEach((rev) => {
    ratingCounts[rev.ratingValue]++;
  });

  const total = reviews.length;

  const ratingPercent = {
    5: Math.round((ratingCounts[5] / total) * 100) || 0,
    4: Math.round((ratingCounts[4] / total) * 100) || 0,
    3: Math.round((ratingCounts[3] / total) * 100) || 0,
    2: Math.round((ratingCounts[2] / total) * 100) || 0,
    1: Math.round((ratingCounts[1] / total) * 100) || 0,
  };

  const averageRating =
    reviews.reduce((acc, r) => acc + r.ratingValue, 0) / (total || 1);

  return (
    <>
      {loading ? (
        <ReviewSectionSkeleton />
      ) : (
        <div class="bg-gray-100  mt-5 lg:px-6 px-4 py-4 rounded-2xl">
          <div className="flex  justify-between items-center">
            <h2 class="font-semibold md:text-[18px] text-[13px] ">
              Customer Reviews
            </h2>
            <Button
              onClick={handleOpen}
              variant="contained"
              size="small"
              sx={{
                textTransform: "capitalize",
                paddingX: { xs: 2, md: 4 },
                paddingY: 1,
                background: "#000",
              }}
            >
              <span className="lg:text-[14px] text-[12px]">Write Review</span>
            </Button>
          </div>

          <div className="mt-8 md:flex gap-14 items-center">
            <div className="text-center">
              <h2 className="lg:text-[36px] text-[26px] font-medium">
                {averageRating.toFixed(1)}
              </h2>

              <Rating
                name="simple-uncontrolled"
                readOnly
                value={averageRating}
                precision={0.5}
              />

              <p className="text-[#505050] text-[14px]"> {total}  reviews</p>
            </div>

            <div className="flex-1 mt-5 md::mt-0">
              <div className="w-full space-y-5">
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="flex items-center gap-3">
                    <span className="font-semibold text-[14px] lg:text-sm">
                      {star}
                    </span>

                    <div className="relative w-full h-3 lg:h-2 bg-gray-200 rounded-full">
                      <div
                        className="absolute left-0 h-3 lg:h-2 bg-black rounded-full"
                        style={{ width: `${ratingPercent[star]}%` }}
                      ></div>
                    </div>

                    <span className="lg:text-sm text-gray-500 text-[14px]">
                      {ratingPercent[star]}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 space-y-4">
            {reviews?.slice(0, 2).map((r) => (
              <ReviewCard review={r} />
            ))}

            <div className="text-center mt-10 mb-5">
              <Link
                to={`/reviews/${productId}`}
                className="border-gray-700 text-gray-700 font-medium border lg:px-6 px-4 lg:py-2 py-1 rounded-full text-[11px] lg:text-[14px]"
              >
                View All
              </Link>
            </div>
          </div>
        </div>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ReviewForm productId={productId} handleClose={handleClose} />
      </Modal>
    </>
  );
};

const ReviewSectionSkeleton = () => {
  return (
    <div className="bg-gray-100 mt-5 lg:px-6 px-4 py-4 rounded-2xl">
      <div className="flex justify-between items-center">
        <Skeleton variant="text" width={160} height={30} />
        <Skeleton
          variant="rectangular"
          width={100}
          height={35}
          className="rounded-md"
        />
      </div>

      <div className="mt-8 flex gap-14 items-center">
        <div className="text-center space-y-2">
          <Skeleton className="mx-auto" variant="text" width={60} height={40} />
          <Skeleton
            variant="rectangular"
            width={100}
            height={20}
            className="mx-auto rounded-md"
          />
          <Skeleton variant="text" width={70} height={20} className="mx-auto" />
        </div>

        <div className="flex-1 space-y-5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton variant="text" width={20} height={20} />
              <Skeleton
                variant="rectangular"
                width="100%"
                height={10}
                className="rounded-full"
              />
              <Skeleton variant="text" width={40} height={20} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 space-y-4">
        <ReviewCardSkeleton />
        <ReviewCardSkeleton />

        <div className="text-center mt-10 mb-5">
          <Skeleton
            variant="rectangular"
            width={120}
            height={35}
            className="mx-auto rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

const ReviewCardSkeleton = () => {
  return (
    <div className="flex justify-between bg-white rounded-sm p-5">
      <div className="flex gap-4 w-full">
        <Skeleton variant="circular" width={47} height={47} />

        <div className="flex-1 space-y-3 mt-1">
          <Skeleton variant="text" width={120} height={22} />

          <Skeleton variant="rectangular" width={90} height={18} />

          <Skeleton variant="text" width="90%" height={20} />
          <Skeleton variant="text" width="80%" height={20} />
          <Skeleton variant="text" width="70%" height={20} />

          <div className="flex gap-2 mt-3">
            <Skeleton
              variant="rectangular"
              width={60}
              height={50}
              className="rounded-sm"
            />
            <Skeleton
              variant="rectangular"
              width={60}
              height={50}
              className="rounded-sm"
            />
            <Skeleton
              variant="rectangular"
              width={60}
              height={50}
              className="rounded-sm"
            />
          </div>
        </div>
      </div>


      <Skeleton variant="circular" width={25} height={25} />
    </div>
  );
};

export default Reviews;
