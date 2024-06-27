import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { NavLink, useNavigate } from "react-router-dom";
import TextInput from "../../components/TextInput";
import SelectInput from "../../components/SelectInput";
import FileInput from "../../components/FileInput";
import LoadingButton from "../../components/LoadingButton";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import useCreateUser from "../../hooks/useCreateUser";
import useFlashMessage from "../../hooks/useFlashMessage";
import _ from "lodash";

const schema = z.object({
  firstName: z
    .string()
    .min(1, { message: "The first name field is required." }),
  lastName: z.string().min(1, { message: "The last name field is required." }),
  email: z.string().email(),
  password: z.string().min(1, { message: "The password field is required." }),
  owner: z.coerce.boolean(),
  photo: z.instanceof(File).optional(),
});

const UserCreate = () => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      owner: "",
      photo: undefined,
    },
  });

  const createUser = useCreateUser();
  const flash = useFlashMessage((state) => state.flash);
  const navigate = useNavigate();
  const onSubmit = (data) => {
    reset();
    createUser.mutate(
      Object.fromEntries(
        Object.entries(data).map(([key, value]) => [_.snakeCase(key), value])
      )
    );
  };
  useEffect(() => {
    if (createUser.isSuccess) {
      createUser.reset();
      flash("success", "User created.");
      navigate("/users");
    } else if (createUser.isError) {
      flash("error", createUser?.error?.response?.data?.message);
    }
  }, [createUser, flash, navigate]);

  return (
    <>
      <Helmet title={`Create User`} />
      <h1 className="mb-8 text-3xl font-bold">
        <NavLink className="text-indigo-400 hover:text-indigo-600" to="/users">
          Users
        </NavLink>
        <span className="text-indigo-400 font-medium">/</span>
        Create
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
              name="password"
              render={({ field: { value, onChange, onBlur } }) => (
                <TextInput
                  type="password"
                  modelValue={value}
                  error={errors.password}
                  onChange={onChange}
                  onBlur={onBlur}
                  label="Password"
                  className="pb-8 pr-6 w-full lg:w-1/2"
                />
              )}
            />
            <Controller
              control={control}
              name="owner"
              render={({ field: { value, onChange, onBlur } }) => (
                <SelectInput
                  modelValue={value}
                  error={errors.owner}
                  onChange={onChange}
                  onBlur={onBlur}
                  label="Owner"
                  className="pb-8 pr-6 w-full lg:w-1/2"
                >
                  <option value="" />
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </SelectInput>
              )}
            />
            <Controller
              control={control}
              name="photo"
              render={({ field: { value, onChange, onBlur } }) => (
                <FileInput
                  modelValue={value}
                  error={errors.photo}
                  onChange={onChange}
                  onBlur={onBlur}
                  label="Photo"
                  className="pb-8 pr-6 w-full lg:w-1/2"
                />
              )}
            />
          </div>
          <div className="flex items-center justify-end px-8 py-4 bg-gray-50 border-t border-gray-100">
            <LoadingButton
              loading={isSubmitting}
              className="btn-indigo ml-auto"
              type="submit"
            >
              Create User
            </LoadingButton>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserCreate;
