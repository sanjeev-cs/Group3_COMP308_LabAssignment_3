import React from 'react';
import Button from '../../../components/common/Button';

// Admin table for listing and managing games
const GameListTable = ({ games, onEdit, onDelete }) => {
    // Base URL for serving uploaded images
    const BASE_URL = import.meta.env.VITE_API_URL
        ? import.meta.env.VITE_API_URL.replace('/api', '')
        : 'http://localhost:4000';

    return (
        <div className="admin-game-list">
            <h3>Manage Games</h3>

            <table>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Platform</th>
                        <th className="action-header">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {games.map(game => (
                        <tr key={game._id}>
                            {/* Game thumbnail */}
                            <td className="thumbnail-cell">
                                {game.imageUrl ? (
                                    <img
                                        src={`${BASE_URL}${game.imageUrl}`}
                                        alt={game.title}
                                        className="game-thumbnail"
                                    />
                                ) : (
                                    <span className="game-thumbnail-placeholder">🎮</span>
                                )}
                            </td>

                            <td>{game.title}</td>
                            <td>{game.platform}</td>

                            {/* Edit / Delete actions */}
                            <td className="action-cell">
                                <Button
                                    onClick={() => onEdit(game)}
                                    variant="secondary"
                                    className="edit-btn"
                                >
                                    Edit
                                </Button>
                                <Button
                                    onClick={() => onDelete(game._id)}
                                    variant="danger"
                                    className="delete-btn"
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GameListTable;
