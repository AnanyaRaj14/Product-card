import { generateProductDetails } from '../services/aiService.js';

export async function generateProduct(req, res) {
  try {
    const { productName, category } = req.body;

    // Validation
    if (!productName || typeof productName !== 'string' || !productName.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Product name is required'
      });
    }

    if (!category || typeof category !== 'string' || !category.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Category is required'
      });
    }

    // Call AI service
    const productDetails = await generateProductDetails(
      productName.trim(),
      category.trim()
    );

    // Validate AI response
    if (
      !productDetails ||
      typeof productDetails.title !== 'string' ||
      typeof productDetails.description !== 'string' ||
      !Array.isArray(productDetails.keywords)
    ) {
      throw new Error('Invalid AI response format');
    }

    // Return success response
    res.json({
      success: true,
      data: productDetails
    });

  } catch (error) {
    console.error('Product generation error:', error.message);
    console.error('Full error:', error);
    
    res.status(500).json({
      success: false,
      message: 'Unable to generate product details. Please try again.'
    });
  }
}
