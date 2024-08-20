import AuthGuard from "../guards/AuthGuard";
import { PermissionGuardProps } from "../guards/PermissionGuard";

import React, { lazy } from "react";

const MainLayout = lazy(() => import("../layouts/MainLayout"));

const PermissionGuard = lazy(() => import("../guards/PermissionGuard"));

//pages
const HomePage = lazy(() => import("../pages/HomePage/"));

type RenderElementType = {
  element: React.ReactNode | null;
  permissions?: string[];
};

const renderElement = ({
  element,
  permissions,
}: RenderElementType): JSX.Element => {
  return permissions?.length ? (
    <PermissionGuard permissions={permissions}>{element}</PermissionGuard>
  ) : (
    <>{element}</>
  );
};

export const dashboardRoutes = [
  {
    path: "/",
    element: (
      <AuthGuard>
        <MainLayout />
      </AuthGuard>
    ),
    children: [
      {
        index: true,
        title: "statistiques",
        element: renderElement({
          element: (
            <div>
              <HomePage />
            </div>
          ),
          permissions: [],
        }),
      },
    ],
  },
];
