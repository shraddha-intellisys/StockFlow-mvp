const Product = require("../models/Product");

const createProduct = async (req, res) => {
  try {
    const {
      name,
      sku,
      description,
      quantity,
      costPrice,
      sellingPrice,
      lowStockThreshold,
    } = req.body;

    if (!name || !sku) {
      return res.status(400).json({ message: "Name and SKU are required" });
    }

    const existing = await Product.findOne({
      organizationId: req.user.organizationId,
      sku: sku.trim(),
    });

    if (existing) {
      return res.status(400).json({ message: "SKU must be unique per organization" });
    }

    const product = await Product.create({
      organizationId: req.user.organizationId,
      name,
      sku: sku.trim(),
      description,
      quantity: Number(quantity) || 0,
      costPrice: Number(costPrice) || 0,
      sellingPrice: Number(sellingPrice) || 0,
      lowStockThreshold:
        lowStockThreshold === "" || lowStockThreshold === null || lowStockThreshold === undefined
          ? null
          : Number(lowStockThreshold),
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json({ message: "Server error while creating product" });
  }
};

const getProducts = async (req, res) => {
  try {
    const { search } = req.query;

    const filter = {
      organizationId: req.user.organizationId,
    };

    if (search && search.trim() !== "") {
      filter.$or = [
        { name: { $regex: search.trim(), $options: "i" } },
        { sku: { $regex: search.trim(), $options: "i" } },
      ];
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error("Get products error:", error);
    res.status(500).json({ message: "Server error while fetching products" });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      organizationId: req.user.organizationId,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("Get product by id error:", error);
    res.status(500).json({ message: "Server error while fetching product" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      organizationId: req.user.organizationId,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const {
      name,
      sku,
      description,
      quantity,
      costPrice,
      sellingPrice,
      lowStockThreshold,
    } = req.body;

    if (sku && sku !== product.sku) {
      const duplicate = await Product.findOne({
        organizationId: req.user.organizationId,
        sku: sku.trim(),
        _id: { $ne: product._id },
      });

      if (duplicate) {
        return res.status(400).json({ message: "SKU must be unique per organization" });
      }
    }

    product.name = name ?? product.name;
    product.sku = sku ? sku.trim() : product.sku;
    product.description = description ?? product.description;
    product.quantity = quantity !== undefined ? Number(quantity) : product.quantity;
    product.costPrice = costPrice !== undefined ? Number(costPrice) : product.costPrice;
    product.sellingPrice =
      sellingPrice !== undefined ? Number(sellingPrice) : product.sellingPrice;
    product.lowStockThreshold =
      lowStockThreshold === "" || lowStockThreshold === null || lowStockThreshold === undefined
        ? null
        : Number(lowStockThreshold);

    const updated = await product.save();
    res.json(updated);
  } catch (error) {
    console.error("Update product error:", error);
    res.status(500).json({ message: "Server error while updating product" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      organizationId: req.user.organizationId,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete product error:", error);
    res.status(500).json({ message: "Server error while deleting product" });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};