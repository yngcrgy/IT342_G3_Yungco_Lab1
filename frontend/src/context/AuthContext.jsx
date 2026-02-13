import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Check local storage for existing session
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        setError(null);
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }), // Backend expects 'username'
            });

            if (!response.ok) {
                const msg = await response.text();
                throw new Error(msg || 'Login failed');
            }

            const message = await response.text();
            // For now, backend only returns a string message, no user object or token.
            // We will simulate a user object based on success.
            // Ideally backend should return the User object or JWT.
            const userData = { name: username, username };

            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            return true;
        } catch (err) {
            setError(err.message);
            return false;
        }
    };

    const register = async (username, email, password) => {
        setError(null);
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password }),
            });

            if (!response.ok) {
                const msg = await response.text();
                throw new Error(msg || 'Registration failed');
            }

            // Auto login after register? Or just return true to redirect to login.
            return true;
        } catch (err) {
            setError(err.message);
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading, error }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
