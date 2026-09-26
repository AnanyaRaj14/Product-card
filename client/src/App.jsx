import { useState } from 'react';
import Header from './components/Header';
import ProductForm from './components/ProductForm';
import ProductCard from './components/ProductCard';
import ErrorMessage from './components/ErrorMessage';
import { generateProductDetails } from './services/productApi';
import './App.css';

function App() {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous states
    setError('');
    
    // Validation
    if (!productName.trim()) {
      setError('Please enter a product name');
      return;
    }
    
    if (!category) {
      setError('Please select a category');
      return;
    }

    // Generate product details
    setLoading(true);
    
    try {
      const response = await generateProductDetails(productName, category);
      setProduct(response.data);
      setError('');
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <Header />
      
      <main className="container">
        <div className="main-layout">
          <div className="form-section">
            <ProductForm
              productName={productName}
              setProductName={setProductName}
              category={category}
              setCategory={setCategory}
              onSubmit={handleSubmit}
              loading={loading}
            />
            
            {error && <ErrorMessage message={error} />}
          </div>
          
          <div className="card-section">
            <ProductCard product={product} loading={loading} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
