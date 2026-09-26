import './ProductForm.css';

const CATEGORIES = [
  'Electronics',
  'Fashion',
  'Beauty',
  'Home & Kitchen',
  'Sports',
  'Books',
  'Accessories',
  'Other'
];

function ProductForm({ productName, setProductName, category, setCategory, onSubmit, loading }) {
  return (
    <div className="product-form-card">
      <h2 className="form-title">Product Information</h2>
      
      <form onSubmit={onSubmit} className="product-form">
        <div className="form-group">
          <label htmlFor="productName" className="form-label">
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            className="form-input"
            placeholder="Enter product name..."
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            id="category"
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={loading}
          >
            <option value="">Select a category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        
        <button
          type="submit"
          className="submit-button"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner"></span>
              Generating...
            </>
          ) : (
            <>
              <span>✨</span>
              Generate Details
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default ProductForm;
