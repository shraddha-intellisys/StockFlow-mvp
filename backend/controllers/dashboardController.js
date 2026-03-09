const Product = require("../models/Product");
const Settings = require("../models/Settings");

const getDashboard = async (req, res) => {
  try {
    const organizationId = req.user.organizationId;

    const settings = await Settings.findOne({ organizationId });
    const defaultThreshold = settings?.defaultLowStockThreshold ?? 5;

    const products = await Product.find({ organizationId });

    const totalProducts = products.length;
    const totalQuantity = products.reduce((sum, item) => sum + (item.quantity || 0), 0);

    const lowStockItems = products.filter((item) => {
      const threshold =
        item.lowStockThreshold === null || item.lowStockThreshold === undefined
          ? defaultThreshold
          : item.lowStockThreshold;

      return item.quantity <= threshold;
    });

    res.json({
      totalProducts,
      totalQuantity,
      defaultThreshold,
      lowStockItems,
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ message: "Server error while loading dashboard" });
  }
};

module.exports = { getDashboard };