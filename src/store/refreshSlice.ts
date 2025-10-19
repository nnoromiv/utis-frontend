import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IRefreshState {
  refresh: boolean;
}

const initialState: IRefreshState = {
  refresh: false,
};

const isDataRefreshedSlice = createSlice({
  name: "isDataRefreshed",
  initialState,
  reducers: {
    setIsDataRefreshed: (state, action: PayloadAction<boolean>) => {
      state.refresh = action.payload;
    },
  },
});

export const { setIsDataRefreshed } = isDataRefreshedSlice.actions;
export default isDataRefreshedSlice.reducer;
