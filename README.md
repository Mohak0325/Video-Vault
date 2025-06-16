# 🎥 Video Vault

**Video Vault** is a full-stack web application that allows users to upload, manage, and watch videos securely. It features authentication, video editing, deletion, and public sharing via unique links.

---

## 🛠️ Tech Stack

### Frontend
- React
- Redux Toolkit
- Tailwind CSS
- Axios
- React Router

### Backend
- Node.js + Express
- MongoDB + Mongoose
- Cloudinary (for video storage)
- Multer (for file upload)
- JWT (for authentication)

---

## ✨ Features

- 👤 JWT Authentication with cookies
- ⬆️ Video upload (with title & description)
- ✏️ Edit video metadata
- 🗑️ Delete uploaded videos
- 🌍 Public video page with shareable URL
- 🔒 Auth-protected routes
- 🎬 Watch videos with native video player
- 🚫 Abuse prevention with error handling and confirmation modals

---

## 🚀 Getting Started

### Prerequisites
- Node.js
- MongoDB account (or local installation)
- Cloudinary account

---

### 🔧 Installation

```bash
git clone https://github.com/yourusername/video-vault.git
cd video-vault
```

```bash
cd backend
npm install
# Create .env file with the variables listed below
npm run dev
```

```bash
cd ../frontend
npm install
npm run dev
```

### 🔐 Environment Variables

### 🗄️ Backend .env

- PORT=5000
- MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/video-vault
- JWT_SECRET=your_jwt_secret
- CLOUDINARY_NAME=your_cloud_name
- CLOUDINARY_API_KEY=your_api_key
- CLOUDINARY_API_SECRET=your_api_secret


### Screenshots
![Login.png] (./assets/screenshot/Login.png)
![Upload.png] (./assets/screenshot/Upload.png)
![VideoList.png] (./assets/screenshot/VideosList.png)
