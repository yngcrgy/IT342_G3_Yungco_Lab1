import React from 'react';

const Input = ({ label, type = 'text', id, placeholder, value, onChange, error, ...props }) => {
    return (
        <div className="flex flex-col gap-2">
            {label && (
                <label htmlFor={id} className="text-gray-400 text-sm font-medium">
                    {label}
                </label>
            )}
            <input
                type={type}
                id={id}
                className={`w-full bg-[#1A1A1A] border-2 ${error ? 'border-red-500' : 'border-gray-500'} rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] transition-colors duration-200 ${props.className || ''}`}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                {...props}
            />
            {error && <span className="text-red-500 text-sm">{error}</span>}
        </div>
    );
};

export default Input;
