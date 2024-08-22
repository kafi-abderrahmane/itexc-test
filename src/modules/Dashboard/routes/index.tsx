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
        title: "dashboard",
        element: renderElement({
          element: <HomePage />,
          permissions: [],
        }),
      },
      {
        path: "patients",
        index: true,
        title: "patients",
        element: renderElement({
          element: <div>patients</div>,
          permissions: [],
        }),
      },
      {
        path: "messages",
        index: true,
        title: "messages",
        element: renderElement({
          element: <div>messages</div>,
          permissions: [],
        }),
      },
      {
        path: "appointment",
        index: true,
        title: "appointment",
        element: renderElement({
          element: <div>appointment</div>,
          permissions: [],
        }),
      },
      {
        path: "history",
        index: true,
        title: "history",
        element: renderElement({
          element: <div>history</div>,
          permissions: [],
        }),
      },
    ],
  },
];
