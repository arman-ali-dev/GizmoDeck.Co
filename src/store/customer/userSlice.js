import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const fetchUserProfile = createAsyncThunk(
  "users/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");
      const { data } = await axios.get(
        "https://gizmodeckco-server-production.up.railway.app/api/users/profile",
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

export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async (payload, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");

      const { data } = await axios.put(
        "https://gizmodeckco-server-production.up.railway.app/api/users/update",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Profile updated successfully!", {
        autoClose: 1500,
      });
      return data;
    } catch (error) {
      console.log(error);

      return rejectWithValue(error.response?.data?.message || "Update failed");
    }
  }
);

const initialState = {
  user: null,
  loadingProfile: false,
  loadingUpdate: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("jwt");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loadingProfile = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loadingProfile = false;
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loadingProfile = false;
        state.error = action.payload;
      })

      // Update Profile
      .addCase(updateUserProfile.pending, (state) => {
        state.loadingUpdate = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loadingUpdate = false;
        state.user = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loadingUpdate = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
