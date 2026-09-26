# AI Product Card Generator

A modern web application that uses AI to generate professional product content including titles, descriptions, and keywords for e-commerce product cards.

## Overview

This application allows users to enter a product name and category, then leverages Google's Gemini AI to automatically generate:
- **Product Title**: A catchy, professional title
- **Description**: A concise 2-3 sentence product description
- **Keywords**: 5-8 relevant tags for SEO and categorization

The generated content is displayed in a beautiful, responsive product card interface.

## Features

- ✨ AI-powered content generation using Google Gemini
- 📝 Simple product name and category input
- 🎨 Beautiful, responsive product card design
- ⚡ Real-time loading states and animations
- 🛡️ Comprehensive error handling
- 📱 Fully responsive mobile-first design
- ♿ Accessible form controls and semantic HTML

## Tech Stack

### Frontend
- **React.js**: Modern UI library for building component-based interfaces
- **JavaScript**: No TypeScript for simplicity
- **CSS Modules**: Scoped styling for maintainable code
- **Fetch API**: Native browser API for HTTP requests

### Backend
- **Node.js**: JavaScript runtime for server-side code
- **Express.js**: Minimal web framework for REST API
- **Gemini API**: Google's generative AI for content creation
- **dotenv**: Secure environment variable management

## Architecture

```
User Input (Product Name + Category)
          ↓
    React Frontend
          ↓
    REST API Request
          ↓
   Express Backend
          ↓
    Gemini AI API
          ↓
Generated Content (JSON)
          ↓
   Product Card Display
```

## Where AI Is Used

The application uses **Google Gemini AI** on the backend to generate:

1. **Product Title**: A professional, attention-grabbing title optimized for e-commerce
2. **Product Description**: A concise 2-3 sentence description highlighting key features
3. **Keywords/Tags**: 5-8 relevant keywords for SEO and product categorization

The AI is prompted with specific instructions to:
- Generate content suitable for e-commerce
- Maintain professional tone
- Avoid unsupported claims
- Return structured JSON data

**Important**: AI-generated content should be reviewed by humans before use in production. The content is not guaranteed to be factually accurate.

## Design Choices

### Two-Column Layout (Desktop)
- **Left**: Input form remains visible for easy re-generation
- **Right**: Generated product card for immediate preview
- **Mobile**: Stacks vertically for optimal mobile experience

### Card-Based Design
- Modern, clean aesthetic with rounded corners and subtle shadows
- Clear visual hierarchy with distinct sections
- Tag chips for keywords with hover effects
- Professional color scheme suitable for business use

### State Management
- Simple `useState` hooks (no Redux needed)
- Minimal state: form inputs, product data, loading, error
- Keeps the codebase simple and maintainable

### Loading & Error States
- Clear feedback during API requests
- Disabled buttons prevent duplicate submissions
- User-friendly error messages without exposing technical details
- Empty state guidance when no content is generated yet

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Add your Gemini API key to `.env`:
```
GEMINI_API_KEY=your_api_key_here
PORT=5000
```

5. Start the backend server:
```bash
npm start
```

Server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

Client will run on `http://localhost:5173` (Vite default)

## API Documentation

### Generate Product Details

**Endpoint**: `POST /api/generate-product`

**Request Body**:
```json
{
  "productName": "Wireless Bluetooth Headphones",
  "category": "Electronics"
}
```

**Success Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "title": "Premium Wireless Bluetooth Headphones",
    "description": "Enjoy clear audio and comfortable listening with these wireless Bluetooth headphones, designed for everyday use.",
    "keywords": [
      "wireless",
      "bluetooth",
      "headphones",
      "audio",
      "music",
      "portable"
    ]
  }
}
```

**Error Response** (400/500):
```json
{
  "success": false,
  "message": "Unable to generate product details."
}
```

### Supported Categories
- Electronics
- Fashion
- Beauty
- Home & Kitchen
- Sports
- Books
- Accessories
- Other

## Project Structure

```
project/
│
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   │   ├── Header.jsx
│   │   │   ├── ProductForm.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── TagList.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── ErrorMessage.jsx
│   │   ├── services/      # API service layer
│   │   │   └── productApi.js
│   │   ├── App.jsx        # Main app component
│   │   ├── main.jsx       # Entry point
│   │   └── index.css      # Global styles
│   └── package.json
│
├── server/                # Express backend
│   ├── src/
│   │   ├── controllers/   # Request handlers
│   │   │   └── productController.js
│   │   ├── routes/        # API routes
│   │   │   └── productRoutes.js
│   │   ├── services/      # Business logic
│   │   │   └── aiService.js
│   │   ├── app.js         # Express app setup
│   │   └── server.js      # Server entry point
│   ├── .env              # Environment variables (not in git)
│   ├── .env.example      # Template for .env
│   └── package.json
│
├── .gitignore
└── README.md
```

## Testing Checklist

- [x] Valid input generates product card
- [x] Empty product name shows validation error
- [x] Empty category shows validation error
- [x] Loading state appears during generation
- [x] Button is disabled during API request
- [x] Error state shows user-friendly message
- [x] Responsive design works on mobile/tablet/desktop
- [x] Multiple rapid clicks don't cause duplicate requests

## Limitations

1. **AI Content Accuracy**: Generated content may not be factually accurate and should be reviewed before production use
2. **API Rate Limits**: Gemini API has rate limits; excessive requests may fail
3. **Network Dependency**: Requires internet connection for AI generation
4. **English Only**: Currently optimized for English content generation
5. **No Persistence**: Generated content is not saved; refresh clears data

## Security Notes

- ✅ API key stored securely in backend `.env` file
- ✅ API key never exposed to frontend
- ✅ Input validation on both frontend and backend
- ✅ Error messages don't expose sensitive information
- ✅ `.env` file excluded from git

## Future Enhancements

- Image generation using AI
- Save/export generated product cards
- Multiple language support
- Batch product generation
- Custom prompt templates
- Product card themes/templates

## License

MIT

## Support

For issues or questions, please open an issue on the repository.
