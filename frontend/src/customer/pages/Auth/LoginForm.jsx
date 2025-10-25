import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, TextField, useMediaQuery, useTheme } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { MuiOtpInput } from "mui-one-time-password-input";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const naviagate = useNavigate();
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
      role: "CUSTOMER",
    },

    onSubmit: async (values) => {
      if (!values.email) {
        return toast.error("Enter Email!");
      }

      if (!/^\S+@\S+\.\S+$/.test(values.email)) {
        return toast.error("Enter a valid email!");
      }

      if (!values.otp) {
        return toast.error("Enter OTP!");
      }

      setIsLoading(true);

      try {
        const { data } = await axios.post(
          "http://localhost:8081/auth/login",
          values
        );

        localStorage.setItem("jwt", data.jwt);
        naviagate("/");
      } catch (error) {
        console.log(error);
        toast.error(
          error?.response?.data?.error ||
            error?.message ||
            "Something went wrong!",
          {
            autoClose: 1500,
          }
        );
      } finally {
        setIsLoading(false);
      }
    },
  });

  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [resendTimer]);

  const handleSendOtp = async () => {
    console.log(formik.values);

    try {
      if (!formik.values.email) {
        return toast.error("Enter Email!", {
          autoClose: 1500,
        });
      }

      if (!/^\S+@\S+\.\S+$/.test(formik.values.email)) {
        return toast.error("Enter a valid email!");
      }

      setOtpSent(true);
      setResendTimer(60);
      const res = await axios.post("http://localhost:8081/auth/send-otp", {
        email: "signin_" + formik.values.email,
        role: formik.values.role,
      });
    } catch (error) {
      toast.error(
        error?.response?.data?.error ||
          error?.message ||
          "Something went wrong!",
        {
          autoClose: 1500,
        }
      );

      setResendTimer(0);
    } finally {
      setOtpSent(false);
    }
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
              name="email"
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
            name="otp"
            value={formik.values.otp}
            onChange={(value) => formik.setFieldValue("otp", value)}
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
                onClick={handleSendOtp}
                variant="contained"
                sx={{
                  py: { xs: "8px", md: "11px" },
                  textTransform: "capitalize",
                  background: "#000",
                }}
                disabled={otpSent || resendTimer > 0}
              >
                {resendTimer > 0 ? (
                  <span className="font-medium text-[13px] lg:text-[14px]">
                    Resend OTP in {resendTimer}
                    <small>s</small>
                  </span>
                ) : otpSent ? (
                  <CircularProgress size={22} sx={{ color: "#fff" }} />
                ) : (
                  <span className="font-medium text-[13px] lg:text-[14px]">
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
              disabled={resendTimer === 0}
            >
              {isLoading ? (
                <CircularProgress size={22} sx={{ color: "#fff" }} />
              ) : (
                <span className="font-medium text-[13px] lg:text-[14px]">
                  Login
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
