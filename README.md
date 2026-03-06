## 🍳 Recipe Sharing App

A full-stack Recipe Sharing Web Application where users can discover, share, and review recipes. Users can upload recipes, interact with other users through comments and ratings, and save their favorite recipes.

The platform also includes an admin moderation workflow where recipes must be approved before becoming publicly visible.

## 📌 Project Overview

The Recipe Sharing App allows food enthusiasts to share their cooking ideas with the community. Users can upload recipes with ingredients, instructions, and images while interacting through likes, comments, and ratings.

Admins review submitted recipes and approve or reject them to maintain the quality of content on the platform.

## 🛠 Tech Stack

- **Frontend**
  - React
  - Vite
  - Tailwind CSS
  - Redux Toolkit
  - RTK Query

- **Backend**
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose

- **Integrations**
  - JWT Authentication
  - Cloudinary (Image Upload)
  - Nodemailer (Email Service)
## ⚙️ Backend Architecture

The backend follows a **modular MVC architecture** for scalability and maintainability.

Models:

- User
  - name, email, password, profile image
  - favorites, created recipes, role (user/admin)

- Recipe
  - title, description, ingredients, instructions
  - images, category, ratings, likes, status (pending / approved / rejected)

- Category
  - name, description

- Comment
  - user, recipe, comment, rating

- Notification
  - user, message, type, read status

Controllers:

- User Controller
- Recipe Controller
- Category Controller
- Comment Controller
- Notification Controller
- Contact Controller

Middlewares:

- checkAuth          → verifies JWT for authentication
- checkAdmin         → allows only admins to access certain routes
- validationHandler  → validates request data with Zod schemas

## 💻 Frontend Architecture
The frontend is built with React + Vite and uses Redux Toolkit + RTK Query for state management and API communication.
Pages:

- Public Pages
  - Home
  - Recipes
  - Recipe Detail
  - About
  - Contact
  - Sign In
  - Register

- Protected Pages
  - Create Recipe
  - Edit Recipe
  - My Recipes
  - Bookmarks
  - Profile
  - Notifications

- Admin Pages
  - Admin Dashboard
  - Manage Users
  - Manage Recipes
  - Manage Categories
 
Components:

- Header -> search, notifications, mobile menu
- Footer
- AdminSidebar
- Loader
- Message
- Rating

## ⭐ Key Features
- 🔐 Authentication: JWT login/registration with cookies
- 📷 Recipe Creation: Upload recipes with images, ingredients, and instructions
- 👍 Like & Bookmark: Save favorite recipes
- 💬 Comment & Rating System: Star ratings and reviews
- 🔎 Real-Time Search: Search with debouncing
- 🛡 Admin Moderation: Approve/reject recipes, manage users and categories
- 🔔 Notifications: Updates for recipe approvals and other events
- 📱 Responsive Design: Fully responsive using TailwindCSS
  
## 🚀 Installation
**1️⃣ Clone the repository**
  - git clone = https://github.com/swechhyamaharjan/RecipeSharingWebApp

 **2️⃣ Install dependencies**
  - Backend
    - cd backend
    - npm install
- Frontend
    - cd frontend
    - npm install

**3️⃣ Setup Environment Variables**

Create a .env file in the backend folder:
- PORT=5000
- MONGO_URI=your_mongodb_connection
- JWT_SECRET=your_secret_key
- CLOUDINARY_CLOUD_NAME=your_cloud_name
- CLOUDINARY_API_KEY=your_api_key
- CLOUDINARY_API_SECRET=your_api_secret
- EMAIL_USER=your_email
- EMAIL_PASS=your_email_password

**4️⃣ Run the Application**
- Backend
    - npm run server
- Frontend
    - npm run dev




