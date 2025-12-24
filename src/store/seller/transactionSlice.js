import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// GET ALL TRANSACTIONS FOR SELLER
export const fetchSellerTransaction = createAsyncThunk(
  "sellerTransaction/fetchSellerTransactions",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");
      const { data } = await axios.get(
        "gizmodeckco-server-production.up.railway.app/api/seller/transactions/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("seller transactions: ", data);

      return data;
    } catch (error) {
      console.log("seller transactions: ", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to load seller transactions"
      );
    }
  }
);

const sellerTransactionSlice = createSlice({
  name: "sellerTransactions",
  initialState: {
    transactions: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    // Fetch Transactions
    builder
      .addCase(fetchSellerTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchSellerTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default sellerTransactionSlice.reducer;
