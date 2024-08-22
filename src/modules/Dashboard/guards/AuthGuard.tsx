import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthProvider";
import LoadingPage from "@/components/Loading/LoadingPage";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) navigate("/sign-in");
  }, [isAuthenticated]);

  if (isAuthenticated === "loading") return <LoadingPage />;
  return <>{children}</>;
};

export default AuthGuard;
