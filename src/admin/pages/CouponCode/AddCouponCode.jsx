import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Button,
  CircularProgress,
  TextField,
  Select,
  MenuItem,
  useTheme,
  useMediaQuery,
} from "@mui/material";

const AddCouponCode = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      code: "",
      discountType: "",
      discountValue: "",
      minOrderAmount: "",
      startDate: null,
      endDate: null,
      usageLimit: "",
    },

    validationSchema: Yup.object({
      code: Yup.string()
        .trim()
        .required("Coupon code is required")
        .min(3, "Code must be at least 3 characters"),
      discountType: Yup.string().required("Discount type is required"),
      discountValue: Yup.number()
        .required("Discount value is required")
        .positive("Must be a positive number"),
      minOrderAmount: Yup.number()
        .required("Minimum order amount is required")
        .positive("Must be a positive number"),
      startDate: Yup.date().required("Start date is required"),
      endDate: Yup.date()
        .required("End date is required")
        .min(Yup.ref("startDate"), "End date must be after start date"),
      usageLimit: Yup.number()
        .required("Usage limit is required")
        .integer("Must be a whole number")
        .positive("Must be positive"),
    }),

    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        const payload = {
          code: values.code,
          discountType: values.discountType,
          discountValue: values.discountValue,
          minOrderAmount: values.minOrderAmount,
          startDate: dayjs(values.startDate).toISOString(),
          endDate: dayjs(values.endDate).toISOString(),
          usageLimit: values.usageLimit,
        };

        const res = await axios.post(
          "https://gizmodeckco-server-production.up.railway.app/api/admin/coupons/create",
          payload,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          }
        );

        toast.success("Coupon created successfully!", { autoClose: 1500 });
        resetForm();
      } catch (err) {
        const errorMessage =
          err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          "Something went wrong!";

        console.log("Error:", errorMessage);

        toast.error(errorMessage, { autoClose: 1500 });
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="space-y-4 lg:p-4">
        <div className="flex gap-5">
          <TextField
            fullWidth
            name="code"
            label="Code *"
            value={formik.values.code}
            onChange={formik.handleChange}
            error={formik.touched.code && Boolean(formik.errors.code)}
            helperText={formik.touched.code && formik.errors.code}
            size={isMobile ? "small" : "medium"}
          />

          <Select
            fullWidth
            name="discountType"
            value={formik.values.discountType}
            onChange={formik.handleChange}
            displayEmpty
            renderValue={(selected) =>
              selected ? (
                selected
              ) : (
                <span style={{ color: "#666666" }}>Discount Type *</span>
              )
            }
            error={
              formik.touched.discountType && Boolean(formik.errors.discountType)
            }
            sx={{
              fontSize: { xs: "13px", md: "14px" },
              height: isMobile ? 38 : 53,
            }}
          >
            <MenuItem value="FIXED_AMOUNT">Fixed Amount</MenuItem>
            <MenuItem value="PERCENTAGE">Percentage</MenuItem>
          </Select>

          {formik.touched.discountType && formik.errors.discountType && (
            <p className="text-red-500 text-xs mt-1 pl-1">
              {formik.errors.discountType}
            </p>
          )}
        </div>

        <div className="flex gap-5">
          <TextField
            fullWidth
            name="discountValue"
            label="Discount Value *"
            type="number"
            value={formik.values.discountValue}
            onChange={formik.handleChange}
            error={
              formik.touched.discountValue &&
              Boolean(formik.errors.discountValue)
            }
            helperText={
              formik.touched.discountValue && formik.errors.discountValue
            }
            size={isMobile ? "small" : "medium"}
          />

          <TextField
            fullWidth
            name="minOrderAmount"
            label="Min. Order Amount *"
            type="number"
            value={formik.values.minOrderAmount}
            onChange={formik.handleChange}
            error={
              formik.touched.minOrderAmount &&
              Boolean(formik.errors.minOrderAmount)
            }
            helperText={
              formik.touched.minOrderAmount && formik.errors.minOrderAmount
            }
            size={isMobile ? "small" : "medium"}
          />
        </div>

        <div className="flex gap-5">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date *"
              value={formik.values.startDate}
              onChange={(newValue) =>
                formik.setFieldValue("startDate", newValue)
              }
              slotProps={{
                textField: {
                  fullWidth: true,
                  error:
                    formik.touched.startDate &&
                    Boolean(formik.errors.startDate),
                  helperText:
                    formik.touched.startDate && formik.errors.startDate,
                  size: isMobile ? "small" : "medium",
                },
              }}
            />
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="End Date *"
              value={formik.values.endDate}
              onChange={(newValue) => formik.setFieldValue("endDate", newValue)}
              slotProps={{
                textField: {
                  fullWidth: true,
                  error:
                    formik.touched.endDate && Boolean(formik.errors.endDate),
                  helperText: formik.touched.endDate && formik.errors.endDate,
                  size: isMobile ? "small" : "medium",
                },
              }}
            />
          </LocalizationProvider>
        </div>

        <TextField
          fullWidth
          name="usageLimit"
          label="Usage Limit *"
          type="number"
          value={formik.values.usageLimit}
          onChange={formik.handleChange}
          error={formik.touched.usageLimit && Boolean(formik.errors.usageLimit)}
          helperText={formik.touched.usageLimit && formik.errors.usageLimit}
          size={isMobile ? "small" : "medium"}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
          sx={{
            textTransform: "capitalize",
            background: "#000",
            marginTop: { xs: 2, md: 5 },
            paddingY: { xs: 1, md: 1.5 },
            height: "48px",
          }}
        >
          {loading ? (
            <CircularProgress size={22} sx={{ color: "white" }} />
          ) : (
            <span className="font-medium lg:text-[14px] text-[12px]">
              Add Coupon
            </span>
          )}
        </Button>
      </form>
    </div>
  );
};

export default AddCouponCode;
