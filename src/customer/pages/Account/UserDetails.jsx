import React, { useEffect, useRef, useState } from "react";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import { useDispatch, useSelector } from "react-redux";
import { uploadToCloudinary } from "../../../util/uploadToCloudinary";
import { useFormik } from "formik";
import { CircularProgress } from "@mui/material";
import {
  fetchUserProfile,
  updateUserProfile,
} from "../../../store/customer/userSlice";
import * as Yup from "yup";

const UserDetails = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    dispatch(fetchUserProfile());
  }, [dispatch]);

  const { user, loadingUpdate } = useSelector((state) => state.user);

  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef(null);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullName: user?.fullName || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      profileImage: user?.profileImage || "",
    },

    validationSchema: Yup.object({
      fullName: Yup.string().trim().required("Full name is required"),

      email: Yup.string()
        .trim()
        .email("Invalid email format")
        .matches(
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          "Email must be a valid format (e.g. name@example.com)"
        )
        .required("Email is required"),

      phoneNumber: Yup.string()
        .matches(
          /^[6-9]\d{9}$/,
          "Phone number must be 10 digits & start with 6-9"
        )
        .notOneOf(
          [
            "0000000000",
            "1111111111",
            "2222222222",
            "3333333333",
            "4444444444",
            "5555555555",
            "6666666666",
            "7777777777",
            "8888888888",
            "9999999999",
          ],
          "Phone number cannot be all same digits"
        )
        .required("Phone number is required"),
    }),

    onSubmit: async (values) => {
      dispatch(updateUserProfile(values));
    },
  });
  // When user clicks change photo → open file dialog
  const openImagePicker = () => {
    fileInputRef.current.click();
  };

  // Handle image upload
  const handleChangeImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    // Upload to cloudinary
    const imageUrl = await uploadToCloudinary(file);

    if (imageUrl) {
      // Update formik data
      formik.setFieldValue("profileImage", imageUrl);
    }

    setUploading(false);
  };
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="border-gray-300 border lg:rounded-2xl rounded-md px-6 pt-5 pb-6">
          <h3 className="lg:text-[17px] text-[16px] font-medium mb-4">
            Profile Picture
          </h3>

          <div className="flex lg:gap-8 gap-5 items-center">
            <div className="relative">
              <img
                className="lg:w-[130px] lg:h-[130px] w-[80px] h-[80px] rounded-full object-cover"
                src={
                  formik.values.profileImage ||
                  user?.profileImage ||
                  "https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg"
                }
                alt=""
              />

              {uploading && (
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 border-[3px] border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>

            <div>
              <button
                disabled={uploading}
                type="button"
                onClick={openImagePicker}
                className="bg-black/10 cursor-pointer lg:text-[16px] text-[13px] px-6 py-2.5 gap-1.5 rounded-sm font-medium flex items-center"
              >
                <CameraAltOutlinedIcon />
                Change Photo
              </button>

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleChangeImage}
                className="hidden"
              />

              <p className="text-[#676767] lg:text-[11px] text-[8px] mt-1.5 font-medium">
                JPG, GIF or PNG. Max size 2MB.
              </p>
            </div>
          </div>
        </div>
        <div class="border-gray-300 mt-4 border lg:rounded-2xl rounded-md px-6 pt-5 pb-6">
          <h3 class="lg:text-[17px] text-[16px] text-[#353535] font-medium">
            Personal Information
          </h3>

          <div>
            <label className="lg:text-[15px] text-[13px] font-medium">
              Name
            </label>
            <input
              name="fullName"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              className="w-full mt-0.5 lg:text-[14px] text-[13px] bg-[#F5F5F5] px-4 py-2.5 rounded-md border-0 outline-none"
              type="text"
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <p className="text-red-500 text-xs mt-1 ml-1">
                {formik.errors.fullName}
              </p>
            )}
          </div>

          <div>
            <label className="lg:text-[15px] text-[13px] font-medium">
              Email
            </label>
            <input
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              className="w-full mt-0.5 lg:text-[14px] text-[13px] bg-[#F5F5F5] px-4 py-2.5 rounded-md border-0 outline-none"
              type="email"
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <p className="text-red-500 text-xs mt-1 ml-1">
                {formik.errors.email}
              </p>
            )}
          </div>

          <div>
            <label className="lg:text-[15px] text-[13px] font-medium">
              Phone Number
            </label>
            <input
              name="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              className="w-full mt-0.5 lg:text-[14px] text-[13px] bg-[#F5F5F5] px-4 py-2.5 rounded-md border-0 outline-none"
              type="text"
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <p className="text-red-500 text-xs mt-1 ml-1">
                {formik.errors.phoneNumber}
              </p>
            )}
          </div>

          <div className="text-right mt-5">
            <button
              type="submit"
              disabled={loadingUpdate}
              className="bg-black text-white text-[15px] px-6 py-2.5 rounded-sm font-medium mt-3 flex items-center gap-2 cursor-pointer"
            >
              {loadingUpdate ? <CircularProgress size={13} /> : "Save Changes"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default UserDetails;
