import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, error } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const success = await login(username, password);
        setIsLoading(false);
        if (success) {
            navigate('/dashboard');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-10 w-full max-w-md mx-auto px-4">
            <div className="text-center mb-6">
                <h1 className="text-3xl font-serif text-white mb-2">Welcome Back</h1>
                <p className="text-gray-400">Sign in to your exclusive account</p>
            </div>

            <Card className="w-full">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {error && <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded text-sm text-center">{error}</div>}

                    <Input
                        label="Username"
                        type="text"
                        id="username"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="py-2.5"
                    />
                    <Input
                        label="Password"
                        type="password"
                        id="password"
                        placeholder="........"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="py-2.5"
                    />

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
                            <input type="checkbox" className="rounded bg-gray-800 border-gray-700 text-[#F59E0B] focus:ring-[#F59E0B]" />
                            Remember me
                        </label>
                        <a href="#" className="text-[#F59E0B] hover:text-[#D97706] transition-colors">Forgot password?</a>
                    </div>

                    <Button type="submit" variant="primary" disabled={isLoading}>
                        {isLoading ? 'Signing In...' : 'Sign In'}
                    </Button>

                    <p className="text-center text-gray-400 text-sm mt-2">
                        Don't have an account? <Link to="/register" className="text-[#F59E0B] hover:text-[#D97706] transition-colors font-medium">Create one</Link>
                    </p>
                </form>
            </Card>
        </div>
    );
};

export default Login;
