import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="brand">
          <span className="brand-title">StockFlow</span>
          <span className="brand-subtitle">Inventory Management MVP</span>
        </div>

        <div className="nav-links">
          <Link
            to="/dashboard"
            className="nav-link"
            style={isActive("/dashboard") ? { background: "#eff6ff", color: "#2563eb" } : {}}
          >
            Dashboard
          </Link>

          <Link
            to="/products"
            className="nav-link"
            style={isActive("/products") ? { background: "#eff6ff", color: "#2563eb" } : {}}
          >
            Products
          </Link>

          <Link
            to="/settings"
            className="nav-link"
            style={isActive("/settings") ? { background: "#eff6ff", color: "#2563eb" } : {}}
          >
            Settings
          </Link>

          <button onClick={logout} className="btn btn-danger btn-sm">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;