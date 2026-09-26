# 🎨 AI Product Card Generator

A modern, full-stack web application that uses Google's Gemini AI to automatically generate professional product titles, descriptions, and keywords for e-commerce product cards.

![React](https://img.shields.io/badge/React-18.3.1-blue)
![Node.js](https://img.shields.io/badge/Node.js-v14+-green)
![Express](https://img.shields.io/badge/Express-4.21.2-lightgrey)
![Gemini AI](https://img.shields.io/badge/Gemini-AI-orange)

## ✨ Features

- 🤖 **AI-Powered Content Generation** - Uses Google Gemini to create professional product content
- 🎨 **Beautiful UI** - Modern, responsive design with gradient headers and smooth animations
- 📱 **Fully Responsive** - Works perfectly on desktop, tablet, and mobile devices
- ⚡ **Real-time Loading States** - Visual feedback during content generation
- 🛡️ **Error Handling** - Comprehensive validation and user-friendly error messages
- 🔄 **Smart Retry Logic** - Automatic fallback to alternative models if one is unavailable
- 🎯 **8 Product Categories** - Electronics, Fashion, Beauty, Sports, Books, and more

## 🚀 Demo

![Demo Screenshot](demo-screenshot.png)

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

## ⚙️ Installation

### 1. Clone the repository
```bash
git clone https://github.com/AnanyaRaj14/Product-card.git
cd Product-card
```

### 2. Install Backend Dependencies
```bash
cd server
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the `server` directory:
```bash
cp .env.example .env
```

Edit `server/.env` and add your Gemini API key:
```env
GEMINI_API_KEY=your_api_key_here
PORT=5000
```

### 4. Install Frontend Dependencies
```bash
cd ../client
npm install
```

## 🎮 Running the Application

### Start Backend Server
```bash
cd server
npm start
```
Server will run on `http://localhost:5000`

### Start Frontend Development Server
```bash
cd client
npm run dev
```
Client will run on `http://localhost:5173`

### Access the Application
Open your browser and navigate to: `http://localhost:5173`

## 🎯 Usage

1. Enter a product name (e.g., "Wireless Headphones")
2. Select a category (e.g., "Electronics")
3. Click "Generate Details"
4. View your AI-generated product card with:
   - Professional product title
   - Concise description (2-3 sentences)
   - Relevant keywords/tags (5-8 tags)

## 🏗️ Project Structure

```
Product-card/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── services/      # API service layer
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   └── package.json
├── server/                # Express backend
│   ├── src/
│   │   ├── controllers/   # Request handlers
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   ├── app.js         # Express app
│   │   └── server.js      # Server entry
│   ├── .env              # Environment variables (not in git)
│   └── package.json
└── README.md
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **CSS** - Styling (no frameworks)
- **Fetch API** - HTTP requests

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **Google Gemini AI** - Content generation
- **dotenv** - Environment variable management

## 🎨 Design Features

- Modern gradient headers
- Smooth loading animations
- Interactive tag components with hover effects
- Two-column desktop layout
- Single-column mobile layout
- Empty state with helpful guidance
- User-friendly error messages

## 🔐 Security

- ✅ API keys stored securely in `.env` (not committed to git)
- ✅ Input validation on both frontend and backend
- ✅ Error messages don't expose sensitive information
- ✅ CORS configured properly
- ✅ Environment variables properly separated

## 🤖 AI Integration

The application uses Google's Gemini AI with intelligent fallback:

1. Tries `gemini-3.8-flash` (newest model)
2. Falls back to `gemini-3.7-flash` if unavailable
3. Falls back to `gemini-3.6-flash`
4. Falls back to `gemini-3.5-flash`

Each model is attempted up to 3 times with exponential backoff for reliability.

## 📝 API Endpoints

### Generate Product Details
```
POST /api/generate-product
```

**Request Body:**
```json
{
  "productName": "Wireless Headphones",
  "category": "Electronics"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "title": "Premium Wireless Bluetooth Headphones",
    "description": "Enjoy clear audio and comfortable listening...",
    "keywords": ["wireless", "bluetooth", "headphones", "audio"]
  }
}
```

## 🧪 Testing

Try these test cases:

1. **Valid Input**: "Wireless Headphones" + "Electronics"
2. **Empty Fields**: Test validation by leaving fields empty
3. **Different Categories**: Try all 8 categories
4. **Long Product Names**: Test with lengthy product descriptions
5. **Rapid Generation**: Generate multiple products quickly

## 📱 Responsive Breakpoints

- **Desktop**: > 968px (two-column layout)
- **Tablet**: 768px - 968px (single column)
- **Mobile**: < 768px (optimized for small screens)

## 🐛 Troubleshooting

### Backend won't start
- Verify Node.js is installed: `node --version`
- Check if port 5000 is available
- Ensure API key is set in `.env`

### Frontend shows errors
- Make sure backend is running first
- Check console for specific errors
- Verify proxy configuration in `vite.config.js`

### API returns 503 errors
- This means Google's API is temporarily overloaded
- The app will automatically retry with fallback models
- Wait 10-15 seconds for the retry logic to complete

## 📚 Documentation

For more detailed information, see:
- [Setup Guide](SETUP_GUIDE.md)
- [Testing Guide](TESTING_GUIDE.md)
- [Architecture](ARCHITECTURE.md)
- [Implementation Summary](IMPLEMENTATION_SUMMARY.md)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Ananya Raj**

- GitHub: [@AnanyaRaj14](https://github.com/AnanyaRaj14)
- Repository: [Product-card](https://github.com/AnanyaRaj14/Product-card)

## 🙏 Acknowledgments

- Google Gemini AI for powerful content generation
- React team for the amazing UI library
- Express.js for the simple and elegant backend framework

## 🔮 Future Enhancements

- [ ] Save generated products to database
- [ ] User authentication and history
- [ ] Export product cards as images
- [ ] Bulk product generation
- [ ] Custom AI prompt templates
- [ ] Multiple language support
- [ ] Product image generation using AI

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!

---

**Made with ❤️ by Ananya Raj**
