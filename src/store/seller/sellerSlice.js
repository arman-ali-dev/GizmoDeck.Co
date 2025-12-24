import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// GET SELLER PROFILE
export const fetchSellerProfile = createAsyncThunk(
  "seller/fetchSellerProfile",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");
      const { data } = await axios.get(
        "gizmodeckco-server-production.up.railway.app/api/seller/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("seller : ", data);

      return data;
    } catch (error) {
      console.log("seller : ", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to load seller"
      );
    }
  }
);

const sellerSlice = createSlice({
  name: "seller",
  initialState: {
    seller: null,
    loading: false,
    error: null,
  },

  reducers: {
    setSeller: (state, action) => {
      state.seller = action.payload;
    },
  },

  extraReducers: (builder) => {
    // Fetch Seller Profile
    builder
      .addCase(fetchSellerProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.seller = action.payload;
      })
      .addCase(fetchSellerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default sellerSlice.reducer;
export const { setSeller } = sellerSlice.actions;
