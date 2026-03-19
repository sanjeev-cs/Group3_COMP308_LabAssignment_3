import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// Custom hook for handling login form state and submission
const useLoginForm = () => {
    const [formData, setFormData] = useState({ username: '', password: '' }); // Form input values
    const [error, setError] = useState(''); // Error message
    const { login } = useAuth(); // Auth context
    const navigate = useNavigate();

    // Update form values on input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Submit login form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(formData); // Call auth context login
            navigate('/'); // Redirect on success
        } catch (err) {
            setError(err.message || 'Login failed'); // Set error if login fails
        }
    };

    return { formData, error, handleChange, handleSubmit };
};

export default useLoginForm;
