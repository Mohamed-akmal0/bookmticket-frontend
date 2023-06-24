import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clientData: {},
  isLoading: false,
  isLoggedIn: false,
  jwtToken: "",
};

export const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    setClientData: (state, action) => {
      state.clientData = action.payload;
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

export const { setClientData, setIsLoading, setJwtToken, setIsLoggedIn } =
clientSlice.actions;
export default clientSlice.reducer;
