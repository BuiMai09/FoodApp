import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  firstName: "",
  image: "",
  lastName: "",
  _id: "",
  token: ""
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRedux: (state, action) => {
      console.log("action data", action.payload.user);
      state._id = action.payload.user._id;
      state.firstName = action.payload.user.firstName;
      state.lastName = action.payload.user.lastName;
      state.email = action.payload.user.email;
      state.image = action.payload.user.image;
      state.token = action.payload.token;

    },
    logoutRedux: (state, action) => {
      state._id = "";
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.image = "";
      state.token = ""
    },
  },
});

export const { loginRedux, logoutRedux } = userSlice.actions;

export default userSlice.reducer;
