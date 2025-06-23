# 🎬 MERN YouTube Clone

A full-stack YouTube clone built using the MERN stack (MongoDB, Express.js, React.js, Node.js). Users can register, create channels, upload videos, like/dislike, and comment on videos.

---

## 🔗 Repository Link

[GitHub Repo](https://github.com/Varsha-Boddapati-24/youtube-clone.git)

## 🚀 Features

- 🔐 **User Authentication**
  - Register & login with JWT-based auth.
  - Secure protected routes.
  
- 📺 **Video Functionality**
  - Upload video with title, description, category, thumbnail.
  - View videos with player and details.
  - Like & dislike toggle with instant feedback.

- 💬 **Commenting System**
  - Add, edit, and delete comments (no nested replies).

- 🔍 **Search & Filter**
  - Search videos by title using regex.
  - Filter videos by category.

- 👤 **Channel Management**
  - Create a personal channel.
  - View uploaded videos by channel.
  - Update or delete your videos.

- 🖼️ **Media Upload**
  - Upload videos and thumbnails using Multer.

- 💡 **Responsive UI**
  - Mobile, tablet, and desktop friendly.

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router DOM
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- Multer for file uploads
- JSON Web Tokens (JWT)

---

## 📁 Folder Structure
youtube-clone/
│
├── backend/
│ ├── controllers/ # Logic for users, videos, channels, comments
│ ├── middlewares/ # Auth, validations, multer config
│ ├── models/ # Mongoose schemas for User, Video, Comment, Channel
│ ├── routes/ # Express routers
│ ├── utils/ # Seeder or helper functions
│ ├── .env # Environment variables
│ ├── server.js # Main server entry point
│
├── frontend/
│ ├── public/ # Public assets
│ ├── src/
│ │ ├── assets/ # Images, thumbnails
│ │ ├── components/ # Header, Sidebar, VideoCard, etc.
│ │ ├── context/ # Auth context
│ │ ├── hooks/ # Custom hooks (e.g., click outside)
│ │ ├── pages/ # All route pages (Home, Signin, Register, Watch, etc.)
│ │ ├── utils/ # Helper functions (e.g., timeAgo)
│ │ └── App.jsx # App layout and routing

## 🚀 Installation Guide

Set up the full-stack YouTube Clone project locally by following the steps below.

---

# 📦 Installation Guide

Follow the steps below to set up the project locally.

---

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Varsha-Boddapati-24/youtube-clone.git
   
 2. **Navigate to the project directory**
     ```bash
       cd youtube-clone

   
## 🔧 Backend Setup

1. **Navigate to the backend directory**
     ```bash
       cd backend
2. **Install dependencies**
      ```bash
      npm i
3. **Create a .env file in the root and ad d**
    ```bash
       PORT=5000
      JWT_SECRET_KEY=your_jwt_secret
      MONGO_URI=your_mongodb_uri
      CLOUDINARY_API_KEY=your_cloudinary_key
      CLOUDINARY_API_SECRET=your_cloudinary_secrete
4. **Run the following command**
      ```bash
     npm run dev
      
## 🔧 FrontEnd Setup

1. **Navigate to the frontend directory**
     ```bash
       cd frontend
2. **Install dependencies**
      ```bash
      npm i
3. **Run the following command**
      ```bash
     npm run dev


##  Contact Me
 **Email:** varshaboddapati24@gmail.com     
 **LinkedIn:** https://www.linkedin.com/in/varsha-boddapati-9a9124211/

---

**Feel free to fork, use, or modify this project! 😊**
