import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Dashboard from "./pages/Dashboard";
import Organizations from "./pages/Organizations";
import Contacts from "./pages/Contacts";
import Reports from "./pages/Reports";

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
