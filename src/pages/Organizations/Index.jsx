import { useState } from "react";
import { Helmet } from "react-helmet-async";
import SearchFilter from "../../components/SearchFilter";
import { NavLink } from "react-router-dom";
import Icon from "../../components/Icon";
import useOrganizations from "../../hooks/useOrganizations";
import useDebounce from "../../hooks/useDebounce";
import Pagination from "../../components/Pagination";

const Organizations = () => {
  const [filters, setFilters] = useState({ search: "", trashed: "" });
  const [page, setPage] = useState(1);
  const params = useDebounce({ filters, page });
  const { data, isLoading } = useOrganizations(params);

  const reset = () => {
    setFilters({ search: "", trashed: "" });
    setPage(1);
  };

  return (
    <>
      <Helmet title="Organizations" />
      <h1 className="mb-8 text-3xl font-bold">Organizations</h1>
      <div className="flex items-center justify-between mb-6">
        <SearchFilter
          className="mr-4 w-full max-w-md"
          modelValue={filters.search}
          reset={reset}
          onChange={(value) => {
            setFilters({ ...filters, search: value });
            setPage(1);
          }}
        >
          <label className="block text-gray-700">Trashed:</label>
          <select
            className="form-select mt-1 w-full"
            onInput={(e) => {
              setFilters({ ...filters, trashed: e.target.value });
              setPage(1);
            }}
            value={filters.trashed}
          >
            <option value="" />
            <option value="with">With Trashed</option>
            <option value="only">Only Trashed</option>
          </select>
        </SearchFilter>
        <NavLink className="btn-indigo" to="/organizations/create">
          <span>Create</span>
          <span className="hidden md:inline">&nbsp;Organization</span>
        </NavLink>
      </div>
      <div className="bg-white rounded-md shadow overflow-x-auto">
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="text-left font-bold">
              <th className="pb-4 pt-6 px-6">Name</th>
              <th className="pb-4 pt-6 px-6">City</th>
              <th className="pb-4 pt-6 px-6" colSpan="2">
                Phone
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td className="px-6 py-4 border-t" colSpan={4}>
                  Loading...
                </td>
              </tr>
            )}
            {!isLoading &&
              data.data.map((organization) => (
                <tr
                  key={organization.id}
                  className="hover:bg-gray-100 focus-within:bg-gray-100"
                >
                  <td className="border-t">
                    <NavLink
                      className="flex items-center px-6 py-4 focus:text-indigo-500"
                      to={`/organizations/${organization.id}/edit`}
                    >
                      {organization.name}
                      {organization.deleted_at && (
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
                      to={`/organizations/${organization.id}/edit`}
                      tabIndex={-1}
                    >
                      {organization.city}
                    </NavLink>
                  </td>
                  <td className="border-t">
                    <NavLink
                      className="flex items-center px-6 py-4"
                      to={`/organizations/${organization.id}/edit`}
                      tabIndex={-1}
                    >
                      {organization.phone}
                    </NavLink>
                  </td>
                  <td className="border-t">
                    <NavLink
                      className="flex items-center px-6 py-4"
                      to={`/organizations/${organization.id}/edit`}
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
            {!isLoading && data.data.length === 0 && (
              <tr>
                <td className="px-6 py-4 border-t" colSpan={4}>
                  No organizations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {!isLoading && data.meta.links && (
        <Pagination
          className="mt-6"
          links={data.meta.links}
          goTo={(page) => {
            setPage(page);
          }}
        />
      )}
    </>
  );
};

export default Organizations;
