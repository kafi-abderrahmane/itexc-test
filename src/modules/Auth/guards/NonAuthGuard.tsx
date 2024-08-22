import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthProvider";
import LoadingPage from "@/components/Loading/LoadingPage";

interface NonAuthGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
}

const NonAuthGuard: React.FC<NonAuthGuardProps> = ({
  children,
  redirectTo = "/",
}) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated === true) navigate(redirectTo);
  }, [isAuthenticated]);

  if (isAuthenticated === "loading") return <LoadingPage />;
  return <>{children}</>;
};

export default NonAuthGuard;
