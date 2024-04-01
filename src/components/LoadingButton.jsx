import PropTypes from "prop-types";
import classNames from "classnames";

const LoadingButton = ({ loading, children, type, className }) => {
  return (
    <button
      disabled={loading}
      className={classNames("flex items-center", className)}
      type={type}
    >
      {loading && <div className="btn-spinner mr-2" />}
      {children}
    </button>
  );
};

LoadingButton.propTypes = {
  type: PropTypes.string,
  loading: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default LoadingButton;
