import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminData: {},
  isLoading: false,
  isLoggedIn: false,
  jwtToken: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAdminData: (state, action) => {
      state.adminData = action.payload;
    },
    setJwtToken: (state, action) => {
      state.jwtToken = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setAdminData, setIsLoading, setJwtToken, setIsLoggedIn } =
  authSlice.actions;
export default authSlice.reducer;
