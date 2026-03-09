import { useEffect, useState } from "react";

const initialState = {
  name: "",
  sku: "",
  description: "",
  quantity: 0,
  costPrice: 0,
  sellingPrice: 0,
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
        quantity: editingProduct.quantity ?? 0,
        costPrice: editingProduct.costPrice ?? 0,
        sellingPrice: editingProduct.sellingPrice ?? 0,
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
    <form onSubmit={handleSubmit} className="bg-white p-5 rounded-xl shadow mb-6">
      <h2 className="text-lg font-semibold mb-4">
        {editingProduct ? "Edit Product" : "Add Product"}
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <input name="name" placeholder="Product Name" value={form.name} onChange={handleChange} required />
        <input name="sku" placeholder="SKU" value={form.sku} onChange={handleChange} required />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="md:col-span-2"
        />
        <input name="quantity" type="number" placeholder="Quantity" value={form.quantity} onChange={handleChange} />
        <input name="costPrice" type="number" placeholder="Cost Price" value={form.costPrice} onChange={handleChange} />
        <input
          name="sellingPrice"
          type="number"
          placeholder="Selling Price"
          value={form.sellingPrice}
          onChange={handleChange}
        />
        <input
          name="lowStockThreshold"
          type="number"
          placeholder="Low Stock Threshold"
          value={form.lowStockThreshold}
          onChange={handleChange}
        />
      </div>

      <div className="mt-4 flex gap-3">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          {editingProduct ? "Update Product" : "Create Product"}
        </button>

        {editingProduct && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ProductForm;