import DashboardHome from "Components/Dashboard/Home"

import { access } from "Providers/AccessProvider"
import { lazy } from "react"
import { Navigate, RouteObject } from "react-router-dom"

const Dashboard = lazy(() => import("./../Components/Dashboard"))
const Home = lazy(() => import("./../Components/Home"))

const Login = lazy(() => import("./../Components/Home/Login"))
const SignUp = lazy(() => import("./../Components/Home/SignUp"))
const ForgotPassword = lazy(() => import("./../Components/Home/ForgotPassword"))
const Settings = lazy(() => import("./../Components/Dashboard/Settings"))

const Routes = (access: access | null): RouteObject[] => {
  return [
    {
      path: "",
      element: access?.loggedIn ? <Navigate to="/dashboard" /> : <Home />,
      children: [
        {
          index: true,
          element: <Login />,
        },
        {
          path: "signup",
          element: <SignUp />,
        },
        {
          path: "forgot-password",
          element: <ForgotPassword />,
        },
      ],
    },
    {
      path: "dashboard",
      element: access?.loggedIn ? <Dashboard /> : <Navigate to="/" />,
      children: [
        { index: true, element: <DashboardHome /> },
        { path: "settings", element: <Settings /> },
      ],
    },
  ]
}
export default Routes
