import {
  Button,
  CircularProgress,
  Step,
  StepLabel,
  Stepper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import BecomeSellerFormStep1 from "./BecomeSellerFormStep1";
import BecomeSellerFormStep2 from "./BecomeSellerFormStep2";
import BecomeSellerFormStep3 from "./BecomeSellerFormStep3";
import BecomeSellerFormStep4 from "./BecomeSellerFormStep4";
import BecomeSellerFormStep5 from "./BecomeSellerFormStep5";

import get from "lodash.get";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const steps = [
  "Tax Details & Email",
  "Pickup Address",
  "Bank Details",
  "Business Details",
  "Verification",
];
const stepFields = [
  ["email", "gstin"],

  [
    "pickupAddress.name",
    "pickupAddress.phoneNumber",
    "pickupAddress.pincode",
    "pickupAddress.address",
    "pickupAddress.locality",
    "pickupAddress.city",
    "pickupAddress.state",
  ],

  [
    "bankDetails.accountNumber",
    "bankDetails.ifscCode",
    "bankDetails.accountHolderName",
  ],

  [
    "businessDetails.businessName",
    "businessDetails.businessEmail",
    "businessDetails.businessMobileNumber",
    "businessDetails.businessAddress",
  ],

  ["otp"],
];

const SellerAccountForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [loading, setLoading] = useState(false);
  const [verifyOtpLoading, setVerifyOtpLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      // Step 1
      email: "",
      gstin: "",

      // Step 2
      pickupAddress: {
        name: "",
        phoneNumber: "",
        pincode: "",
        address: "",
        locality: "",
        city: "",
        state: "",
      },

      // Step 3
      bankDetails: {
        accountNumber: "",
        ifscCode: "",
        accountHolderName: "",
      },

      // Step 4
      businessDetails: {
        businessName: "",
        businessEmail: "",
        businessMobileNumber: "",
        businessAddress: "",
      },
      otp: "",
    },

    validationSchema: Yup.object({
      // STEP 1
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),

      gstin: Yup.string()
        .matches(/^[0-9A-Z]{15}$/, "GSTIN must be 15 characters")
        .required("GSTIN is required"),

      // STEP 2
      pickupAddress: Yup.object({
        name: Yup.string().required("Name is required"),

        phoneNumber: Yup.string()
          .matches(/^[6-9]\d{9}$/, "Enter a valid mobile number")
          .required("Mobile number is required"),

        pincode: Yup.string()
          .matches(/^\d{6}$/, "Enter 6-digit pincode")
          .required("Pincode is required"),

        address: Yup.string().required("Address is required"),

        locality: Yup.string().required("Locality is required"),

        city: Yup.string().required("City is required"),

        state: Yup.string().required("State is required"),
      }),

      // STEP 3
      bankDetails: Yup.object({
        accountNumber: Yup.string()
          .matches(/^\d{9,18}$/, "Account number must be 9–18 digits")
          .required("Account number is required"),

        ifscCode: Yup.string()
          .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code")
          .required("IFSC is required"),

        accountHolderName: Yup.string().required(
          "Account holder name is required"
        ),
      }),

      // STEP 4
      businessDetails: Yup.object({
        businessName: Yup.string().required("Business name is required"),

        businessEmail: Yup.string()
          .email("Invalid email format")
          .required("Business email is required"),

        businessMobileNumber: Yup.string()
          .matches(/^[6-9]\d{9}$/, "Enter valid mobile number")
          .required("Business mobile number is required"),

        businessAddress: Yup.string().required("Business address is required"),
      }),

      otp: Yup.string().required("OTP is required"),
    }),
  });

  const handleStep = async (direction) => {
    const fieldsToValidate = stepFields[activeStep];

    fieldsToValidate.forEach((field) => {
      formik.setFieldTouched(field, true, true);
    });

    const errors = await formik.validateForm();

    const stepHasError = fieldsToValidate.some((field) => {
      const err = get(errors, field);
      return Boolean(err);
    });

    if (stepHasError) {
      console.log("Validation Failed");
      return;
    }

    if (activeStep === 3) {
      handleSubmit();
      return;
    }

    setActiveStep((prev) => prev + direction);
  };

  const handleSubmit = async () => {
    console.log("Formik Values", formik.values);

    setLoading(true);
    try {
      const token = localStorage.getItem("jwt");
      const { data } = await axios.post(
        "https://gizmodeckco-server-production.up.railway.app/api/seller/apply",
        formik.values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("seller data", data);
      toast.success("OTP Sent!", { autoClose: 1300 });
      setActiveStep((prev) => prev + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    console.log(formik.values.otp);

    setVerifyOtpLoading(true);
    try {
      const token = localStorage.getItem("jwt");
      const { data } = await axios.post(
        `https://gizmodeckco-server-production.up.railway.app/api/seller/verify-otp?otp=${formik.values.otp}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("verifyData", data);
      toast.success("Verification Successful!", { autoClose: 1300 });
      navigate("/login");
    } catch (error) {
      console.error(error);
    } finally {
      setVerifyOtpLoading(false);
    }
  };

  return (
    <div>
      <div className="w-full overflow-x-auto scrollbar-hide">
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{
            minWidth: "500px",
            "@media (max-width: 640px)": { minWidth: "100%" },
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel
                sx={{
                  "& .MuiStepLabel-label": {
                    fontSize: isMobile ? "11px" : "12px",
                    whiteSpace: "nowrap",
                  },
                  "& .MuiStepIcon-root": {
                    width: isMobile ? "25px" : "30px",
                    height: isMobile ? "25px" : "30px",
                  },
                  "& .MuiStepIcon-root.Mui-active": { color: "#000" },
                  "& .MuiStepIcon-root.Mui-completed": { color: "#000" },
                }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>

      <section className="lg:mt-20 mt-10 space-y-10 md:w-[450px] mx-auto">
        <div>
          {activeStep === 0 ? (
            <BecomeSellerFormStep1 formik={formik} />
          ) : activeStep === 1 ? (
            <BecomeSellerFormStep2 formik={formik} />
          ) : activeStep === 2 ? (
            <BecomeSellerFormStep3 formik={formik} />
          ) : activeStep === 3 ? (
            <BecomeSellerFormStep4 formik={formik} />
          ) : (
            <BecomeSellerFormStep5 formik={formik} />
          )}
        </div>

        <div className="flex items-center justify-between">
          <Button
            onClick={() => handleStep(-1)}
            variant="contained"
            disabled={activeStep === 0 || activeStep == 4}
            sx={{
              textTransform: "capitalize",
              background: "#000",
              fontSize: { xs: "13px", md: "14px" },
              "&.Mui-disabled": {
                background: "#ccc",
                color: "#666",
              },
            }}
          >
            Back
          </Button>

          <Button
            onClick={() => {
              if (activeStep === steps.length - 1) {
                verifyOtp(); //
              } else {
                handleStep(1);
              }
            }}
            disabled={loading || verifyOtpLoading}
            variant="contained"
            sx={{
              textTransform: "capitalize",
              background: "#000",
              fontSize: { xs: "13px", md: "14px" },
              height: "38px",
            }}
          >
            {loading || verifyOtpLoading ? (
              <CircularProgress color="white" size={14} />
            ) : (
              <>
                {activeStep === steps.length - 1
                  ? "Create Account"
                  : "Continue"}
              </>
            )}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default SellerAccountForm;
