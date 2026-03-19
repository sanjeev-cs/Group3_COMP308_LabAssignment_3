import React, { useState } from 'react';
import Button from '../../components/common/Button';
import useAdminGames from '../../hooks/useAdminGames';
import GameListTable from './components/GameListTable';
import GameForm from './components/GameForm';

// Admin panel for managing game library
const AdminDashboard = () => {
    const { games, createGame, updateGame, deleteGame } = useAdminGames();
    const [activeTab, setActiveTab] = useState('list'); // 'list' | 'form'
    const [editingGame, setEditingGame] = useState(null);

    // Handle new game creation
    const handleCreate = async (data) => {
        const success = await createGame(data);
        if (success) {
            setActiveTab('list');
        }
    };

    // Handle existing game update
    const handleUpdate = async (data) => {
        const success = await updateGame(editingGame._id, data);
        if (success) {
            setEditingGame(null);
            setActiveTab('list');
        }
    };

    // Switch to edit mode
    const handleEditClick = (game) => {
        setEditingGame(game);
        setActiveTab('form');
    };

    // Reset form and return to list view
    const handleCancel = () => {
        setEditingGame(null);
        setActiveTab('list');
    };

    return (
        <div className="admin-dashboard">
            {/* Dashboard header */}
            <div className="admin-header">
                <h2>Admin Dashboard</h2>

                {/* View toggle actions */}
                <div className="admin-actions">
                    <Button
                        onClick={() => setActiveTab('list')}
                        variant={activeTab === 'list' ? 'primary' : 'secondary'}
                    >
                        Manage Games
                    </Button>

                    <Button
                        onClick={() => {
                            setEditingGame(null);
                            setActiveTab('form');
                        }}
                        variant={activeTab === 'form' ? 'primary' : 'secondary'}
                    >
                        + Add New Game
                    </Button>
                </div>
            </div>

            {/* Add / Edit form */}
            {activeTab === 'form' && (
                <GameForm
                    initialData={editingGame}
                    onSubmit={editingGame ? handleUpdate : handleCreate}
                    onCancel={handleCancel}
                />
            )}

            {/* Games list */}
            {activeTab === 'list' && (
                <GameListTable
                    games={games}
                    onEdit={handleEditClick}
                    onDelete={deleteGame}
                />
            )}
        </div>
    );
};

export default AdminDashboard;
