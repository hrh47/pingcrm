import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import TextInput from "../../components/TextInput";
import SelectInput from "../../components/SelectInput";
import LoadingButton from "../../components/LoadingButton";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

const ContactEdit = () => {
  const [organizations] = useState([
    {
      id: 38,
      name: "Abshire, Jacobi and Abshire",
      phone: "800-217-4466",
      city: "Maeveburgh",
      deleted_at: null,
    },
    {
      id: 53,
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
  const [contact] = useState({
    id: 22,
    first_name: "Rick",
    last_name: "Kling",
    organization_id: 53,
    email: "lakin.allan@example.org",
    phone: "1-844-827-7039",
    address: "9460 Marvin Locks",
    city: "Kozeymouth",
    region: "New Mexico",
    country: "",
    postal_code: "93959",
    deleted_at: null,
  });
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: contact.first_name,
      lastName: contact.last_name,
      organizationId: contact.organization_id.toString(),
      email: contact.email,
      phone: contact.phone,
      address: contact.address,
      city: contact.city,
      region: contact.region,
      country: contact.country,
      postalCode: contact.postal_code,
    },
  });
  const onSubmit = (data) => {
    console.info(data);
    return new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this contact?")) {
      console.info("delete");
    }
  };

  return (
    <>
      <Helmet title={`${contact.first_name} ${contact.last_name}`} />
      <h1 className="mb-8 text-3xl font-bold">
        <NavLink
          className="text-indigo-400 hover:text-indigo-600"
          to="/contacts"
        >
          Contacts
        </NavLink>
        <span className="text-indigo-400 font-medium">/</span>
        {contact.first_name} {contact.last_name}
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
            {!contact.deleted_at && (
              <button
                className="text-red-600 hover:underline"
                tabIndex="-1"
                type="button"
                onClick={handleDelete}
              >
                Delete Contact
              </button>
            )}
            <LoadingButton
              loading={isSubmitting}
              className="btn-indigo ml-auto"
              type="submit"
            >
              Update Contact
            </LoadingButton>
          </div>
        </form>
      </div>
    </>
  );
};

export default ContactEdit;
