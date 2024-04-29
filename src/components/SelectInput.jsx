import { v4 as uuid } from "uuid";
import PropTypes from "prop-types";
import classNames from "classnames";

const SelectInput = ({
  id = `select-input-${uuid()}`,
  className,
  label,
  error,
  children,
  modelValue,
  onChange,
  onFocus,
  onSelect,
}) => {
  return (
    <div className={className}>
      {!!label && (
        <label htmlFor={id} className="form-label">
          {label}:
        </label>
      )}
      <select
        className={classNames("form-select", { error: !!error })}
        id={id}
        value={modelValue}
        onChange={onChange}
        onFocus={onFocus}
        onSelect={onSelect}
      >
        {children}
      </select>
      {!!error && <div className="form-error">{error.message}</div>}
    </div>
  );
};

SelectInput.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.object,
  children: PropTypes.node,
  modelValue: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onSelect: PropTypes.func,
};

export default SelectInput;
