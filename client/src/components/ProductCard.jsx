import TagList from './TagList';
import LoadingSpinner from './LoadingSpinner';
import './ProductCard.css';

function ProductCard({ product, loading }) {
  if (loading) {
    return (
      <div className="product-card empty">
        <LoadingSpinner />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-card empty">
        <div className="empty-state">
          <div className="empty-icon">📦</div>
          <h3 className="empty-title">No Product Generated Yet</h3>
          <p className="empty-text">
            Enter a product name and category, then click "Generate Details" to see AI-generated content.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="product-card">
      <div className="card-header">
        <span className="badge">AI Generated</span>
      </div>
      
      <div className="card-body">
        <h2 className="product-title">{product.title}</h2>
        <p className="product-description">{product.description}</p>
      </div>
      
      <div className="card-footer">
        <h3 className="tags-title">Tags</h3>
        <TagList keywords={product.keywords} />
      </div>
    </div>
  );
}

export default ProductCard;
