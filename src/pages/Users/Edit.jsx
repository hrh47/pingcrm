import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import TextInput from "../../components/TextInput";
import SelectInput from "../../components/SelectInput";
import FileInput from "../../components/FileInput";
import LoadingButton from "../../components/LoadingButton";
import useUser from "../../hooks/useUser";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import _ from "lodash";
import useUpdateUser from "../../hooks/useUpdateUser";
import useFlashMessage from "../../hooks/useFlashMessage";
import { Controller, useForm } from "react-hook-form";
import useDeleteUser from "../../hooks/useDeleteUser";

const schema = z.object({
  firstName: z
    .string()
    .min(1, { message: "The first name field is required." }),
  lastName: z.string().min(1, { message: "The last name field is required." }),
  email: z.string().email(),
  password: z.string().optional(),
  owner: z.coerce.boolean(),
  photo: z.instanceof(File).optional(),
});

const UserEdit = () => {
  const { id } = useParams();
  const { data } = useUser(id);
  const [user, setUser] = useState({});
  useEffect(() => {
    if (data?.data) {
      setUser(
        Object.fromEntries(
          Object.entries(data.data).map(([key, value]) => [
            _.camelCase(key),
            value?.toString(),
          ])
        )
      );
    }
  }, [data]);
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
    values: user,
  });
  const updateUser = useUpdateUser();
  const flash = useFlashMessage((state) => state.flash);
  const onSubmit = (data) => {
    reset();
    updateUser.mutate({
      id,
      data: Object.fromEntries(
        Object.entries(data).map(([key, value]) => [_.snakeCase(key), value])
      ),
    });
  };
  useEffect(() => {
    if (updateUser.isSuccess) {
      updateUser.reset();
      flash("success", "User updated.");
    } else if (updateUser.isError) {
      flash("error", updateUser?.error?.response?.data?.message);
    }
  }, [updateUser, flash]);

  const deleteUser = useDeleteUser();
  const navigate = useNavigate();
  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this user?")) {
      deleteUser.mutate(id);
    }
  };
  useEffect(() => {
    if (deleteUser.isSuccess) {
      deleteUser.reset();
      flash("success", "User deleted.");
      navigate("/users");
    } else if (deleteUser.isError) {
      flash("error", deleteUser?.error?.response?.data?.message);
    }
  }, [deleteUser, flash, navigate]);

  return (
    user && (
      <>
        <Helmet title={`${user.firstName} ${user.lastName}`} />
        <h1 className="mb-8 text-3xl font-bold">
          <NavLink
            className="text-indigo-400 hover:text-indigo-600"
            to="/users"
          >
            Users
          </NavLink>
          <span className="text-indigo-400 font-medium">/</span>
          {user.firstName} {user.lastName}
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
              {!user.deleted_at && (
                <button
                  className="text-red-600 hover:underline"
                  tabIndex="-1"
                  type="button"
                  onClick={handleDelete}
                >
                  Delete User
                </button>
              )}
              <LoadingButton
                loading={isSubmitting}
                className="btn-indigo ml-auto"
                type="submit"
              >
                Update User
              </LoadingButton>
            </div>
          </form>
        </div>
      </>
    )
  );
};

export default UserEdit;
