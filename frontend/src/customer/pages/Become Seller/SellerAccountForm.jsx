import {
  Button,
  Step,
  StepLabel,
  Stepper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import BecomeSellerFormStep1 from "./BecomeSellerFormStep1";
import { useFormik } from "formik";
import * as Yup from "yup";
import BecomeSellerFormStep2 from "./BecomeSellerFormStep2";
import BecomeSellerFormStep3 from "./BecomeSellerFormStep3";
import BecomeSellerFormStep4 from "./BecomeSellerFormStep4";

const steps = [
  "Tax Details & Mobile",
  "Pickup Address",
  "Bank Details",
  "Supplier Details",
];

const SellerAccountForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // sm = 600px

  const formik = useFormik({
    initialValues: {
      mobile: "",
      otp: "",
      gstin: "",
      pickupAddress: {
        name: "",
        mobile: "",
        pincode: "",
        address: "",
        locality: "",
        city: "",
        state: "",
      },
      bankDetails: {
        accountNumber: "",
        ifscCode: "",
        accountHolderName: "",
      },
      sellerName: "",
      email: "",
      businessDetails: {
        businessName: "",
        businessEmail: "",
        businessMobile: "",
        logo: "",
        banner: "",
        businessAddress: "",
      },
      password: "",
    },

    onSubmit: (values) => {
      console.log("Form Submitted: ", values);
    },
  });

  const handleStep = (value) => {
    (activeStep < steps.length - 1 || (activeStep > 0 && value == -1)) &&
      setActiveStep(activeStep + value);
    console.log(activeStep);

    // activeStep = steps.length - 1 && handleCreateAccount();
  };

  return (
    <>
      <div>
        <div
          className="w-full overflow-x-auto scrollbar-hide" // horizontal scroll for small screens
        >
          <Stepper
            activeStep={activeStep}
            alternativeLabel
            sx={{
              minWidth: "500px", // to avoid shrink on small view
              "@media (max-width: 640px)": {
                minWidth: "100%", // fit mobile screen
              },
            }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel
                  sx={{
                    "& .MuiStepLabel-label": {
                      fontSize: isMobile ? "11px" : "12px",
                      whiteSpace: "nowrap", // prevent label wrapping
                    },
                    "& .MuiStepIcon-root": {
                      width: isMobile ? "25px" : "30px",
                      height: isMobile ? "25px" : "30px",
                    },
                    "& .MuiStepIcon-root.Mui-active": {
                      color: "#000",
                    },
                    "& .MuiStepIcon-root.Mui-completed": {
                      color: "#000",
                    },
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>
        <section className="lg:mt-20 mt-10 space-y-10">
          <div>
            {activeStep == 0 ? (
              <BecomeSellerFormStep1 formik={formik} />
            ) : activeStep == 1 ? (
              <BecomeSellerFormStep2 formik={formik} />
            ) : activeStep == 2 ? (
              <BecomeSellerFormStep3 formik={formik} />
            ) : (
              <BecomeSellerFormStep4 formik={formik} />
            )}
          </div>

          <div className="flex items-center justify-between">
            <Button
              onClick={() => handleStep(-1)}
              variant="contained"
              disabled={activeStep === 0}
              sx={{
                textTransform: "capitalize",
                background: "#000",
                fontSize: { xs: "13px", md: "14px" },
              }}
            >
              Back
            </Button>
            <Button
              onClick={() => handleStep(1)}
              variant="contained"
              sx={{
                textTransform: "capitalize",
                background: "#000",
                fontSize: { xs: "13px", md: "14px" },
              }}
              disabled={activeStep == steps.length}
            >
              {activeStep == steps.length - 1 ? "Create Account" : "Continue"}
            </Button>
          </div>
        </section>
      </div>
    </>
  );
};

export default SellerAccountForm;
