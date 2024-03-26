import { Helmet } from "react-helmet-async";

const Dashboard = () => {
  return (
    <>
      <Helmet title="Dashboard" />
      <h1 className="mb-8 text-3xl font-bold">Dashboard</h1>
      <p className="mb-8 leading-normal">
        Hey there! Welcome to Ping CRM, a demo app designed to help illustrate
        how{" "}
        <a
          className="text-indigo-500 hover:text-orange-600 underline"
          href="https://inertiajs.com"
        >
          Inertia.js
        </a>{" "}
        works.
      </p>
    </>
  );
};

export default Dashboard;
