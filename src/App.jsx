import { Helmet } from "react-helmet-async";
import { NavLink, Outlet } from "react-router-dom";
import Logo from "./components/Logo";
import Icon from "./components/Icon";
import Dropdown from "./components/Dropdown";
import MainMenu from "./components/MainMenu";

const App = () => {
  return (
    <>
      <Helmet titleTemplate="%s - Ping CRM" title="Dashboard" />

      <div id="dropdown" />
      <main>
        <div className="md:flex md:flex-col">
          <div className="md:flex md:flex-col md:h-screen">
            <div className="md:flex md:flex-shrink-0">
              <div className="flex items-center justify-between px-6 py-4 bg-indigo-900 md:flex-shrink-0 md:justify-center md:w-56">
                <NavLink to="/">
                  <Logo className="fill-white" width="120" height="28" />
                </NavLink>
                <Dropdown
                  dropdownButton={
                    <svg
                      className="w-6 h-6 fill-white md:hidden"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                  }
                >
                  <MainMenu className="mt-2 px-8 py-4 bg-indigo-800 rounded shadow-lg" />
                </Dropdown>
              </div>
              <div className="md:text-md flex items-center justify-between p-4 w-full text-sm bg-white border-b md:px-12 md:py-0">
                <div className="mr-4 mt-1">Acme Corporation</div>
                <Dropdown
                  dropdownButton={
                    <div className="group flex items-center cursor-pointer select-none">
                      <div className="mr-1 text-gray-700 group-hover:text-indigo-600 focus:text-indigo-600 whitespace-nowrap">
                        <span>John</span>
                        <span className="hidden md:inline">&nbsp;Doe</span>
                      </div>
                      <Icon
                        className="w-5 h-5 fill-gray-700 group-hover:fill-indigo-600 focus:fill-indigo-600"
                        name="cheveron-down"
                      />
                    </div>
                  }
                >
                  <div className="mt-2 py-2 text-sm bg-white rounded shadow-xl">
                    <NavLink
                      className="block px-6 py-2 hover:text-white hover:bg-indigo-500"
                      to={`/users/1/edit`}
                    >
                      My Profile
                    </NavLink>
                    <NavLink
                      className="block px-6 py-2 hover:text-white hover:bg-indigo-500"
                      to="/users"
                    >
                      Manage Users
                    </NavLink>
                    <NavLink
                      className="block px-6 py-2 w-full text-left hover:text-white hover:bg-indigo-500"
                      to="#"
                    >
                      Logout
                    </NavLink>
                  </div>
                </Dropdown>
              </div>
            </div>
            <div className="md:flex md:flex-grow md:overflow-hidden">
              <MainMenu className="hidden flex-shrink-0 p-12 w-56 bg-indigo-800 overflow-y-auto md:block" />
              <div className="px-4 py-8 md:flex-1 md:p-12 md:overflow-y-auto">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default App;
