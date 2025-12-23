import { Box, TextField, useMediaQuery, useTheme } from "@mui/material";
import React from "react";

const BecomeSellerFormStep4 = ({ formik }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <Box>
        <div className="space-y-7 ">
          <div>
            <TextField
              fullWidth
              name="businessDetails.businessName"
              size={isMobile ? "small" : "medium"}
              label="Business Name"
              value={formik.values.businessDetails?.businessName}
              onChange={formik.handleChange}
              error={
                formik.touched.businessDetails?.businessName &&
                Boolean(formik.errors.businessDetails?.businessName)
              }
              helperText={
                formik.touched.businessDetails?.businessName &&
                formik.errors.businessDetails?.businessName
              }
              InputProps={{
                sx: {
                  "& .MuiInputBase-input": {
                    fontSize: { xs: "13px", md: "16px" },
                    "&::placeholder": {
                      fontSize: { xs: "13px", md: "16px" },
                      color: "#888",
                      opacity: 1,
                    },
                  },
                },
              }}
              InputLabelProps={{
                sx: { fontSize: { xs: "13px", md: "16px" } }, // label size
              }}
            />
          </div>
          <div>
            <TextField
              fullWidth
              label="Business Email"
              name="businessDetails.businessEmail"
              size={isMobile ? "small" : "medium"}
              value={formik.values.businessDetails?.businessEmail}
              onChange={formik.handleChange}
              error={
                formik.touched.businessDetails?.businessEmail &&
                Boolean(formik.errors.businessDetails?.businessEmail)
              }
              InputProps={{
                sx: {
                  "& .MuiInputBase-input": {
                    fontSize: { xs: "13px", md: "16px" },
                    "&::placeholder": {
                      fontSize: { xs: "13px", md: "16px" },
                      color: "#888",
                      opacity: 1,
                    },
                  },
                },
              }}
              InputLabelProps={{
                sx: { fontSize: { xs: "13px", md: "16px" } }, // label size
              }}
              helperText={
                formik.touched.businessDetails?.businessEmail &&
                formik.errors.businessDetails?.businessEmail
              }
            />
          </div>

          <div>
            <TextField
              fullWidth
              name="businessDetails.businessMobileNumber"
              label="Business Mobile Number"
              size={isMobile ? "small" : "medium"}
              value={formik.values.businessDetails?.businessMobileNumber}
              onChange={formik.handleChange}
              error={
                formik.touched.businessDetails?.businessMobileNumber &&
                Boolean(formik.errors.businessDetails?.businessMobileNumber)
              }
              helperText={
                formik.touched.businessDetails?.businessMobileNumber &&
                formik.errors.businessDetails?.businessMobileNumber
              }
              InputProps={{
                sx: {
                  "& .MuiInputBase-input": {
                    fontSize: { xs: "13px", md: "16px" },
                    "&::placeholder": {
                      fontSize: { xs: "13px", md: "16px" },
                      color: "#888",
                      opacity: 1,
                    },
                  },
                },
              }}
              InputLabelProps={{
                sx: { fontSize: { xs: "13px", md: "16px" } }, // label size
              }}
            />
          </div>

          <div>
            <TextField
              fullWidth
              name="businessDetails.businessAddress"
              label="Business Address"
              size={isMobile ? "small" : "medium"}
              value={formik.values.businessDetails?.businessAddress}
              onChange={formik.handleChange}
              error={
                formik.touched.businessDetails?.businessAddress &&
                Boolean(formik.errors.businessDetails?.businessAddress)
              }
              helperText={
                formik.touched.businessDetails?.businessAddress &&
                formik.errors.businessDetails?.businessAddress
              }
              InputProps={{
                sx: {
                  "& .MuiInputBase-input": {
                    fontSize: { xs: "13px", md: "16px" },
                    "&::placeholder": {
                      fontSize: { xs: "13px", md: "16px" },
                      color: "#888",
                      opacity: 1,
                    },
                  },
                },
              }}
              InputLabelProps={{
                sx: { fontSize: { xs: "13px", md: "16px" } }, // label size
              }}
            />
          </div>
        </div>
      </Box>
    </>
  );
};

export default BecomeSellerFormStep4;
