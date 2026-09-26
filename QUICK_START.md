# 🚀 Quick Start Guide

Get the AI Product Card Generator running in 5 minutes!

## Prerequisites ✅

- Node.js v14+ installed
- Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

## Installation (3 steps)

### 1️⃣ Install Backend
```bash
cd server
npm install
```

### 2️⃣ Add Your API Key
Edit `server/.env`:
```
GEMINI_API_KEY=paste_your_api_key_here
PORT=5000
```

### 3️⃣ Install Frontend
```bash
cd ../client
npm install
```

## Run the App (2 terminals)

### Terminal 1: Start Backend
```bash
cd server
npm start
```
✅ Backend running on: http://localhost:5000

### Terminal 2: Start Frontend
```bash
cd client
npm run dev
```
✅ Frontend running on: http://localhost:5173

## Test It! 🎉

1. Open http://localhost:5173
2. Enter: **Wireless Headphones**
3. Select: **Electronics**
4. Click: **Generate Details**
5. Watch the magic! ✨

## Troubleshooting 🔧

**Backend won't start?**
- Check if port 5000 is free
- Verify API key is in `server/.env`

**Frontend shows errors?**
- Make sure backend is running first
- Check console for specific errors

**API fails?**
- Confirm API key is valid
- Check internet connection

## Project Structure 📁

```
Content Generator/
├── client/          # React frontend (port 5173)
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
│
├── server/          # Express backend (port 5000)
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   └── server.js
│   ├── .env        # ⚠️ Add your API key here!
│   └── package.json
│
└── README.md       # Full documentation
```

## Key Files to Know 📄

| File | Purpose |
|------|---------|
| `server/.env` | **Your API key goes here** |
| `client/src/App.jsx` | Main React component |
| `server/src/services/aiService.js` | Gemini AI integration |
| `client/src/components/ProductCard.jsx` | Product display |
| `README.md` | Complete documentation |

## Common Commands 🖥️

```bash
# Start backend (from server folder)
npm start

# Start frontend (from client folder)  
npm run dev

# Install dependencies (in each folder)
npm install

# Check backend health
curl http://localhost:5000/health
```

## Test Checklist ✅

- [ ] Enter product name and category
- [ ] Click "Generate Details"
- [ ] See loading spinner
- [ ] Product card appears with AI content
- [ ] Try different categories
- [ ] Test on mobile view (DevTools)

## Need Help? 📚

- **Full Setup:** See `SETUP_GUIDE.md`
- **Testing:** See `TESTING_GUIDE.md`
- **API Docs:** See `README.md`
- **Implementation:** See `IMPLEMENTATION_SUMMARY.md`

## Features ✨

✅ AI-powered product content generation  
✅ Beautiful responsive design  
✅ Real-time loading states  
✅ Error handling  
✅ Mobile-friendly  
✅ Professional UI  

## Tech Stack 💻

**Frontend:** React, Vite, CSS  
**Backend:** Node.js, Express  
**AI:** Google Gemini API  

---

**Time to run:** 5 minutes  
**Difficulty:** Easy  
**Status:** Production Ready 🎉

Ready to impress! 🚀
