import React from 'react';

const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '', ...props }) => {
    const baseStyle = "w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0a0a0a] disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-[#F59E0B] hover:bg-[#D97706] text-black focus:ring-[#F59E0B]",
        secondary: "bg-white/10 hover:bg-white/20 text-white focus:ring-white/50",
        ghost: "bg-transparent hover:bg-white/5 text-gray-400 hover:text-white"
    };

    return (
        <button
            type={type}
            className={`${baseStyle} ${variants[variant]} ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
