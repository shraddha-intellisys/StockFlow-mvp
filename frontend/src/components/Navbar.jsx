import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow mb-6">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">StockFlow</h1>

        <div className="flex gap-4 items-center">
          <Link to="/dashboard" className="text-sm hover:text-blue-600">
            Dashboard
          </Link>
          <Link to="/products" className="text-sm hover:text-blue-600">
            Products
          </Link>
          <Link to="/settings" className="text-sm hover:text-blue-600">
            Settings
          </Link>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;