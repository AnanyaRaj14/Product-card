# Quick Setup Guide

## Prerequisites
- Node.js v14 or higher
- npm (comes with Node.js)
- Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

## Installation Steps

### 1. Install Backend Dependencies
```bash
cd server
npm install
```

### 2. Configure Environment Variables
```bash
# Create .env file in server directory
# Add your Gemini API key
```

Edit `server/.env`:
```
GEMINI_API_KEY=your_actual_api_key_here
PORT=5000
```

### 3. Install Frontend Dependencies
```bash
cd ../client
npm install
```

## Running the Application

### Start Backend Server (Terminal 1)
```bash
cd server
npm start
```

Server runs on: http://localhost:5000

### Start Frontend Development Server (Terminal 2)
```bash
cd client
npm run dev
```

Client runs on: http://localhost:5173

## Usage

1. Open http://localhost:5173 in your browser
2. Enter a product name (e.g., "Wireless Bluetooth Headphones")
3. Select a category (e.g., "Electronics")
4. Click "Generate Details"
5. View the AI-generated product card with title, description, and keywords

## Testing

Test these scenarios:
- ✅ Valid input generates product card
- ✅ Empty product name shows validation error
- ✅ Empty category shows validation error
- ✅ Loading state during generation
- ✅ Error handling for API failures
- ✅ Responsive design on mobile/tablet

## Troubleshooting

**Backend won't start:**
- Check if port 5000 is available
- Verify GEMINI_API_KEY is set in .env file
- Run `npm install` in server directory

**Frontend won't start:**
- Check if port 5173 is available
- Run `npm install` in client directory
- Clear browser cache

**API errors:**
- Verify Gemini API key is valid
- Check internet connection
- Review server console for error messages

## Project Structure
```
project/
├── client/           # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
├── server/           # Express backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   └── server.js
│   ├── .env
│   └── package.json
└── README.md
```
