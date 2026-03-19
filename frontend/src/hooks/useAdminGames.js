import { useState, useCallback, useEffect } from 'react';
import toast from 'react-hot-toast';
import gameService from '../services/gameService';

// Custom hook for managing admin game operations (CRUD)
const useAdminGames = () => {
    const [games, setGames] = useState([]); // List of all games
    const [loading, setLoading] = useState(false);

    // Load all games from backend
    const loadGames = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await gameService.getAllGames();
            setGames(data);
        } catch (err) {
            console.error(err);
            toast.error('Failed to load games.');
        } finally {
            setLoading(false);
        }
    }, []);

    // Load games on mount
    useEffect(() => {
        loadGames();
    }, [loadGames]);

    // Create a new game
    const createGame = async (gameData) => {
        try {
            await gameService.createGame(gameData);
            toast.success('Game created successfully!');
            loadGames(); // Refresh list
            return true;
        } catch (err) {
            console.error(err);
            toast.error('Failed to create game.');
            return false;
        }
    };

    // Update an existing game
    const updateGame = async (id, gameData) => {
        try {
            await gameService.updateGame(id, gameData);
            toast.success('Game updated successfully!');
            loadGames(); // Refresh list
            return true;
        } catch (err) {
            console.error(err);
            toast.error('Failed to update game.');
            return false;
        }
    };

    // Delete a game with confirmation
    const deleteGame = async (id) => {
        if (!window.confirm('Are you sure you want to delete this game?')) return;
        
        try {
            await gameService.deleteGame(id);
            toast.success('Game deleted successfully');
            setGames(prev => prev.filter(g => g._id !== id)); // Remove from state
        } catch (err) {
            console.error(err);
            toast.error('Failed to delete game.');
        }
    };

    return { games, loading, loadGames, createGame, updateGame, deleteGame };
};

export default useAdminGames;
