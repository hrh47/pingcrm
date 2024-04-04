import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import TextInput from "../../components/TextInput";
import SelectInput from "../../components/SelectInput";
import LoadingButton from "../../components/LoadingButton";
import Icon from "../../components/Icon";

const OrganizationEdit = () => {
  const [organization] = useState({
    id: 78,
    name: "Ankunding Group",
    email: "lucienne47@bednar.com",
    phone: "888-918-6092",
    address: "9356 Reyna Avenue Suite 280",
    city: "Bernardoside",
    region: "Pennsylvania",
    country: "US",
    postal_code: "52797",
    deleted_at: null,
    contacts: [
      {
        id: 1,
        name: "Roger Rohan",
        city: "Hellerstad",
        phone: "1-800-275-7352",
        deleted_at: null,
      },
    ],
  });
  const [form, setFormData] = useState({
    name: organization.name,
    email: organization.email,
    phone: organization.phone,
    address: organization.address,
    city: organization.city,
    region: organization.region,
    country: organization.country,
    postalCode: organization.postal_code,
    errors: {
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      region: "",
      country: "",
      postalCode: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    console.info(form);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };
  const handleChange = (name) => {
    return (e) => {
      setFormData((previousForm) => ({
        ...previousForm,
        [name]: e.target.value,
      }));
    };
  };
  return (
    <>
      <Helmet title={form.name} />
      <h1 className="mb-8 text-3xl font-bold">
        <NavLink
          className="text-indigo-400 hover:text-indigo-600"
          to="/organizations"
        >
          Organizations
        </NavLink>
        <span className="text-indigo-400 font-medium">/</span> {form.name}
      </h1>
      <div className="max-w-3xl bg-white rounded-md shadow overflow-hidden">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mb-8 -mr-6 p-8">
            <TextInput
              modelValue={form.name}
              error={form.errors.name}
              onChange={handleChange("name")}
              label="Name"
              className="pb-8 pr-6 w-full lg:w-1/2"
            />
            <TextInput
              modelValue={form.email}
              error={form.errors.email}
              onChange={handleChange("email")}
              label="Email"
              className="pb-8 pr-6 w-full lg:w-1/2"
            />
            <TextInput
              modelValue={form.phone}
              error={form.errors.phone}
              onChange={handleChange("phone")}
              label="Phone"
              className="pb-8 pr-6 w-full lg:w-1/2"
            />
            <TextInput
              modelValue={form.address}
              error={form.errors.address}
              onChange={handleChange("address")}
              label="Address"
              className="pb-8 pr-6 w-full lg:w-1/2"
            />
            <TextInput
              modelValue={form.city}
              error={form.errors.city}
              onChange={handleChange("city")}
              label="City"
              className="pb-8 pr-6 w-full lg:w-1/2"
            />
            <TextInput
              modelValue={form.region}
              error={form.errors.region}
              onChange={handleChange("region")}
              label="Province/State"
              className="pb-8 pr-6 w-full lg:w-1/2"
            />
            <SelectInput
              modelValue={form.country}
              error={form.errors.country}
              onChange={handleChange("country")}
              label="Country"
              className="pb-8 pr-6 w-full lg:w-1/2"
            >
              <option value="" />
              <option value="CA">Canada</option>
              <option value="US">United States</option>
            </SelectInput>
            <TextInput
              modelValue={form.postalCode}
              error={form.errors.postalCode}
              onChange={handleChange("postalCode")}
              label="Postal code"
              className="pb-8 pr-6 w-full lg:w-1/2"
            />
          </div>
          <div className="flex items-center justify-end px-8 py-4 bg-gray-50 border-t border-gray-100">
            {!organization.deletedAt && (
              <button
                className="text-red-600 hover:underline"
                tabIndex="-1"
                type="button"
              >
                Delete Organization
              </button>
            )}
            <LoadingButton
              loading={isLoading}
              className="btn-indigo ml-auto"
              type="submit"
            >
              Update Organization
            </LoadingButton>
          </div>
        </form>
      </div>
      <h2 className="mt-12 text-2xl font-bold">Contacts</h2>
      <div className="mt-6 bg-white rounded shadow overflow-x-auto">
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
            {organization.contacts.map((contact) => (
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrganizationEdit;
