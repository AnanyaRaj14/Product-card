// Use environment variable for API URL in production, empty string for local proxy
const API_URL = import.meta.env.VITE_API_URL || '';

export async function generateProductDetails(productName, category) {
  try {
    const response = await fetch(`${API_URL}/api/generate-product`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        productName,
        category
      })
    });

    // Check content type before parsing
    const contentType = response.headers.get('content-type');
    
    if (!contentType || !contentType.includes('application/json')) {
      // Not JSON response - likely an error page
      const text = await response.text();
      console.error('Received non-JSON response:', text.substring(0, 200));
      throw new Error('Backend is not responding correctly. Please ensure the server is running on http://localhost:5000');
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to generate product details');
    }

    return data;
  } catch (error) {
    if (error instanceof SyntaxError) {
      // JSON parsing error
      throw new Error('Backend is not responding correctly. Please ensure the server is running.');
    }
    throw error;
  }
}
