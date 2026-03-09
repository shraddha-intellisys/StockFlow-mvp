import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

const Settings = () => {
  const [defaultLowStockThreshold, setDefaultLowStockThreshold] = useState(5);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const res = await API.get("/settings");
      setDefaultLowStockThreshold(res.data.defaultLowStockThreshold);
    } catch (error) {
      console.error("Load settings error:", error);
    }
  };

  const saveSettings = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await API.put("/settings", { defaultLowStockThreshold });
      setDefaultLowStockThreshold(res.data.defaultLowStockThreshold);
      setMessage("Settings updated successfully");
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to update settings");
    }
  };

  return (
    <div className="page-shell">
      <Navbar />

      <div className="page-container settings-wrap">
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">
          Configure organization-level inventory rules and default thresholds.
        </p>

        <form onSubmit={saveSettings} className="form-card">
          <h2 className="form-title">Inventory Settings</h2>

          {message && (
            <div
              className={message.toLowerCase().includes("success") ? "alert alert-success" : "alert alert-error"}
            >
              {message}
            </div>
          )}

          <label style={{ display: "block", marginBottom: "8px", fontWeight: 600 }}>
            Default Low Stock Threshold
          </label>

          <input
            type="number"
            value={defaultLowStockThreshold}
            onChange={(e) => setDefaultLowStockThreshold(Number(e.target.value))}
          />

          <p className="helper-text">
            This value is used when a product-specific low stock threshold is not defined.
          </p>

          <button className="btn btn-primary" style={{ marginTop: "18px" }}>
            Save Settings
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;