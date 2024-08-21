import {
  createUserWithEmailAndPassword,
  updateProfile,
  User,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "@/configs/firebase-config";

interface SignUpParams {
  fullName: string;
  email: string;
  password: string;
}
interface signUpResponse {
  data: User | null;
  error: Error | null;
}
export const signUp = async (values: SignUpParams): Promise<signUpResponse> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      values?.email,
      values?.password
    );
    // Signed up
    const user = userCredential.user;

    //send email
    await sendEmailVerification(user);

    // Update user profile with the full name
    await updateProfile(user, {
      displayName: values?.fullName,
    });

    return { data: user, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
};
