import { MuiOtpInput } from "mui-one-time-password-input";
import React from "react";

const BecomeSellerFormStep5 = ({ formik }) => {
  return (
    <>
      <div className="flex justify-center">
        <div>
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

          {formik.touched.otp && formik.errors.otp && (
            <p style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
              {formik.errors.otp}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default BecomeSellerFormStep5;
