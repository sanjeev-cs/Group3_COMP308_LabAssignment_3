import React from 'react';

// Shared layout for authentication pages (login, register, etc.)
const AuthLayout = ({ title, children, footer }) => {
    return (
        <div className="auth-form-container">
            {/* Form title */}
            <h2>{title}</h2>

            {/* Main form content */}
            {children}

            {/* Optional footer (links, extra actions) */}
            {footer}
        </div>
    );
};

export default AuthLayout;
