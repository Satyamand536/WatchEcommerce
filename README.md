<div align="center">

<h1>⌚ Preseejan</h1>
<p><strong>A full-stack luxury watch e-commerce platform — built with the MERN stack, engineered for the modern collector.</strong></p>

[![Live Demo](https://img.shields.io/badge/Live-Demo-black?style=for-the-badge&logo=vercel)](https://preseejan.onrender.com/)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com)

</div>

---

## What is this?

Most e-commerce templates stop at a product grid and a cart. ChronoElite goes further — it's built around the idea that buying a watch is not the same as buying a t-shirt. The customer needs to know *why* this watch suits them, *which* size works for their wrist, and *when* to wear it.

So I built a platform that answers those questions through three custom-engineered systems: a biometric wrist-fit advisor, a lifestyle-based recommendation engine, and occasion-first curated shopping. Everything sits on top of a secure MERN backend with RSA-encrypted authentication and Stripe payments.

---

## Features

### WristFit™ Simulator
An interactive, drag-based tool that takes a user's wrist circumference (in inches) and instantly maps it to the ideal dial diameter range. It doesn't just output a number — it explains the *horology* behind the recommendation: why a 44mm case can look top-heavy on a 6-inch wrist, or why a 38mm piece loses its presence on a larger frame. Users are then deep-linked directly into the collection filtered by that size.

### AI-Style Recommendation Engine
A guided, 3-step quiz (Wrist Profile → Daily Rhythm → Aesthetic Lens) that sends a structured payload to the backend recommendation API. The server runs a **weighted scoring algorithm** across the entire watch catalog:
- **+30 points** if the dial size matches the wrist profile
- **+40 points** if the watch's `suitableFor` tags match the stated usage context
- **+30 points** if the `styleTags` align with the visual aesthetic preference

Only watches scoring ≥ 60 are returned as recommendations. If the live API is unavailable, a client-side fallback with fuzzy logic kicks in automatically — no broken UI, ever.

### Occasion-First Shopping
The backend exposes a dedicated `/api/watches/occasion/:occasion` route that curates collections by life moment rather than category. Looking for an office watch? You get minimal, formal pieces. Gifting? The API returns only watches with a `rating ≥ 4.7` — because a high-rated watch is always the safest gift. The query logic is built directly into Mongoose, keeping the frontend completely decoupled.

### Secure Authentication (RSA + HMAC)
This was the most interesting engineering problem to solve. The password never travels as plain text — not even over HTTPS.

1. On page load, the frontend fetches an RSA public key from the server
2. The password is encrypted in-browser using the **Web Crypto API** (`RSA-OAEP / SHA-256`)
3. The ciphertext is sent to the backend, decrypted with the private key, then re-hashed with `HMAC-SHA256 + a random 16-byte salt` before being stored in MongoDB
4. The JWT lives exclusively in an **httpOnly cookie** — it never touches `localStorage` and is never visible in the browser's Network panel

For backward compatibility, the `User.matchPasswordAndGenerateToken` static method also handles old bcrypt hashes and auto-migrates them to HMAC on next login.

### Heritage Storyteller
A full-page, alternating timeline that walks through the evolution of watchmaking from 1735 to today — from the birth of pilot's watches to lunar-surface timekeeping. It's purely editorial but was built to give the brand a sense of depth that most e-commerce sites skip entirely.

### LumeMaster & Watch Comparison
The LumeMaster section highlights a specific hero product with a focused story. The Watch Comparison feature lets users place two pieces side-by-side and evaluate specifications directly — reducing the back-and-forth of trying to hold two product pages in memory simultaneously.

###  Demo Payment Integration
A  payment intent is created server-side in INR via `/api/payment/create-intent`.  A separate demo UPI flow exists for testing without real card credentials, and every completed order is written to MongoDB with full line-item, financial, and shipping detail.

### Dark / Light Mode, Wishlist & Cart
Theme preference is stored in React Context and applied through CSS variables, making the dark mode a true design inversion rather than a simple opacity hack. The cart and wishlist are also powered by Context, with persistent toast notifications confirming every action.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, React Router, Framer Motion |
| Styling | Tailwind CSS, Custom CSS Variables |
| State | React Context API |
| Backend | Node.js, Express v5 |
| Database | MongoDB Atlas, Mongoose |
| Authentication | JWT (httpOnly Cookie), HMAC-SHA256, RSA-OAEP |
| Payments | Stripe SDK (INR) |
| Email | Nodemailer (Newsletter Subscription) |
| Icons | Lucide React |

---

## Project Structure

```
watchecommerce/
├── backend/
│   ├── middleware/
│   │   ├── auth.js          # JWT cookie verification
│   │   └── error.js         # Centralized error handler
│   ├── models/
│   │   ├── User.js          # HMAC auth + bcrypt migration
│   │   ├── Watch.js         # Catalog schema (wristFit, styleTags, suitableFor)
│   │   └── Order.js         # Order ledger
│   ├── routes/
│   │   ├── auth.js          # Login, register, RSA key exchange
│   │   ├── watches.js       # Catalog, filters, /recommend, /occasion
│   │   ├── payment.js       # Stripe intent, demo UPI flow
│   │   └── subscribe.js     # Newsletter via Nodemailer
│   ├── services/
│   │   └── authentication.js # JWT generation
│   ├── keys/                # RSA public/private key pair
│   └── server.js
│
└── frontend/
    └── src/
        ├── components/
        │   ├── RecommendationEngine.jsx  # 3-step quiz + scoring
        │   ├── WristFit.jsx              # Interactive size simulator
        │   ├── WatchComparison.jsx       # Side-by-side spec viewer
        │   ├── HeritageStoryteller.jsx   # Brand timeline
        │   ├── OccasionShop.jsx          # Occasion-curated collections
        │   ├── CartPage.jsx              # Full cart + checkout flow
        │   └── UPIModal.jsx              # Demo payment modal
        ├── utils/
        │   └── crypto.js                 # Web Crypto RSA encryption
        ├── CartContext.jsx               # Global cart + wishlist state
        └── ThemeContext.jsx              # Dark/light mode state
```

---

## Getting Started

**Prerequisites:** Node.js v18+, MongoDB Atlas account, Stripe account

### 1. Clone the repository

```bash
git clone https://github.com/your-username/watchecommerce.git
cd watchecommerce
```

### 2. Configure the backend

```bash
cd backend
cp .env.example .env
```

Open `.env` and fill in:

```env
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
PORT=5000
```

```bash
npm install
npm run dev
```

### 3. Start the frontend

```bash
cd ../frontend
npm install
npm run dev
```

The app will be running at `http://localhost:5173`, proxying API requests to `http://localhost:5000`.

### 4. Seed the database (optional)

```bash
cd backend
node seed.js
```

---

## API Overview

| Method | Route | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Create account (RSA-encrypted payload) |
| `POST` | `/api/auth/login` | Login, issues httpOnly JWT cookie |
| `GET` | `/api/auth/public-key` | Fetch RSA public key for client-side encryption |
| `GET` | `/api/watches` | Get catalog with `keyword`, `category`, `gender`, `minPrice`, `maxPrice`, `sort` filters |
| `GET` | `/api/watches/:id` | Single watch detail |
| `POST` | `/api/watches/recommend` | Weighted recommendation engine (wristSize + usage + style + budget) |
| `GET` | `/api/watches/occasion/:occasion` | Curated collection by occasion (`office`, `luxury`, `gifting`, `sport`) |
| `POST` | `/api/payment/create-intent` | Create Stripe Payment Intent (INR) |
| `POST` | `/api/payment/demo-success` | Record demo UPI/COD order to MongoDB |
| `POST` | `/api/subscribe` | Newsletter subscription via Nodemailer |

---

## Why I Built It This Way

**The recommendation engine is rule-based, not ML-based — on purpose.** A catalog of luxury watches doesn't have millions of users generating behavioral data. A well-designed weighted scorer that understands domain knowledge (dial sizes, usage contexts, style language) outperforms a cold-start recommendation model every time at this scale.

**RSA encryption in the browser felt like overkill — until it wasn't.** The standard argument is "HTTPS is enough." But for an e-commerce platform handling credentials, eliminating any chance of plain-text passwords appearing in proxy logs, middleware, or accidentally-left-open debuggers is worth the added implementation cost. The Web Crypto API made it feasible without any third-party library.

**Express v5 was a deliberate choice.** It handles async errors natively without try-catch wrappers on every route, which cleaned up the codebase significantly and reduced boilerplate.

---



