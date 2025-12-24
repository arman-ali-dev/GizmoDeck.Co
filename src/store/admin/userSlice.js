import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk(
  "adminUser/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");
      const { data } = await axios.get(
        "https://gizmodeckco-server-production.up.railway.app/api/admin/users/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data;
    } catch (err) {
      console.log("admin users: ", err);
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const initialState = {
  users: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "adminUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
