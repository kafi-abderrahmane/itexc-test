export interface UserState {
  uid: string;
  emailVerified: boolean;
  email: string;
  phoneNumber: string;
  fullname: string;
  token: string;
  refreshToken: string;
  isConnected: "loading" | boolean;
  rememberMe: boolean;
}
