import { Box, Button, TextField, useMediaQuery, useTheme } from "@mui/material";
import React from "react";

const BecomeSellerFormStep2 = ({ formik }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <Box>
        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <div>
            <div>
              <TextField
                fullWidth
                name="name"
                label="Name"
                size={isMobile ? "small" : "medium"}
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.state && formik.errors.name}
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

          <div className="flex gap-4">
            <div className="flex-1">
              <TextField
                fullWidth
                name="mobile"
                size={isMobile ? "small" : "medium"}
                label="Mobile"
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
            <div className="flex-1">
              <TextField
                fullWidth
                name="pinCode"
                label="Pincode"
                size={isMobile ? "small" : "medium"}
                value={formik.values.pinCode}
                onChange={formik.handleChange}
                error={formik.touched.pinCode && Boolean(formik.errors.pinCode)}
                helperText={formik.touched.pinCode && formik.errors.pinCode}
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

          <div>
            <div>
              <TextField
                fullWidth
                name="address"
                label="Address"
                size={isMobile ? "small" : "medium"}
                value={formik.values.address}
                onChange={formik.handleChange}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
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
          <div>
            <div>
              <TextField
                fullWidth
                name="locality"
                label="Locality"
                size={isMobile ? "small" : "medium"}
                value={formik.values.locality}
                onChange={formik.handleChange}
                error={
                  formik.touched.locality && Boolean(formik.errors.locality)
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
                helperText={formik.touched.locality && formik.errors.locality}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <TextField
                fullWidth
                name="city"
                label="City"
                size={isMobile ? "small" : "medium"}
                value={formik.values.city}
                onChange={formik.handleChange}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
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

            <div className="flex-1">
              <TextField
                fullWidth
                name="state"
                label="State"
                size={isMobile ? "small" : "medium"}
                value={formik.values.state}
                onChange={formik.handleChange}
                error={formik.touched.state && Boolean(formik.errors.state)}
                helperText={formik.touched.state && formik.errors.state}
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
        </form>
      </Box>
    </>
  );
};

export default BecomeSellerFormStep2;
