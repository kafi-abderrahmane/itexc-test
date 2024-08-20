import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface NonAuthGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
}

const NonAuthGuard: React.FC<NonAuthGuardProps> = ({
  children,
  redirectTo = "/",
}) => {
  const navigate = useNavigate();

  return <>{children}</>;
};

export default NonAuthGuard;
