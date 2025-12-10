import React, { useEffect, useState } from 'react';
import { Mail, Calendar, CheckCircle } from 'lucide-react';

export default function Dashboard() {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeads = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch('http://localhost:4000/api/admin/leads', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                if (res.ok) setLeads(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchLeads();
    }, []);

    if (loading) return <div className="text-white">Loading data...</div>;

    return (
        <div className="space-y-8">
            <header>
                <h2 className="text-3xl font-bold text-white mb-2">Dashboard</h2>
                <p className="text-gray-400">Overview of recent activity and leads.</p>
            </header>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-black/50 border border-white/10 p-6 rounded-xl">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-neon-blue/20 rounded-lg text-neon-blue">
                            <Mail size={24} />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Total Leads</p>
                            <h3 className="text-2xl font-bold text-white">{leads.length}</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Leads Table */}
            <div className="bg-black/50 border border-white/10 rounded-xl overflow-hidden">
                <div className="p-6 border-b border-white/10">
                    <h3 className="text-xl font-bold text-white">Recent Messages</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-white/5 text-gray-400 text-sm">
                            <tr>
                                <th className="p-4">Date</th>
                                <th className="p-4">Name</th>
                                <th className="p-4">Contact</th>
                                <th className="p-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                            {leads.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="p-8 text-center text-gray-500">No leads found.</td>
                                </tr>
                            ) : leads.map((lead) => (
                                <tr key={lead.id} className="text-gray-300 hover:bg-white/5">
                                    <td className="p-4 flex items-center gap-2">
                                        <Calendar size={16} className="text-gray-500" />
                                        {new Date(lead.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="p-4 font-medium text-white">{lead.full_name}</td>
                                    <td className="p-4">
                                        <div className="text-sm">{lead.email}</div>
                                        <div className="text-xs text-neon-green">{lead.whatsapp_number}</div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold
                      ${lead.status === 'nuevo' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'}
                    `}>
                                            {lead.status.toUpperCase()}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
