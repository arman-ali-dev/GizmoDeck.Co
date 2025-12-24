import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// ADD REVIEW
export const addReview = createAsyncThunk(
  "review/addReview",
  async ({ productId, rating, comment, images }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");
      const { data } = await axios.post(
        `https://gizmodeckco-server-production.up.railway.app/api/product/reviews/add/${productId}`,
        { ratingValue: rating, comment, images },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Review added!", { autoClose: 1500 });

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const fetchProductReviews = createAsyncThunk(
  "review/fetchProductReviews",
  async (productId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");
      const { data } = await axios.get(
        `https://gizmodeckco-server-production.up.railway.app/api/product/reviews/all/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(data);

      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const deleteReview = createAsyncThunk(
  "review/deleteReview",
  async (reviewId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");

      await axios.delete(
        `https://gizmodeckco-server-production.up.railway.app/api/product/reviews/delete/${reviewId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Review deleted!", { autoClose: 1500 });

      return reviewId; // return removed ID
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState: {
    loading: false,
    reviews: [],
    error: null,
    deletingId: null,
  },

  reducers: {
    resetReviewState: (state) => {
      state.loading = false;
      state.error = null;
      state.reviews = [];
    },
  },

  extraReducers: (builder) => {
    builder
      // ADD REVIEW
      .addCase(addReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.reviews = [action.payload, ...state.reviews];
      })
      .addCase(addReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH PRODUCT REVIEWS
      .addCase(fetchProductReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.reviews = action.payload; // set full reviews list
      })
      .addCase(fetchProductReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE REVIEW
      .addCase(deleteReview.pending, (state, action) => {
        state.deletingId = action.meta.arg;
      })

      .addCase(deleteReview.fulfilled, (state, action) => {
        state.deletingId = null;
        state.reviews = state.reviews.filter(
          (review) => review.id !== action.payload
        );
      })

      .addCase(deleteReview.rejected, (state) => {
        state.deletingId = null;
      });
  },
});

export const { resetReviewState } = reviewSlice.actions;
export default reviewSlice.reducer;
