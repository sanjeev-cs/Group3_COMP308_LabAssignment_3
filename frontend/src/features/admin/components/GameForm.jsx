import React, { useState, useEffect } from 'react';
import Button from '../../../components/common/Button';

// Reusable form for adding and editing games
const GameForm = ({ initialData, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        genre: '',
        platform: '',
        releaseYear: '',
        developer: '',
        rating: '',
        description: '',
        image: null
    });

    // Populate form when editing an existing game
    useEffect(() => {
        if (initialData) {
            setFormData({ ...initialData, image: null }); // Do not preload file input
        }
    }, [initialData]);

    // Handle text and file input changes
    const handleChange = (e) => {
        if (e.target.name === 'image') {
            setFormData({ ...formData, image: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    // Submit form data as multipart/form-data
    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('title', formData.title);
        data.append('genre', formData.genre);
        data.append('platform', formData.platform);

        if (formData.releaseYear) data.append('releaseYear', formData.releaseYear);
        if (formData.developer) data.append('developer', formData.developer);
        if (formData.rating) data.append('rating', formData.rating);
        if (formData.description) data.append('description', formData.description);
        if (formData.image) data.append('image', formData.image);

        onSubmit(data);
    };

    return (
        <div className="game-form">
            {/* Form title */}
            <h3>{initialData ? 'Edit Game' : 'Add New Game'}</h3>

            <form onSubmit={handleSubmit}>
                {/* Main input fields */}
                <div className="form-grid">
                    <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
                    <input name="genre" value={formData.genre} onChange={handleChange} placeholder="Genre" />
                    <input name="platform" value={formData.platform} onChange={handleChange} placeholder="Platform" />
                    <input name="releaseYear" type="number" value={formData.releaseYear} onChange={handleChange} placeholder="Year" />
                    <input name="developer" value={formData.developer} onChange={handleChange} placeholder="Developer" />
                    <input name="rating" type="number" min="0" max="5" step="0.1" value={formData.rating} onChange={handleChange} placeholder="Rating (0-5)" />
                </div>

                {/* Game description */}
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    rows="4"
                />

                {/* Image upload */}
                <div className="file-upload-container">
                    <label>Game Cover Image</label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                        className="file-input"
                    />
                </div>

                {/* Form actions */}
                <div className="form-actions">
                    <Button type="submit" variant="primary" className="btn-block">
                        {initialData ? 'Update' : 'Add'} Game
                    </Button>
                    <Button type="button" onClick={onCancel} variant="secondary" className="btn-block">
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default GameForm;
