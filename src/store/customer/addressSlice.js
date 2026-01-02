import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const addAddress = createAsyncThunk(
  "address/addAddress",
  async (addressData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");

      const { data } = await axios.post(
        "https://gizmodeck-co-server2.onrender.com/api/addresses/add",
        addressData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Address added successfully!", { autoClose: 1500 });

      return data;
    } catch (error) {
      console.log(error);

      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const fetchAddresses = createAsyncThunk(
  "address/getAddresses",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");

      const { data } = await axios.get(
        "https://gizmodeck-co-server2.onrender.com/api/addresses/all/user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data;
    } catch (error) {
      console.log(error);

      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async (updatedData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");

      const { data } = await axios.put(
        `https://gizmodeck-co-server2.onrender.com/api/addresses/${updatedData?.id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Address updated successfully!", { autoClose: 1500 });

      return data; // updated address object
    } catch (error) {
      return rejectWithValue(error.response?.data || "Update failed");
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "address/delete",
  async (addressId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");

      const { data } = await axios.delete(
        `https://gizmodeck-co-server2.onrender.com/api/addresses/${addressId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Address deleted successfully!", { autoClose: 1500 });

      return addressId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState: {
    addresses: [],
    AddLoading: false,
    UpdateLoading: false,
    deleteLoading: false,
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      // ADD ADDRESS
      .addCase(addAddress.pending, (state) => {
        state.AddLoading = true;
        state.error = null;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.AddLoading = false;
        state.addresses = [action.payload, ...state.addresses];
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.AddLoading = false;
        state.error = action.payload;
      })

      // FETCH ADDRESSES
      .addCase(fetchAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload;
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE ADDRESS
      .addCase(updateAddress.pending, (state) => {
        state.UpdateLoading = true;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.UpdateLoading = false;
        const index = state.addresses.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) state.addresses[index] = action.payload;
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.UpdateLoading = false;
        state.error = action.payload;
      })

      // DELETE ADDRESS
      .addCase(deleteAddress.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.deleteLoading = false;

        state.addresses = state.addresses.filter(
          (addr) => addr.id !== action.payload
        );
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload;
      });
  },
});

export default addressSlice.reducer;
