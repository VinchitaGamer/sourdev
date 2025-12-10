import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import api from '../../lib/api';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await api.post('/auth/login', { username, password });

            const data = res.data;
            const token = data.token;

            if (token) {
                localStorage.setItem('token', data.token);
                navigate('/admin');
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('Server error, please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="bg-neutral-900 border border-white/10 p-8 rounded-2xl w-full max-w-md shadow-2xl">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-12 h-12 bg-neon-blue/20 rounded-full flex items-center justify-center mb-4">
                        <Lock className="text-neon-blue" size={24} />
                    </div>
                    <h1 className="text-2xl font-bold text-white">Admin Access</h1>
                    <p className="text-gray-400">SourDev Control Panel</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg mb-6 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-blue transition-colors"
                            placeholder="Enter username"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-blue transition-colors"
                            placeholder="Enter password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-neon-blue to-neon-purple text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}
