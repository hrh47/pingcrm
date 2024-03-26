import { useState } from "react";
import PropTypes from "prop-types";
import { useFloating, autoUpdate } from "@floating-ui/react";
import { createPortal } from "react-dom";

const Dropdown = ({
  dropdownButton,
  children,
  placement = "bottom-end",
  autoClose = true,
}) => {
  const [show, setShow] = useState(false);
  const toggleButton = () => setShow(!show);
  const { refs, floatingStyles } = useFloating({
    placement,
    open: show,
    onOpenChange: toggleButton,
    whileElementsMounted: autoUpdate,
  });

  return (
    <>
      <button ref={refs.setReference} type="button" onClick={toggleButton}>
        {dropdownButton}
        {show &&
          createPortal(
            <div>
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  right: 0,
                  left: 0,
                  bottom: 0,
                  zIndex: 99998,
                  background: "black",
                  opacity: 0.2,
                }}
                onClick={toggleButton}
              />
              <div
                ref={refs.setFloating}
                style={{
                  position: "absolute",
                  zIndex: 99999,
                  ...floatingStyles,
                }}
                onClick={() => setShow(!autoClose)}
              >
                {children}
              </div>
            </div>,
            document.getElementById("dropdown")
          )}
      </button>
    </>
  );
};

Dropdown.propTypes = {
  dropdownButton: PropTypes.node,
  children: PropTypes.node,
  placement: PropTypes.string,
  autoClose: PropTypes.bool,
};

export default Dropdown;
