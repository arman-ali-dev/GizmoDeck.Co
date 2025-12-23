import { Box, TextField, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { MuiOtpInput } from "mui-one-time-password-input";

const BecomeSellerFormStep1 = ({ formik }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box>
      <p className="text-xl font-bold text-center pb-9">Contact Details</p>

      <div className="space-y-7">
        <div>
          <TextField
            fullWidth
            name="email"
            label="Email"
            variant="outlined"
            size={isMobile ? "small" : "medium"}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
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
              sx: { fontSize: { xs: "13px", md: "16px" } },
            }}
          />
        </div>
        <div>
          <TextField
            fullWidth
            name="gstin"
            label="GSTIN"
            variant="outlined"
            size={isMobile ? "small" : "medium"}
            value={formik.values.gstin}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.gstin && Boolean(formik.errors.gstin)}
            helperText={formik.touched.gstin && formik.errors.gstin}
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
              sx: { fontSize: { xs: "13px", md: "16px" } },
            }}
          />
        </div>
      </div>
    </Box>
  );
};

export default BecomeSellerFormStep1;
