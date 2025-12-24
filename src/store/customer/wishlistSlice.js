import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addItemToWishlist = createAsyncThunk(
  "wishlist/addItem",
  async (productId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");

      const { data } = await axios.post(
        `https://gizmodeckco-server-production.up.railway.app/api/wishlist/add/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add item to wishlist"
      );
    }
  }
);

export const removeItemFromWishlist = createAsyncThunk(
  "wishlist/removeItem",
  async (wishlistItemId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");

      await axios.delete(
        `https://gizmodeckco-server-production.up.railway.app/api/wishlist/remove/${wishlistItemId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return wishlistItemId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove item from wishlist"
      );
    }
  }
);

export const fetchWishlistItems = createAsyncThunk(
  "wishlist/fetchItems",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");

      const { data } = await axios.get(
        "https://gizmodeckco-server-production.up.railway.app/api/wishlist",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load wishlist"
      );
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: [],
    addingItemId: null,
    removingItemId: null,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    // FETCH ITEMS
    builder
      .addCase(fetchWishlistItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlistItems.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload; // server se list set kar do
      })
      .addCase(fetchWishlistItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD ITEM
      .addCase(addItemToWishlist.pending, (state, action) => {
        state.addingItemId = action.meta.arg; // productId
      })
      .addCase(addItemToWishlist.fulfilled, (state, action) => {
        state.addingItemId = null;
        state.wishlist.wishlistItems = [
          action.payload,
          ...state.wishlist.wishlistItems,
        ];
      })
      .addCase(addItemToWishlist.rejected, (state) => {
        state.addingItemId = null;
      });

    // REMOVE ITEM
    builder
      .addCase(removeItemFromWishlist.pending, (state, action) => {
        state.removingItemId = action.meta.arg; // wishlistItemId
      })
      .addCase(removeItemFromWishlist.fulfilled, (state, action) => {
        state.removingItemId = null;
        state.wishlist.wishlistItems = state.wishlist.wishlistItems.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(removeItemFromWishlist.rejected, (state) => {
        state.removingItemId = null;
      });
  },
});

export default wishlistSlice.reducer;
export const {} = wishlistSlice.actions;
