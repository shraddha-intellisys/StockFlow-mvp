import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-page">
      <form onSubmit={handleLogin} className="auth-card">
        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-subtitle">Login to access your StockFlow workspace</p>

        {error && <div className="alert alert-error">{error}</div>}

        <div className="auth-form">
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            onChange={handleChange}
            required
          />
        </div>

        <button className="btn btn-primary w-full" style={{ marginTop: "18px" }}>
          Login
        </button>

        <p className="auth-footer">
          Don’t have an account?{" "}
          <Link to="/signup" className="auth-link">
            Create one
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;