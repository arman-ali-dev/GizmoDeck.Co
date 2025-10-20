import { Box, TextField, useMediaQuery, useTheme } from "@mui/material";
import React from "react";

const BecomeSellerFormStep1 = ({ formik }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <Box>
        <p className="text-xl font-bold text-center pb-9">Contact Details</p>
        <div className="space-y-7 ">
          <div>
            <TextField
              fullWidth
              name="mobile"
              label="Mobile"
              size={isMobile ? "small" : "medium"}
              value={formik.values.mobile}
              onChange={formik.handleChange}
              error={formik.touched.mobile && Boolean(formik.errors.mobile)}
              helperText={formik.touched.mobile && formik.errors.mobile}
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
              name="GSTIN"
              label="GSTIN"
              size={isMobile ? "small" : "medium"}
              value={formik.values.GSTIN}
              onChange={formik.handleChange}
              error={formik.touched.GSTIN && Boolean(formik.errors.GSTIN)}
              helperText={formik.touched.GSTIN && formik.errors.GSTIN}
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

export default BecomeSellerFormStep1;
