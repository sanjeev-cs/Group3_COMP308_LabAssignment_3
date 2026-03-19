import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// Custom hook for handling registration form state and submission
const useRegisterForm = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' }); // Form input values
    const [error, setError] = useState(''); // Error message
    const { register } = useAuth(); // Auth context
    const navigate = useNavigate();

    // Update form values on input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Submit registration form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await register(formData); // Log in user automatically after registration
            navigate('/'); // Redirect to home
        } catch (err) {
            console.error('Frontend Registration Error:', err);
            setError(err.message || 'Registration failed'); // Set error if registration fails
        }
    };

    return { formData, error, handleChange, handleSubmit };
};

export default useRegisterForm;
