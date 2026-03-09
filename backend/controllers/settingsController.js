const Settings = require("../models/Settings");

const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne({ organizationId: req.user.organizationId });

    if (!settings) {
      settings = await Settings.create({
        organizationId: req.user.organizationId,
        defaultLowStockThreshold: 5,
      });
    }

    res.json(settings);
  } catch (error) {
    console.error("Get settings error:", error);
    res.status(500).json({ message: "Server error while fetching settings" });
  }
};

const updateSettings = async (req, res) => {
  try {
    const { defaultLowStockThreshold } = req.body;

    let settings = await Settings.findOne({ organizationId: req.user.organizationId });

    if (!settings) {
      settings = await Settings.create({
        organizationId: req.user.organizationId,
        defaultLowStockThreshold: Number(defaultLowStockThreshold) || 5,
      });
    } else {
      settings.defaultLowStockThreshold = Number(defaultLowStockThreshold) || 5;
      await settings.save();
    }

    res.json(settings);
  } catch (error) {
    console.error("Update settings error:", error);
    res.status(500).json({ message: "Server error while updating settings" });
  }
};

module.exports = { getSettings, updateSettings };