import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    jwt: "",
  },
  reducers: {
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setJwt: (state, action) => {
      state.jwt = action.payload;
    },
  },
});

export default authSlice.reducer;
export const { setAuthenticated, setJwt } = authSlice.actions;
