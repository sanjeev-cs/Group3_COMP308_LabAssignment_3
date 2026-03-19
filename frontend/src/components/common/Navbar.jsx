import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from './Button'; 

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <nav style={{ padding: '1rem', background: '#2d3436', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10, position: 'relative' }}>
            <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff', textDecoration: 'none' }}>GameVault 3D</Link>
            <div style={{ display: 'flex', alignItems: 'center'}}>
                <Link to="/" style={{ margin: '0 10px', color: '#fff', textDecoration: 'none' }}>Library</Link>
                
                {user ? (
                    <>
                        <Link to="/collection" style={{ margin: '0 10px', color: '#fff', textDecoration: 'none' }}>My Collection</Link>
                        {user.role === 'admin' && (
                             <Link to="/admin/add" style={{ margin: '0 10px', color: '#ff7675', textDecoration: 'none' }}>Add Game</Link>
                        )}
                        <Link to="/profile" style={{ margin: '0 15px', color: '#a29bfe', textDecoration: 'none', fontWeight: 'bold' }}>
                            {user.username}'s Profile
                        </Link>
                        <Button onClick={handleLogout} variant="danger" className="logout-btn">Logout</Button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={{ margin: '0 10px', color: '#fff', textDecoration: 'none' }}>Login</Link>
                        <Link to="/register" style={{ margin: '0 10px', color: '#fff', textDecoration: 'none' }}>Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;