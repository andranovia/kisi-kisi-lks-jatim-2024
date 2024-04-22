import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import Login from "./pages/auth/login.tsx";
import Home from "./components/home/index.tsx";
import { useUserContextProvider as UserContextProvider } from "./components/context/UserContext.tsx";
import FormDetail from "./components/form/detail.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/form-detail/:slug",
    element: <FormDetail />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  </React.StrictMode>
);
