import React, { useState, useEffect } from 'react';
import { Save, AlertCircle } from 'lucide-react';
import api from '../../lib/api';

export default function ContentEditor() {
    const [content, setContent] = useState({
        title: '',
        subtitle: '',
        ctaText: '',
        imageUrl: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Fetch current content
        // Fetch current content
        api.get('/content/hero')
            .then(res => {
                const data = res.data;
                if (data.title) setContent(data);
            })
            .catch(err => console.error(err));
    }, []);

    const handleChange = (e) => {
        setContent({ ...content, [e.target.name]: e.target.value });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: { 'Authorization': `Bearer ${token}` }
            };

            await api.put('/admin/content/hero', content, config);

            setMessage('Content updated successfully!');


        } catch (err) {
            setMessage('Server error.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <header>
                <h2 className="text-3xl font-bold text-white mb-2">Content Editor</h2>
                <p className="text-gray-400">Manage Landing Page content (Hero Section).</p>
            </header>

            {message && (
                <div className={`p-4 rounded-lg flex items-center gap-2 ${message.includes('success') ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                    <AlertCircle size={20} />
                    {message}
                </div>
            )}

            <form onSubmit={handleSave} className="bg-black/50 border border-white/10 p-6 rounded-xl space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Hero Title</label>
                    <input
                        type="text"
                        name="title"
                        value={content.title}
                        onChange={handleChange}
                        className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-blue"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Subtitle</label>
                    <textarea
                        name="subtitle"
                        value={content.subtitle}
                        onChange={handleChange}
                        rows="3"
                        className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-blue"
                    />
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">CTA Button Text</label>
                        <input
                            type="text"
                            name="ctaText"
                            value={content.ctaText}
                            onChange={handleChange}
                            className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-blue"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Image URL (Optional)</label>
                        <input
                            type="text"
                            name="imageUrl"
                            value={content.imageUrl}
                            onChange={handleChange}
                            className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-blue"
                        />
                    </div>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 bg-neon-blue text-white font-bold px-6 py-3 rounded-lg hover:bg-neon-blue/80 transition-colors disabled:opacity-50"
                    >
                        <Save size={20} />
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
}
