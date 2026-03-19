# Game Library Management System

A full-stack MERN (MongoDB, Express, React, Node.js) application for managing a digital game library. This application features a premium 3D user interface, user authentication, and role-based access control (Admin/User).

## 🌟 Features

-   **Interactive 3D Game Cards**: Premium "Digital Collectible" style cards with holographic effects and mouse-tracking interaction.
-   **3D Character Avatars**: Users can select and customize their profile with fully animating, dynamically-scaled 3D character avatars (Robot, Parrot, Flamingo) built with `@react-three/fiber` and `@react-three/drei`.
-   **GraphQL API**: Fully modernized data layer utilizing Apollo Server and Apollo Client for optimized UI data fetching, caching, and integrated local state auth links.
-   **Role-Based Access**:
    -   **Visitors**: Browse the game library.
    -   **Users**: Create an account, customize a 3D Avatar profile, manage "My Collection", and view game details.
    -   **Admins**: Full CRUD capabilities—Add, Edit, and Delete games from the global library.
-   **Modern UI**: Built with React, Three.js, and Glassmorphism design principles.
-   **Secure**: JWT-based authentication mapped natively through GraphQL HTTP Headers.

---

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:
-   **Node.js** (v14 or higher)
-   **MongoDB** (Local instance or Atlas URI)
-   **Git**

---

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository_url>
cd <repository_folder>
```

### 2. Backend Setup
The backend handles the API, database connection, and authentication.

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  **Environment Variables**:
    Create a `.env` file in the `backend` directory with the following variables:
    ```env
    NODE_ENV=DEVELOPMENT_OR_PRODUCTION
    FRONTEND_URL=YOUR_LOCAL_HOST_URL
    MONGODB_URI=MONGODB_CONN_STRING
    DB_NAME=DB_NAME
    JWT_SECRET=YOUR_SECRET_KEY
    PORT=YOUR_PORT_NUMBER
    ```
    *(Note: Replace `MONGO_URI` with your connection string if different)*

4.  Start the Backend Server:
    ```bash
    npm run dev
    ```
    *Server should run on `http://localhost:4000`*

### 3. Frontend Setup
The frontend is built with React and Vite.

1.  Open a new terminal and navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  **Environment Variables**:
    Create a `.env` file in the `frontend` directory (if not auto-configured):
    ```env
    VITE_API_URL=http://localhost:4000/api
    ```

4.  Start the Frontend Development Server:
    ```bash
    npm run dev
    ```
    *Client should run on `http://localhost:5173` (or similar)*

---

## 📖 Website Workflow Guide

### 1. Public Access (Visitor)
*   **Landing Page**: Upon opening the site, you will see the **Game Library**.
*   **Browsing**: You can scroll through the list of games. The 3D cards are interactive—hover over them to see the holographic sheen and tilt effects.
*   **Limitations**: Visitors cannot add games to a collection or view full admin details.

### 2. Authentication
*   **Register**: Click "Register" in the top navigation. Fill in your Name, Email, and Password.
    *   *Note: First created user might need manual database adjustment to be 'Admin' if no seed script is run, or use a provided Admin account.*
*   **Login**: Access your account using your email and password.

### 3. User Features (Standard Account)
*   **My Collection**: Once logged in, you gain a personal "My Collection" tab.
*   **Add Games**: On the Home page, click "Add to Collection" on any game card to save it.
*   **Remove Games**: Go to "My Collection" and click "Remove" to delete a game from your personal list.
*   **Logout**: Securely sign out from the Navbar.

### 4. Admin Features (Administrator)
*   **Admin Dashboard**: Admins see a special "Admin Dashboard" link.
*   **Game Management**:
    *   **Add Game**: Create new game entries with Title, Genre, Platform, Description, and Image URL.
    *   **Edit Game**: Update existing game details.
---

## 🎨 Technology Stack

*   **Frontend**: React, Vite, React Router, **Apollo Client** (`@apollo/client`), **React Three Fiber** (`@react-three/fiber`), React Three Drei (`@react-three/drei`).
*   **Backend**: Node.js, Express.js, **Apollo Server** (`@apollo/server`), **GraphQL** (`graphql`).
*   **Database**: MongoDB (Mongoose ODM).
*   **Styling**: Custom CSS3 & Glassmorphism.
*   **Static Assets**: External GLTF/GLB remote hosting.

---
