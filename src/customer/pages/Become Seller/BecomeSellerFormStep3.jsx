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
              name="bankDetails.accountNumber"
              label="Account Number"
              size={isMobile ? "small" : "medium"}
              value={formik.values.bankDetails?.accountNumber}
              onChange={formik.handleChange}
              error={
                formik.touched.bankDetails?.accountNumber &&
                Boolean(formik.errors.bankDetails?.accountNumber)
              }
              helperText={
                formik.touched.bankDetails?.accountNumber &&
                formik.errors.bankDetails?.accountNumber
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
              name="bankDetails.ifscCode"
              label="IFSC Code"
              size={isMobile ? "small" : "medium"}
              value={formik.values.bankDetails?.ifscCode}
              onChange={formik.handleChange}
              error={
                formik.touched.bankDetails?.ifscCode &&
                Boolean(formik.errors.bankDetails?.ifscCode)
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
                formik.touched.bankDetails?.ifscCode &&
                formik.errors.bankDetails?.ifscCode
              }
            />
          </div>

          <div>
            <TextField
              fullWidth
              name="bankDetails.accountHolderName"
              label="Account Holder Name"
              size={isMobile ? "small" : "medium"}
              value={formik.values.bankDetails?.accountHolderName}
              onChange={formik.handleChange}
              error={
                formik.touched.bankDetails?.accountHolderName &&
                Boolean(formik.errors.bankDetails?.accountHolderName)
              }
              helperText={
                formik.touched.bankDetails?.accountHolderName &&
                formik.errors.bankDetails?.accountHolderName
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
