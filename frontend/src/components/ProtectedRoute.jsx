import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Route guard for authenticated and role-based access
const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { user, loading } = useAuth();

    // Show loader while auth state is resolving
    if (loading) return <div>Loading...</div>;

    // Redirect unauthenticated users to login
    if (!user) return <Navigate to="/login" />;

    // Restrict access to admin-only routes
    if (adminOnly && user.role !== 'admin') {
        return <Navigate to="/" />;
    }

    // Render protected content
    return children;
};

export default ProtectedRoute;
