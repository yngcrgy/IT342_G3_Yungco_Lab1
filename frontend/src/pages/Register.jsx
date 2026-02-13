import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const { register, error } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        setIsLoading(true);
        const success = await register(formData.username, formData.email, formData.password);
        setIsLoading(false);

        if (success) {
            navigate('/login');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-10 w-full max-w-md mx-auto px-4">
            <div className="text-center mb-6">
                <h1 className="text-3xl font-serif text-white mb-2">Create Account</h1>
                <p className="text-gray-400">Join the exclusive experience</p>
            </div>

            <Card className="w-full">
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    {error && <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded text-sm text-center">{error}</div>}

                    <Input
                        label="Username"
                        type="text"
                        id="username"
                        placeholder="Enter username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className="py-2.5"
                    />
                    <Input
                        label="Email Address"
                        type="email"
                        id="email"
                        placeholder="yourname@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="py-2.5"
                    />
                    <Input
                        label="Password"
                        type="password"
                        id="password"
                        placeholder="........"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="py-2.5"
                    />
                    <Input
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        placeholder="........"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="py-2.5"
                    />

                    <Button type="submit" variant="primary" className="mt-2" disabled={isLoading}>
                        {isLoading ? 'Creating Account...' : 'Create Account'}
                    </Button>

                    <p className="text-center text-gray-400 text-sm mt-2">
                        Already have an account? <Link to="/login" className="text-[#F59E0B] hover:text-[#D97706] transition-colors font-medium">Sign in</Link>
                    </p>
                </form>
            </Card>
        </div>
    );
};

export default Register;
