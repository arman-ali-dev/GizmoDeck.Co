import React, { useState } from "react";
import { useFormik } from "formik";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import * as Yup from "yup";
import {
  Button,
  CircularProgress,
  IconButton,
  TextField,
  Select,
  MenuItem,
  useTheme,
  useMediaQuery,
  InputLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { uploadToCloudinary } from "../../../util/uploadToCloudinary";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createSellerProduct } from "../../../store/seller/productSlice";

const colors = [
  "Red",
  "Blue",
  "Green",
  "Black",
  "White",
  "Yellow",
  "Purple",
  "Orange",
  "Pink",
];

const validationSchema = Yup.object({
  name: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  category: Yup.object({
    id: Yup.string().required("Category is required"),
  }),

  variants: Yup.array()
    .of(
      Yup.object({
        images: Yup.array()
          .min(1, "At least one image is required")
          .required("Images are required"),
        sellingPrice: Yup.number()
          .typeError("Selling Price must be a number")
          .positive("Selling Price must be positive")
          .required("Selling Price is required"),
        mrpPrice: Yup.number()
          .typeError("MRP Price must be a number")
          .positive("MRP Price must be positive")
          .required("MRP Price is required"),
        stock: Yup.number()
          .typeError("Stock must be a number")
          .integer("Stock must be an integer")
          .min(0, "Stock cannot be negative")
          .required("Stock is required"),
        color: Yup.string().required("Color is required"),
        size: Yup.string().required("Size is required"),
      })
    )
    .min(1, "At least one variant is required")
    .required("Variants are required"),

  specifications: Yup.array().of(
    Yup.object({
      key: Yup.string().required("Key is required"),
      value: Yup.string().required("Value is required"),
    })
  ),

  features: Yup.array().of(Yup.string().required("Feature cannot be empty")),
});

