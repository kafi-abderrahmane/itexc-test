import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UserState } from "@/store/types";

const initialState: UserState = {
  uid: "",
  emailVerified: false,
  email: "",
  phoneNumber: "",
  fullname: "",
  token: "",
  refreshToken: "",

  rememberMe: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.uid = action.payload.uid;
      state.emailVerified = action.payload.emailVerified;
      state.email = action.payload.email;
      state.phoneNumber = action.payload.phoneNumber;
      state.fullname = action.payload.fullname;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.rememberMe = action.payload.rememberMe;
    },
    updateToken: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
    },
    updateEmailAndFullname: (
      state,
      action: PayloadAction<{ email: string; fullname: string }>
    ) => {
      state.email = action.payload.email;
      state.fullname = action.payload.fullname;
    },
    clearUser: (state) => {
      state.uid = "";
      state.emailVerified = false;
      state.email = "";
      state.phoneNumber = "";
      state.fullname = "";
      state.token = "";
      state.refreshToken = "";
      state.rememberMe = false;
    },
  },
});

export const { setUser, clearUser, updateToken, updateEmailAndFullname } =
  userSlice.actions;

export default userSlice.reducer;
