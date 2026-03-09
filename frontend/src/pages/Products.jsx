import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";
import API from "../services/api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [search, setSearch] = useState("");
  const [defaultThreshold, setDefaultThreshold] = useState(5);

  useEffect(() => {
    fetchProducts();
    fetchSettings();
  }, []);

  const fetchProducts = async (searchValue = "") => {
    try {
      const res = await API.get(`/products${searchValue ? `?search=${searchValue}` : ""}`);
      setProducts(res.data);
    } catch (error) {
      console.error("Fetch products error:", error);
    }
  };

  const fetchSettings = async () => {
    try {
      const res = await API.get("/settings");
      setDefaultThreshold(res.data.defaultLowStockThreshold);
    } catch (error) {
      console.error("Fetch settings error:", error);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingProduct) {
        await API.put(`/products/${editingProduct._id}`, formData);
        setEditingProduct(null);
      } else {
        await API.post("/products", formData);
      }

      fetchProducts(search);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to save product");
    }
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("Are you sure you want to delete this product?");
    if (!ok) return;

    try {
      await API.delete(`/products/${id}`);
      fetchProducts(search);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete product");
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    fetchProducts(value);
  };

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">Products</h1>

        <ProductForm
          onSubmit={handleSubmit}
          editingProduct={editingProduct}
          onCancel={() => setEditingProduct(null)}
        />

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by product name or SKU"
            value={search}
            onChange={handleSearch}
            className="bg-white"
          />
        </div>

        <ProductTable
          products={products}
          onEdit={setEditingProduct}
          onDelete={handleDelete}
          defaultThreshold={defaultThreshold}
        />
      </div>
    </>
  );
};

export default Products;