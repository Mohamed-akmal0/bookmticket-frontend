import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theater: [],
  BlockedTheater: [],
};

export const theaterSlice = createSlice({
  name: "theater",
  initialState,
  reducers: {
    setTheater: (state, action) => {
      state.theater = action.payload;
    },
    setBlockedTheater: (state, action) => {
        state.BlockedTheater = action.payload;
    }
  },
});

export const { setTheater, setBlockedTheater } = theaterSlice.actions;
export default theaterSlice.reducer;
