import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const fetchCoupons = createAsyncThunk(
  "coupons/fetchCoupons",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");
      const { data } = await axios.get(
        "https://gizmodeck-co-server2.onrender.com/api/admin/coupons/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const deleteCoupon = createAsyncThunk(
  "coupons/deleteCoupon",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");

      const res = await axios.delete(
        `https://gizmodeck-co-server2.onrender.com/api/admin/coupons/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete coupon"
      );
    }
  }
);

const initialState = {
  coupons: [],
  loading: false,
  deletingId: null,
  error: null,
};

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    upsertCoupon: (state, action) => {
      const newCoupon = action.payload;
      const index = state.coupons.findIndex((c) => c.id === newCoupon.id);

      if (index !== -1) {
        state.coupons[index] = newCoupon;
      } else {
        state.coupons.push(newCoupon);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoupons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoupons.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons = action.payload;
      })
      .addCase(fetchCoupons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Coupon
      .addCase(deleteCoupon.pending, (state, action) => {
        state.deletingId = action.meta.arg;
      })
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.deletingId = null;
        state.coupons = state.coupons.filter((c) => c.id !== action.payload);
        toast.success("Coupon deleted successfully!", { autoClose: 1500 });
      })
      .addCase(deleteCoupon.rejected, (state, action) => {
        state.deletingId = null;
        state.error = action.payload;
        toast.error(
          typeof action.payload === "string" ? action.payload : "Delete failed",
          { autoClose: 1500 }
        );
      });
  },
});

export default couponSlice.reducer;
export const { upsertCoupon } = couponSlice.actions;
