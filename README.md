# WellSync — AI-Integrated Mental Health & Holistic Wellness Platform

<p align="center">
  <img src="https://img.shields.io/badge/WellSync-v1.0.0-6366f1?style=for-the-badge&logo=heart&logoColor=white" alt="WellSync Version" />
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-7.3-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
<img src="https://img.shields.io/badge/Tailwind_CSS-4.2-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
 <img src="https://img.shields.io/badge/Node.js-Express_5-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js Express" />
<img src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" /> 
  <img src="https://img.shields.io/badge/Hugging_Face-Inference_API-FFD21E?style=for-the-badge&logo=huggingface&logoColor=black" alt="Hugging Face" />
</p>


---

## 🌟 Overview

**WellSync** is a full-stack, privacy-first wellness platform designed to bridge the gap between mental emotional health and physical well-being. By integrating **AI-assisted emotional journaling**, **intelligent sentiment detection**, **real-time mood analytics**, and **natural language meal nutrition tracking**, WellSync empowers users to understand their daily patterns, reflect mindfully, and maintain emotional and physical balance.

> ⚠️ **Disclaimer:** *WellSync is built for self-reflection, mindfulness, and personal wellness tracking. It is not a clinical diagnostic tool or a substitute for professional medical or mental health advice.*

---

## 📸 Visual Showcase & Screenshots

### 🖥️ Dashboard & Overview
<img width="1915" height="863" alt="Screenshot 2026-06-08 195833" src="https://github.com/user-attachments/assets/e7cb63ff-378a-4d9c-b3f4-2faa5336c064" />

### 📊 Mood Analytics & Emotional Balance
<img width="1915" height="866" alt="Screenshot 2026-06-09 185020" src="https://github.com/user-attachments/assets/a201d8b7-1249-4da9-924c-43e791a7b2cf" />

### 🥗 Nutrition Tracker & Meal Breakdown
<img width="1918" height="866" alt="Screenshot 2026-06-09 184944" src="https://github.com/user-attachments/assets/7a5bf24f-c0e7-44ad-8ae8-5b822675317d" />

### ✍️ AI-Assisted Journaling & Sentiment Suggestions
<img width="1915" height="863" alt="Screenshot 2026-06-08 195833" src="https://github.com/user-attachments/assets/165e953a-28cc-48ca-b055-ebd011f54436" />
<img width="1918" height="872" alt="Screenshot 2026-06-08 200017" src="https://github.com/user-attachments/assets/28b93e8f-1c4b-4675-9ec7-5872c5247072" />
<img width="1918" height="862" alt="Screenshot 2026-06-08 200042" src="https://github.com/user-attachments/assets/49703324-87d8-4431-86cf-7d2b47e4ae05" />
<img width="1918" height="875" alt="Screenshot 2026-06-08 200112" src="https://github.com/user-attachments/assets/b34d1218-ad80-4f23-bf07-452697df630d" />

---

## ✨ Key Features

### 🧠 1. AI-Powered Smart Journaling
- **Private Journal CRUD**: Create, read, edit, and delete personal journal entries with rich text formatting.
- **Automated Emotion Detection**: Integrates with Hugging Face Inference API to analyze journal text and classify emotional states (joy, sadness, anger, fear, surprise, neutral).
- **Empathetic AI Suggestions**: Generates constructive, supportive reflection prompts tailored to the user's emotional state.
- **Mood Tagging**: Choose custom moods alongside AI-assisted predictions.

### 📈 2. Insights & Emotional Analytics
- **Mood Distribution Charts**: Interactive visual breakdowns of emotional tendencies over time using Recharts.
- **Emotional Balance Index**: Visual trendlines highlighting periods of stress, calm, and positivity.
- **Weekly Activity Tracker**: Keep consistency with activity logs and streak tracking.

### 🥗 3. Intelligent Nutrition & Meal Analyzer
- **Natural Language Meal Input**: Log food effortlessly by entering everyday text (e.g., `2 bananas`, `1 bowl oatmeal`, `1 glass milk`).
- **Macronutrient Breakdown**: Instantly calculates Calories, Protein, Carbohydrates, Total Fat, and Dietary Fiber.
- **Daily & Weekly Trends**: Track macronutrient targets and meal history to understand the relationship between physical diet and emotional state.

### 🔐 4. Security & User Management
- **Robust Authentication**: Token-based JSON Web Token (JWT) authentication flow.
- **Encrypted Credentials**: Password hashing via `bcryptjs`.
- **Security Headers & CORS**: Hardened Express API with `helmet` and custom CORS policies.
- **User Profile Settings**: Manage account information and update passwords seamlessly.

