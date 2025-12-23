import {
  Avatar,
  Box,
  CircularProgress,
  IconButton,
  Rating,
} from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { deleteReview } from "../../../store/customer/reviewSlice";

const ReviewCard = ({ review }) => {
  const { user } = useSelector((state) => state.user);
  const { deletingId } = useSelector((state) => state.review);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteReview(review?.id));
  };

  console.log(user?.id, review?.user?.id);

  return (
    <>
      <div className="flex justify-between bg-[#FFFFFF] rounded-sm  p-5">
        <div className="flex justify-between w-full">
          <div className="flex gap-4">
            <div item xs={1}>
              <Box>
                <Avatar
                  src={review?.user?.profileImage || ""}
                  className="text-white"
                  sx={{
                    width: { xs: 40, lg: 47 },
                    height: { xs: 40, lg: 47 },
                    bgcolor: "#000",
                  }}
                >
                  {!review?.user?.profileImage &&
                    (review?.user?.fullName?.charAt(0)?.toUpperCase() || "U")}
                </Avatar>
              </Box>
            </div>

            <div className="mt-1">
              <div className="space-y-1.5">
                <div>
                  <p className="font-semibold text-[14px] lg:text-[16px]">
                    {review?.user?.fullName}
                  </p>
                </div>

                <div>
                  <Rating
                    readOnly
                    name="size-small"
                    defaultValue={review?.ratingValue}
                    size="small"
                  />
                  <p className="text-gray-500 text-[14px] lg:text-[15px]">
                    {review?.comment}
                  </p>

                  <div className="mt-2 flex gap-2">
                    {review?.images?.map((elem) => (
                      <img
                        className="lg:w-16 w-10 cursor-pointer lg:h-14 h-10 rounded-sm object-cover object-top"
                        src={elem}
                        alt=""
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            {user?.id === review?.user?.id ? (
              <IconButton
                onClick={handleDelete}
                sx={{ color: "black" }}
                disabled={deletingId === review?.id}
                size="small"
              >
                {deletingId === review?.id ? (
                  <CircularProgress color="black" size={12} />
                ) : (
                  <DeleteIcon sx={{ fontSize: 20 }} />
                )}
              </IconButton>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewCard;
