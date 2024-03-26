import classNames from "classnames";
import Icon from "./Icon";
import { useLocation, NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const MainMenuItem = ({ icon, link, text }) => {
  const location = useLocation();
  const isActive = location.pathname === link;

  const iconClasses = classNames("w-4 h-4 mr-2", {
    "text-white fill-current": isActive,
    "text-indigo-400 group-hover:text-white fill-current": !isActive,
  });

  const textClasses = classNames({
    "text-white": isActive,
    "text-indigo-200 group-hover:text-white": !isActive,
  });

  return (
    <div className="mb-4">
      <NavLink className="group flex items-center py-3" to={link}>
        <Icon name={icon} className={iconClasses} />
        <div className={textClasses}>{text}</div>
      </NavLink>
    </div>
  );
};

MainMenuItem.propTypes = {
  icon: PropTypes.string,
  link: PropTypes.string,
  text: PropTypes.string,
};

export default MainMenuItem;
