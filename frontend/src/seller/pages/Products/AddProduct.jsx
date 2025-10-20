import React, { useState } from "react";
import { useFormik } from "formik";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

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

const AddProduct = () => {
  const [uploadImage, setUploadImage] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      mrpPrice: "",
      sellingPrice: "",
      quantity: "",
      color: "",
      images: [],
      category: "",
      category2: "",
      category3: "",
      size: "",
    },
    onSubmit: async (values) => {},
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
    <div>
      <form onSubmit={formik.handleSubmit} className="space-y-4 lg:p-4">
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
                  <CloseIcon sx={{ fontSize: { xs: "0.5rem", md: "1rem" } }} />
                </IconButton>
              </div>
            ))}
          </div>
        </div>

        <div>
          <TextField
            fullWidth
            name="title"
            label="Title *"
            value={formik.values.title}
            onChange={formik.handleChange}
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
          <TextField
            fullWidth
            name="description"
            label="Description *"
            value={formik.values.description}
            onChange={formik.handleChange}
            multiline
            minRows={4}
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
        <div className="lg:flex space-y-4 gap-4">
          <div className="flex gap-4 flex-1 ">
            <div className="flex-1">
              <TextField
                fullWidth
                name="mrpPrice"
                label="MRP Price *"
                value={formik.values.mrpPrice}
                onChange={formik.handleChange}
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
            <div className="flex-1">
              <TextField
                fullWidth
                name="sellingPrice"
                label="Selling Price *"
                value={formik.values.sellingPrice}
                onChange={formik.handleChange}
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
          </div>
          <div className="flex gap-4 flex-1">
            <div className="flex-1">
              <Select
                fullWidth
                name="color"
                value={formik.values.color}
                onChange={formik.handleChange}
                displayEmpty
                renderValue={(selected) =>
                  selected ? (
                    selected
                  ) : (
                    <span style={{ color: "#666666" }}>Color *</span>
                  )
                }
                sx={{
                  fontSize: { xs: "13px", md: "14px" },
                  height: isMobile ? 38 : 53, // 👈 small in mobile, medium in desktop
                  "& .MuiSelect-select": {
                    paddingY: isMobile ? "8px" : "14px",
                    fontSize: { xs: "13px", md: "14px" },
                  },
                  "& .MuiSvgIcon-root": {
                    fontSize: isMobile ? "18px" : "22px", // dropdown arrow size
                  },
                  transition: "all 0.2s ease-in-out",
                }}
              >
                <MenuItem value="Red">Red</MenuItem>
                <MenuItem value="Blue">Blue</MenuItem>
                <MenuItem value="Green">Green</MenuItem>
                <MenuItem value="Black">Black</MenuItem>
                <MenuItem value="White">White</MenuItem>
              </Select>
            </div>
            <div className="flex-1">
              <Select
                fullWidth
                name="size"
                value={formik.values.size}
                onChange={formik.handleChange}
                displayEmpty
                renderValue={(selected) =>
                  selected ? (
                    selected
                  ) : (
                    <span style={{ color: "#666666" }}>Size *</span>
                  )
                }
                sx={{
                  fontSize: { xs: "13px", md: "14px" },
                  height: isMobile ? 38 : 53, // 👈 small in mobile, medium in desktop
                  "& .MuiSelect-select": {
                    paddingY: isMobile ? "8px" : "12px",
                    fontSize: { xs: "13px", md: "14px" },
                  },
                  "& .MuiSvgIcon-root": {
                    fontSize: isMobile ? "18px" : "22px", // dropdown arrow size
                  },
                  transition: "all 0.2s ease-in-out",
                }}
              >
                <MenuItem value="S">S</MenuItem>
                <MenuItem value="M">M</MenuItem>
                <MenuItem value="L">L</MenuItem>
                <MenuItem value="XL">XL</MenuItem>
                <MenuItem value="XXL">XXL</MenuItem>
              </Select>
            </div>
          </div>
        </div>

        <div className="md:flex gap-4 space-y-4">
          <Select
            fullWidth
            name="category"
            value={formik.values.category}
            onChange={formik.handleChange}
            displayEmpty
            renderValue={(selected) =>
              selected ? (
                selected
              ) : (
                <span style={{ color: "#666666" }}>Category 1 *</span>
              )
            }
            sx={{
              fontSize: { xs: "13px", md: "14px" },
              height: isMobile ? 38 : 53, // 👈 small in mobile, medium in desktop
              "& .MuiSelect-select": {
                paddingY: isMobile ? "8px" : "14px",
                fontSize: { xs: "13px", md: "14px" },
              },
              "& .MuiSvgIcon-root": {
                fontSize: isMobile ? "18px" : "22px", // dropdown arrow size
              },
              transition: "all 0.2s ease-in-out",
            }}
          >
            <MenuItem value={1}>Men</MenuItem>
            <MenuItem value={2}>Women</MenuItem>
            <MenuItem value={4}>Furniture</MenuItem>
            <MenuItem value={6}>Electronics</MenuItem>
          </Select>

          <Select
            fullWidth
            name="category2"
            value={formik.values.category2}
            onChange={formik.handleChange}
            displayEmpty
            renderValue={(selected) =>
              selected ? (
                selected
              ) : (
                <span style={{ color: "#666666" }}>Category 2 *</span>
              )
            }
            sx={{
              fontSize: { xs: "13px", md: "14px" },
              height: isMobile ? 38 : 53, // 👈 small in mobile, medium in desktop
              "& .MuiSelect-select": {
                paddingY: isMobile ? "8px" : "14px",
                fontSize: { xs: "13px", md: "14px" },
              },
              "& .MuiSvgIcon-root": {
                fontSize: isMobile ? "18px" : "22px", // dropdown arrow size
              },
              transition: "all 0.2s ease-in-out",
            }}
          >
            <MenuItem value={11}>Shirts</MenuItem>
            <MenuItem value={12}>T-Shirts</MenuItem>
            <MenuItem value={13}>Shoes</MenuItem>
          </Select>

          <Select
            fullWidth
            name="category3"
            value={formik.values.category3}
            onChange={formik.handleChange}
            displayEmpty
            renderValue={(selected) =>
              selected ? (
                selected
              ) : (
                <span style={{ color: "#666666" }}>Category 3 *</span>
              )
            }
            sx={{
              fontSize: { xs: "13px", md: "14px" },
              height: isMobile ? 38 : 53, // 👈 small in mobile, medium in desktop
              "& .MuiSelect-select": {
                paddingY: isMobile ? "8px" : "14px",
                fontSize: { xs: "13px", md: "14px" },
              },
              "& .MuiSvgIcon-root": {
                fontSize: isMobile ? "18px" : "22px", // dropdown arrow size
              },
              transition: "all 0.2s ease-in-out",
            }}
          >
            <MenuItem value={21}>Casual</MenuItem>
            <MenuItem value={22}>Formal</MenuItem>
            <MenuItem value={23}>Sports</MenuItem>
          </Select>
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
          }}
        >
          <span className="font-medium lg:text-[14px] text-[12px]">
            Add Product
          </span>
        </Button>
      </form>
    </div>
  );
};

export default AddProduct;
