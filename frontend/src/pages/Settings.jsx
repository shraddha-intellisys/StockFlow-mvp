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
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>

        <form onSubmit={saveSettings} className="bg-white p-6 rounded-xl shadow">
          <label className="block mb-2 font-medium">Default Low Stock Threshold</label>
          <input
            type="number"
            value={defaultLowStockThreshold}
            onChange={(e) => setDefaultLowStockThreshold(Number(e.target.value))}
          />

          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Save
          </button>

          {message && <p className="mt-3 text-sm text-green-600">{message}</p>}
        </form>
      </div>
    </>
  );
};

export default Settings;