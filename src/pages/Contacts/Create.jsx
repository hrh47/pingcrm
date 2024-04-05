import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import TextInput from "../../components/TextInput";
import SelectInput from "../../components/SelectInput";
import LoadingButton from "../../components/LoadingButton";

const ContactCreate = () => {
  const [organizations] = useState([
    {
      id: 38,
      name: "Abshire, Jacobi and Abshire",
      phone: "800-217-4466",
      city: "Maeveburgh",
      deleted_at: null,
    },
    {
      id: 42,
      name: "Bauch Group",
      phone: "1-877-766-0172",
      city: "New Hilmafurt",
      deleted_at: new Date(),
    },
    {
      id: 62,
      name: "Bauch-Reichel",
      phone: "888-399-8158",
      city: "Fionaside",
      deleted_at: null,
    },
  ]);
  const [form, setFormData] = useState({
    firstName: "",
    lastName: "",
    organizationId: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    region: "",
    country: "",
    postalCode: "",
    errors: {
      firstName: "",
      lastName: "",
      organizationId: "",
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
      <Helmet title="Create Contact" />
      <h1 className="mb-8 text-3xl font-bold">
        <NavLink
          className="text-indigo-400 hover:text-indigo-600"
          to="/contacts"
        >
          Contacts
        </NavLink>
        <span className="text-indigo-400 font-medium">/</span> Create
      </h1>
      <div className="max-w-3xl bg-white rounded-md shadow overflow-hidden">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mb-8 -mr-6 p-8">
            <TextInput
              modelValue={form.firstName}
              error={form.errors.firstName}
              onChange={handleChange("firstName")}
              label="First Name"
              className="pb-8 pr-6 w-full lg:w-1/2"
            />
            <TextInput
              modelValue={form.lastName}
              error={form.errors.lastName}
              onChange={handleChange("lastName")}
              label="Last Name"
              className="pb-8 pr-6 w-full lg:w-1/2"
            />
            <SelectInput
              modelValue={form.organizationId}
              error={form.errors.organizationId}
              onChange={handleChange("organizationId")}
              label="Organization"
              className="pb-8 pr-6 w-full lg:w-1/2"
            >
              <option value="" />
              {organizations.map((organization) => (
                <option key={organization.id} value={organization.id}>
                  {organization.name}
                </option>
              ))}
            </SelectInput>
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
            <LoadingButton
              loading={isLoading}
              className="btn-indigo"
              type="submit"
            >
              Create Contact
            </LoadingButton>
          </div>
        </form>
      </div>
    </>
  );
};

export default ContactCreate;