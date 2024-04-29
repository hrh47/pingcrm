import { Helmet } from "react-helmet-async";
import Logo from "../../components/Logo";
import TextInput from "../../components/TextInput";
import { useForm, Controller } from "react-hook-form";
import LoadingButton from "../../components/LoadingButton";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string(),
  remember: z.boolean(),
});

const Login = () => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "johndoe@example.com",
      password: "secret",
      remember: false,
    },
  });

  const onSubmit = (data) => {
    console.info(data);
    return new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });
  };

  return (
    <>
      <Helmet title="Login" />
      <div className="flex items-center justify-center p-6 min-h-screen bg-indigo-800">
        <div className="w-full max-w-md">
          <Logo
            className="block mx-auto w-full max-w-xs fill-white"
            height="50"
          />
          <form
            className="mt-8 bg-white rounded-lg shadow-xl overflow-hidden"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="px-10 py-12">
              <h1 className="text-center text-3xl font-bold">Welcome Back!</h1>
              <div className="mt-6 mx-auto w-24 border-b-2" />

              <Controller
                control={control}
                name="email"
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextInput
                    modelValue={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={errors.email}
                    label="Email"
                    type="email"
                    className="mt-10"
                    autoFocus
                    autoCapitalize="off"
                  />
                )}
              />
              <Controller
                control={control}
                name="password"
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextInput
                    modelValue={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={errors.password}
                    label="Password"
                    type="password"
                    className="mt-6"
                  />
                )}
              />
              <label
                className="flex items-center mt-6 select-none"
                htmlFor="remember"
              >
                <Controller
                  control={control}
                  name="remember"
                  render={({ field: { value, onChange, onBlur } }) => (
                    <input
                      id="remember"
                      onChange={onChange}
                      onBlur={onBlur}
                      type="checkbox"
                      value={value}
                      className="mr-1"
                    />
                  )}
                />
                <span className="text-sm">Remember Me</span>
              </label>
            </div>
            <div className="flex px-10 py-4 bg-gray-100 border-t border-gray-100">
              <LoadingButton
                loading={isSubmitting}
                type="submit"
                className="btn-indigo ml-auto"
              >
                Login
              </LoadingButton>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
