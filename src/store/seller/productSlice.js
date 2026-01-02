import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// GET ALL PRODUCTS FOR SELLER
export const fetchSellerProducts = createAsyncThunk(
  "sellerOrders/fetchSellerOrders",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");
      const { data } = await axios.get(
        "https://gizmodeck-co-server2.onrender.com/api/seller/products/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load seller products"
      );
    }
  }
);

export const createSellerProduct = createAsyncThunk(
  "sellerProducts/createSellerProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");

      const { data } = await axios.post(
        "https://gizmodeck-co-server2.onrender.com/api/seller/products/create",
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data;
    } catch (error) {
      console.log("seller product: ", error);

      return rejectWithValue(
        error.response?.data?.message || "Failed to rceate product"
      );
    }
  }
);

export const deleteSellerProduct = createAsyncThunk(
  "sellerProducts/deleteSellerProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");
      const { data } = await axios.delete(
        `https://gizmodeck-co-server2.onrender.com/api/seller/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Product deleted successfully!", { autoClose: 1200 });

      return productId;
    } catch (error) {
      toast.error("Failed to delete product", { autoClose: 1200 });
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete product"
      );
    }
  }
);

const sellerProductsSlice = createSlice({
  name: "sellerProduct",
  initialState: {
    products: [],
    loading: false,
    error: null,

    addProductLoading: false,

    deletingProductId: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    // Fetch Orders
    builder
      .addCase(fetchSellerProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchSellerProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE PRODUCT
      .addCase(createSellerProduct.pending, (state) => {
        state.addProductLoading = true;
        state.error = null;
      })
      .addCase(createSellerProduct.fulfilled, (state, action) => {
        state.addProductLoading = false;
        state.createdProduct = action.payload;
        state.products = [action.payload, ...state.products];
      })
      .addCase(createSellerProduct.rejected, (state, action) => {
        state.addProductLoading = false;
        state.error = action.payload;
      });

    // DELETE PRODUCT
    builder
      .addCase(deleteSellerProduct.pending, (state, action) => {
        state.deletingProductid = action.meta.arg;
      })
      .addCase(deleteSellerProduct.fulfilled, (state, action) => {
        const id = action.payload;
        state.products = state.products.filter((p) => p.id !== id);
        delete state.deletingProductId;
      })
      .addCase(deleteSellerProduct.rejected, (state, action) => {
        const id = action.meta.arg;
        delete state.deletingProductId;
        state.error = action.payload;
      });
  },
});

export default sellerProductsSlice.reducer;
