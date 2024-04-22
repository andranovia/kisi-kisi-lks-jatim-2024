import "./navbar.css";

const Navbar = () => {
  const user = localStorage.getItem("user");
  const parsedUser = user && JSON.parse(user);
  return (
    <div className="navbar-container">
      <div className="navbar">
        <div className="navbar-left">Formify.Inc</div>
        <div className="navbar-right">{parsedUser?.name}</div>
      </div>
    </div>
  );
};

export default Navbar;
