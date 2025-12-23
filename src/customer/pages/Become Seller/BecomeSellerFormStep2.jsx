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
                name="pickupAddress.name"
                label="Name"
                size={isMobile ? "small" : "medium"}
                value={formik.values.pickupAddress.name}
                onChange={formik.handleChange}
                error={
                  formik.touched.pickupAddress?.name &&
                  Boolean(formik.errors.pickupAddress?.name)
                }
                helperText={
                  formik.touched.pickupAddress?.name &&
                  formik.errors.pickupAddress?.name
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

          <div className="flex gap-4">
            <div className="flex-1">
              <TextField
                fullWidth
                name="pickupAddress.phoneNumber"
                size={isMobile ? "small" : "medium"}
                label="Mobile"
                value={formik.values.pickupAddress?.phoneNumber}
                onChange={formik.handleChange}
                error={
                  formik.touched.pickupAddress?.phoneNumber &&
                  Boolean(formik.errors.pickupAddress?.phoneNumber)
                }
                helperText={
                  formik.touched.pickupAddress?.phoneNumber &&
                  formik.errors.pickupAddress?.phoneNumber
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
            <div className="flex-1">
              <TextField
                fullWidth
                name="pickupAddress.pincode"
                label="Pincode"
                size={isMobile ? "small" : "medium"}
                value={formik.values.pickupAddress?.pincode}
                onChange={formik.handleChange}
                error={
                  formik.touched.pickupAddress?.pincode &&
                  Boolean(formik.errors.pickupAddress?.pincode)
                }
                helperText={
                  formik.touched.pickupAddress?.pincode &&
                  formik.errors.pickupAddress?.pincode
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

          <div>
            <div>
              <TextField
                fullWidth
                name="pickupAddress.address"
                label="Address"
                size={isMobile ? "small" : "medium"}
                value={formik.values.pickupAddress?.address}
                onChange={formik.handleChange}
                error={
                  formik.touched.pickupAddress?.address &&
                  Boolean(formik.errors.pickupAddress?.address)
                }
                helperText={
                  formik.touched.pickupAddress?.address &&
                  formik.errors.pickupAddress?.address
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
          <div>
            <div>
              <TextField
                fullWidth
                name="pickupAddress.locality"
                label="Locality"
                size={isMobile ? "small" : "medium"}
                value={formik.values.pickupAddress?.locality}
                onChange={formik.handleChange}
                error={
                  formik.touched.pickupAddress?.locality &&
                  Boolean(formik.errors.pickupAddress?.locality)
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
                  formik.touched.pickupAddress?.locality &&
                  formik.errors.pickupAddress?.locality
                }
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <TextField
                fullWidth
                name="pickupAddress.city"
                label="City"
                size={isMobile ? "small" : "medium"}
                value={formik.values.pickupAddress?.city}
                onChange={formik.handleChange}
                error={
                  formik.touched.pickupAddress?.city &&
                  Boolean(formik.errors.pickupAddress?.city)
                }
                helperText={
                  formik.touched.pickupAddress?.city &&
                  formik.errors.pickupAddress?.city
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

            <div className="flex-1">
              <TextField
                fullWidth
                name="pickupAddress.state"
                label="State"
                size={isMobile ? "small" : "medium"}
                value={formik.values.pickupAddress?.state}
                onChange={formik.handleChange}
                error={
                  formik.touched.pickupAddress?.state &&
                  Boolean(formik.errors.pickupAddress?.state)
                }
                helperText={
                  formik.touched.pickupAddress?.state &&
                  formik.errors.pickupAddress?.state
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
        </form>
      </Box>
    </>
  );
};

export default BecomeSellerFormStep2;
