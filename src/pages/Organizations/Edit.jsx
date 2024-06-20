import { Helmet } from "react-helmet-async";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import TextInput from "../../components/TextInput";
import SelectInput from "../../components/SelectInput";
import LoadingButton from "../../components/LoadingButton";
import Icon from "../../components/Icon";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useOrganization from "../../hooks/useOrganization";
import useUpdateOrganization from "../../hooks/useUpdateOrganization";
import useFlashMessage from "../../hooks/useFlashMessage";
import { useEffect, useState } from "react";
import useDeleteOrganization from "../../hooks/useDeleteOrganization";
import _ from "lodash";

const schema = z.object({
  name: z.string().min(1, { message: "The name field is required." }),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  region: z.string().optional(),
  country: z.string().optional(),
  postalCode: z.string().optional(),
});
const OrganizationEdit = () => {
  const { id } = useParams();
  const { data } = useOrganization(id);
  const [organization, setOrganization] = useState({});
  useEffect(() => {
    if (data?.data) {
      setOrganization(data.data);
    }
  }, [data]);
  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      region: "",
      country: "",
      postalCode: "",
    },
    values: Object.fromEntries(
      Object.entries(organization).map(([key, value]) => [
        _.camelCase(key),
        value,
      ])
    ),
  });

  const updateOrganization = useUpdateOrganization(id);
  const flash = useFlashMessage((state) => state.flash);
  const onSubmit = (data) => {
    reset();
    updateOrganization.mutate({
      id,
      data: Object.fromEntries(
        Object.entries(data).map(([key, value]) => [_.snakeCase(key), value])
      ),
    });
  };
  useEffect(() => {
    if (updateOrganization.isSuccess) {
      updateOrganization.reset();
      flash("success", "Organization updated.");
    } else if (updateOrganization.isError) {
      flash("error", updateOrganization?.error?.response?.data?.message);
    }
  }, [updateOrganization, flash]);

  const deleteOrganization = useDeleteOrganization();
  const navigate = useNavigate();
  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this organization?")) {
      deleteOrganization.mutate(id);
    }
  };
  useEffect(() => {
    if (deleteOrganization.isSuccess) {
      deleteOrganization.reset();
      flash("success", "Organization deleted.");
      navigate("/organizations");
    } else if (deleteOrganization.isError) {
      flash("error", deleteOrganization?.error?.response?.data?.message);
    }
  }, [deleteOrganization, flash, navigate]);

  return (
    organization && (
      <>
        <Helmet title={organization.name} />
        <h1 className="mb-8 text-3xl font-bold">
          <NavLink
            className="text-indigo-400 hover:text-indigo-600"
            to="/organizations"
          >
            Organizations
          </NavLink>
          <span className="text-indigo-400 font-medium">/</span>{" "}
          {organization.name}
        </h1>
        <div className="max-w-3xl bg-white rounded-md shadow overflow-hidden">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-wrap -mb-8 -mr-6 p-8">
              <Controller
                control={control}
                name="name"
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextInput
                    modelValue={value}
                    error={errors.name}
                    onChange={onChange}
                    onBlur={onBlur}
                    label="Name"
                    className="pb-8 pr-6 w-full lg:w-1/2"
                  />
                )}
              />
              <Controller
                control={control}
                name="email"
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextInput
                    modelValue={value}
                    error={errors.email}
                    onChange={onChange}
                    onBlur={onBlur}
                    label="Email"
                    className="pb-8 pr-6 w-full lg:w-1/2"
                  />
                )}
              />
              <Controller
                control={control}
                name="phone"
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextInput
                    modelValue={value}
                    error={errors.phone}
                    onChange={onChange}
                    onBlur={onBlur}
                    label="Phone"
                    className="pb-8 pr-6 w-full lg:w-1/2"
                  />
                )}
              />
              <Controller
                control={control}
                name="address"
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextInput
                    modelValue={value}
                    error={errors.address}
                    onChange={onChange}
                    onBlur={onBlur}
                    label="Adress"
                    className="pb-8 pr-6 w-full lg:w-1/2"
                  />
                )}
              />
              <Controller
                control={control}
                name="city"
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextInput
                    modelValue={value}
                    error={errors.city}
                    onChange={onChange}
                    onBlur={onBlur}
                    label="City"
                    className="pb-8 pr-6 w-full lg:w-1/2"
                  />
                )}
              />
              <Controller
                control={control}
                name="region"
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextInput
                    modelValue={value}
                    error={errors.region}
                    onChange={onChange}
                    onBlur={onBlur}
                    label="Province/State"
                    className="pb-8 pr-6 w-full lg:w-1/2"
                  />
                )}
              />
              <Controller
                control={control}
                name="country"
                render={({ field: { value, onChange, onBlur } }) => (
                  <SelectInput
                    modelValue={value}
                    error={errors.country}
                    onChange={onChange}
                    onBlur={onBlur}
                    label="Country"
                    className="pb-8 pr-6 w-full lg:w-1/2"
                  >
                    <option value="" />
                    <option value="CA">Canada</option>
                    <option value="US">United States</option>
                  </SelectInput>
                )}
              />
              <Controller
                control={control}
                name="postalCode"
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextInput
                    modelValue={value}
                    error={errors.postalCode}
                    onChange={onChange}
                    onBlur={onBlur}
                    label="Postal code"
                    className="pb-8 pr-6 w-full lg:w-1/2"
                  />
                )}
              />
            </div>
            <div className="flex items-center justify-end px-8 py-4 bg-gray-50 border-t border-gray-100">
              {!organization.deletedAt && (
                <button
                  className="text-red-600 hover:underline"
                  tabIndex="-1"
                  type="button"
                  onClick={handleDelete}
                >
                  Delete Organization
                </button>
              )}
              <LoadingButton
                loading={isSubmitting}
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
              {organization.contacts?.map((contact) => (
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
                  <td className="border-t" tabIndex={-1}>
                    <NavLink
                      className="flex items-center px-6 py-4 focus:text-indigo-500"
                      to={`/contacts/${contact.id}/edit`}
                    >
                      {contact.city}
                    </NavLink>
                  </td>
                  <td className="border-t" tabIndex={-1}>
                    <NavLink
                      className="flex items-center px-6 py-4 focus:text-indigo-500"
                      to={`/contacts/${contact.id}/edit`}
                    >
                      {contact.phone}
                    </NavLink>
                  </td>
                  <td className="w-px border-t" tabIndex={-1}>
                    <NavLink
                      className="flex items-center px-4"
                      to={`/contacts/${contact.id}/edit`}
                    >
                      <Icon
                        name="cheveron-right"
                        className="block w-6 h-6 fill-gray-400"
                      />
                    </NavLink>
                  </td>
                </tr>
              ))}
              {organization.contacts?.length === 0 && (
                <tr>
                  <td className="px-6 py-4 border-t" colSpan={4}>
                    No organizations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </>
    )
  );
};

export default OrganizationEdit;
