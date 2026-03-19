import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { gql } from '@apollo/client';
import { useQuery, useMutation } from '@apollo/client/react';
import GameCard from './GameCard';
import { useAuth } from '../../context/AuthContext';
import SearchBar from '../../components/SearchBar';

// Queries and Mutations
const GET_GAMES = gql`
  query GetGames {
    games {
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

const ADD_FAVORITE = gql`
  mutation AddFavoriteGame($gameId: ID!) {
    addFavoriteGame(gameId: $gameId) {
      id
      games {
        id
      }
    }
  }
`;

const REMOVE_FAVORITE = gql`
  mutation RemoveFavoriteGame($gameId: ID!) {
    removeFavoriteGame(gameId: $gameId) {
      id
      games {
        id
      }
    }
  }
`;

// Displays list of games; supports searching, filtering, and adding/removing from collection
const GameList = (props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const { user, updateAuthUser } = useAuth();
    
    // Apollo queries/mutations
    const { data: gamesData, loading, error } = useQuery(GET_GAMES);
    const [addFavorite] = useMutation(ADD_FAVORITE);
    const [removeFavorite] = useMutation(REMOVE_FAVORITE);

    const myGames = user?.games ? user.games.map(g => g.id) : [];

    // Add game to user's collection
    const handleAdd = async (id) => {
        if (!user) return alert('Please login first');
        try {
            const { data } = await addFavorite({ variables: { gameId: id } });
            updateAuthUser(data.addFavoriteGame);
        } catch (err) {
            alert(err.message || 'Failed to add game');
        }
    };

    // Remove game from user's collection
    const handleRemove = async (id) => {
        try {
            const { data } = await removeFavorite({ variables: { gameId: id } });
            updateAuthUser(data.removeFavoriteGame);
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading games: {error.message}</div>;

    const games = gamesData?.games || [];

    // Filter games based on search term and view type
    const filteredGames = games.filter(game => {
        const titleMatch = game.title.toLowerCase().includes(searchTerm.toLowerCase());
        const genreMatch = game.genre && game.genre.toLowerCase().includes(searchTerm.toLowerCase());
        const platformMatch = game.platform && game.platform.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesSearch = titleMatch || genreMatch || platformMatch;
        
        if (props.view === 'collection') {
            return matchesSearch && myGames.includes(game.id);
        }
        return matchesSearch;
    });

    return (
        <div className="game-library">
            {/* Header with admin add button */}
            <div className="library-header">
                <h2>{props.view === 'collection' ? 'My Library' : 'Game Library'}</h2>
                {user && user.role === 'admin' && (
                    <Link to="/admin" className="admin-add-btn">
                        + Add New Game
                    </Link>
                )}
            </div>
            
            {/* Search input */}
            <SearchBar 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search games by title, genre, or platform..."
            />
            
            {/* Grid of game cards */}
            <div className="game-grid">
                {filteredGames.map(game => (
                    <GameCard 
                        key={game.id} 
                        game={game} 
                        inCollection={myGames.includes(game.id)}
                        onAdd={handleAdd}
                        onRemove={handleRemove}
                    />
                ))}
            </div>
        </div>
    );
};

export default GameList;
