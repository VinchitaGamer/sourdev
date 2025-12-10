import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';

export default function PricingManager() {
    const [plans, setPlans] = useState([]);
    const [editingPlan, setEditingPlan] = useState(null); // null = list mode, {} = create mode, {id...} = edit mode

    const initialPlanState = {
        name: '',
        price: '',
        description: '',
        extended_description: '',
        comparison_data: '{}',
        features_json: [],
        image_url: '',
        is_active: 1
    };
    const [formData, setFormData] = useState(initialPlanState);
    const [featureInput, setFeatureInput] = useState('');

    useEffect(() => {
        fetchPlans();
    }, []);

    const fetchPlans = async () => {
        try {
            const res = await fetch('http://localhost:4000/api/pricing');
            if (res.ok) {
                const data = await res.json();
                setPlans(data);
            }
        } catch (err) { console.error(err); }
    };

    const handleEdit = (plan) => {
        setEditingPlan(plan);
        const compData = plan.comparison_data
            ? (typeof plan.comparison_data === 'string' ? plan.comparison_data : JSON.stringify(plan.comparison_data, null, 2))
            : '{}';

        setFormData({
            ...plan,
            comparison_data: compData,
            features_json: Array.isArray(plan.features_json) ? plan.features_json : JSON.parse(plan.features_json || '[]')
        });
    };

    const handleCreate = () => {
        setEditingPlan('new');
        setFormData(initialPlanState);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this plan?')) return;
        try {
            const token = localStorage.getItem('token');
            await fetch(`http://localhost:4000/api/admin/pricing/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchPlans();
        } catch (e) { console.error(e); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const isNew = editingPlan === 'new';
        const url = isNew
            ? 'http://localhost:4000/api/admin/pricing'
            : `http://localhost:4000/api/admin/pricing/${editingPlan.id}`;

        const method = isNew ? 'POST' : 'PUT';

        let parsedComparison = {};
        try {
            parsedComparison = JSON.parse(formData.comparison_data);
        } catch (e) {
            alert('Invalid JSON in Comparison Data');
            return;
        }

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ ...formData, comparison_data: parsedComparison })
            });
            if (res.ok) {
                setEditingPlan(null);
                fetchPlans();
            }
        } catch (e) { console.error(e); }
    };

    const addFeature = () => {
        if (!featureInput.trim()) return;
        setFormData({ ...formData, features_json: [...formData.features_json, featureInput] });
        setFeatureInput('');
    };

    const removeFeature = (idx) => {
        const newFeatures = [...formData.features_json];
        newFeatures.splice(idx, 1);
        setFormData({ ...formData, features_json: newFeatures });
    };

    if (editingPlan) {
        return (
            <div className="max-w-2xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white">{editingPlan === 'new' ? 'Create Plan' : 'Edit Plan'}</h2>
                    <button onClick={() => setEditingPlan(null)} className="text-gray-400 hover:text-white"><X size={24} /></button>
                </div>
                <form onSubmit={handleSubmit} className="bg-black/50 border border-white/10 p-6 rounded-xl space-y-4">
                    <div>
                        <label className="block text-gray-400 text-sm mb-1">Plan Name</label>
                        <input className="w-full bg-black border border-white/20 rounded p-2 text-white"
                            value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-400 text-sm mb-1">Price</label>
                            <input className="w-full bg-black border border-white/20 rounded p-2 text-white"
                                value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} required />
                        </div>
                        <div>
                            <label className="block text-gray-400 text-sm mb-1">Image URL</label>
                            <input className="w-full bg-black border border-white/20 rounded p-2 text-white"
                                value={formData.image_url} onChange={e => setFormData({ ...formData, image_url: e.target.value })} />
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-400 text-sm mb-1">Description (Card)</label>
                        <textarea className="w-full bg-black border border-white/20 rounded p-2 text-white h-20"
                            value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                    </div>

                    <div>
                        <label className="block text-gray-400 text-sm mb-1">Extended Description (Detail Page)</label>
                        <textarea className="w-full bg-black border border-white/20 rounded p-2 text-white h-32"
                            value={formData.extended_description} onChange={e => setFormData({ ...formData, extended_description: e.target.value })} />
                    </div>

                    <div>
                        <label className="block text-gray-400 text-sm mb-1">Comparison Data (JSON)</label>
                        <p className="text-xs text-gray-500 mb-1">Key-Value format. Example: {"{"} "Users": "5", "Storage": "10GB" {"}"}</p>
                        <textarea className="w-full bg-black/50 border border-white/20 rounded p-2 text-green-400 font-mono text-sm h-32"
                            value={formData.comparison_data} onChange={e => setFormData({ ...formData, comparison_data: e.target.value })} />
                    </div>

                    <div>
                        <label className="block text-gray-400 text-sm mb-1">Features</label>
                        <div className="flex gap-2 mb-2">
                            <input className="flex-1 bg-black border border-white/20 rounded p-2 text-white"
                                value={featureInput} onChange={e => setFeatureInput(e.target.value)} placeholder="Add feature..." />
                            <button type="button" onClick={addFeature} className="bg-white/10 p-2 rounded hover:bg-white/20 text-white"><Plus /></button>
                        </div>
                        <ul className="space-y-1">
                            {formData.features_json.map((feat, idx) => (
                                <li key={idx} className="flex justify-between bg-white/5 p-2 rounded text-sm text-gray-300">
                                    {feat}
                                    <button type="button" onClick={() => removeFeature(idx)} className="text-red-400 hover:text-red-300"><X size={14} /></button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <button type="submit" className="w-full bg-neon-blue text-white font-bold py-3 rounded-lg mt-4">Save Plan</button>
                </form >
            </div >
        );
    }

    return (
        <div className="space-y-8">
            <header className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Pricing Plans</h2>
                    <p className="text-gray-400">Manage subscription models.</p>
                </div>
                <button onClick={handleCreate} className="flex items-center gap-2 bg-neon-blue text-white px-4 py-2 rounded-lg hover:opacity-90">
                    <Plus size={20} /> Create Plan
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plans.map(plan => (
                    <div key={plan.id} className="bg-black/50 border border-white/10 p-6 rounded-xl flex flex-col">
                        <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                        <p className="text-neon-blue text-lg font-bold mb-4">{plan.price}</p>
                        <div className="flex-1 space-y-2 mb-6">
                            {(Array.isArray(plan.features_json) ? plan.features_json : JSON.parse(plan.features_json || '[]')).map((f, i) => (
                                <div key={i} className="text-sm text-gray-400">• {f}</div>
                            ))}
                        </div>
                        <div className="flex gap-2 pt-4 border-t border-white/10">
                            <button onClick={() => handleEdit(plan)} className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white py-2 rounded">
                                <Edit2 size={16} /> Edit
                            </button>
                            <button onClick={() => handleDelete(plan.id)} className="px-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
