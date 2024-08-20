// AuthGuard.tsx
import React from "react";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  return <>{children}</>;
};

export default AuthGuard;
