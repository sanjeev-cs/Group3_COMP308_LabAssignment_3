import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import ThreeGameCard from '../../components/three/ThreeGameCard';

const GET_GAME = gql`
  query GetGame($id: ID!) {
    game(id: $id) {
      id
      title
      genre
      platform
      releaseYear
      developer
      rating
      description
      imageUrl
    }
  }
`;

const GameDetails = () => {
    const { id } = useParams(); // Game ID from route
    const { user } = useAuth();
    const navigate = useNavigate();

    const { data, loading, error } = useQuery(GET_GAME, {
        variables: { id }
    });

    const [imageValid, setImageValid] = useState(false);
    const [imageChecked, setImageChecked] = useState(false);

    const game = data?.game;

    const BASE_URL = import.meta.env.VITE_API_URL
        ? import.meta.env.VITE_API_URL.replace('/api', '')
        : 'http://localhost:4000'; // updated to 4000 as it's the backend port

    // Validate Image
    useEffect(() => {
        if (!game || !game.imageUrl) {
            setImageChecked(true);
            return;
        }

        const img = new Image();
        img.src = `${BASE_URL}${game.imageUrl}`;
        img.onload = () => {
            setImageValid(true);
            setImageChecked(true);
        };
        img.onerror = () => {
            setImageValid(false);
            setImageChecked(true);
        };
    }, [game, BASE_URL]);

    if (loading) return <div>Loading...</div>;
    if (error || !game) return <div>Game not found</div>;

    return (
        <div className="game-details">
            {/* Header with title and back button */}
            <div className="game-header">
                <h1>{game.title}</h1>
                <Button onClick={() => navigate(-1)} variant="secondary" className="back-btn">
                    Back to Library
                </Button>
            </div>    
            {/* Main content */}
            <div className="game-content">
                {/* Game cover image - 3D Scene if valid, else placeholder */}
                <div className="game-image-column">
                    {imageChecked && imageValid ? (
                         <ThreeGameCard imageUrl={`${BASE_URL}${game.imageUrl}`} zoomable={false} />
                    ) : (
                        <div className="detail-placeholder">
                            <span>{imageChecked && !imageValid ? '⚠️' : '🎮'}</span>
                        </div>
                    )}
                </div>
                {/* Game information */}
                <div className="game-info">
                    <p><strong>Genre:</strong> {game.genre}</p>
                    <p><strong>Platform:</strong> {game.platform}</p>
                    <p><strong>Release Year:</strong> {game.releaseYear}</p>
                    <p><strong>Developer:</strong> {game.developer}</p>
                    <p><strong>Rating:</strong> {game.rating}/5</p>
                </div>         
            </div>
            {/* Full width description */}
            <div className="game-description-section">
                <h3>Description</h3>
                <p className="description">{game.description}</p>
            </div>
        </div>
    );
};

export default GameDetails;
