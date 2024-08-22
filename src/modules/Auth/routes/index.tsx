import NonAuthGuard from "../guards/NonAuthGuard";
import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";

import LoadingLinear from "@/components/Loading/LoadingLinear";

const Login = lazy(() => import("../pages/Login"));
const SignUp = lazy(() => import("../pages/SignUp"));
const ForgetPassword = lazy(() => import("../pages/ForgetPassword"));
const OtpVerification = lazy(() => import("../pages/OtpVerification"));

export const authRoutes = [
  {
    path: "/",
    element: (
      <NonAuthGuard redirectTo={"/"}>
        <Suspense fallback={<LoadingLinear />}>
          <Outlet />
        </Suspense>
      </NonAuthGuard>
    ),
    children: [
      {
        path: "sign-in",
        element: <Login />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "otp-verification",
        element: <OtpVerification />,
      },
    ],
  },
];
