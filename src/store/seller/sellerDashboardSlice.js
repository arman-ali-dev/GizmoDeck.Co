import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSellerDashboard = createAsyncThunk(
  "sellerDashboard/fetchDashboard",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");
      const { data } = await axios.get(
        "gizmodeckco-server-production.up.railway.app/api/seller/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("seller dashboard: ", data);

      return data;
    } catch (err) {
      console.log("seller dashboard: ", err);
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const initialState = {
  dashboard: null,
  loading: false,
  error: null,
};

const sellerDashboardSlice = createSlice({
  name: "sellerDashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellerDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboard = action.payload;
      })
      .addCase(fetchSellerDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default sellerDashboardSlice.reducer;
