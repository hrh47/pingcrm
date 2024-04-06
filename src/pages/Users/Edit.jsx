import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import TextInput from "../../components/TextInput";
import SelectInput from "../../components/SelectInput";
import FileInput from "../../components/FileInput";
import LoadingButton from "../../components/LoadingButton";

const UserEdit = () => {
  const [user] = useState({
    id: 1,
    first_name: "John",
    last_name: "Doe",
    email: "johndoe@example.com",
    owner: true,
    photo: "",
    deleted_at: null,
  });
  const [form, setFormData] = useState({
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    password: "",
    owner: user.owner.toString(),
    photo: user.photo,
    errors: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      owner: "",
      photo: "",
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
      if (name === "photo") {
        setFormData((previousForm) => ({
          ...previousForm,
          photo: e,
        }));
      } else {
        setFormData((previousForm) => ({
          ...previousForm,
          [name]: e.target.value,
        }));
      }
    };
  };
  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this user?")) {
      console.info("delete");
    }
  };

  return (
    <>
      <Helmet title={`${form.firstName} ${form.lastName}`} />
      <h1 className="mb-8 text-3xl font-bold">
        <NavLink className="text-indigo-400 hover:text-indigo-600" to="/users">
          Users
        </NavLink>
        <span className="text-indigo-400 font-medium">/</span>
        {form.firstName} {form.lastName}
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
            <TextInput
              modelValue={form.email}
              error={form.errors.email}
              onChange={handleChange("email")}
              label="Email"
              className="pb-8 pr-6 w-full lg:w-1/2"
            />
            <TextInput
              modelValue={form.email}
              error={form.errors.email}
              onChange={handleChange("email")}
              label="Email"
              className="pb-8 pr-6 w-full lg:w-1/2"
            />
            <SelectInput
              modelValue={form.owner}
              error={form.errors.owner}
              onChange={handleChange("owner")}
              label="Owner"
              className="pb-8 pr-6 w-full lg:w-1/2"
            >
              <option value="" />
              <option value="true">Yes</option>
              <option value="false">No</option>
            </SelectInput>
            <FileInput
              error={form.errors.photo}
              onChange={handleChange("photo")}
              label="Photo"
              className="pb-8 pr-6 w-full lg:w-1/2"
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
              loading={isLoading}
              className="btn-indigo ml-auto"
              type="submit"
            >
              Update User
            </LoadingButton>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserEdit;
