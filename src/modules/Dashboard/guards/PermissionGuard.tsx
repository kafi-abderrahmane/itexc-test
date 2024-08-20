// PermissionGuard.tsx
import React from "react";

export interface PermissionGuardProps {
  permissions: string[]; // The permission required to access the route
  children: React.ReactNode; // The protected content
}

const PermissionGuard: React.FC<PermissionGuardProps> = ({
  permissions,
  children,
}) => {
  return <>{children}</>;
};

export default PermissionGuard;
