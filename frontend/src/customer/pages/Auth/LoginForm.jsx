import { useFormik } from "formik";
import React, { useState } from "react";
import { Button, TextField, useMediaQuery, useTheme } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { MuiOtpInput } from "mui-one-time-password-input";

const LoginForm = () => {
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
      role: "CUSTOMER",
    },

    onSubmit: async (values) => {},
  });

  const [otp, setOtp] = useState("");

  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  return (
    <>
      <div className="px-5  ">
        <h1 className="text-center font-bold lg:text-2xl text-xl  pb-4">
          Login
        </h1>

        <div className="lg:space-y-5 space-y-3">
          <div>
            <TextField
              fullWidth
              value={formik.values.email}
              onChange={formik.handleChange}
              id="outlined-basic"
              label="Email"
              variant="outlined"
              size={isMobile ? "small" : "medium"}
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
          <p className="font-medium lg:text-sm text-[12px] opacity-50 mb-0.5 lg:mb-1.5">
            Enter OTP Sent To Your Email
          </p>
          <MuiOtpInput
            value={otp}
            onChange={handleChange}
            length={6}
            TextFieldsProps={{
              size: "small",
              sx: {
                width: "52px",
                height: { xs: "52px", md: "60px" },
                "& input": {
                  textAlign: "center",
                  fontSize: "19px",
                  padding: { xs: "8px", md: "10px" },
                },
              },
            }}
          />

          <div className="space-y-3">
            <div>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  py: { xs: "8px", md: "11px" },
                  textTransform: "capitalize",
                  background: "#000",
                }}
                disabled={otpSent}
              >
                {otpSent ? (
                  <CircularProgress size={22} sx={{ color: "#fff" }} />
                ) : (
                  <span className="font-medium text-[13px] lg:text-[14px]">
                    {" "}
                    Send OTP
                  </span>
                )}
              </Button>
            </div>
            <Button
              onClick={formik.handleSubmit}
              fullWidth
              variant="contained"
              sx={{
                py: { xs: "8px", md: "11px" },
                textTransform: "capitalize",
                background: "#000",
              }}
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress size={22} sx={{ color: "#fff" }} />
              ) : (
                <span className="font-medium text-[13px] lg:text-[14px]">
                  {" "}
                  Login{" "}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
