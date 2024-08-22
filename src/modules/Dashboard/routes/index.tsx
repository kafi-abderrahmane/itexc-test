import AuthGuard from "../guards/AuthGuard";
import PermissionGuard from "../guards/PermissionGuard";
import Loadable from "@/components/Loading/Loadable";

import React, { lazy } from "react";

const MainLayout = Loadable(lazy(() => import("../layouts/MainLayout")));

//pages
const HomePage = Loadable(lazy(() => import("../pages/HomePage/")));

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
          element: <HomePage />,
          permissions: [],
        }),
      },
    ],
  },
];
