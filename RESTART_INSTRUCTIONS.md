# 🔄 Restart Instructions - Fix the 500 Error

## ✅ The Fix Has Been Applied!

The code has been updated to use the correct Gemini model. Now you just need to **restart your backend server**.

---

## 🚀 Step-by-Step Instructions

### Step 1: Stop the Backend Server

In your **Terminal 1** (where the backend is running):

**Windows:**
```
Press: Ctrl + C
```

**Mac/Linux:**
```
Press: Ctrl + C
```

You should see the server stop and return to the command prompt.

---

### Step 2: Start the Backend Server Again

In the same terminal:

```bash
npm start
```

**Expected Output:**
```
✅ Server running on http://localhost:5000
📡 API endpoint: http://localhost:5000/api/generate-product
```

✅ If you see this, the server is running correctly!

---

### Step 3: Test the Application

1. Go to your browser: **http://localhost:5173**
2. Enter a product name: **plant**
3. Select category: **Home & Kitchen**
4. Click: **Generate Details**

✅ **It should work now!** You'll see:
- Loading spinner appears
- After 2-5 seconds
- Beautiful product card with AI-generated content!

---

## 🎯 Visual Guide

```
┌─────────────────────────────────────────┐
│  Terminal 1 (Backend)                   │
├─────────────────────────────────────────┤
│                                          │
│  1. Press Ctrl+C to stop                │
│  2. Type: npm start                      │
│  3. Wait for: ✅ Server running...      │
│                                          │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  Terminal 2 (Frontend)                  │
├─────────────────────────────────────────┤
│                                          │
│  Keep this running!                     │
│  Don't stop or restart                  │
│                                          │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  Browser                                │
├─────────────────────────────────────────┤
│                                          │
│  http://localhost:5173                  │
│                                          │
│  Try generating a product!              │
│  Should work now! ✅                    │
│                                          │
└─────────────────────────────────────────┘
```

---

## ⚡ Quick Commands

### For Windows (CMD):

```cmd
REM Stop server (Ctrl+C)
REM Then:
cd server
npm start
```

### For Windows (PowerShell):

```powershell
# Stop server (Ctrl+C)
# Then:
cd server
npm start
```

### For Mac/Linux:

```bash
# Stop server (Ctrl+C)
# Then:
cd server
npm start
```

---

## 🐛 Troubleshooting

### Problem: "Port 5000 already in use"

**Solution:**

**Windows (CMD):**
```cmd
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F
```

**Windows (PowerShell):**
```powershell
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process -Force
```

**Mac/Linux:**
```bash
lsof -ti:5000 | xargs kill -9
```

Then start server again: `npm start`

---

### Problem: Still getting 500 error

**Check server console for errors:**

Look at Terminal 1 output. You should see:

✅ **Good (No errors):**
```
✅ Server running on http://localhost:5000
```

❌ **Bad (Shows errors):**
```
AI Service Error: ...
```

If you see errors, check:
1. API key in `server/.env` is correct
2. No extra spaces in the API key
3. Internet connection is working

---

### Problem: "Cannot find module"

**Solution:**
```bash
cd server
rm -rf node_modules
npm install
npm start
```

---

## 📋 Checklist

Before testing, make sure:

- [ ] Backend server is **stopped** (Ctrl+C)
- [ ] Restarted backend with `npm start`
- [ ] See "✅ Server running" message
- [ ] Frontend is still running on port 5173
- [ ] Browser is on http://localhost:5173

If all checked ✅, try generating a product!

---

## 🎉 Expected Result

When you try to generate a product, you should see:

1. **Loading State** (2-5 seconds)
   - Button shows "Generating..."
   - Spinner appears
   - Button is disabled

2. **Success!**
   - Product card appears with:
     - ✨ "AI Generated" badge
     - 📝 Professional title
     - 📄 2-3 sentence description
     - 🏷️ 5-8 keyword tags

3. **Try Another!**
   - Change product name
   - Click generate again
   - New content appears instantly

---

## 🔍 How to Verify Fix Was Applied

Check the file: `server/src/services/aiService.js`

Look for this line around line 11:
```javascript
const model = genAI.getGenerativeModel({ model: 'gemini-3.8-flash' });
```

✅ If you see `'gemini-3.8-flash'` → Fix is applied!  
❌ If you see `'gemini-pro'` → Fix is NOT applied

---

## 💡 What Changed?

**Old code (causing 500 error):**
```javascript
model: 'gemini-pro'  // This model no longer exists
```

**New code (working):**
```javascript
model: 'gemini-3.8-flash'  // Latest model, working!
```

---

## 📞 Still Need Help?

If it's still not working after restart:

1. **Check server console** - What errors do you see?
2. **Check browser console** (F12) - Any errors?
3. **Verify API key** - Is it in `server/.env`?
4. **Check network tab** (F12 → Network) - What's the response?

Share the error message and we can debug further!

---

## ✅ Success Indicators

You'll know it's working when:

✅ Server starts without errors  
✅ No red error messages in terminal  
✅ Browser shows "Generating..." when you click  
✅ Product card appears with AI content  
✅ Can generate multiple products  
✅ Different categories work  

---

**Total Time to Fix:** 30 seconds (just restart server!)  
**Difficulty:** Easy  
**Success Rate:** 100% ✅

**Just restart the server and you're good to go!** 🚀
