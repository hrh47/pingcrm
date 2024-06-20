import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { NavLink, useNavigate } from "react-router-dom";
import TextInput from "../../components/TextInput";
import SelectInput from "../../components/SelectInput";
import LoadingButton from "../../components/LoadingButton";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useOrganizations from "../../hooks/useOrganizations";
import useCreateContact from "../../hooks/useCreateContact";
import useFlashMessage from "../../hooks/useFlashMessage";
import _ from "lodash";

const schema = z.object({
  firstName: z
    .string()
    .min(1, { message: "The first name field is required." }),
  lastName: z.string().min(1, { message: "The last name field is required." }),
  organizationId: z.coerce.number().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  region: z.string().optional(),
  country: z.string().optional(),
  postalCode: z.string().optional(),
});

const ContactCreate = () => {
  const [organizations, setOrganizations] = useState([]);
  const { data } = useOrganizations({});
  useEffect(() => {
    if (data?.data) {
      setOrganizations(data.data);
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

  const createContact = useCreateContact();
  const flash = useFlashMessage((state) => state.flash);
  const navigate = useNavigate();
  const onSubmit = (data) => {
    reset();
    createContact.mutate(
      Object.fromEntries(
        Object.entries(data).map(([key, value]) => [_.snakeCase(key), value])
      )
    );
  };
  useEffect(() => {
    if (createContact.isSuccess) {
      createContact.reset();
      flash("success", "Contact created.");
      navigate("/contacts");
    } else if (createContact.isError) {
      flash("error", createContact?.error?.response?.data?.message);
    }
  }, [createContact, flash, navigate]);

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-wrap -mb-8 -mr-6 p-8">
            <Controller
              control={control}
              name="firstName"
              render={({ field: { value, onChange, onBlur } }) => (
                <TextInput
                  modelValue={value}
                  error={errors.firstName}
                  onChange={onChange}
                  onBlur={onBlur}
                  label="First Name"
                  className="pb-8 pr-6 w-full lg:w-1/2"
                />
              )}
            />
            <Controller
              control={control}
              name="lastName"
              render={({ field: { value, onChange, onBlur } }) => (
                <TextInput
                  modelValue={value}
                  error={errors.lastName}
                  onChange={onChange}
                  onBlur={onBlur}
                  label="Last Name"
                  className="pb-8 pr-6 w-full lg:w-1/2"
                />
              )}
            />
            <Controller
              control={control}
              name="organizationId"
              render={({ field: { value, onChange, onBlur } }) => (
                <SelectInput
                  modelValue={value}
                  error={errors.organizationId}
                  onChange={onChange}
                  onBlur={onBlur}
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
            <LoadingButton
              loading={isSubmitting}
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
