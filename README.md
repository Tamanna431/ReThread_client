# 🌿 ReThread - Full-Stack Sustainable Fashion Marketplace

> **Making fashion sustainable, and sustainability fashionable. Powered by Agentic AI.**

ReThread is a production-ready, full-stack sustainable fashion marketplace that enables users to buy and sell pre-loved clothing, accessories, and shoes. Every transaction on ReThread contributes directly to the circular economy — saving water, reducing CO₂ emissions, and keeping clothing out of landfills.

---

## 🚀 Live Deployments & Repository Links

*   **Live Web App (Vercel):** [https://re-thread-client.vercel.app](https://re-thread-client.vercel.app)
*   **Live Backend API (Vercel):** [https://re-thread-server-eta.vercel.app](https://re-thread-server-eta.vercel.app)
*   **Frontend GitHub Repository:** [https://github.com/Tamanna431/ReThread_client](https://github.com/Tamanna431/ReThread_client)
*   **Backend GitHub Repository:** [https://github.com/Tamanna431/ReThread_server](https://github.com/Tamanna431/ReThread_server)

---

## 🤖 Agentic AI Features

ReThread features substantial, real-world Agentic AI integrations powered by the **Groq API (Llama 3.3 70B)** that go far beyond simple text generation:

### 1. 🛍️ AI Listing Appraiser (Content Generator & Auto-Classification)
Integrated into the `/items/add` page, this tool evaluates new listings based on user-controlled options:
*   **Writing Styles / Custom Templates**:
    *   `🏛️ Vintage Expert`: Authoritative, heritage-focused evaluation.
    *   `😊 Casual Seller`: Warm, upbeat, and encouraging listing.
    *   `✨ Pro Curator`: Sustainability-oriented, high-end editorial copy.
*   **Adjustable Output Lengths**: Choice of `Short` (~80 words), `Medium` (~150 words), or `Long` (~300 words).
*   **Outputs & Auto-Fill**: Automatically determines the category, condition, fair market price, pricing reasoning, matching search tags, short description, and full description.
*   **Regenerate Response**: Tweak the settings at any time and click "Regenerate" to get a fresh content analysis.

### 2. 💡 AI Smart Recommendation Engine
Fitted on the item details page, this feature curates stylistic outfit additions:
*   **Multi-Step Agent Workflow**: Automatically queries database items, passes candidates to the LLM along with the active item details, reasons style compatibility, and returns the top 2 matches.
*   **Styling Reasoning**: Displays a custom "Why this matches" explanation (e.g., *"Pairs perfectly with vintage denim for a classic 90s look"*) for each recommended item.

### 3. 💬 AI Chat Assistant (Context-Aware with Memory)
A persistent chat assistant accessible from the bottom-right corner of any page:
*   **Inventory-Aware**: Reads live items in stock from the MongoDB database so it can suggest specific products matching user style queries.
*   **Dynamic Follow-Up Prompts**: Runs a secondary agentic prompt to generate 3 custom follow-up buttons based on what the user asked (e.g. *"What items are under $60?"*, *"How does thrifting save water?"*).
*   **Conversation Memory**: Keeps track of active conversation history for coherent, multi-turn reasoning.
*   **Typing Indicators**: Uses CSS micro-animations to show the user when the AI is processing its reply.

---

## 📁 Repository Structure

```text
rethread/
├── client/                     # Next.js Frontend
│   ├── src/
│   │   ├── app/                # Page folders (App Router)
│   │   │   ├── explore/        # Marketplace exploration with search & filters
│   │   │   ├── items/          # Listings (Add, Manage, and [id] Details)
│   │   │   ├── about/          # About page
│   │   │   ├── contact/        # Contact page
│   │   │   ├── login/          # Login page (with Google Sign-In & Demo Autofill)
│   │   │   └── register/       # Sign Up page
│   │   ├── components/         # React Components (AIChatbot, AIRecommendations, etc.)
│   │   ├── lib/                # API client (Axios configuration)
│   │   └── globals.css         # Styling system
│   └── package.json
└── server/                     # Express Backend
    ├── src/
    │   ├── config/             # Database connection setup
    │   ├── controllers/        # Route logic (Auth, Items, AI endpoints)
    │   ├── models/             # Mongoose schemas (User, Item schemas)
    │   ├── routes/             # Express routes
    │   ├── middlewares/        # Authentication protection middleware
    │   ├── seed.ts             # Database seeder script
    │   └── index.ts            # Local/Vercel Entry point
    └── package.json
```

---

## ⚙️ Local Installation & Setup

### Prerequisites
*   Node.js 18+
*   MongoDB Instance (Local or Atlas)
*   Groq API Key (for LLM services)

### 1. Setup Backend
1. Navigate to the server folder:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables in `.env`:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   GROQ_API_KEY=your_groq_api_key
   GOOGLE_CLIENT_ID=your_google_client_id
   ```
4. Seed the database with sample inventory items & the demo user:
   ```bash
   npx ts-node src/seed.ts
   ```
5. Start the backend developer server:
   ```bash
   npm run dev
   ```
   *The backend will run on `http://localhost:5000`*

### 2. Setup Frontend
1. Navigate to the client folder:
   ```bash
   cd ../client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables in `.env`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
   ```
4. Start the frontend developer server:
   ```bash
   npm run dev
   ```
   *Open `http://localhost:3000` in your browser.*

### ⚡ Demo Login Credentials
For immediate marketplace exploration without registering a new account, click the **Auto-fill Demo Credentials** button on the Login page:
*   **Email:** `demo@rethread.com`
*   **Password:** `demo123`
