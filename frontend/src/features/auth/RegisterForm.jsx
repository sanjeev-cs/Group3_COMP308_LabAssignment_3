import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import AuthLayout from '../../components/layout/AuthLayout';
import useRegisterForm from '../../hooks/useRegisterForm';

// Registration page with form handling via custom hook
const RegisterForm = () => {
    const { formData, error, handleChange, handleSubmit } = useRegisterForm();

    return (
        <AuthLayout
            title="Register"
            footer={
                <p>
                    Already have an account? <Link to="/login">Login here</Link>
                </p>
            }
        >
            {/* Display registration error if exists */}
            {error && <p className="error-message">{error}</p>}

            {/* Registration form */}
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
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
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
                        minLength="6"
                    />
                </div>

                <Button type="submit" variant="primary" className="btn-block">
                    Register
                </Button>
            </form>
        </AuthLayout>
    );
};

export default RegisterForm;
