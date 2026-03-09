const ProductTable = ({ products, onEdit, onDelete, defaultThreshold }) => {
  const getLowStock = (product) => {
    const threshold =
      product.lowStockThreshold === null || product.lowStockThreshold === undefined
        ? defaultThreshold
        : product.lowStockThreshold;

    return product.quantity <= threshold;
  };

  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left px-4 py-3">Name</th>
            <th className="text-left px-4 py-3">SKU</th>
            <th className="text-left px-4 py-3">Quantity</th>
            <th className="text-left px-4 py-3">Selling Price</th>
            <th className="text-left px-4 py-3">Low Stock</th>
            <th className="text-left px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product._id} className="border-t">
                <td className="px-4 py-3">{product.name}</td>
                <td className="px-4 py-3">{product.sku}</td>
                <td className="px-4 py-3">{product.quantity}</td>
                <td className="px-4 py-3">₹{product.sellingPrice}</td>
                <td className="px-4 py-3">
                  {getLowStock(product) ? (
                    <span className="text-red-600 font-medium">Yes</span>
                  ) : (
                    <span className="text-green-600 font-medium">No</span>
                  )}
                </td>
                <td className="px-4 py-3 flex gap-2">
                  <button
                    onClick={() => onEdit(product)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(product._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="px-4 py-4 text-center text-gray-500" colSpan="6">
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;