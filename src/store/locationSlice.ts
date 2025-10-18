import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LocationState {
  defaultCity: string;
}

const initialState: LocationState = {
  defaultCity: "London",
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setDefaultCity: (state, action: PayloadAction<string>) => {
      state.defaultCity = action.payload;
    },
  },
});

export const { setDefaultCity } = locationSlice.actions;
export default locationSlice.reducer;
