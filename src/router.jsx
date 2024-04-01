import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Dashboard from "./pages/Dashboard";
import Organizations from "./pages/Organizations/Index";
import OrganizationCreate from "./pages/Organizations/Create";
import Contacts from "./pages/Contacts/Index";
import Reports from "./pages/Reports/Index";

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
        path: "/contacts",
        element: <Contacts />,
      },
      {
        path: "/reports",
        element: <Reports />,
      },
    ],
  },
]);

export default router;
