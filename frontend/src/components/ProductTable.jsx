const ProductTable = ({ products, onEdit, onDelete, defaultThreshold }) => {
  const getLowStock = (product) => {
    const threshold =
      product.lowStockThreshold === null || product.lowStockThreshold === undefined
        ? defaultThreshold
        : product.lowStockThreshold;

    return product.quantity <= threshold;
  };

  return (
    <div className="table-card">
      <div className="table-header">
        <div>
          <h3 className="table-title">Products Inventory</h3>
          <div className="table-subtitle">
            Manage your product stock, pricing, and thresholds
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
              <th>Selling Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.sku}</td>
                  <td>{product.quantity}</td>
                  <td>₹{product.sellingPrice}</td>
                  <td>
                    {getLowStock(product) ? (
                      <span className="badge badge-danger">Low Stock</span>
                    ) : (
                      <span className="badge badge-success">In Stock</span>
                    )}
                  </td>
                  <td>
                    <div className="action-group">
                      <button
                        onClick={() => onEdit(product)}
                        className="btn btn-warning btn-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(product._id)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="empty-state">
                  No products found. Start by adding your first product.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;