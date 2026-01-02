import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSellers = createAsyncThunk(
  "adminSeller/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");
      const { data } = await axios.get(
        "https://gizmodeck-co-server2.onrender.com/api/admin/sellers/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("admin sellers: ", data);

      return data;
    } catch (err) {
      console.log("admin sellers: ", err);
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const initialState = {
  sellers: [],
  loading: false,
  error: null,
};

const sellerSlice = createSlice({
  name: "adminSeller",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellers.fulfilled, (state, action) => {
        state.loading = false;
        state.sellers = action.payload;
      })
      .addCase(fetchSellers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default sellerSlice.reducer;
