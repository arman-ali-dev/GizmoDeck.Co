import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// ADD ITEM TO CART
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (productData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");
      const { data } = await axios.post(
        "https://gizmodeck-co-server2.onrender.com/api/carts/items/add",
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Item added to cart ✔", { autoClose: 1500 });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// FETCH CART
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");

      const { data } = await axios.get(
        "https://gizmodeck-co-server2.onrender.com/api/carts",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load cart"
      );
    }
  }
);

// REMOVE ITEM FROM CART
export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (cartItemId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");

      const res = await axios.delete(
        `https://gizmodeck-co-server2.onrender.com/api/carts/items/remove/${cartItemId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log(res);

      return cartItemId;
    } catch (error) {
      console.log(error);

      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ itemId, quantity }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");

      const { data } = await axios.put(
        `https://gizmodeck-co-server2.onrender.com/api/carts/item/${itemId}/quantity?quantity=${quantity}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("updated Item", data);

      return data;
    } catch (err) {
      console.log("Occur error during update quantity of item: ", err);

      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);

export const applyCoupon = createAsyncThunk(
  "cart/applyCoupon",
  async (couponCode, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");

      const { data } = await axios.post(
        `https://gizmodeck-co-server2.onrender.com/api/coupons/apply-coupon?code=${couponCode}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Coupon applied successfully!", { autoClose: 1500 });

      return data; // updated cart
    } catch (error) {
      toast.error("Invalid coupon", {
        autoClose: 1500,
      });

      return rejectWithValue(
        error.response?.data?.message || "Invalid coupon code"
      );
    }
  }
);

const calculateTotals = (state) => {
  let totalItems = 0;
  let subTotal = 0;
  let totalPrice = 0;

  state.cart.cartItems.forEach((item) => {
    totalItems += item.quantity;

    subTotal += item.variant.mrpPrice * item.quantity;
    totalPrice += item.totalPrice;
  });

  state.cart.totalItems = totalItems;
  state.cart.subTotal = subTotal;
  state.cart.totalPrice = totalPrice;

  state.cart.discount = subTotal - totalPrice;
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: {
      cartItems: [],
      totalItems: 0,
      totalPrice: 0,
      subTotal: 0,
      discount: 0,
    },
    addLoading: false,
    deleteItemId: null,
    updatingItemId: null,
    loading: false,
    error: null,
    applyCouponLoading: false,
  },

  extraReducers: (builder) => {
    builder
      // ADD ITEM
      .addCase(addToCart.pending, (state) => {
        state.addLoading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.addLoading = false;

        const newItem = action.payload;

        const existingItem = state.cart.cartItems.find(
          (item) =>
            item.product.id == newItem.product.id &&
            item.variant.id == newItem.variant.id
        );

        if (existingItem) {
          existingItem.quantity = newItem.quantity;
          existingItem.totalPrice = newItem.totalPrice;
          existingItem.updatedAt = newItem.updatedAt;
        } else {
          state.cart.cartItems.unshift(newItem);
        }

        calculateTotals(state);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.addLoading = false;
        state.error = action.payload;
      })

      // FETCH CART
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // REMOVE ITEM
      .addCase(removeCartItem.pending, (state, action) => {
        state.deleteItemId = action.meta.arg;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        const id = action.meta.arg;

        state.cart.cartItems = state.cart.cartItems.filter(
          (item) => item.id !== id
        );

        state.deleteItemId = null;

        calculateTotals(state);
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.deleteItemId = null;
        state.error = action.payload;
      })

      // UPDATE QUANTITY
      .addCase(updateCartQuantity.pending, (state, action) => {
        state.updatingItemId = action.meta.arg.itemId;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        const updatedItem = action.payload;

        const item = state.cart.cartItems.find((i) => i.id === updatedItem.id);

        if (item) {
          item.quantity = updatedItem.quantity;
          item.totalPrice = updatedItem.totalPrice;
          item.updatedAt = updatedItem.updatedAt;
        }

        state.updatingItemId = null;

        calculateTotals(state);
      })
      .addCase(updateCartQuantity.rejected, (state) => {
        state.updatingItemId = null;
      })

      .addCase(applyCoupon.pending, (state) => {
        state.applyCouponLoading = true;
      })
      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.applyCouponLoading = false;
        state.cart = action.payload; // full updated cart returned
      })
      .addCase(applyCoupon.rejected, (state, action) => {
        state.applyCouponLoading = false;
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
