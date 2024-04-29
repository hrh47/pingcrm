import { v4 as uuid } from "uuid";
import PropTypes from "prop-types";
import classNames from "classnames";

const TextInput = ({
  id = `text-input-${uuid()}`,
  type = "text",
  className,
  label,
  error,
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
      <input
        type={type}
        id={id}
        className={classNames("form-input", { error: !!error })}
        value={modelValue}
        onChange={onChange}
        onFocus={onFocus}
        onSelect={onSelect}
      />
      {!!error && <div className="form-error">{error.message}</div>}
    </div>
  );
};

TextInput.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.object,
  modelValue: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onSelect: PropTypes.func,
};

export default TextInput;
