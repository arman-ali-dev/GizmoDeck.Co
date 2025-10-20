import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const AddressFormSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),

  mobile: Yup.string()
    .required("Mobile number is required")
    .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),

  pinCode: Yup.string()
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

const AddressForm = ({ paymentGateway }) => {
  console.log(paymentGateway);

  const formik = useFormik({
    initialValues: {
      name: "",
      mobile: "",
      pinCode: "",
      address: "",
      city: "",
      state: "",
      locality: "",
    },

    validationSchema: AddressFormSchema,

    onSubmit: async (values) => {},
  });
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
                name="mobile"
                label="Mobile"
                value={formik.values.mobile}
                onChange={formik.handleChange}
                error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                helperText={formik.touched.mobile && formik.errors.mobile}
              />
            </div>
            <div>
              <TextField
                fullWidth
                name="pinCode"
                label="Pincode"
                value={formik.values.pinCode}
                onChange={formik.handleChange}
                error={formik.touched.pinCode && Boolean(formik.errors.pinCode)}
                helperText={formik.touched.pinCode && formik.errors.pinCode}
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
              add address
            </Button>
          </div>
        </form>
      </Box>
    </>
  );
};

export default AddressForm;
