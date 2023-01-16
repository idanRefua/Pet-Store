import { createSlice } from "@reduxjs/toolkit";

const authState = {
  isLoggedIn: localStorage.getItem("token") ? true : false,
  userInfo: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState: authState,
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
    updateUserInfo(state, action) {
      state.userInfo = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
