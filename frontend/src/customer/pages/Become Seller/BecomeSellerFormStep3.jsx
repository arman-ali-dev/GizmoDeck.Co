import { Box, TextField, useMediaQuery, useTheme } from "@mui/material";
import React from "react";

const BecomeSellerFormStep3 = ({ formik }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <Box>
        <div className="space-y-7 ">
          <div>
            <TextField
              fullWidth
              name="accountNumber"
              label="Account Number"
              size={isMobile ? "small" : "medium"}
              value={formik.values.accountNumber}
              onChange={formik.handleChange}
              error={
                formik.touched.accountNumber &&
                Boolean(formik.errors.accountNumber)
              }
              helperText={
                formik.touched.accountNumber && formik.errors.accountNumber
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
              name="ifscCode"
              label="IFSC Code"
              size={isMobile ? "small" : "medium"}
              value={formik.values.ifscCode}
              onChange={formik.handleChange}
              error={formik.touched.ifscCode && Boolean(formik.errors.ifscCode)}
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
              helperText={formik.touched.ifscCode && formik.errors.ifscCode}
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

export default BecomeSellerFormStep3;
