import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

const Dashboard = () => {
  const [data, setData] = useState({
    totalProducts: 0,
    totalQuantity: 0,
    lowStockItems: [],
    defaultThreshold: 5,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await API.get("/dashboard");
      setData(res.data);
    } catch (error) {
      console.error("Dashboard load error:", error);
    }
  };

  return (
    <div className="page-shell">
      <Navbar />

      <div className="page-container">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">
          Get a quick overview of your products, stock quantity, and low stock alerts.
        </p>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Total Products</div>
            <div className="stat-value">{data.totalProducts}</div>
          </div>

          <div className="stat-card">
            <div className="stat-label">Total Quantity</div>
            <div className="stat-value">{data.totalQuantity}</div>
          </div>

          <div className="stat-card">
            <div className="stat-label">Low Stock Items</div>
            <div className="stat-value">{data.lowStockItems.length}</div>
          </div>
        </div>

        <div className="table-card">
          <div className="table-header">
            <div>
              <h3 className="table-title">Low Stock Products</h3>
              <div className="table-subtitle">
                Products where quantity is less than or equal to threshold
              </div>
            </div>
          </div>

          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>SKU</th>
                  <th>Quantity</th>
                  <th>Threshold</th>
                </tr>
              </thead>
              <tbody>
                {data.lowStockItems.length > 0 ? (
                  data.lowStockItems.map((item) => (
                    <tr key={item._id}>
                      <td>{item.name}</td>
                      <td>{item.sku}</td>
                      <td>{item.quantity}</td>
                      <td>{item.lowStockThreshold ?? data.defaultThreshold}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="empty-state">
                      No low stock items right now.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;