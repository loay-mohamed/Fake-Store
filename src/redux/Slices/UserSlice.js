import { createSlice } from "@reduxjs/toolkit";
const storedToken = localStorage.getItem("token");
const initialState = {
  user: null,
  token: storedToken,
};

const userSlice  = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);

    },
    
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;