import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import TextInput from "../../components/TextInput";
import SelectInput from "../../components/SelectInput";
import LoadingButton from "../../components/LoadingButton";

const OrganizationCreate = () => {
  const [form, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    region: "",
    country: "",
    postalCode: "",
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
      <Helmet title="Create Organization" />
      <h1 className="mb-8 text-3xl font-bold">
        <NavLink
          className="text-indigo-400 hover:text-indigo-600"
          to="/organizations"
        >
          Organizations
        </NavLink>
        <span className="text-indigo-400 font-medium">/</span> Create
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
            <LoadingButton
              loading={isLoading}
              className="btn-indigo"
              type="submit"
            >
              Create Organization
            </LoadingButton>
          </div>
        </form>
      </div>
    </>
  );
};

export default OrganizationCreate;