const AddProduct = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      category: {
        id: "",
      },

      featured: false,
      bestSeller: false,

      variants: [
        {
          images: [],
          sellingPrice: "",
          mrpPrice: "",
          stock: "",
          color: "",
          size: "",
        },
      ],

      specifications: [],
      features: [],
    },
    // validationSchema,

    onSubmit: (values) => {
      dispatch(createSellerProduct(values))
        .unwrap()
        .then((res) => {
          toast.success("Product added successfully!", { autoClose: 1200 });
          formik.resetForm();
        })
        .catch((err) => {
          toast.error(err || "Something went wrong", { autoClose: 1200 });
        });
    },
  });

  const addNewVariant = () => {
    formik.setFieldValue("variants", [
      ...formik.values.variants,
      {
        images: [],
        sellingPrice: "",
        mrpPrice: "",
        stock: "",
        color: "",
        size: "",
      },
    ]);
  };

  const updateVariantField = (index, field, value) => {
    const updated = [...formik.values.variants];
    updated[index][field] = value;
    formik.setFieldValue("variants", updated);
  };

  const removeVariantImage = (vIndex, imgIndex) => {
    const updated = [...formik.values.variants];
    updated[vIndex].images.splice(imgIndex, 1);
    formik.setFieldValue("variants", updated);
  };

  const removeVariant = (vIndex) => {
    if (formik.values.variants.length === 1) {
      toast.error("At least one variant is required.", { autoClose: 1400 });
      return;
    }

    const updated = [...formik.values.variants];
    updated.splice(vIndex, 1);
    formik.setFieldValue("variants", updated);
  };

  const [specKey, setSpecKey] = useState("");
  const [specValue, setSpecValue] = useState("");

  const addSpecification = () => {
    if (!specKey || !specValue) return;

    formik.setFieldValue("specifications", [
      ...formik.values.specifications,
      { key: specKey, value: specValue },
    ]);

    setSpecKey("");
    setSpecValue("");
  };

  const removeSpec = (index) => {
    const updated = [...formik.values.specifications];
    updated.splice(index, 1);
    formik.setFieldValue("specifications", updated);
  };

  const [feature, setFeature] = useState("");

  const addFeature = () => {
    if (!feature.trim()) return;

    formik.setFieldValue("features", [...formik.values.features, feature]);

    setFeature("");
  };

  const removeFeature = (index) => {
    const updated = [...formik.values.features];
    updated.splice(index, 1);
    formik.setFieldValue("features", updated);
  };

  // All Categories
  const { categories } = useSelector((state) => state.category);

  // Upload Image

  const [uploadImage, setUploadImage] = useState({});

  const handleVariantImageChange = async (e, vIndex) => {
    const file = e.target.files[0];
    if (!file) return;

    // START loader for specific variant
    setUploadImage((prev) => ({ ...prev, [vIndex]: true }));

    const image = await uploadToCloudinary(file);

    if (image) {
      const existingImages = formik.values.variants[vIndex].images || [];
      formik.setFieldValue(`variants[${vIndex}].images`, [
        ...existingImages,
        image,
      ]);
    }

    // STOP loader for specific variant
    setUploadImage((prev) => ({ ...prev, [vIndex]: false }));
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <TextField
              fullWidth
              label="Title *"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </div>

          <div>
            <TextField
              fullWidth
              label="Description *"
              name="description"
              multiline
              minRows={4}
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
          </div>

          <div>
            <InputLabel id="category-label" className="mb-1">
              Category *
            </InputLabel>
            <Select
              fullWidth
              label="Category"
              name="category.id"
              value={formik.values.category.id}
              onChange={formik.handleChange}
            >
              <MenuItem value="">Choose Category *</MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.category?.id && formik.errors.category?.id && (
              <p className="text-red-500 text-xs mt-1 pl-1">
                {formik.errors.category.id}
              </p>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mt-6">Variants</h2>

          {formik.values.variants.map((variant, vIndex) => (
            <div
              key={vIndex}
              className="border rounded-xl mt-4 p-4 space-y-4 relative"
            >
              <div className="absolute top-3 right-3">
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => removeVariant(vIndex)}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </div>

              <div>
                <label className="block font-medium mb-2">Images</label>

                <div className="flex gap-3 flex-wrap">
                  <label className="relative" htmlFor={`file-${vIndex}`}>
                    <span className="lg:w-24 lg:h-24 w-16 h-16 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-400">
                      <AddPhotoAlternateIcon
                        sx={{ fontSize: { xs: 18, md: 22 } }}
                        className="text-gray-700"
                      />
                    </span>
                    {formik.touched.variants?.[vIndex]?.images &&
                      formik.errors.variants?.[vIndex]?.images && (
                        <p className="text-red-500 ml-1 text-xs mt-1">
                          {formik.errors.variants[vIndex].images}
                        </p>
                      )}

                    {uploadImage[vIndex] && (
                      <div className="absolute left-0 right-0 top-0 bottom-0 flex justify-center items-center bg-white/50 rounded-md">
                        <CircularProgress size={28} />
                      </div>
                    )}
                  </label>

                  <input
                    id={`file-${vIndex}`}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => handleVariantImageChange(e, vIndex)}
                  />

                  {variant.images?.map((img, i) => (
                    <div key={i} className="relative">
                      <img
                        src={img}
                        className="w-20 h-20 rounded-md object-cover"
                      />
                      <div className="absolute top-0 right-0">
                        <IconButton
                          size="small"
                          onClick={() => removeVariantImage(vIndex, i)}
                        >
                          <CloseIcon sx={{ color: "red" }} fontSize="small" />
                        </IconButton>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <TextField
                  fullWidth
                  label="Selling Price *"
                  value={variant.sellingPrice}
                  onChange={(e) =>
                    updateVariantField(vIndex, "sellingPrice", e.target.value)
                  }
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.variants?.[vIndex]?.sellingPrice &&
                    Boolean(formik.errors.variants?.[vIndex]?.sellingPrice)
                  }
                  helperText={
                    formik.touched.variants?.[vIndex]?.sellingPrice &&
                    formik.errors.variants?.[vIndex]?.sellingPrice
                  }
                />

                <TextField
                  fullWidth
                  label="MRP Price *"
                  value={variant.mrpPrice}
                  onChange={(e) =>
                    updateVariantField(vIndex, "mrpPrice", e.target.value)
                  }
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.variants?.[vIndex]?.mrpPrice &&
                    Boolean(formik.errors.variants?.[vIndex]?.mrpPrice)
                  }
                  helperText={
                    formik.touched.variants?.[vIndex]?.mrpPrice &&
                    formik.errors.variants?.[vIndex]?.mrpPrice
                  }
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <TextField
                    fullWidth
                    label="Stock *"
                    value={variant.stock}
                    onChange={(e) =>
                      updateVariantField(vIndex, "stock", e.target.value)
                    }
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.variants?.[vIndex]?.stock &&
                      Boolean(formik.errors.variants?.[vIndex]?.stock)
                    }
                    helperText={
                      formik.touched.variants?.[vIndex]?.stock &&
                      formik.errors.variants?.[vIndex]?.stock
                    }
                  />
                </div>
                <div className="flex-1">
                  <Select
                    fullWidth
                    value={variant.color}
                    onChange={(e) =>
                      updateVariantField(vIndex, "color", e.target.value)
                    }
                    displayEmpty
                  >
                    <MenuItem value="">Color *</MenuItem>
                    {colors.map((c) => (
                      <MenuItem key={c} value={c}>
                        {c}
                      </MenuItem>
                    ))}
                  </Select>
                  {formik.touched.variants?.[vIndex]?.color &&
                    formik.errors.variants?.[vIndex]?.color && (
                      <p className="text-red-500 ml-1 text-xs mt-1">
                        {formik.errors.variants[vIndex].color}
                      </p>
                    )}
                </div>

                <div className="flex-1">
                  <TextField
                    fullWidth
                    label="Size *"
                    value={variant.size}
                    onChange={(e) =>
                      updateVariantField(vIndex, "size", e.target.value)
                    }
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.variants?.[vIndex]?.size &&
                      Boolean(formik.errors.variants?.[vIndex]?.size)
                    }
                    helperText={
                      formik.touched.variants?.[vIndex]?.size &&
                      formik.errors.variants?.[vIndex]?.size
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button
          variant="outlined"
          sx={{
            borderColor: "black",
            color: "black",
            textTransform: "capitalize",
            paddingY: "12px",
          }}
          fullWidth
          onClick={addNewVariant}
        >
          <span> + Add Variant</span>
        </Button>

        <div>
          <h2 className="text-lg font-semibold mt-6">Specifications</h2>

          <div className="flex gap-4 mt-4">
            <TextField
              fullWidth
              label="Key"
              value={specKey}
              onChange={(e) => setSpecKey(e.target.value)}
            />

            <TextField
              fullWidth
              label="Value"
              value={specValue}
              onChange={(e) => setSpecValue(e.target.value)}
            />

            <Button
              variant="contained"
              sx={{
                background: "black",
              }}
              onClick={addSpecification}
            >
              Add
            </Button>
          </div>
        </div>

        <div className="space-y-1">
          {formik.values.specifications.map((spec, i) => (
            <div
              key={i}
              className="flex justify-between items-center p-2 border rounded-md"
            >
              <span>
                {spec.key}: {spec.value}
              </span>
              <IconButton size="small" onClick={() => removeSpec(i)}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-lg font-semibold">Key Features</h2>

          <div className="flex gap-4 mt-4">
            <TextField
              fullWidth
              label="Feature"
              value={feature}
              onChange={(e) => setFeature(e.target.value)}
            />
            <Button
              variant="contained"
              sx={{ background: "black" }}
              onClick={addFeature}
            >
              Add
            </Button>
          </div>
        </div>

        <ul className="list-disc ml-5">
          {formik.values.features.map((f, i) => (
            <li key={i} className="flex justify-between items-center">
              {f}
              <IconButton size="small" onClick={() => removeFeature(i)}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </li>
          ))}
        </ul>

        <div className="mt-4">
          <p className="font-medium mb-2">Product Type</p>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="productType"
              value="featured"
              checked={formik.values.featured}
              onChange={() =>
                formik.setValues({
                  ...formik.values,
                  featured: true,
                  bestSeller: false,
                })
              }
            />
            Featured Product
          </label>

          <label className="flex items-center gap-2 mt-2">
            <input
              type="radio"
              name="productType"
              value="bestSeller"
              checked={formik.values.bestSeller}
              onChange={() =>
                formik.setValues({
                  ...formik.values,
                  featured: false,
                  bestSeller: true,
                })
              }
            />
            Best Seller
          </label>
        </div>

        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "black",
            color: "white",
            textTransform: "capitalize",
            paddingY: "12px",
          }}
          fullWidth
        >
          <span> + Add Product</span>
        </Button>
      </form>
    </div>
  );
};

export default AddProduct;
