import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  openLoginDialog: boolean;
  openSignupDialog: boolean;
}

const initialState: CounterState = { openLoginDialog: false, openSignupDialog: false };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleLoginDialogState: (state) => {
      state.openLoginDialog = !state.openLoginDialog;
    },
    toggleSignupDialogState: (state) => {
      state.openSignupDialog = !state.openSignupDialog;
    },
  },
});

export const { toggleLoginDialogState, toggleSignupDialogState } = authSlice.actions;
export default authSlice.reducer;