### 🎨 5. Modern User Interface
- **Dark Aesthetic Design**: Sleek, modern dark mode with curated color palettes.
- **Interactive Data Visualizations**: Powered by Recharts for smooth animations.
- **Responsive Layout**: Designed for seamless usage across desktop, tablet, and mobile devices.
- **Instant Feedback**: Toast notifications via `react-hot-toast` and modern icons by `lucide-react`.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | React 19, Vite 7, React Router 7 |
| **Styling & UI** | Tailwind CSS v4, Lucide React Icons, React Hot Toast |
| **Data Visualization** | Recharts, Date-fns |
| **Backend Runtime** | Node.js, Express 5 |
| **Database & ODM** | MongoDB, Mongoose 9 |
| **Security & Auth** | JSON Web Tokens (JWT), bcryptjs, Helmet, CORS |
| **AI / NLP Engine** | Hugging Face Inference API (Emotion & Sentiment Models) |
| **Nutrition Data API** | External USDA / Food Nutrition API integration |

---

## 📂 Project Structure

```txt
WellSync/
├── Backend/
│   ├── config/              # Database & environment configurations
│   ├── controllers/         # Business logic for auth, journals, meals
│   ├── middlewares/         # JWT authentication & error handling
│   ├── models/              # Mongoose schemas (User, Journal, Meal)
│   ├── routes/              # Express API route declarations
│   ├── services/            # Hugging Face AI & Nutrition API clients
│   ├── utils/               # Helper utilities & validators
│   ├── server.js            # Express server entry point
│   └── package.json         # Backend dependencies & scripts
├── Frontend/
│   ├── public/              # Static assets & favicon
│   ├── src/
│   │   ├── api/             # Axios API client instances & interceptors
│   │   ├── components/      # Reusable UI components (Navbar, Cards, Charts)
│   │   ├── context/         # Auth & App state management contexts
│   │   ├── pages/           # Application views (Dashboard, Journals, Insights, Nutrition)
│   │   ├── services/        # Frontend business services
│   │   ├── App.jsx          # Route definitions & top-level providers
│   │   ├── main.jsx         # React application bootstrap
│   │   └── index.css        # Tailwind styles & custom themes
│   ├── vite.config.js       # Vite bundler configuration
│   └── package.json         # Frontend dependencies & scripts
└── README.md                # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- [npm](https://www.npmjs.com/) (v9.0.0 or higher)
- [MongoDB](https://www.mongodb.com/) (local instance or MongoDB Atlas URI)
- [Hugging Face Account](https://huggingface.co/) (for AI Inference Access Token)
- [Food Nutrition API Key](https://fdc.nal.usda.gov/) (USDA or equivalent)

---

### 1. Clone the Repository

```bash
git clone https://github.com/themanjeetkr/AI-Integrated-Mental-Health-Journal.git
cd "AI mental Health care"
```

---

### 2. Backend Configuration & Setup

1. Navigate to the `Backend` directory:
   ```bash
   cd Backend
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `Backend/` folder:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   HUGGINGFACE_API_TOKEN=your_huggingface_api_token
   USDA_API_KEY=your_food_nutrition_api_key
   ```

4. Start the backend development server:
   ```bash
   npm run server
   ```
   > Backend will run at `http://localhost:5000`

---

### 3. Frontend Configuration & Setup

1. Open a new terminal and navigate to the `Frontend` directory:
   ```bash
   cd Frontend
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `Frontend/` folder:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

4. Start the Vite development server:
   ```bash
   npm run dev
   ```
   > Frontend will run at `http://localhost:5173`

---

## ⚙️ Environment Variables

| Variable | Location | Description | Example / Default |
| :--- | :--- | :--- | :--- |
| `PORT` | `Backend/.env` | Port for the Express backend server | `5000` |
| `MONGO_URI` | `Backend/.env` | MongoDB connection URI | `mongodb+srv://<user>:<pwd>@cluster.mongodb.net/wellsync` |
| `JWT_SECRET` | `Backend/.env` | Secret key for signing & verifying JWTs | `super_secret_jwt_key_here` |
| `HUGGINGFACE_API_TOKEN` | `Backend/.env` | API Token for Hugging Face emotion models | `hf_xxxxxxxxxxxxxxxxxxxx` |
| `USDA_API_KEY` | `Backend/.env` | API Key for Nutrition Data Service | `your_usda_api_key` |
| `VITE_API_BASE_URL` | `Frontend/.env` | Base URL for frontend API calls | `http://localhost:5000/api` |

---

## 📡 API Reference

All protected routes require the following authorization header:
```http
Authorization: Bearer <jwt_token>
```

### 🩺 Health Check
| Method | Endpoint | Description | Protected |
| :--- | :--- | :--- | :---: |
| `GET` | `/api` | Server health check & status confirmation | No |

