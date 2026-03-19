import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './components/MainLayout';
import LoginForm from './features/auth/LoginForm';
import RegisterForm from './features/auth/RegisterForm';
import GameList from './features/games/GameList';
import GameDetails from './features/games/GameDetails';
import AdminDashboard from './features/admin/AdminDashboard';
import Profile from './features/profile/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import { Toaster } from 'react-hot-toast';

// Styles
import './styles/App.css';
import './styles/Navbar.css';
import './styles/Forms.css';
import './styles/GameCard.css';
import './styles/SearchBar.css';
import './styles/Admin.css';
import './styles/GameDetails.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-center" reverseOrder={false} />

        <Routes>
          {/* Main layout wrapper */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<GameList />} />  {/* Home / Game Library */}
            <Route path="login" element={<LoginForm />} /> {/* Login page */}
            <Route path="register" element={<RegisterForm />} /> {/* Register page */}
            <Route path="games/:id" element={<GameDetails />} /> {/* Game details */}

            {/* Protected Routes */}
            <Route 
              path="collection" 
              element={
                <ProtectedRoute>
                  <GameList view="collection" /> {/* User's game collection */}
                </ProtectedRoute>
              } 
            />

            <Route 
              path="profile" 
              element={
                <ProtectedRoute>
                  <Profile /> {/* User's profile with 3D Avatar */}
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="admin" 
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminDashboard /> {/* Admin dashboard */}
                </ProtectedRoute>
              } 
            />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
