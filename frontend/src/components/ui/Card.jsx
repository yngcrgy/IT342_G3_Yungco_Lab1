import React from 'react';

const Card = ({ children, className = '' }) => {
    return (
        <div className={`bg-[#121212] border border-gray-700 rounded-2xl p-8 shadow-2xl ${className}`}>
            {children}
        </div>
    );
};

export default Card;
