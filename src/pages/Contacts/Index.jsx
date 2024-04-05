import { useState } from "react";
import { Helmet } from "react-helmet-async";
import SearchFilter from "../../components/SearchFilter";
import { NavLink } from "react-router-dom";
import Icon from "../../components/Icon";

const Contacts = () => {
  const [filters, setFilters] = useState({ search: "", trashed: "" });
  const [contacts] = useState([
    {
      id: 22,
      name: "Dannie Bahringer",
      phone: "(888) 706-2149",
      city: "Deckowview",
      deleted_at: null,
      organization: {
        name: "Hand PLC",
      },
    },
    {
      id: 48,
      name: "Antonietta Bartoletti",
      phone: "(844) 317-0631",
      city: "Ondrickamouth",
      deleted_at: null,
      organization: {
        name: "Dickens, Dare and Goldner",
      },
    },
    {
      id: 20,
      name: "Laura Beatty",
      phone: "800.836.8312",
      city: "North Audra",
      deleted_at: null,
      organization: {
        name: "Schuster, Kassulke and Tillman",
      },
    },
  ]);

  const reset = () => setFilters({ search: "", trashed: "" });

  return (
    <>
      <Helmet title="Contacts" />
      <h1 className="mb-8 text-3xl font-bold">Contacts</h1>
      <div className="flex items-center justify-between mb-6">
        <SearchFilter
          className="mr-4 w-full max-w-md"
          modelValue={filters.search}
          reset={reset}
          onChange={(value) => setFilters({ ...filters, search: value })}
        >
          <label className="block text-gray-700">Trashed:</label>
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
    </>
  );
};

export default Contacts;
