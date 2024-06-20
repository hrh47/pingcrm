import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import SearchFilter from "../../components/SearchFilter";
import { NavLink } from "react-router-dom";
import Icon from "../../components/Icon";
import useDebounce from "../../hooks/useDebounce";
import Pagination from "../../components/Pagination";
import useContacts from "../../hooks/useContacts";

const Contacts = () => {
  const [filters, setFilters] = useState({ search: "", trashed: "" });
  const [page, setPage] = useState(1);
  const params = useDebounce({ filters, page });
  const { data, isLoading } = useContacts(params);
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    if (data?.data) {
      setContacts(data.data);
    }
  }, [data]);

  const reset = () => {
    setFilters({ search: "", trashed: "" });
    setPage(1);
  };

  return (
    <>
      <Helmet title="Contacts" />
      <h1 className="mb-8 text-3xl font-bold">Contacts</h1>
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
        <NavLink className="btn-indigo" to="/contacts/create">
          <span>Create</span>
          <span className="hidden md:inline">&nbsp;Contact</span>
        </NavLink>
      </div>
      <div className="bg-white rounded-md shadow overflow-x-auto">
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="text-left font-bold">
              <th className="pb-4 pt-6 px-6">Name</th>
              <th className="pb-4 pt-6 px-6">Organization</th>
              <th className="pb-4 pt-6 px-6">City</th>
              <th className="pb-4 pt-6 px-6" colSpan="2">
                Phone
              </th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr
                key={contact.id}
                className="hover:bg-gray-100 focus-within:bg-gray-100"
              >
                <td className="border-t">
                  <NavLink
                    className="flex items-center px-6 py-4 focus:text-indigo-500"
                    to={`/contacts/${contact.id}/edit`}
                  >
                    {contact.name}
                    {contact.deleted_at && (
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
                    to={`/contacts/${contact.id}/edit`}
                    tabIndex={-1}
                  >
                    {contact.organization.name}
                  </NavLink>
                </td>
                <td className="border-t">
                  <NavLink
                    className="flex items-center px-6 py-4"
                    to={`/contacts/${contact.id}/edit`}
                    tabIndex={-1}
                  >
                    {contact.city}
                  </NavLink>
                </td>
                <td className="border-t">
                  <NavLink
                    className="flex items-center px-6 py-4"
                    to={`/contacts/${contact.id}/edit`}
                    tabIndex={-1}
                  >
                    {contact.phone}
                  </NavLink>
                </td>
                <td className="border-t">
                  <NavLink
                    className="flex items-center px-6 py-4"
                    to={`/contacts/${contact.id}/edit`}
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
            {contacts.length === 0 && (
              <tr>
                <td className="px-6 py-4 border-t" colSpan={4}>
                  No contacts found.
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

export default Contacts;
