import React, { useState } from "react";
import { useFormik } from "formik";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import axios from "axios";

import {
  Button,
  CircularProgress,
  IconButton,
  TextField,
  Select,
  MenuItem,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { uploadToCloudinary } from "../../../util/uploadToCloudinary";
import { toast } from "react-toastify";
import * as Yup from "yup";
``;

const AddCategory = () => {
  const [uploadImage, setUploadImage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Category name is required")
      .min(3, "Name must be at least 3 characters"),
    description: Yup.string()
      .required("Description is required")
      .min(10, "Description must be at least 10 characters"),
    image: Yup.string().required("Image is required"),
    parentCategoryId: Yup.string().required("Please select a parent category"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      image: "",
      parentCategoryId: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);
      try {
        const payload = {
          name: values.name,
          description: values.description,
          image: values.image,
          parentCategory:
            values.parentCategoryId !== ""
              ? { id: values.parentCategoryId }
              : null,
        };

        const res = await axios.post(
          "https://gizmodeckco-server-production.up.railway.app/api/admin/categories",
          payload,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          }
        );

        toast.success("Category created successfully!", { autoClose: 1500 });
        resetForm();
      } catch (err) {
        const errorMessage =
          err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          "Something went wrong!";

        console.log("Error:", errorMessage);

        toast.error(errorMessage, { autoClose: 1500 });
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleChangeImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadImage(true);
    const image = await uploadToCloudinary(file);

    if (image) {
      // overwrite existing image
      formik.setFieldValue("image", image);
    }

    setUploadImage(false);
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="space-y-4 lg:p-4">
        <div className="flex gap-5 items-center">
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
            {formik.touched.image && formik.errors.image && (
              <p className="text-red-500 ml-1 text-xs mt-1">
                {formik.errors.image}
              </p>
            )}

            {uploadImage && (
              <div className="absolute left-0 right-0 top-0 bottom-0 flex justify-center items-center bg-white/50 rounded-md">
                <CircularProgress size={28} />
              </div>
            )}
          </label>

          {formik.values.image && (
            <div className="relative">
              <img
                className="lg:w-24 rounded-lg lg:h-24 w-16 h-16 object-cover border"
                src={formik.values.image}
                alt="Category Image"
              />
              <IconButton
                onClick={() => formik.setFieldValue("image", "")}
                size="small"
                color="error"
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  outline: "none",
                  backgroundColor: "white",
                }}
              >
                <CloseIcon sx={{ fontSize: { xs: "0.5rem", md: "1rem" } }} />
              </IconButton>
            </div>
          )}
        </div>

        <div>
          <TextField
            fullWidth
            name="name"
            label="Name *"
            value={formik.values.name}
            onChange={formik.handleChange}
            size={isMobile ? "small" : "medium"}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            InputProps={{
              sx: {
                "& .MuiInputBase-input": {
                  fontSize: { xs: "13px", md: "14px" },
                  "&::placeholder": {
                    fontSize: { xs: "13px", md: "14px" },
                    color: "#888",
                    opacity: 1,
                  },
                },
              },
            }}
            InputLabelProps={{
              sx: { fontSize: { xs: "13px", md: "14px" } }, // label size
            }}
          />
        </div>
        <div>
          <TextField
            fullWidth
            name="description"
            label="Description *"
            value={formik.values.description}
            onChange={formik.handleChange}
            multiline
            minRows={4}
            onBlur={formik.handleBlur}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
            size={isMobile ? "small" : "medium"}
            InputProps={{
              sx: {
                "& .MuiInputBase-input": {
                  fontSize: { xs: "13px", md: "14px" },
                  "&::placeholder": {
                    fontSize: { xs: "13px", md: "14px" },
                    color: "#888",
                    opacity: 1,
                  },
                },
              },
            }}
            InputLabelProps={{
              sx: { fontSize: { xs: "13px", md: "14px" } }, // label size
            }}
          />
        </div>

        <div>
          <Select
            fullWidth
            name="parentCategoryId"
            value={formik.values.parentCategoryId}
            onChange={formik.handleChange}
            displayEmpty
            onBlur={formik.handleBlur}
            renderValue={(selected) =>
              selected ? (
                selected
              ) : (
                <span style={{ color: "#666666" }}>Parent Category</span>
              )
            }
            sx={{
              fontSize: { xs: "13px", md: "14px" },
              height: isMobile ? 38 : 53,
              "& .MuiSelect-select": {
                paddingY: isMobile ? "8px" : "14px",
                fontSize: { xs: "13px", md: "14px" },
              },
              "& .MuiSvgIcon-root": {
                fontSize: isMobile ? "18px" : "22px",
              },
              transition: "all 0.2s ease-in-out",
            }}
            error={
              formik.touched.parentCategoryId &&
              Boolean(formik.errors.parentCategoryId)
            }
          >
            <MenuItem value={1}>Men</MenuItem>
            <MenuItem value={2}>Women</MenuItem>
            <MenuItem value={3}>Electronics</MenuItem>
          </Select>

          {formik.touched.parentCategoryId &&
            formik.errors.parentCategoryId && (
              <p className="text-red-500 text-xs mt-1 pl-1">
                {formik.errors.parentCategoryId}
              </p>
            )}
        </div>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            textTransform: "capitalize",
            background: "#000",
            marginTop: { xs: 2, md: 5 },
            paddingY: { xs: 1, md: 1.5 },
            height: "48px",
          }}
          disabled={isLoading}
        >
          {isLoading ? (
            <CircularProgress color="white" size={18} />
          ) : (
            <span className="font-medium lg:text-[14px] text-[12px]">
              Add Category
            </span>
          )}
        </Button>
      </form>
    </div>
  );
};

export default AddCategory;
