import classNames from "classnames";
import PropTypes from "prop-types";

const Pagination = ({ links, className, goTo }) => {
  return (
    links.length > 3 && (
      <div className={className}>
        <div className="flex flex-wrap -mb-1">
          {links.map((link, index) =>
            link.url === null ? (
              <div
                key={index}
                className="mb-1 mr-1 px-4 py-3 text-gray-400 text-sm leading-4 border rounded"
                dangerouslySetInnerHTML={{ __html: link.label }}
              ></div>
            ) : (
              <button
                key={`link-${index}`}
                className={classNames(
                  "mb-1 mr-1 px-4 py-3 focus:text-indigo-500 text-sm leading-4 hover:bg-white border focus:border-indigo-500 rounded",
                  {
                    "bg-white": link.active,
                  }
                )}
                onClick={(e) => {
                  e.preventDefault();
                  const pageRegExp = /\?page=(?<page>\d+)/;
                  const pageMatchResult = pageRegExp.exec(link.url)?.groups;

                  goTo(parseInt(pageMatchResult.page, 10));
                }}
                dangerouslySetInnerHTML={{ __html: link.label }}
              ></button>
            )
          )}
        </div>
      </div>
    )
  );
};

Pagination.propTypes = {
  links: PropTypes.arrayOf(PropTypes.object),
  className: PropTypes.string,
  goTo: PropTypes.func,
};

export default Pagination;
