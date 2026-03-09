import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    organizationName: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      const res = await API.post("/auth/signup", {
        email: form.email,
        password: form.password,
        organizationName: form.organizationName,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="auth-page">
      <form onSubmit={handleSignup} className="auth-card">
        <h1 className="auth-title">Create Account</h1>
        <p className="auth-subtitle">Set up your organization and start managing inventory</p>

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
            placeholder="Create password"
            onChange={handleChange}
            required
          />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            onChange={handleChange}
            required
          />
          <input
            name="organizationName"
            placeholder="Organization name"
            onChange={handleChange}
            required
          />
        </div>

        <button className="btn btn-primary w-full" style={{ marginTop: "18px" }}>
          Signup
        </button>

        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/login" className="auth-link">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;