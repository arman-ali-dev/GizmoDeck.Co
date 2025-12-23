import React, { useState } from "react";
import Box from "@mui/material/Box";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Button, CircularProgress, IconButton, Rating } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addReview } from "../../../store/customer/reviewSlice";
import { uploadToCloudinary } from "../../../util/uploadToCloudinary";
import CloseIcon from "@mui/icons-material/Close";

const ReviewForm = ({ handleClose, productId }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.review);
  const [uploadImage, setUploadImage] = useState(false);

  const validationSchema = Yup.object({
    rating: Yup.number().required("Rating is required"),
    comment: Yup.string()
      .min(10, "Review must be at least 10 characters")
      .required("Review is required"),
  });

  const formik = useFormik({
    initialValues: {
      rating: null,
      comment: "",
      images: [],
    },
    validationSchema,
    onSubmit: async (values) => {
      dispatch(
        addReview({
          productId,
          rating: values.rating,
          comment: values.comment,
          images: values.images,
        })
      ).then((res) => {
        if (!res.error) {
          handleClose();
        }
      });
    },
  });

  const handleChangeImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadImage(true);
    const image = await uploadToCloudinary(file);
    if (image) {
      formik.setFieldValue("images", [...formik.values.images, image]);
    }
    setUploadImage(false);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue("images", updatedImages);
  };

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: {
            xs: "100%",
            lg: 900,
          },
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 5,
        }}
      >
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-[22px] font-medium">Write Review</h2>
            <p>Share your thoughts about this product</p>
          </div>

          <IconButton onClick={handleClose}>
            <CancelOutlinedIcon />
          </IconButton>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="mt-7">
            <h2 className="text-[18px]">Overall Review*</h2>

            <div className="mt-2">
              <Rating
                name="rating"
                size="large"
                value={formik.values.rating}
                onChange={(e, newValue) =>
                  formik.setFieldValue("rating", newValue)
                }
              />
              {formik.touched.rating && formik.errors.rating && (
                <p className="text-red-600 text-sm mt-1">
                  {formik.errors.rating}
                </p>
              )}

              <div className="mt-4">
                <label class="lg:text-[16px] text-[14px] ">
                  Add Photos (Optional)
                </label>
                <p className="text-[12px] mb-2 -mt-0.5">
                  Up to 3 images, max 5MB each.
                </p>

                <div className="flex gap-5">
                  <input
                    type="file"
                    accept="image/*"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={handleChangeImage}
                  />
                  <label className="relative" htmlFor="fileInput">
                    <span className="lg:w-24 lg:h-24 w-16 h-16 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-400">
                      <AddPhotoAlternateIcon
                        sx={{ fontSize: { xs: 18, md: 22 } }}
                        className="text-gray-700"
                      />
                    </span>
                    {uploadImage && (
                      <>
                        <div className="absolute left-0 hidden lg:flex right-0 top-0 bottom-0 lg:w-24 lg:h-24 w-16 h-16   justify-center items-center">
                          <CircularProgress />
                        </div>

                        <div className="absolute lg:hidden left-0 right-0 top-0 bottom-0 lg:w-24 lg:h-24 w-16 h-16  flex justify-center items-center">
                          <CircularProgress size={28} />
                        </div>
                      </>
                    )}
                  </label>
                  <div className="flex flex-wrap gap-5">
                    {formik.values.images.map((image, index) => (
                      <div className="relative" key={index}>
                        <img
                          className="lg:w-24 rounded-lg lg:h-24 w-16 h-16 object-cover"
                          src={image}
                          alt={`Product Image ${index + 1}`}
                        />
                        <IconButton
                          onClick={() => handleRemoveImage(index)}
                          size="small"
                          color="error"
                          sx={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            outline: "none",
                          }}
                        >
                          <CloseIcon
                            sx={{ fontSize: { xs: "0.5rem", md: "1rem" } }}
                          />
                        </IconButton>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5">
                  <label class="lg:text-[15px] text-[14px] ">
                    Your Review*
                  </label>
                  <textarea
                    name="comment"
                    value={formik.values.comment}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Share details about your experience..."
                    class="w-full mt-1 lg:text-[14px] text-[13px] bg-[#F5F5F5] px-4 py-2.5 rounded-md resize-none border-0 outline-none"
                    rows={4}
                  ></textarea>

                  {formik.touched.comment && formik.errors.comment && (
                    <p className="text-red-600 text-sm mt-1">
                      {formik.errors.comment}
                    </p>
                  )}
                </div>

                <div className="mt-8 text-right">
                  <Button
                    onClick={handleClose}
                    sx={{
                      border: "1px solid #000",
                      marginRight: 1,
                      color: "black",
                      paddingX: 4,
                      textTransform: "capitalize",
                    }}
                  >
                    <span className="text-[14px]">Cancel</span>
                  </Button>

                  <Button
                    type="submit"
                    disabled={loading}
                    sx={{
                      background: "#000",
                      border: "1px solid #000",
                      color: "white",
                      paddingX: 4,
                      textTransform: "capitalize",
                      height: "38px",
                    }}
                  >
                    {loading ? (
                      <CircularProgress size={14} sx={{ color: "#fff" }} />
                    ) : (
                      <span className="text-[14px]">Submit</span>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Box>
    </>
  );
};

export default ReviewForm;
