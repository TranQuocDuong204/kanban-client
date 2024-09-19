import { createSlice } from "@reduxjs/toolkit"
const initialState = {
  token: "",
  _id: "",
  name: "",
  rule: 0
}
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addAuth: (state, action) => {
      state.token = action.payload.token;
      state._id = action.payload._id;
      state.name = action.payload.name;
      state.rule = action.payload.rule;
      localStorage.setItem("auth", JSON.stringify(action.payload))
    },
    // eslint-disable-next-line no-unused-vars
    removeAuth: (state, action) => {
      state.token = "";
      state._id = "";
      state.name = "";
      state.rule = 0;
      localStorage.removeItem("auth")
    }
  },
})

// Action creators are generated for each case reducer function
export const { addAuth, removeAuth } = authSlice.actions

export default authSlice.reducer