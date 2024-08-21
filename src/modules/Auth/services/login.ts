import {
  signInWithEmailAndPassword,
  User,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, providerGoogle, providerFb } from "@/configs/firebase-config";

interface LoginParams {
  email: string;
  password: string;
}
interface LoginResponse {
  data: User | null;
  error: Error | null;
}
interface LogoutResponse {
  data: any | null;
  error: Error | null;
}
export const Login = async (values: LoginParams): Promise<LoginResponse> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      values?.email,
      values?.password
    );
    // Signed up
    const user = userCredential.user;

    return { data: user, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
};

export const signInGoogle = async (): Promise<LoginResponse> => {
  try {
    const userCredential = await signInWithPopup(auth, providerGoogle);

    const user = userCredential.user;

    return { data: user, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
};

export const signInFb = async (): Promise<LoginResponse> => {
  try {
    const userCredential = await signInWithPopup(auth, providerFb);

    const user = userCredential.user;

    return { data: user, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
};

export const logout = async (): Promise<LogoutResponse> => {
  try {
    const response = await signOut(auth);

    return { data: response, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
};