### 🔑 Authentication (`/api/auth`)
| Method | Endpoint | Description | Protected |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/auth/register` | Register a new user account | No |
| `POST` | `/api/auth/login` | Authenticate user and obtain JWT token | No |
| `PUT` | `/api/auth/profile` | Update profile information (name, email) | Yes |
| `PUT` | `/api/auth/password` | Change account password | Yes |

### 📖 Journals (`/api/journals`)
| Method | Endpoint | Description | Protected |
| :--- | :--- | :--- | :---: |
| `GET` | `/api/journals` | Fetch all journal entries for the current user | Yes |
| `POST` | `/api/journals` | Create a new journal entry | Yes |
| `POST` | `/api/journals/suggest` | Analyze entry text & generate AI mood/suggestions | Yes |
| `GET` | `/api/journals/:id` | Fetch a specific journal entry by ID | Yes |
| `PUT` | `/api/journals/:id` | Update an existing journal entry | Yes |
| `DELETE` | `/api/journals/:id` | Delete a journal entry | Yes |

### 🥗 Meals & Nutrition (`/api/meals`)
| Method | Endpoint | Description | Protected |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/meals/analyze` | Parse meal text and return macro breakdown | Yes |
| `POST` | `/api/meals/save` | Save analyzed meal to user history | Yes |
| `GET` | `/api/meals/history` | Retrieve recent meal logs and past entries | Yes |
| `GET` | `/api/meals/today-summary` | Get aggregated nutrition totals for today | Yes |
| `DELETE` | `/api/meals/:id` | Delete a logged meal record | Yes |

---

## 🧭 Application Routes

| Route | Page / View | Purpose |
| :--- | :--- | :--- |
| `/` | **Landing Page** | Welcome page explaining WellSync features and value |
| `/login` | **Auth Portal** | User sign-in and account registration |
| `/dashboard` | **Dashboard** | Main overview displaying mood stats, recent logs, and quick actions |
| `/journals` | **Journal Feed** | Chronological list of user journals with search & filter |
| `/journals/new` | **New Journal** | AI-assisted journal writing interface |
| `/journals/:id` | **Journal Detail** | Full entry view with emotional breakdown & reflections |
| `/journals/:id/edit`| **Edit Journal** | Edit existing journal content and mood tags |
| `/insights` | **Mood Insights** | Visual charts, emotion trends, and balance analytics |
| `/nutrition` | **Nutrition Analyzer**| Natural language meal logger and macro tracking charts |
| `/settings` | **User Settings** | Profile management and password updates |

---

## 🧠 System Architecture & Workflows

### AI Sentiment & Reflection Engine
```
[User writes Journal Entry]
           │
           ▼
[POST /api/journals/suggest]
           │
           ▼
[Hugging Face Inference API] ──► (Emotion Classification)
           │
           ▼
[WellSync AI Prompt Engine]  ──► (Generates empathetic advice & reflection)
           │
           ▼
[Returned to Frontend UI]    ──► (Displays mood badges & supportive suggestions)
```

### Natural Language Nutrition Engine
```
[User inputs meal text (e.g., "2 boiled eggs, 1 toast")]
                        │
                        ▼
             [POST /api/meals/analyze]
                        │
                        ▼
             [NLP Text Parser & Food API]
                        │
                        ▼
     [Calculates Calories, Protein, Carbs, Fats, Fiber]
                        │
                        ▼
             [User Saves to Dashboard] ──► [Updates Daily/Weekly Charts]
```

---

## 🚢 Deployment Guide

### Frontend Deployment (e.g. Vercel)
1. Import your frontend repository root or specify `Frontend` as the root folder in Vercel.
2. Configure environment variable in Vercel project settings:
   ```env
   VITE_API_BASE_URL=https://your-backend-domain.com/api
   ```
3. Build Settings:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

### Backend Deployment (e.g. Render / Railway)
1. Select the `Backend` directory as the service root.
2. Configure all environment variables (`PORT`, `MONGO_URI`, `JWT_SECRET`, `HUGGINGFACE_API_TOKEN`, `USDA_API_KEY`).
3. Set execution commands:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

---

## 🔮 Roadmap & Future Enhancements

- [ ] Multi-day emotional streak tracking & mindfulness gamification
- [ ] Export journal reflections and nutrition summaries as encrypted PDF / JSON
- [ ] Voice-to-text journal entries with audio sentiment analysis
- [ ] Smart meal barcode scanner and photo-based nutrition estimation
- [ ] Crisis intervention hotline integration and enhanced emergency safety prompts
- [ ] Mobile app client using React Native

---

## 🤝 Contributing

Contributions to **WellSync** are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License. See the `LICENSE` file for details.

---

<p align="center">
  Built with ❤️ for mental well-being and mindful living with <b>WellSync</b>.
</p>
