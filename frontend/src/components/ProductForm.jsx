import { useEffect, useState } from "react";

const initialState = {
  name: "",
  sku: "",
  description: "",
  quantity: "",
  costPrice: "",
  sellingPrice: "",
  lowStockThreshold: "",
};

const ProductForm = ({ onSubmit, editingProduct, onCancel }) => {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (editingProduct) {
      setForm({
        name: editingProduct.name || "",
        sku: editingProduct.sku || "",
        description: editingProduct.description || "",
        quantity: editingProduct.quantity ?? "",
        costPrice: editingProduct.costPrice ?? "",
        sellingPrice: editingProduct.sellingPrice ?? "",
        lowStockThreshold:
          editingProduct.lowStockThreshold === null ||
          editingProduct.lowStockThreshold === undefined
            ? ""
            : editingProduct.lowStockThreshold,
      });
    } else {
      setForm(initialState);
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);

    if (!editingProduct) {
      setForm(initialState);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-card">
      <h2 className="form-title">
        {editingProduct ? "Edit Product" : "Add New Product"}
      </h2>

      <div className="form-grid">
        <div>
          <input
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <input
            name="sku"
            placeholder="SKU"
            value={form.sku}
            onChange={handleChange}
            required
          />
        </div>

        <div className="full-width">
          <textarea
            name="description"
            placeholder="Description (optional)"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div>
          <input
            name="quantity"
            type="number"
            placeholder="Quantity"
            value={form.quantity}
            onChange={handleChange}
          />
        </div>

        <div>
          <input
            name="costPrice"
            type="number"
            placeholder="Cost Price"
            value={form.costPrice}
            onChange={handleChange}
          />
        </div>

        <div>
          <input
            name="sellingPrice"
            type="number"
            placeholder="Selling Price"
            value={form.sellingPrice}
            onChange={handleChange}
          />
        </div>

        <div>
          <input
            name="lowStockThreshold"
            type="number"
            placeholder="Low Stock Threshold"
            value={form.lowStockThreshold}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="action-group" style={{ marginTop: "18px" }}>
        <button type="submit" className="btn btn-primary">
          {editingProduct ? "Update Product" : "Create Product"}
        </button>

        {editingProduct && (
          <button type="button" onClick={onCancel} className="btn btn-secondary">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ProductForm;