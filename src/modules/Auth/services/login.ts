import { signInWithEmailAndPassword, User } from "firebase/auth";
import { auth } from "@/configs/firebase-config";

interface LoginParams {
  email: string;
  password: string;
}
interface LoginResponse {
  data: User | null;
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
