import Helmet from "react-helmet";
import { NavLink, Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <Helmet titleTemplate="%s - Ping CRM" title="Dashboard" />
      <nav>
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/organizations">Organizations</NavLink>
        <NavLink to="/contacts">Contacts</NavLink>
        <NavLink to="/reports">Reports</NavLink>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default App;
