import React from 'react';
import '../../styles/Button.css';

// Reusable button component with variant-based styling
const Button = ({
    children,          // Button content
    onClick,           // Click handler
    type = 'button',   // Button type (default: button)
    variant = 'primary', // Style variant (primary, secondary, etc.)
    className = '',    // Additional custom classes
    ...props           // Any extra props (disabled, aria-*, etc.)
}) => {
    return (
        <button 
            type={type}
            onClick={onClick}
            className={`btn btn-${variant} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
