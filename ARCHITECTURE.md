# Architecture Documentation

## System Overview

The AI Product Card Generator is a full-stack web application that uses a clean separation between frontend, backend, and AI services.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         User Browser                         │
│                     (http://localhost:5173)                  │
└────────────────┬────────────────────────────────────────────┘
                 │
                 │ HTTP Requests
                 ├─ GET /  (Load React App)
                 └─ POST /api/generate-product
                 │
┌────────────────▼────────────────────────────────────────────┐
│                      Vite Dev Server                         │
│                         (Frontend)                           │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                    React App                          │  │
│  │  ┌──────────────────────────────────────────┐       │  │
│  │  │  Components                               │       │  │
│  │  │  - Header                                 │       │  │
│  │  │  - ProductForm                            │       │  │
│  │  │  - ProductCard                            │       │  │
│  │  │  - TagList                                │       │  │
│  │  │  - LoadingSpinner                         │       │  │
│  │  │  - ErrorMessage                           │       │  │
│  │  └──────────────────────────────────────────┘       │  │
│  │                      │                                │  │
│  │  ┌──────────────────▼───────────────────────┐       │  │
│  │  │  Services                                 │       │  │
│  │  │  - productApi.js (API calls)              │       │  │
│  │  └──────────────────────────────────────────┘       │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────┬────────────────────────────────────────────┘
                 │
                 │ Proxy: /api/* → http://localhost:5000
                 │
┌────────────────▼────────────────────────────────────────────┐
│                    Express Server                            │
│                   (http://localhost:5000)                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Routes Layer                                         │  │
│  │  POST /api/generate-product                           │  │
│  │  GET  /health                                         │  │
│  └──────────────────┬───────────────────────────────────┘  │
│                     │                                        │
│  ┌──────────────────▼───────────────────────────────────┐  │
│  │  Controllers Layer                                    │  │
│  │  - productController.js                               │  │
│  │    * Validate input                                   │  │
│  │    * Call AI service                                  │  │
│  │    * Format response                                  │  │
│  └──────────────────┬───────────────────────────────────┘  │
│                     │                                        │
│  ┌──────────────────▼───────────────────────────────────┐  │
│  │  Services Layer                                       │  │
│  │  - aiService.js                                       │  │
│  │    * Build prompt                                     │  │
│  │    * Call Gemini API                                  │  │
│  │    * Parse response                                   │  │
│  │    * Validate structure                               │  │
│  └──────────────────┬───────────────────────────────────┘  │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ HTTPS Request with API Key
                     │
┌────────────────────▼────────────────────────────────────────┐
│                   Google Gemini API                          │
│                  (generativelanguage.googleapis.com)         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Gemini Pro Model                                     │  │
│  │  - Receives structured prompt                         │  │
│  │  - Generates product content                          │  │
│  │  - Returns JSON response                              │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### Request Flow (Product Generation)

```
User Input
    │
    ├─ Product Name: "Wireless Headphones"
    └─ Category: "Electronics"
    │
    ▼
[ProductForm Component]
    │
    ├─ Validate input (frontend)
    │   ├─ Check name not empty
    │   └─ Check category selected
    │
    ├─ Set loading state
    │   ├─ Disable button
    │   └─ Show spinner
    │
    ▼
[productApi.js Service]
    │
    ├─ POST /api/generate-product
    ├─ Headers: { 'Content-Type': 'application/json' }
    └─ Body: { productName, category }
    │
    ▼
[Express Server - Routes]
    │
    ├─ Match route: POST /api/generate-product
    └─ Forward to: productController.generateProduct()
    │
    ▼
[Product Controller]
    │
    ├─ Extract { productName, category } from req.body
    │
    ├─ Validate input (backend)
    │   ├─ Check productName is string and not empty
    │   ├─ Check category is string and not empty
    │   └─ Return 400 if invalid
    │
    ├─ Call: aiService.generateProductDetails()
    │
    ▼
[AI Service]
    │
    ├─ Initialize Gemini API client
    │
    ├─ Build structured prompt:
    │   "You are an expert e-commerce product copywriter.
    │    Generate product information for:
    │    Product Name: Wireless Headphones
    │    Category: Electronics
    │    Return JSON: { title, description, keywords }"
    │
    ├─ Call: model.generateContent(prompt)
    │
    ▼
[Gemini API]
    │
    ├─ Process natural language prompt
    ├─ Generate creative content
    └─ Return text response
    │
    ▼
[AI Service - Response Handling]
    │
    ├─ Extract text from API response
    │
    ├─ Remove markdown code blocks (if present)
    │   ├─ Strip ```json and ```
    │
    ├─ Parse JSON
    │   └─ JSON.parse(cleanedText)
    │
    ├─ Validate structure
    │   ├─ Check title exists
    │   ├─ Check description exists
    │   └─ Check keywords array exists
    │
    ├─ Return structured data:
    │   {
    │     title: "Premium Wireless Bluetooth Headphones",
    │     description: "Enjoy clear audio...",
    │     keywords: ["wireless", "bluetooth", ...]
    │   }
    │
    ▼
[Product Controller - Response]
    │
    ├─ Validate AI response structure
    │
    ├─ Format success response:
    │   {
    │     success: true,
    │     data: { title, description, keywords }
    │   }
    │
    ├─ Send: res.json(response)
    │
    ▼
[productApi.js Service]
    │
    ├─ Check response.ok
    ├─ Parse JSON
    └─ Return data or throw error
    │
    ▼
[ProductForm Component]
    │
    ├─ Clear loading state
    ├─ Update product state
    └─ Clear any errors
    │
    ▼
[ProductCard Component]
    │
    ├─ Receive product data via props
    │
    ├─ Render product card:
    │   ├─ Badge: "AI Generated"
    │   ├─ Title: "Premium Wireless Bluetooth Headphones"
    │   ├─ Description: "Enjoy clear audio..."
    │   └─ Tags: ["wireless", "bluetooth", ...]
    │
    ▼
User sees beautiful product card! ✨
```

### Error Flow

```
Error Occurs (anywhere in chain)
    │
    ├─ Frontend Validation Failure
    │   ├─ Empty product name
    │   └─ Empty category
    │   │
    │   └─> Display: <ErrorMessage message="..." />
    │
    ├─ Network Error
    │   ├─ Backend not running
    │   └─ No internet connection
    │   │
    │   └─> Catch in productApi.js
    │       └─> Display: "Something went wrong..."
    │
    ├─ Backend Validation Failure
    │   ├─ Invalid input format
    │   └─ Missing fields
    │   │
    │   └─> Return 400 with { success: false, message: "..." }
    │       └─> Display error message
    │
    ├─ Gemini API Error
    │   ├─ Invalid API key
    │   ├─ Rate limit exceeded
    │   └─ Network timeout
    │   │
    │   └─> Catch in aiService.js
    │       └─> Throw: "Failed to generate product details"
    │           └─> Controller catches
    │               └─> Return 500 with generic message
    │                   └─> Display: "Unable to generate..."
    │
    └─ JSON Parsing Error
        ├─ Invalid AI response
        └─ Malformed JSON
        │
        └─> Catch in aiService.js
            └─> Return 500 with generic message
                └─> Display: "Unable to generate..."
```

## Component Architecture (Frontend)

```
App.jsx (Root Component)
│
├─ State Management
│  ├─ productName: ""
│  ├─ category: ""
│  ├─ product: null
│  ├─ loading: false
│  └─ error: ""
│
├─ Handlers
│  └─ handleSubmit()
│     ├─ Validate input
│     ├─ Call API
│     ├─ Update state
│     └─ Handle errors
│
└─ Render Tree
   │
   ├─ <Header />
   │  └─ Displays app title and subtitle
   │
   └─ <main className="container">
      │
      └─ <div className="main-layout">
         │
         ├─ <div className="form-section">
         │  │
         │  ├─ <ProductForm
         │  │     productName={productName}
         │  │     setProductName={setProductName}
         │  │     category={category}
         │  │     setCategory={setCategory}
         │  │     onSubmit={handleSubmit}
         │  │     loading={loading}
         │  │  />
         │  │  │
         │  │  ├─ Product Name Input
         │  │  ├─ Category Select
         │  │  └─ Generate Button
         │  │
         │  └─ {error && <ErrorMessage message={error} />}
         │
         └─ <div className="card-section">
            │
            └─ <ProductCard
                  product={product}
                  loading={loading}
               />
               │
               ├─ if (loading)
               │  └─ <LoadingSpinner />
               │
               ├─ else if (!product)
               │  └─ Empty State
               │
               └─ else
                  ├─ Badge
                  ├─ Title
                  ├─ Description
                  └─ <TagList keywords={product.keywords} />
                     └─ Map keywords to <span> tags
```

## Backend Architecture

```
server.js
    │
    ├─ Load dotenv
    ├─ Import app
    └─ Start server on PORT
    │
    ▼
app.js (Express Application)
    │
    ├─ Middleware
    │  ├─ cors()
    │  └─ express.json()
    │
    ├─ Routes
    │  ├─ /api → productRoutes
    │  ├─ /health → Health check
    │  ├─ 404 handler
    │  └─ Error handler
    │
    └─ Export app
    │
    ▼
productRoutes.js
    │
    └─ POST /generate-product → productController.generateProduct
    │
    ▼
productController.js
    │
    ├─ generateProduct(req, res)
    │  │
    │  ├─ Validate input
    │  ├─ Call aiService.generateProductDetails()
    │  ├─ Validate response
    │  ├─ Return success or error
    │  └─ Handle exceptions
    │
    ▼
aiService.js
    │
    ├─ Initialize GoogleGenerativeAI
    │  └─ API Key from process.env.GEMINI_API_KEY
    │
    └─ generateProductDetails(productName, category)
       │
       ├─ Get model: gemini-pro
       ├─ Build prompt
       ├─ Call model.generateContent()
       ├─ Parse response
       ├─ Clean JSON (remove markdown)
       ├─ Validate structure
       └─ Return { title, description, keywords }
```

## State Management Flow

```
React Component State (useState)
    │
    ├─ [productName, setProductName]
    │  └─ Updated on input change
    │     └─ <input onChange={e => setProductName(e.target.value)} />
    │
    ├─ [category, setCategory]
    │  └─ Updated on select change
    │     └─ <select onChange={e => setCategory(e.target.value)} />
    │
    ├─ [product, setProduct]
    │  ├─ null (initial)
    │  └─ Updated on API success
    │     └─ setProduct(response.data)
    │
    ├─ [loading, setLoading]
    │  ├─ false (initial)
    │  ├─ true (during API call)
    │  └─ false (after response)
    │
    └─ [error, setError]
       ├─ "" (initial)
       ├─ "error message" (on validation or API error)
       └─ "" (cleared on new submission)
```

## API Security Architecture

```
┌─────────────────────────────────────────┐
│  Gemini API Key Security                │
├─────────────────────────────────────────┤
│                                          │
│  ❌ NOT in frontend code                │
│  ❌ NOT in Git repository               │
│  ❌ NOT in browser                      │
│                                          │
│  ✅ Stored in server/.env               │
│  ✅ Loaded via dotenv                   │
│  ✅ Only accessible to backend          │
│  ✅ Excluded via .gitignore             │
│                                          │
└─────────────────────────────────────────┘

User Browser → Cannot see API key
     │
     └─> Sends product name & category
         │
         ▼
    Backend Server → Has API key
         │
         └─> Calls Gemini API with key
             │
             ▼
         Gemini API
```

## Deployment Architecture (Production)

```
┌──────────────────────────────────────────┐
│         Frontend (Vite Build)            │
│         Deployed on: Vercel/Netlify      │
│         URL: https://your-app.com        │
└────────────────┬─────────────────────────┘
                 │
                 │ API Calls to backend
                 │
┌────────────────▼─────────────────────────┐
│         Backend (Express)                │
│         Deployed on: Railway/Render      │
│         URL: https://api.your-app.com    │
│                                          │
│  Environment Variables:                  │
│  - GEMINI_API_KEY (from hosting env)    │
│  - PORT (from hosting env)               │
└────────────────┬─────────────────────────┘
                 │
                 │ HTTPS with API Key
                 │
┌────────────────▼─────────────────────────┐
│         Google Gemini API                │
│         generativelanguage.googleapis.com│
└──────────────────────────────────────────┘
```

## Technology Stack Details

### Frontend Stack
```
React 18.3.1
├─ Component library
├─ Virtual DOM
├─ Hooks API (useState)
└─ JSX syntax

Vite 5.4.11
├─ Build tool
├─ Dev server with HMR
├─ Fast refresh
└─ Proxy configuration

CSS
├─ CSS modules (component scoped)
├─ CSS variables (theming)
├─ Flexbox (layout)
├─ Grid (responsive layout)
└─ Media queries (responsive)
```

### Backend Stack
```
Node.js
├─ JavaScript runtime
├─ Event-driven
├─ Non-blocking I/O
└─ NPM package manager

Express 4.21.2
├─ Web framework
├─ Routing
├─ Middleware support
└─ RESTful API

@google/generative-ai 0.21.0
├─ Gemini SDK
├─ AI model access
├─ Streaming support
└─ Type definitions

Supporting Libraries
├─ cors: Cross-origin requests
├─ dotenv: Environment variables
└─ body-parser: JSON parsing
```

## File Naming Conventions

```
Components:     PascalCase.jsx
               ├─ Header.jsx
               ├─ ProductForm.jsx
               └─ ProductCard.jsx

Styles:        PascalCase.css
               ├─ Header.css
               ├─ ProductForm.css
               └─ ProductCard.css

Services:      camelCase.js
               └─ productApi.js

Controllers:   camelCase.js
               └─ productController.js

Routes:        camelCase.js
               └─ productRoutes.js

Config Files:  kebab-case or standard
               ├─ vite.config.js
               ├─ .env
               └─ package.json
```

## Design Patterns Used

1. **Component Pattern** (React)
   - Reusable UI components
   - Props for data flow
   - Single responsibility

2. **Service Pattern** (Frontend)
   - API calls in separate service
   - Business logic abstraction
   - Easy testing

3. **MVC Pattern** (Backend)
   - Routes (entry point)
   - Controllers (request handling)
   - Services (business logic)

4. **Dependency Injection**
   - Environment variables
   - Configuration separation
   - Easy testing

5. **Error Handling Pattern**
   - Try-catch blocks
   - Graceful degradation
   - User-friendly messages

## Scalability Considerations

```
Current:  Single server, synchronous processing
          └─> Perfect for demo/assignment

Future Scaling Options:
├─ Add caching (Redis)
│  └─ Cache common product generations
├─ Add queue (Bull/RabbitMQ)
│  └─ Handle async processing
├─ Add database (MongoDB/PostgreSQL)
│  └─ Store generated products
├─ Add authentication (JWT)
│  └─ User accounts and history
└─ Add rate limiting
   └─ Prevent API abuse
```

---

**Architecture Type:** Client-Server with AI Integration  
**Pattern:** RESTful API  
**Communication:** JSON over HTTP  
**Security:** API key isolation, input validation  
**Scalability:** Horizontal (stateless backend)  
**Maintainability:** High (clear separation of concerns)
