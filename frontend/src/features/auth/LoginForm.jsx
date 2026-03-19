import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import AuthLayout from '../../components/layout/AuthLayout';
import useLoginForm from '../../hooks/useLoginForm';

// Login page with form handling via custom hook
const LoginForm = () => {
    const { formData, error, handleChange, handleSubmit } = useLoginForm();

    return (
        <AuthLayout
            title="Login"
            footer={
                <p>
                    Don't have an account? <Link to="/register">Register here</Link>
                </p>
            }
        >
            {/* Display login error if exists */}
            {error && <p className="error-message">{error}</p>}

            {/* Login form */}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <Button type="submit" variant="primary" className="btn-block">
                    Login
                </Button>
            </form>
        </AuthLayout>
    );
};

export default LoginForm;
