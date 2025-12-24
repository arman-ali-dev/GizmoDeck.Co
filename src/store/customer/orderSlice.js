import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const checkoutOrder = createAsyncThunk(
  "order/checkoutOrder",
  async (addressId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");
      const res = await axios.post(
        "https://gizmodeckco-server-production.up.railway.app/api/orders/checkout",
        { addressId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data;
    } catch (err) {
      console.log(err);

      return rejectWithValue(err.response.data);
    }
  }
);

export const getUserOrders = createAsyncThunk(
  "order/getUserOrders",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");

      const res = await axios.get(
        "https://gizmodeckco-server-production.up.railway.app/api/orders/user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(
        err.response?.data || { message: "Failed to fetch orders" }
      );
    }
  }
);

export const getOrderItem = createAsyncThunk(
  "order/getOrderItem",
  async ({ orderId, orderItemId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");

      const res = await axios.get(
        `https://gizmodeckco-server-production.up.railway.app/api/orders/${orderId}/${orderItemId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data;
    } catch (err) {
      console.log("order details: ", err);

      return rejectWithValue(
        err.response?.data || { message: "Failed to load order item" }
      );
    }
  }
);

export const cancelOrder = createAsyncThunk(
  "order/cancelOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");

      await axios.put(
        `https://gizmodeckco-server-production.up.railway.app/api/orders/${orderId}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return { orderId };
    } catch (err) {
      console.log("Cancel Order Error: ", err);
      return rejectWithValue(
        err.response?.data || { message: "Failed to cancel order" }
      );
    }
  }
);

export const directOrderCheckout = createAsyncThunk(
  "order/directOrderCheckout",
  async (
    { productId, variantId, quantity, addressId },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("jwt");

      const res = await axios.post(
        "https://gizmodeckco-server-production.up.railway.app/api/orders/direct",
        {
          productId,
          variantId,
          quantity,
          addressId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data;
    } catch (err) {
      console.log("Direct Order Error: ", err);
      return rejectWithValue(
        err.response?.data || { message: "Failed to create direct order" }
      );
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    sessionUrl: null,
    error: null,

    orders: null,
    ordersLoading: false,
    ordersError: null,

    orderItem: null,
    orderItemLoading: false,
    orderItemError: null,

    orderCancelLoading: false,
  },

  extraReducers: (builder) => {
    builder
      // CHECKOUT
      .addCase(checkoutOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(checkoutOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.sessionUrl = action.payload.sessionUrl;
      })

      .addCase(checkoutOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
      });

    // GET USER ORDERS
    builder
      .addCase(getUserOrders.pending, (state) => {
        state.ordersLoading = true;
        state.ordersError = null;
      })

      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.ordersLoading = false;
        state.orders = action.payload;
      })

      .addCase(getUserOrders.rejected, (state, action) => {
        state.ordersLoading = false;
        state.ordersError = action.payload?.message || "Failed to load orders";
      });

    // GET ORDER DETAILS
    builder
      .addCase(getOrderItem.pending, (state) => {
        state.orderItemLoading = true;
        state.orderItemError = null;
      })
      .addCase(getOrderItem.fulfilled, (state, action) => {
        state.orderItemLoading = false;
        state.orderItem = action.payload;
      })
      .addCase(getOrderItem.rejected, (state, action) => {
        state.orderItemLoading = false;
        state.orderItemError =
          action.payload?.message || "Something went wrong";
      })

      // CANCEL ORDER
      .addCase(cancelOrder.pending, (state) => {
        state.orderCancelLoading = true;
      })

      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.orderCancelLoading = false;

        const { orderId } = action.payload;

        state.orders = state.orders.map((o) =>
          o.id === orderId ? { ...o, orderStatus: "CANCELLED" } : o
        );

        if (state.orderItem && state.orderItem.order.id === orderId) {
          state.orderItem = {
            ...state.orderItem,
            order: {
              ...state.orderItem.order,
              orderStatus: "CANCELLED",
            },
          };
        }
      })

      .addCase(cancelOrder.rejected, (state) => {
        state.orderCancelLoading = false;
      })

      // DIRECT ORDER CHECKOUT
      .addCase(directOrderCheckout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(directOrderCheckout.fulfilled, (state, action) => {
        state.loading = false;
        state.sessionUrl = action.payload.sessionUrl;
      })

      .addCase(directOrderCheckout.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to place order directly";
      });
  },
});

export default orderSlice.reducer;
