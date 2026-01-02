import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// GET ALL ORDERS FOR SELLER
export const fetchSellerOrders = createAsyncThunk(
  "sellerOrders/fetchSellerOrders",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");
      const { data } = await axios.get(
        "https://gizmodeck-co-server2.onrender.com/api/seller/orders/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("seller orders: ", data);

      return data;
    } catch (error) {
      console.log("seller orders: ", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to load seller orders"
      );
    }
  }
);

// UPDATE ORDER STATUS
export const updateOrderStatus = createAsyncThunk(
  "sellerOrders/updateOrderStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");
      const { data } = await axios.put(
        `https://gizmodeck-co-server2.onrender.com/api/seller/orders/${orderId}/status`,
        {},
        {
          params: { status },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("update order status", data);

      return data;
    } catch (error) {
      console.log("update order status", error);

      return rejectWithValue(
        error.response?.data?.message || "Failed to update order status"
      );
    }
  }
);

const sellerOrdersSlice = createSlice({
  name: "sellerOrders",
  initialState: {
    orders: [],
    loading: false,
    error: null,

    updateStatusLoading: false,
    updateStatusError: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    // Fetch Orders
    builder
      .addCase(fetchSellerOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchSellerOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE STATUS
      .addCase(updateOrderStatus.pending, (state) => {
        state.updateStatusLoading = true;
        state.updateStatusError = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.updateStatusLoading = false;

        // Replace updated order in list
        state.orders = state.orders.map((order) =>
          order.id === action.payload.id ? action.payload : order
        );
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.updateStatusLoading = false;
        state.updateStatusError = action.payload;
      });
  },
});

export default sellerOrdersSlice.reducer;
