# 🎟️ Coupon Distribution System

## 📌 Project Overview
The **Coupon Distribution System** is a web application that allows users to claim coupons in a **round-robin** manner while enforcing a cooldown period using **Redis** caching. The frontend is built with **React (Vite) + Tailwind CSS**, and the backend is powered by **Node.js, Express, MongoDB, and Redis**.

## 🔧 Tech Stack
### **Frontend**
- React (Vite)
- Tailwind CSS
- Axios
- Lucide React (Icons)

### **Backend**
- Node.js + Express
- MongoDB (Mongoose ODM)
- Redis (Caching & Rate Limiting)
- Cors, Cookie-Parser

## 🚀 Features
✔ Users can **claim a coupon** if available.
✔ A **cooldown timer** prevents users from claiming another coupon before a set time.
✔ **Coupons are assigned round-robin** from a MongoDB database.
✔ **Redis caching** ensures fast responses and prevents duplicate claims.
✔ **Frontend UI** provides real-time countdown and displays claimed coupons.

---
## 📂 Project Structure
```
Coupon-Distribution/
│── Backend/               # Express.js API
│   ├── models/           # Mongoose Schema
│   ├── routes/           # API Routes
│   ├── db/               # MongoDB Connection
│   ├── redisClient.js    # Redis Configuration
│   ├── server.js         # Main Server File
│
│── Frontend/              # React (Vite) App
│   ├── src/
│   │   ├── components/   # UI Components
│   │   ├── App.jsx       # Main React App
│   │   ├── index.css     # Tailwind Styles
│   ├── public/           # Static Assets
│   ├── vite.config.js    # Vite Configuration
│
│── README.md              # Project Documentation
│── package.json           # Dependencies
```

---
## 🎯 Installation & Setup
### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/HEMANT-YADAV123/CouponDistribution.git
cd CouponDistribution
```

### **2️⃣ Backend Setup**
```bash
cd Backend
npm install
```
- **Set up environment variables (`.env`)**:
  ```env
  MONGO_URI=your_mongodb_connection
  REDIS_HOST=your_redis_host
  REDIS_PORT=your_redis_port
  PORT=4000
  ```
- **Start the backend server**:
  ```bash
  node server.js
  ```

### **3️⃣ Frontend Setup**
```bash
cd ../Frontend
npm install
```
- **Start the React app**:
  ```bash
  npm run dev
  ```
- Open in browser: **`http://localhost:5173`**

---
## 🎯 API Endpoints
### **🚀 Claim Coupon**
- **Endpoint:** `GET /api/claim-coupon`
- **Response:**
  ```json
  {
    "success": true,
    "message": "Coupon COUPON1 claimed successfully!",
    "couponCode": "COUPON1",
    "cooldownTimeRemaining": 3600
  }
  ```
- **If cooldown is active:**
  ```json
  {
    "success": false,
    "message": "Please wait 15 minutes before claiming another coupon.",
    "cooldownTimeRemaining": 900
  }
  ```

---
## 🎨 UI Preview
The frontend provides a **beautiful card layout** with:
✔ Coupon claim button 🚀
✔ Live countdown timer ⏳
✔ Success & error messages ⚡
✔ Claimed coupon displayed 🎟️

---

🚀 **Happy Coding!** 🎉

