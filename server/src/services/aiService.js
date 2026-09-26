import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Helper function to add delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function generateProductDetails(productName, category) {
  // Try multiple models in order of preference if one is unavailable
  const modelsToTry = [
    'gemini-3.8-flash',
    'gemini-3.7-flash',
    'gemini-3.6-flash',
    'gemini-3.5-flash'
  ];

  const prompt = `You are an expert e-commerce product copywriter.
Generate product information for the following product.

Product Name: ${productName}
Category: ${category}

Return:
1. A catchy but professional product title.
2. A concise product description of 2-3 sentences.
3. 5-8 relevant keywords/tags.

The content should:
- Be suitable for an e-commerce product card.
- Be concise and easy to understand.
- Avoid making unsupported technical claims.
- Avoid unnecessary marketing exaggeration.

Return ONLY valid JSON in this structure:

{
  "title": "...",
  "description": "...",
  "keywords": ["...", "...", "..."]
}

Do not include any text before or after the JSON.`;

  let lastError = null;
  
  // Try each model until one works
  for (const modelName of modelsToTry) {
    // Try each model up to 3 times with exponential backoff
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        if (attempt > 1) {
          const waitTime = Math.min(1000 * Math.pow(2, attempt - 1), 5000);
          console.log(`Retry attempt ${attempt} for ${modelName} after ${waitTime}ms...`);
          await delay(waitTime);
        } else {
          console.log(`Trying model: ${modelName}...`);
        }
        
        const model = genAI.getGenerativeModel({ model: modelName });
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        console.log(`✅ Success with model: ${modelName}`);

        // Extract JSON from response (handle cases where AI adds markdown code blocks)
        let jsonText = text.trim();
        
        // Remove markdown code blocks if present
        if (jsonText.startsWith('```json')) {
          jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
        } else if (jsonText.startsWith('```')) {
          jsonText = jsonText.replace(/```\n?/g, '');
        }

        jsonText = jsonText.trim();

        // Parse JSON
        const productDetails = JSON.parse(jsonText);

        // Validate structure
        if (!productDetails.title || !productDetails.description || !productDetails.keywords) {
          throw new Error('Missing required fields in AI response');
        }

        return {
          title: productDetails.title,
          description: productDetails.description,
          keywords: productDetails.keywords
        };
      
      } catch (error) {
        lastError = error;
        console.error(`❌ Model ${modelName} attempt ${attempt} failed:`, error.message);
        
        // If it's a 503 (service unavailable), retry same model
        if (error.status === 503 || error.message.includes('high demand')) {
          if (attempt < 3) {
            console.log(`Model ${modelName} is overloaded, retrying...`);
            continue; // Retry same model
          } else {
            console.log(`Model ${modelName} failed after 3 attempts, trying next model...`);
            break; // Try next model
          }
        }
        
        // For other errors (404, auth), skip to next model immediately
        if (error.status === 404 || error.status === 401 || error.status === 403) {
          console.log(`Model ${modelName} not available (${error.status}), trying next model...`);
          break; // Try next model
        }
        
        // For other errors, retry
        if (attempt < 3) {
          continue; // Retry same model
        } else {
          break; // Try next model
        }
      }
    }
  }
  
  // All models failed
  console.error('All models failed. Last error:', lastError?.message);
  console.error('API Key exists:', !!process.env.GEMINI_API_KEY);
  console.error('API Key length:', process.env.GEMINI_API_KEY?.length);
  throw new Error('Failed to generate product details. All models are currently unavailable.');
}
