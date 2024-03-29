import Dropdown from "./Dropdown";
import PropTypes from "prop-types";

const SearchFilter = ({
  children,
  modelValue,
  maxWidth = 300,
  onInput,
  reset,
  className,
}) => {
  return (
    <div className={className}>
      <div className="flex items-center">
        <div className="flex w-full bg-white rounded shadow">
          <Dropdown
            autoClose={false}
            className="focus:z-10 px-4 hover:bg-gray-100 border-r focus:border-white rounded-l focus:ring md:px-6"
            placement="bottom-start"
            dropdownButton={
              <div className="flex items-baseline">
                <span className="hidden text-gray-700 md:inline">Filter</span>
                <svg
                  className="w-2 h-2 fill-gray-700 md:ml-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 961.243 599.998"
                >
                  <path d="M239.998 239.999L0 0h961.243L721.246 240c-131.999 132-240.28 240-240.624 239.999-.345-.001-108.625-108.001-240.624-240z" />
                </svg>
              </div>
            }
          >
            <div
              className="mt-2 px-4 py-6 w-screen bg-white rounded shadow-xl"
              style={{ maxWidth: `${maxWidth}px` }}
            >
              {children}
            </div>
          </Dropdown>
          <input
            className="relative px-6 py-3 w-full rounded-r focus:shadow-outline"
            autoComplete="off"
            type="text"
            name="search"
            placeholder="Search…"
            onInput={(e) => onInput(e.target.value)}
            value={modelValue}
          />
        </div>
        <button
          className="ml-3 text-gray-500 hover:text-gray-700 focus:text-indigo-500 text-sm"
          type="button"
          onClick={() => reset()}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

SearchFilter.propTypes = {
  children: PropTypes.node,
  modelValue: PropTypes.string,
  maxWidth: PropTypes.number,
  onInput: PropTypes.func,
  reset: PropTypes.func,
  className: PropTypes.string,
};

export default SearchFilter;
