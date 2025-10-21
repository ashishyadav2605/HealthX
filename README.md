# 🏥 HealthX – Health Document Management System
**HealthX** is a modern, secure web application that empowers users to upload, manage, and access their health-related documents from anywhere, anytime. Designed with privacy and usability in mind, the platform ensures that sensitive health data is stored and transmitted securely.

A **full-stack web application** where users can:

- ✅ Register and log in securely  
- 📁 Upload and manage health documents (PDFs, reports, etc.)  
- 🔐 Access role-based dashboards (User/Admin)  
- ⏱️ View upload history with timestamps  
- 📊 Admin: View user/document stats  

🔗 **Live App**: [https://healthx-ashish.vercel.app/]  
🔗 **Backend API**: [https://aarogya-task.onrender.com]

---

## Tech Stack

### 🔹 Frontend
- React.js
- Tailwind CSS
- Next.js
- Axios
- React Toastify

### 🔹 Backend
- Node.js + Express.js
- MongoDB
- JWT for Authentication
- bcryptjs for password hashing
- Multer for file uploads
- dotenv for environment configuration
- CORS

---

## 🌐 Deployment

| Part       | Platform            | URL                                              |
|------------|---------------------|--------------------------------------------------|
| **Frontend** | [Vercel](https://vercel.com)     | [aarogya-task-ashish.vercel.app](https://aarogya-task-ashish.vercel.app) |
| **Backend**  | [Render](https://render.com)     | [aarogya-task.onrender.com](https://aarogya-task.onrender.com) |

---

## ⚙️ Getting Started

### 1. Clone the Repository

cd git clone https://github.com/ashishyadav2605/Aarogya-task.git
cd Aarogya-task
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

🔐 Create a `.env` file inside the `backend/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=admin@gmail.com
ADMIN_PASSWORD=admin123
```

▶️ Start the backend server:

```bash
npm run start
```

> Backend will run at: `http://localhost:5000`

---

### 3. Frontend Setup

```bash
cd ../client
npm install
```

▶️ Start the frontend dev server:

```bash
npm run dev
```

> Frontend will run at: `http://localhost:3000`

✅ **Ensure both servers are running concurrently.**

---

## 🧠 Key Features & Approach

- Clear separation of **frontend** and **backend** codebases
- **JWT-based authentication** for secure access
- **Role-based access control** for User and Admin
- RESTful **API routes** for all operations
- Secure **document upload** using Multer middleware
- Timestamps for uploaded documents
- Admin dashboard with system stats and user list
- Environment variables managed using `.env` files
## 📡 API Endpoints

### 🔐 Authentication — `/api/auth`

| Method | Endpoint                   | Description                                 |
|--------|----------------------------|---------------------------------------------|
| POST   | `/signup`                  | Register a new user                         |
| POST   | `/login`                   | Authenticate user and return JWT token      |
| GET    | `/profile`                 | Get basic user profile and uploaded files   |
| GET    | `/profile-with-timestamps`| Get user profile with document timestamps   |

---

### 📂 Document Management — `/api/auth`

| Method | Endpoint        | Description                                |
|--------|-----------------|--------------------------------------------|
| POST   | `/upload`       | Upload a PDF document (authenticated)      |

---

### 📊 Admin Routes — `/api/admin`

| Method | Endpoint    | Description                             |
|--------|-------------|-----------------------------------------|
| POST   | `/login`    | Admin login and get admin JWT token     |
| GET    | `/users`    | Get all registered users (admin only)   |
| GET    | `/stats`    | Get user and document statistics        |

---

## 👨‍💻 Author

**Ashish Yadav**  
GitHub: [ashishyadav2605](https://github.com/ashishyadav2605)
