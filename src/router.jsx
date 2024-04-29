import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Dashboard from "./pages/Dashboard";
import Organizations from "./pages/Organizations/Index";
import OrganizationCreate from "./pages/Organizations/Create";
import OrganizationEdit from "./pages/Organizations/Edit";
import Contacts from "./pages/Contacts/Index";
import ContactCreate from "./pages/Contacts/Create";
import ContactEdit from "./pages/Contacts/Edit";
import Reports from "./pages/Reports/Index";
import Users from "./pages/Users/Index";
import UserEdit from "./pages/Users/Edit";
import UserCreate from "./pages/Users/Create";
import Login from "./pages/Auth/Login";
import NotFound from "./pages/NotFound/Index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "/organizations",
        element: <Organizations />,
      },
      {
        path: "/organizations/create",
        element: <OrganizationCreate />,
      },
      {
        path: "/organizations/:id/edit",
        element: <OrganizationEdit />,
      },
      {
        path: "/contacts",
        element: <Contacts />,
      },
      {
        path: "/contacts/create",
        element: <ContactCreate />,
      },
      {
        path: "/contacts/:id/edit",
        element: <ContactEdit />,
      },
      {
        path: "/reports",
        element: <Reports />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/users/create",
        element: <UserCreate />,
      },
      {
        path: "/users/:id/edit",
        element: <UserEdit />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
