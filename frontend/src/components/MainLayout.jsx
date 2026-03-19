import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Canvas } from '@react-three/fiber';
import Avatar from '../components/three/Avatar';
import AnimatedBackground from '../components/three/AnimatedBackground';
import Button from '../components/common/Button';

// Main application layout with navigation and background
const MainLayout = () => {
    const { user, logout } = useAuth(); // Auth state and logout action
    const navigate = useNavigate();

    // Parse user's avatar from DB
    let userAvatar = 'robot';
    try {
        if (user?.avatarImage && user.avatarImage.startsWith('{')) {
            const parsed = JSON.parse(user.avatarImage);
            if (parsed.character) userAvatar = parsed.character;
        }
    } catch(e) {}

    // Handles logout and redirects to login page
    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <div className="app-container">
            {/* Three.js animated background */}
            <AnimatedBackground />

            {/* Top navigation bar */}
            <nav className="navbar">
                <div className="logo">
                    <Link to="/">
                        <img
                            src="/Game_Lib_Logo.png"
                            alt="GameLib Logo"
                            className="logo-img"
                        />
                    </Link>
                </div>

                <div className="nav-links">
                    {/* Common navigation */}
                    <Link to="/">Library</Link>

                    {user ? (
                        <>
                            {/* User-only navigation */}
                            {user.role !== 'admin' && (
                                <Link to="/collection">My Collection</Link>
                            )}

                            {/* Admin-only navigation */}
                            {user.role === 'admin' && (
                                <Link to="/admin">Admin Dashboard</Link>
                            )}

                            {/* Logged-in user info */}
                            <span className="user-greeting" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Link to="/profile" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'inherit' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Canvas camera={{ position: [0, 0, 2.8], fov: 45 }}>
                                            <ambientLight intensity={1.5} />
                                            <directionalLight position={[0, 5, 5]} intensity={2} />
                                            <Avatar character={userAvatar} isThumbnail={true} />
                                        </Canvas>
                                    </div>
                                    <span>Hi, {user.username}</span>
                                </Link>
                            </span>

                            <Button
                                onClick={handleLogout}
                                variant="secondary"
                                className="logout-btn"
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            {/* Guest navigation */}
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                    )}
                </div>
            </nav>

            {/* Route content */}
            <main className="content">
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;
