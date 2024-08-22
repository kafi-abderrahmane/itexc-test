import React, { createContext, useContext, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { auth } from "@/configs/firebase-config";
import { onIdTokenChanged } from "firebase/auth";
import { clearUser, updateToken } from "@/store/user/reducer";

import { UserState } from "@/store/types";
import { RootState } from "@/store";

// Define the shape of the authentication context
interface AuthContextType {
  user: UserState | null;
  isAuthenticated: "loading" | boolean;
  permissions: string[];
}

// Create the authentication context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define a custom hook to access the authentication context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Define the AuthProviderProps type
interface AuthProviderProps {
  children: React.ReactNode;
}

// Create the AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [isAuthenticated, setIsAuthenticated] = useState<"loading" | boolean>(
    "loading"
  );

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      if (user) {
        setIsAuthenticated(true);
        const token = await user.getIdToken();
        dispatch(
          updateToken({
            token: token || "",
          })
        );
      } else {
        setIsAuthenticated(false);
        clearUser();
      }
    });

    return () => unsubscribe();
  }, []);

  const [permissions, setPermissions] = useState([]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        permissions,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
