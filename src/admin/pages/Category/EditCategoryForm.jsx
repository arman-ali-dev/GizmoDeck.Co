import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { upsertCategory } from "../../../store/admin/categorySlice";
import { uploadToCloudinary } from "../../../util/uploadToCloudinary";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};

const EditCategoryForm = ({ handleClose, selectedCategory }) => {
  const dispatch = useDispatch();

  const [uploadImage, setUploadImage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: selectedCategory?.name || "",
      description: selectedCategory?.description || "",
      parentCategory: selectedCategory?.parentCategory?.id || null,
      image: selectedCategory?.image || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Category name is required"),
      description: Yup.string().required("Description is required"),
      parentCategory: Yup.string().required("Select parent category"),
    }),
    onSubmit: async (values) => {
      console.log(values.parentCategory);

      setIsLoading(true);
      try {
        const token = localStorage.getItem("jwt");

        const { data } = await axios.put(
          `https://gizmodeck-co-server2.onrender.com/api/admin/categories/${selectedCategory.id}`,
          {
            name: values.name,
            description: values.description,
            image: values.image, // updated image URL ya file
            parentCategory: { id: values.parentCategory },
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        dispatch(upsertCategory(data));

        toast.success("Category updated successfully!", { autoClose: 1500 });
        handleClose();
      } catch (error) {
        console.log(error);

        toast.error(
          error.response?.data?.message || "Failed to update category",
          { autoClose: 1500 }
        );
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
    <Box sx={style} component="form" onSubmit={formik.handleSubmit}>
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-[22px] font-medium">Edit Category</h2>
        <IconButton onClick={handleClose}>
          <CancelOutlinedIcon />
        </IconButton>
      </div>

      <div className="flex gap-5 items-center mb-5">
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
            <div className="absolute left-0 right-0 top-0 bottom-0 flex justify-center items-center bg-white/50 rounded-md">
              <CircularProgress size={28} />
            </div>
          )}
        </label>

        <div className="relative">
          <img
            className="lg:w-24 rounded-lg lg:h-24 w-16 h-16 object-cover border"
            src={formik.values.image}
            alt="Category"
          />
          <IconButton
            onClick={() => setImage("")}
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
      </div>

      <div className="space-y-4">
        <div>
          <TextField
            fullWidth
            label="Name *"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            size="medium"
          />
        </div>
        <div>
          <TextField
            fullWidth
            label="Description *"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
            multiline
            minRows={4}
          />
        </div>
        <div>
          <Select
            fullWidth
            name="parentCategory"
            displayEmpty
            value={formik.values.parentCategory}
            onChange={formik.handleChange}
            error={
              formik.touched.parentCategory &&
              Boolean(formik.errors.parentCategory)
            }
          >
            <MenuItem value="">Select Parent Category</MenuItem>
            <MenuItem value={1}>Men</MenuItem>
            <MenuItem value={2}>Women</MenuItem>
            <MenuItem value={3}>Electronics</MenuItem>
          </Select>
          {formik.touched.parentCategory && formik.errors.parentCategory && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.parentCategory}
            </p>
          )}
        </div>
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
          <CircularProgress size={18} sx={{ color: "white" }} />
        ) : (
          <span className="font-medium lg:text-[14px] text-[12px]">
            Update Category
          </span>
        )}
      </Button>
    </Box>
  );
};

export default EditCategoryForm;
