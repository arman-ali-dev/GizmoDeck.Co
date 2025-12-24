import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        "https://gizmodeckco-server-production.up.railway.app/api/categories/all"
      );

      console.log("c", data);

      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");

      console.log("Thunk triggered for delete:", id);

      const res = await axios.delete(
        `https://gizmodeckco-server-production.up.railway.app/api/admin/categories/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete category"
      );
    }
  }
);

export const fetchSubcategories = createAsyncThunk(
  "categories/fetchSubcategories",
  async (categoryId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");

      const { data } = await axios.get(
        `https://gizmodeckco-server-production.up.railway.app/api/categories/${categoryId}/sub`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Sub Categories", data);

      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const initialState = {
  categories: [],
  deletingId: null,
  loading: false,
  error: null,

  subcategories: [],
  loadingSub: false,
  errorSub: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    upsertCategory: (state, action) => {
      const newCategory = action.payload;
      const index = state.categories.findIndex(
        (cat) => cat.id === newCategory.id
      );

      if (index !== -1) {
        state.categories[index] = newCategory;
      } else {
        state.categories.push(newCategory);
      }
    },

    clearSubCategories: (state, action) => {
      (state.subcategories = []),
        (state.loadingSub = false),
        (state.errorSub = null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Category
      .addCase(deleteCategory.pending, (state, action) => {
        state.deletingId = action.meta.arg;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.deletingId = null;
        state.categories = state.categories.filter(
          (cat) => cat.id !== action.payload
        );
        toast.success("Category deleted successfully!", { autoClose: 1500 });
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.deletingId = null;
        state.error = action.payload;
        toast.error(
          typeof action.payload === "string" ? action.payload : "Delete failed",
          { autoClose: 1500 }
        );
      })

      // Fetch Subcategories
      .addCase(fetchSubcategories.pending, (state) => {
        state.loadingSub = true;
        state.errorSub = null;
      })
      .addCase(fetchSubcategories.fulfilled, (state, action) => {
        state.loadingSub = false;
        state.subcategories = action.payload;
      })
      .addCase(fetchSubcategories.rejected, (state, action) => {
        state.loadingSub = false;
        state.errorSub = action.payload;
      });
  },
});

export default categorySlice.reducer;
export const { upsertCategory, clearSubCategories } = categorySlice.actions;
