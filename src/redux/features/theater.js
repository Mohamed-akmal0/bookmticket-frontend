import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 theater: []
};

export const theaterSlice = createSlice({
  name: "theater",
  initialState,
  reducers: {
    setTheater: (state, action) => {
      state.theater = action.payload;
    },
  },
});

export const { setTheater } =
theaterSlice.actions;
export default theaterSlice.reducer;
