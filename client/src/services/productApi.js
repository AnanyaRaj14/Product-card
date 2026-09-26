export async function generateProductDetails(productName, category) {
  const response = await fetch('/api/generate-product', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      productName,
      category
    })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to generate product details');
  }

  return data;
}
