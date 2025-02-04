import React, { useState } from 'react';
import { loginUser } from '../../api/userService';
import { useNavigate } from 'react-router-dom';

interface LoginFormProps {
    setIsAuthenticated: (value: boolean) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ setIsAuthenticated }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        await loginUser({ username, password }).then(() => {
            setIsAuthenticated(true);
            navigate('/');
            setSuccess('Login successful');
        }).catch((error) => {
            setError(error.response.data.message || 'Login failed');
        });
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
            {success && <p className="text-green-500 mb-4 text-center">{success}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Login
                </button>
            </form>
        </div>
    );
}

export default LoginForm;