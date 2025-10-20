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
              name="businessName"
              size={isMobile ? "small" : "medium"}
              label="Business Name"
              value={formik.values.businessName}
              onChange={formik.handleChange}
              error={
                formik.touched.businessName &&
                Boolean(formik.errors.businessName)
              }
              helperText={
                formik.touched.businessName && formik.errors.businessName
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
              name="sellerName"
              label="Seller Name"
              size={isMobile ? "small" : "medium"}
              value={formik.values.sellerName}
              onChange={formik.handleChange}
              error={
                formik.touched.sellerName && Boolean(formik.errors.sellerName)
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
              helperText={formik.touched.sellerName && formik.errors.sellerName}
            />
          </div>

          <div>
            <TextField
              fullWidth
              name="accountHolderName"
              label="Account Holder Name"
              size={isMobile ? "small" : "medium"}
              value={formik.values.accountHolderName}
              onChange={formik.handleChange}
              error={
                formik.touched.accountHolderName &&
                Boolean(formik.errors.accountHolderName)
              }
              helperText={
                formik.touched.accountHolderName &&
                formik.errors.accountHolderName
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
