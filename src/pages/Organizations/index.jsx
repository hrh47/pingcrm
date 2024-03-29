import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import SearchFilter from "../../components/SearchFilter";

const Organizations = () => {
  const [filters, setFilters] = useState({ search: "", trashed: "" });
  // const [organizations, setOrganizations] = useState([]);

  const reset = () => setFilters({ search: "", trashed: "" });

  useEffect(() => {
    console.log("filters 發生了變化，最新值：", filters);
  }, [filters]);

  return (
    <>
      <Helmet title="Organizations" />
      <h1 className="mb-8 text-3xl font-bold">Organizations</h1>
      <div className="flex items-center justify-between mb-6">
        <SearchFilter
          className="mr-4 w-full max-w-md"
          modelValue={filters.search}
          reset={reset}
          onInput={(value) => setFilters({ ...filters, search: value })}
        >
          <label className="block text-gray-700">Trashed:</label>
          <select
            className="form-select mt-1 w-full"
            onInput={(e) => setFilters({ ...filters, trashed: e.target.value })}
            value={filters.trashed}
          >
            <option value="" />
            <option value="with">With Trashed</option>
            <option value="only">Only Trashed</option>
          </select>
        </SearchFilter>
      </div>
    </>
  );
};

export default Organizations;
