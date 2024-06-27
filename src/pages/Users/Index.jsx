import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import SearchFilter from "../../components/SearchFilter";
import { NavLink } from "react-router-dom";
import Icon from "../../components/Icon";
import useDebounce from "../../hooks/useDebounce";
import useUsers from "../../hooks/useUsers";

const Users = () => {
  const [filters, setFilters] = useState({ search: "", trashed: "", role: "" });
  const params = useDebounce({ filters });
  const [users, setUsers] = useState([]);
  const { data } = useUsers(params);
  useEffect(() => {
    if (data?.data) {
      setUsers(data.data);
    }
  }, [data]);

  const reset = () => setFilters({ search: "", trashed: "", role: "" });

  return (
    <>
      <Helmet title="Users" />
      <h1 className="mb-8 text-3xl font-bold">Users</h1>
      <div className="flex items-center justify-between mb-6">
        <SearchFilter
          className="mr-4 w-full max-w-md"
          modelValue={filters.search}
          reset={reset}
          onChange={(value) => setFilters({ ...filters, search: value })}
        >
          <label className="block text-gray-700">Role:</label>
          <select
            className="form-select mt-1 w-full"
            onInput={(e) => setFilters({ ...filters, role: e.target.value })}
            value={filters.role}
          >
            <option value="" />
            <option value="user">User</option>
            <option value="owner">Owner</option>
          </select>
          <label className="block mt-4 text-gray-700">Trashed:</label>
          <select
            className="form-select mt-1 w-full"
            onInput={(e) => setFilters({ ...filters, trashed: e.target.value })}
            value={filters.trashed}
          >
            <option value="" />
            <option value="with">With Trashed</option>
            <option value="only">Only Trashed</option>
          </select>
        </SearchFilter>
        <NavLink className="btn-indigo" to="/users/create">
          <span>Create</span>
          <span className="hidden md:inline">&nbsp;User</span>
        </NavLink>
      </div>
      <div className="bg-white rounded-md shadow overflow-x-auto">
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="text-left font-bold">
              <th className="pb-4 pt-6 px-6">Name</th>
              <th className="pb-4 pt-6 px-6">Email</th>
              <th className="pb-4 pt-6 px-6" colSpan="2">
                Role
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-100 focus-within:bg-gray-100"
              >
                <td className="border-t">
                  <NavLink
                    className="flex items-center px-6 py-4 focus:text-indigo-500"
                    to={`/users/${user.id}/edit`}
                  >
                    {user.photo && (
                      <img
                        className="block -my-2 mr-2 w-5 h-5 rounded-full"
                        src={user.photo}
                      ></img>
                    )}
                    {user.name}
                    {user.deleted_at && (
                      <Icon
                        name="trash"
                        className="flex-shrink-0 ml-2 w-3 h-3 fill-gray-400"
                      />
                    )}
                  </NavLink>
                </td>
                <td className="border-t">
                  <NavLink
                    className="flex items-center px-6 py-4"
                    to={`/users/${user.id}/edit`}
                    tabIndex={-1}
                  >
                    {user.email}
                  </NavLink>
                </td>
                <td className="border-t">
                  <NavLink
                    className="flex items-center px-6 py-4"
                    to={`/users/${user.id}/edit`}
                    tabIndex={-1}
                  >
                    {user.owner ? "Owner" : "User"}
                  </NavLink>
                </td>
                <td className="border-t">
                  <NavLink
                    className="flex items-center px-6 py-4"
                    to={`/users/${user.id}/edit`}
                    tabIndex={-1}
                  >
                    <Icon
                      name="cheveron-right"
                      className="block w-6 h-6 fill-gray-400"
                    />
                  </NavLink>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td className="px-6 py-4 border-t" colSpan={4}>
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Users;
