import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

const Dashboard = () => {
  const [data, setData] = useState({
    totalProducts: 0,
    totalQuantity: 0,
    lowStockItems: [],
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
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow p-5">
            <p className="text-gray-500">Total Products</p>
            <h2 className="text-3xl font-bold">{data.totalProducts}</h2>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <p className="text-gray-500">Total Quantity</p>
            <h2 className="text-3xl font-bold">{data.totalQuantity}</h2>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-lg font-semibold mb-4">Low Stock Items</h2>

          {data.lowStockItems.length > 0 ? (
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-3 py-2">Name</th>
                  <th className="text-left px-3 py-2">SKU</th>
                  <th className="text-left px-3 py-2">Quantity</th>
                  <th className="text-left px-3 py-2">Threshold</th>
                </tr>
              </thead>
              <tbody>
                {data.lowStockItems.map((item) => (
                  <tr key={item._id} className="border-t">
                    <td className="px-3 py-2">{item.name}</td>
                    <td className="px-3 py-2">{item.sku}</td>
                    <td className="px-3 py-2">{item.quantity}</td>
                    <td className="px-3 py-2">
                      {item.lowStockThreshold ?? data.defaultThreshold}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">No low stock items</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;