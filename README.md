
# 🌆 City Explorer – Mini Project

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat\&logo=node.js\&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat\&logo=javascript\&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat\&logo=mongodb\&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat\&logo=express\&logoColor=white)

---

## 📌 Overview

City Explorer is a web app that fetches **city weather 🌤️** and **country info 🇨🇱**, combines it, and lets users save searches to **MongoDB 🗄️** via a secure backend.

---

## 📁 Project Structure

```
MyProject/
├── city-explorer-frontend/
│     ├── index.html
│     ├── script.js
│     ├── style.css
└── city-explorer-backend/
      ├── server.js
      ├── .env
      └── package.json
```

---

## 🌍 Features

**Frontend:**

* Fetches data from OpenWeatherMap 🌤️ & REST Countries 🇨🇱
* Displays info in a clean UI 💻
* Sends aggregated data to backend using AJAX + OAuth + API Key 🔑

**Backend:**

* Built with Node.js + Express 🟢
* Validates requests & API key
* Stores data in MongoDB 🗄️
* `/history` endpoint to view saved searches 📜

---

## 🛠️ Technologies

**Frontend:** HTML, CSS, JavaScript, AJAX
**Backend:** Node.js, Express, MongoDB, dotenv
**Security:** OAuth 2.0 + API Key 🔑

---

## 🚀 How to Run

**1️⃣ Backend:**

```bash
cd city-explorer-backend
npm install
node server.js
```

Backend runs on: `http://localhost:5000`

**2️⃣ Frontend:**
Open `index.html` in any browser 🌐

---

## 📡 API Endpoints

* `POST /save` → Save aggregated city data
* `GET /history` → View saved search history

---

## 👤 Group Members

* **S.M.P. Sansitha** – ITBIN-2211-0280
* **P.S. Senevirathne** – ITBIN-2211-0285
* **A.W. Dissanayake** – ITBIN-2211-0179

---

✅ **Enjoy exploring cities!**

