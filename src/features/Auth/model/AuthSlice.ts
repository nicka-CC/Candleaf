import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  token: "",
};
export const authSlice = createSlice({
  name: "userReducer",
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload.user;
    },
    resetUser(state) {
      state.user = {};
    },
    setToken(state, action) {
      state.token = action.payload.token;
    },
    resetToken(state) {
      state.token = "";
    },
  },
});

export const { setUser, setToken, resetUser, resetToken } = authSlice.actions;
export default authSlice.reducer;
