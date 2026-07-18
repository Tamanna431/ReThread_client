# 🌿 ReThread - Sustainable Fashion Marketplace

<p align="center">
  <strong>Fashion that cares for people and the planet.</strong>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-ai-features">AI Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-installation">Installation</a> •
  <a href="#-api-endpoints">API Endpoints</a> •
  <a href="#-chatbot">Chatbot</a>
</p>

---

## 📖 Overview

**ReThread** is a full-stack sustainable fashion marketplace that enables users to buy and sell pre-loved clothing, accessories, and shoes. Built with modern technologies and powered by **Agentic AI**, ReThread makes sustainable fashion accessible, affordable, and desirable.

Every purchase on ReThread contributes to reducing textile waste, saving water, and lowering CO₂ emissions — making fashion sustainable and sustainability fashionable.

---

##  Features

### 🛍️ Core Features
- **User Authentication** — JWT-based login/register with Google OAuth
- **Explore Marketplace** — Browse items with advanced search, filters, and sorting
- **Item Details** — Rich product pages with image gallery and eco-impact stats
- **Add Items** — Create listings with AI-powered auto-fill
- **Manage Items** — View, edit, and delete your listings
- **AI Recommendations** — Smart product suggestions with reasoning
- **Environmental Tracking** — Real-time water & CO₂ savings visualization
- **Responsive Design** — Works beautifully on mobile, tablet, and desktop

### 🎨 Design Highlights
- **3-Color Palette:** Forest Green, Terracotta, Oat
- **Premium UI** with gradients, shadows, and animations
- **Consistent cards** with same size, border radius, and layout
- **4 cards per row** on desktop
- **Skeleton loaders** for smooth loading experience

---

## 🤖 AI Features (Agentic AI)

ReThread implements **4 substantial Agentic AI features** that go beyond simple text generation:

### 1.  AI Listing Appraiser (Content Generator + Auto Classification)
- **What it does:** Analyzes item titles and generates category, condition, pricing, tags, and descriptions
- **Agentic behavior:** Decision-making + Reasoning + Tool usage
- **Output:** Editable AI suggestions with pricing reasoning

### 2. 💡 AI Smart Recommendation Engine
- **What it does:** Analyzes current item and recommends matching products with styling reasons
- **Agentic behavior:** Multi-step pipeline (DB → LLM → DB) + Context-aware reasoning
- **Output:** Curated matches with "Why this matches" explanations

### 3. 💬 AI Chat Assistant
- **What it does:** Conversational assistant that understands app context
- **Agentic behavior:** Intent recognition + Follow-up reasoning + Quick actions
- **Output:** Real-time guidance for listing, pricing, eco-impact queries

### 4. 🏷️ AI Auto Classification & Tagging
- **What it does:** Automatically categorizes and tags items based on content
- **Agentic behavior:** Automatic tag generation + Editable AI labels
- **Output:** Smart tags for better discoverability

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** (App Router)
- **TypeScript** (Strict mode)
- **Tailwind CSS** (Custom design system)
- **TanStack Query** (Data fetching & caching)
- **Recharts** (Data visualization)
- **Lucide React** (Icons)

### Backend
- **Node.js** + **Express.js**
- **TypeScript**
- **MongoDB** + **Mongoose**
- **JWT Authentication**
- **Google OAuth** (google-auth-library)
- **Bcrypt** (Password hashing)

### AI Integration
- **Groq API** (Llama 3.3 70B)
- **Axios** (HTTP client)

---

## 🚀 Installation

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Groq API key
- Google Cloud OAuth credentials

### Setup Steps

```bash
# Clone the repository
git clone https://github.com/your-username/rethread.git
cd rethread

# Setup Backend
cd server
npm install
cp .env.example .env
# Add your environment variables (see below)
npm run seed
npm run dev

# Setup Frontend (new terminal)
cd client
npm install
cp .env.example .env.local
npm run dev

####Demo Credentials
Email: demo@rethread.com
Password: demo123

📁 Project Structure

rethread/
├── client/                 # Next.js Frontend
│   ├── src/
│   │   ├── app/           # Pages (App Router)
│   │   │   ├── (auth)/    # Login, Register
│   │   │   ├── explore/   # Marketplace
│   │   │   ├── items/     # Add, Manage, Details
│   │   │   ├── about/     # About page
│   │   │   ├── contact/   # Contact page
│   │   │   └── page.tsx   # Home page
│   │   ├── components/    # Reusable components
│   │   └── lib/           # API helpers
│   └── public/
── server/                # Express Backend
│   ├── src/
│   │   ├── controllers/   # Route handlers
│   │   ├── models/        # MongoDB schemas
│   │   ├── routes/        # API routes
│   │   ├── middlewares/   # Auth middleware
│   │   ├── utils/         # AI helpers
│   │   ├── seed.ts        # Database seeder
│   │   └── index.ts       # Entry point
│   └── package.json
└── README.md


💬 AI Chatbot
The ReThread AI Chatbot is available on every page (bottom-right corner). Here are the questions you can ask:
🛍️ Selling & Listing
"I want to list an item for sale"
"How do I sell my old clothes?"
"List a vintage denim jacket"
"Help me create a listing"
💰 Pricing
"How do I price my item?"
"What is the value of my Nike shoes?"
"Does AI help with pricing?"
"How much should I charge for a dress?"
#Environmental Impact
"Tell me about environmental impact"
"How much water is saved by buying used?"
"Why is sustainable fashion important?"
"What is the carbon footprint of fashion?"
✨ Recommendations
"Show me recommendations"
"I need a summer dress recommendation"
"What matches with vintage jeans?"
"Suggest accessories for my outfit"
#General Help
"How does ReThread work?"
"Is it safe to buy here?"
"What are your features?"
"How do I get started?"
⚡ Quick Actions (Buttons)
🛍️ List an Item — Start selling flow
✨ Get Recommendations — View AI picks
🌿 Eco Impact — Environmental facts
💰 Price Check — Pricing guidance
