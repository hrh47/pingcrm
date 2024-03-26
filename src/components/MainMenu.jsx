import PropTypes from "prop-types";
import MainMenuItem from "./MainMenuItem";

const MainMenu = ({ className }) => {
  return (
    <nav className={className}>
      <MainMenuItem text="Dashboard" link="/" icon="dashboard" />
      <MainMenuItem text="Organizations" link="/organizations" icon="office" />
      <MainMenuItem text="Contacts" link="/contacts" icon="users" />
      <MainMenuItem text="Reports" link="/reports" icon="printer" />
    </nav>
  );
};

MainMenu.propTypes = {
  className: PropTypes.string,
};

export default MainMenu;
