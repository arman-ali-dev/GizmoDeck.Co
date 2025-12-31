import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");
      const { data } = await axios.get(
        "https://gizmodeckco-server-production.up.railway.app/api/products/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("products data", data);
      return data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchFeaturedProducts = createAsyncThunk(
  "products/fetchFeaturedProducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        "https://gizmodeckco-server-production.up.railway.app/api/products/all/featured"
      );

      console.log("products data", data);
      return data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchBestSellerProducts = createAsyncThunk(
  "products/fetchBestSellerProducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        "https://gizmodeckco-server-production.up.railway.app/api/products/all/best-seller"
      );

      return data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchProductDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async (productId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");
      const { data } = await axios.get(
        `https://gizmodeckco-server-production.up.railway.app/api/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchSimilarProducts = createAsyncThunk(
  "products/fetchSimilarProducts",
  async (productId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");
      const { data } = await axios.get(
        `https://gizmodeckco-server-production.up.railway.app/api/products/${productId}/similar`,
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

export const searchProducts = createAsyncThunk(
  "products/searchProducts",
  async (query, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");
      const { data } = await axios.get(
        `https://gizmodeckco-server-production.up.railway.app/api/products/search?keyword=${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(data);

      return data;
    } catch (err) {
      console.log(err);

      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const sortProducts = createAsyncThunk(
  "products/sortProducts",
  async ({ sortBy, ascending }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");
      const { data } = await axios.get(
        `https://gizmodeckco-server-production.up.railway.app/api/products/sort?sortBy=${sortBy}&ascending=${ascending}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchFilters = createAsyncThunk(
  "products/fetchFilters",
  async (categoryId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");
      const { data } = await axios.get(
        `https://gizmodeckco-server-production.up.railway.app/api/products/filters?categoryId=${categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const filterProducts = createAsyncThunk(
  "products/filterProducts",
  async (filters, { rejectWithValue }) => {
    try {
      console.log("sending filters ==> ", filters);

      const token = localStorage.getItem("jwt");

      const { data } = await axios.post(
        "https://gizmodeckco-server-production.up.railway.app/api/products/filter",
        filters,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(data);

      return data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchProductsByCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");

      const { data } = await axios.get(
        `https://gizmodeckco-server-production.up.railway.app/api/products/categories/${categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("products by category", data);

      return data;
    } catch (err) {
      console.log("products by category", err);
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const initialState = {
  products: [],
  featuredProducts: [],
  bestSellerProducts: [],

  loadingProducts: false,
  loadingBestSeller: false,
  loadingFeatured: false,

  errorProducts: null,
  errorFeatured: null,
  errorBestSeller: null,

  productDetails: null,
  loadingProductDetails: false,
  errorProductDetails: null,

  similarProducts: [],
  loadingSimilarProducts: false,
  errorSimilarProducts: null,

  searchResults: [],
  loadingSearch: false,
  errorSearch: null,

  filters: null,
  loadingFilters: false,
  errorFilters: null,

  filteredProducts: [],
  loadingFiltered: false,
  errorFiltered: null,

  categoryProducts: [],
  loadingCategoryProducts: false,
  errorCategoryProducts: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearProductDetails: (state) => {
      state.productDetails = null;
      state.errorProductDetails = null;
      state.loadingProductDetails = false;
    },
    clearSearchedProducts: (state) => {
      state.searchResults = [];
      state.loadingSearch = false;
      state.errorSearch = null;
    },
    clearFilters: (state) => {
      state.filters = null;
      state.loadingFilters = false;
      state.errorFilters = null;
    },
    clearFilteredProduct: (state) => {
      state.filteredProducts = [];
      state.loadingFiltered = false;
      state.errorFiltered = null;
    },
    sortProducts: (state, action) => {
      const { sortBy, ascending } = action.payload;

      // decide active list
      const list =
        state.filteredProducts.length > 0
          ? state.filteredProducts
          : state.searchResults;

      list.sort((a, b) => {
        if (ascending) {
          return a[sortBy] - b[sortBy];
        }
        return b[sortBy] - a[sortBy];
      });
    },
  },
  extraReducers: (builder) => {
    builder
      // All Products
      .addCase(fetchProducts.pending, (state) => {
        state.loadingProducts = true;
        state.errorProducts = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loadingProducts = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loadingProducts = false;
        state.errorProducts = action.payload;
      })

      // Featured Products
      .addCase(fetchFeaturedProducts.pending, (state) => {
        state.loadingFeatured = true;
        state.errorFeatured = null;
      })
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        state.loadingFeatured = false;
        state.featuredProducts = action.payload;
      })
      .addCase(fetchFeaturedProducts.rejected, (state, action) => {
        state.loadingFeatured = false;
        state.errorFeatured = action.payload;
      })

      // Featured Products
      .addCase(fetchBestSellerProducts.pending, (state) => {
        state.loadingBestSeller = true;
        state.errorBestSeller = null;
      })
      .addCase(fetchBestSellerProducts.fulfilled, (state, action) => {
        state.loadingBestSeller = false;
        state.bestSellerProducts = action.payload;
      })
      .addCase(fetchBestSellerProducts.rejected, (state, action) => {
        state.loadingBestSeller = false;
        state.errorBestSeller = action.payload;
      })

      // Product Details
      .addCase(fetchProductDetails.pending, (state) => {
        state.loadingProductDetails = true;
        state.errorProductDetails = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loadingProductDetails = false;
        state.productDetails = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loadingProductDetails = false;
        state.errorProductDetails = action.payload;
      })

      // Similar Products
      .addCase(fetchSimilarProducts.pending, (state) => {
        state.loadingSimilarProducts = true;
        state.errorSimilarProducts = null;
      })
      .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
        state.loadingSimilarProducts = false;
        state.similarProducts = action.payload;
      })
      .addCase(fetchSimilarProducts.rejected, (state, action) => {
        state.loadingSimilarProducts = false;
        state.errorSimilarProducts = action.payload;
      });

    // Search Products
    builder
      .addCase(searchProducts.pending, (state) => {
        state.loadingSearch = true;
        state.errorSearch = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loadingSearch = false;
        state.searchResults = action.payload;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loadingSearch = false;
        state.errorSearch = action.payload;
      })

      // Sort Products
      .addCase(sortProducts.pending, (state) => {
        state.loadingSearch = true;
      })
      .addCase(sortProducts.fulfilled, (state, action) => {
        state.loadingSearch = false;
        state.searchResults = action.payload;
      })
      .addCase(sortProducts.rejected, (state, action) => {
        state.loadingSearch = false;
      })

      // Fetch Filters
      .addCase(fetchFilters.pending, (state) => {
        state.loadingFilters = true;
        state.errorFilters = null;
      })
      .addCase(fetchFilters.fulfilled, (state, action) => {
        state.loadingFilters = false;
        state.filters = action.payload;
      })
      .addCase(fetchFilters.rejected, (state, action) => {
        state.loadingFilters = false;
        state.errorFilters = action.payload;
      })

      // Filter Products
      .addCase(filterProducts.pending, (state) => {
        state.loadingFiltered = true;
        state.errorFiltered = null;
      })
      .addCase(filterProducts.fulfilled, (state, action) => {
        state.loadingFiltered = false;
        state.filteredProducts = action.payload;
      })
      .addCase(filterProducts.rejected, (state, action) => {
        state.loadingFiltered = false;
        state.errorFiltered = action.payload;
      })

      // Fetch Category Wise Products
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loadingCategoryProducts = true;
        state.errorCategoryProducts = null;

        state.filteredProducts = [];
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loadingCategoryProducts = false;
        state.categoryProducts = action.payload;
        state.searchResults = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loadingCategoryProducts = false;
        state.errorCategoryProducts = action.payload;
      });
  },
});

export default productSlice.reducer;
export const {
  clearProductDetails,
  clearFilters,
  clearSearchedProducts,
  clearFilteredProduct,
  sortProducts,
} = productSlice.actions;
