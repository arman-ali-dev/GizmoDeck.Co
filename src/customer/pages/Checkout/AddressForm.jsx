import { Box, Button, CircularProgress, TextField } from "@mui/material";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addAddress } from "../../../store/customer/addressSlice";

const AddressFormSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),

  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit phoneNumber number"),

  pincode: Yup.string()
    .required("Pincode is required")
    .matches(/^\d{6}$/, "Enter a valid 6-digit pincode"),

  address: Yup.string()
    .required("Address is required")
    .min(10, "Address must be at least 10 characters long"),

  city: Yup.string()
    .required("City is required")
    .min(2, "City name must be at least 2 characters"),

  state: Yup.string()
    .required("State is required")
    .min(2, "State name must be at least 2 characters"),

  locality: Yup.string()
    .required("Locality is required")
    .min(2, "Locality must be at least 2 characters"),
});

const AddressForm = ({ handleClose }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      phoneNumber: "",
      pincode: "",
      address: "",
      city: "",
      state: "",
      locality: "",
    },

    validationSchema: AddressFormSchema,

    onSubmit: async (values) => {
      dispatch(addAddress(values));
      handleClose();
    },
  });

  const { addLoading } = useSelector((state) => state.address);
  return (
    <>
      <Box sx={{ width: "100%", mx: "auto" }}>
        <p className="text-xl font-bold text-center pb-5">Contact Details</p>

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <div>
            <div>
              <TextField
                fullWidth
                name="name"
                label="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.state && formik.errors.name}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div>
              <TextField
                fullWidth
                name="phoneNumber"
                label="Phone Number"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                error={
                  formik.touched.phoneNumber &&
                  Boolean(formik.errors.phoneNumber)
                }
                helperText={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                }
              />
            </div>
            <div>
              <TextField
                fullWidth
                name="pincode"
                label="Pincode"
                value={formik.values.pincode}
                onChange={formik.handleChange}
                error={formik.touched.pincode && Boolean(formik.errors.pincode)}
                helperText={formik.touched.pincode && formik.errors.pincode}
              />
            </div>
          </div>

          <div>
            <div>
              <TextField
                fullWidth
                name="address"
                label="Address"
                value={formik.values.address}
                onChange={formik.handleChange}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
            </div>
          </div>
          <div>
            <div>
              <TextField
                fullWidth
                name="locality"
                label="Locality"
                value={formik.values.locality}
                onChange={formik.handleChange}
                error={
                  formik.touched.locality && Boolean(formik.errors.locality)
                }
                helperText={formik.touched.locality && formik.errors.locality}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div>
              <TextField
                fullWidth
                name="city"
                label="City"
                value={formik.values.city}
                onChange={formik.handleChange}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
              />
            </div>

            <div>
              <TextField
                fullWidth
                name="state"
                label="State"
                value={formik.values.state}
                onChange={formik.handleChange}
                error={formik.touched.state && Boolean(formik.errors.state)}
                helperText={formik.touched.state && formik.errors.state}
              />
            </div>
          </div>

          <div>
            <Button
              onClick={formik.handleSubmit}
              type="submit"
              variant="contained"
              sx={{
                py: "12px",
                textTransform: "capitalize",
                background: "black",
              }}
              fullWidth
            >
              {addLoading ? (
                <CircularProgress size={20} color="white" />
              ) : (
                "add address"
              )}
            </Button>
          </div>
        </form>
      </Box>
    </>
  );
};

export default AddressForm;
