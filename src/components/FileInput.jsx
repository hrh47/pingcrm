import { v4 as uuid } from "uuid";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useRef, useState } from "react";

const filesize = (size) => {
  const i = Math.floor(Math.log(size) / Math.log(1024));
  return (
    (size / Math.pow(1024, i)).toFixed(2) * 1 +
    " " +
    ["B", "kB", "MB", "GB", "TB"][i]
  );
};

const Button = ({ text, onClick }) => {
  return (
    <button
      type="button"
      className="px-4 py-1 text-xs font-medium text-white bg-gray-600 rounded-sm focus:outline-none hover:bg-gray-700"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
};

const FileInput = ({
  id = `file-input-${uuid()}`,
  className,
  label,
  error,
  accept,
  onChange,
}) => {
  const fileInput = useRef();
  const [file, setFile] = useState(null);
  const browse = () => {
    fileInput.current.click();
  };
  const remove = () => {
    setFile(null);
    onChange(null);
    fileInput.current.value = null;
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    onChange(file);
  };

  return (
    <div className={className}>
      {!!label && (
        <label htmlFor={id} className="form-label">
          {label}:
        </label>
      )}
      <div className={classNames("form-input p-0", { error: !!error })}>
        <input
          type="file"
          ref={fileInput}
          id={id}
          className="hidden"
          accept={accept}
          onChange={handleFileChange}
        />
        {!file && (
          <div className="p-2">
            <Button text="Browse" onClick={browse} />
          </div>
        )}
        {!!file && (
          <div className="flex items-center justify-between p-2">
            <div className="flex-1 pr-1">
              {file.name}
              <span className="ml-1 text-xs text-gray-600">
                ({filesize(file.size)})
              </span>
            </div>
            <Button text="Remove" onClick={remove} />
          </div>
        )}
      </div>
      {!!error && <div className="form-error">{error}</div>}
    </div>
  );
};

FileInput.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  accept: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
};

export default FileInput;
