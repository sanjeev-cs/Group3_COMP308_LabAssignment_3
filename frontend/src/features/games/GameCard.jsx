import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import ThreeGameCard from '../../components/three/ThreeGameCard';

// Card component displaying game info, 3D cover, and action buttons
const GameCard = ({ game, onAdd, onRemove, inCollection }) => {
    const { user } = useAuth();
    const BASE_URL = import.meta.env.VITE_API_URL
        ? import.meta.env.VITE_API_URL.replace('/api', '')
        : 'http://localhost:4000';

    // Handle add/remove actions, redirecting to login if user is not authenticated
    const handleAction = (action) => {
        if (!user) {
            window.location.href = '/login'; 
            return;
        }
        action();
    };

    const imageUrl = game.imageUrl ? `${BASE_URL}${game.imageUrl}` : null;

    return (
        <div className="game-card">
            {/* 3D Game Cover */}
            <div className="game-image-container">
                {imageUrl ? (
                    <ThreeGameCard imageUrl={imageUrl} />
                ) : (
                    <span className="game-image-placeholder">🎮</span>
                )}
            </div>
            
            {/* Game info and action buttons */}
            <div className="game-card-content">
                <div>
                    <h3>{game.title}</h3>
                    
                    {/* Genre Tags */}
                    <div className="genre-container">
                        {game.genre && game.genre.split(',').slice(0, 3).map((g, index) => (
                            <span key={index} className="genre-tag">
                                {g.trim()}
                            </span>
                        ))}
                        {game.genre && game.genre.split(',').length > 3 && (
                            <span className="genre-tag-more">+{game.genre.split(',').length - 3}</span>
                        )}
                    </div>
                    <p className="platform">{game.platform}</p>
                </div>
                
                <div className={`actions ${user && user.role === 'admin' ? 'actions-admin' : ''}`}>
                    {/* Details button */}
                    <Link 
                        to={user ? `/games/${game.id}` : '/login'} 
                        className={`details-btn ${user && user.role === 'admin' ? 'details-btn-admin' : ''}`}
                    >
                        Details
                    </Link>
                    
                    {/* Add/Remove buttons for non-admin users */}
                    {(!user || user.role !== 'admin') && (
                        inCollection ? (
                            <Button 
                                onClick={() => handleAction(() => onRemove(game.id))} 
                                variant="danger" 
                                className="btn-block"
                            >
                                Remove
                            </Button>
                        ) : (
                            <Button 
                                onClick={() => handleAction(() => onAdd(game.id))} 
                                variant="primary" 
                                className="btn-block"
                            >
                                Add
                            </Button>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default GameCard;
