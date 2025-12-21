import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Check, ArrowLeft, HelpCircle } from 'lucide-react';
import api from '../lib/api';

export default function PlanDetails() {
    const { id } = useParams();
    const [plans, setPlans] = useState([]);
    const [currentPlan, setCurrentPlan] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/pricing')
            .then(res => {
                const data = res.data;
                const parsed = data.map(p => ({
                    ...p,
                    features: typeof p.features_json === 'string' ? JSON.parse(p.features_json) : p.features_json,
                    comparison: typeof p.comparison_data === 'string' ? JSON.parse(p.comparison_data) : (p.comparison_data || {})
                }));
                setPlans(parsed);
                setCurrentPlan(parsed.find(p => p.id === parseInt(id)));
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Cargando...</div>;
    if (!currentPlan) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Plan no encontrado.</div>;

    const allComparisonKeys = Array.from(new Set(plans.flatMap(p => Object.keys(p.comparison))));

    // Fallback image if plan has no specific image
    const bgImage = currentPlan.image_url || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1920";

    return (
        <div className="min-h-screen text-white font-sans relative overflow-x-hidden">

            {/* Immersive Background */}
            <div className="fixed inset-0 z-0">
                <img src={bgImage} alt="Background" className="w-full h-full object-cover opacity-30" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />
                <div className="absolute inset-0 backdrop-blur-[2px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 relative z-10">

                {/* Header Navigation */}
                <Link to="/" className="inline-flex items-center gap-2 text-gray-300 hover:text-sour-lime mb-8 transition-colors backdrop-blur-md bg-black/30 px-4 py-2 rounded-full border border-white/10 w-fit">
                    <ArrowLeft size={18} /> <span className="text-sm font-medium">Volver al inicio</span>
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-20">
                    {/* Left Column: Title & Description */}
                    <div className="flex flex-col justify-center">
                        <div className="inline-block bg-sour-lime/10 text-sour-lime px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-sour-lime/20 w-fit">
                            Nivel Seleccionado
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
                            Plan <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">{currentPlan.name}</span>
                        </h1>
                        <p className="text-3xl md:text-4xl font-bold text-sour-lime mb-6">{currentPlan.price}<span className="text-lg text-gray-400 font-normal">/mes</span></p>

                        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl">
                            <p className="text-lg text-gray-200 leading-relaxed">
                                {currentPlan.extended_description || currentPlan.description}
                            </p>
                        </div>

                        <div className="mt-8">
                            <a
                                href={`https://wa.me/59176266696?text=${encodeURIComponent(`Hola, estoy interesado en solicitar el Plan ${currentPlan.name}`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary w-full md:w-auto text-center inline-block text-lg px-8 py-4 shadow-[0_0_30px_rgba(163,230,53,0.3)] hover:shadow-[0_0_50px_rgba(163,230,53,0.5)] transition-shadow"
                            >
                                Solicitar este Plan
                            </a>
                            <p className="text-gray-400 text-sm mt-3 text-center md:text-left">
                                * Activación inmediata tras confirmación.
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Features Card */}
                    <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-32 bg-sour-lime/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                        <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 relative z-10">
                            <span className="bg-sour-lime text-black rounded-full p-1"><Check size={16} strokeWidth={4} /></span>
                            Lo que incluye tu plan:
                        </h3>
                        <ul className="space-y-4 relative z-10">
                            {currentPlan.features.map((feat, i) => (
                                <li key={i} className="flex items-start gap-4 text-gray-200 group-hover:text-white transition-colors">
                                    <div className="h-6 w-6 rounded-full bg-white/5 border border-white/20 flex items-center justify-center shrink-0 mt-0.5">
                                        <div className="h-2 w-2 rounded-full bg-sour-lime" />
                                    </div>
                                    <span className="text-base leading-snug">{feat}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Comparison Table */}
                <div className="mb-20 bg-black/40 backdrop-blur-lg border border-white/10 rounded-3xl p-6 md:p-8 overflow-hidden">
                    <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Comparativa Completa</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[600px]">
                            <thead>
                                <tr>
                                    <th className="p-4 border-b border-white/10 text-gray-400 font-medium">Características</th>
                                    {plans.map(p => (
                                        <th key={p.id} className={`p-4 border-b border-white/10 text-lg md:text-xl font-bold ${p.id === currentPlan.id ? 'text-sour-lime' : 'text-white'}`}>
                                            {p.name}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {allComparisonKeys.map(key => (
                                    <tr key={key} className="hover:bg-white/5 transition-colors">
                                        <td className="p-4 text-gray-300 font-medium">{key}</td>
                                        {plans.map(p => (
                                            <td key={p.id} className={`p-4 ${p.id === currentPlan.id ? 'bg-white/5 font-semibold text-white' : 'text-gray-400'}`}>
                                                {p.comparison[key] || '-'}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* FAQ Section Grid */}
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">Preguntas Frecuentes</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                            <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-sour-lime"><HelpCircle size={20} /> Upgrade</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">Puedes mejorar tu plan cuando quieras. El cambio es inmediato y prorrateado.</p>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                            <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-sour-lime"><HelpCircle size={20} /> Pagos</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">Aceptamos transferencias, QR y tarjeta. Sin plazos forzosos en planes mensuales.</p>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                            <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-sour-lime"><HelpCircle size={20} /> Soporte</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">El soporte técnico está incluido para ayudarte con la configuración inicial.</p>
                        </div>
                    </div>
                </div>

                <div className="h-20" /> {/* Spacer */}
            </div>
        </div>
    );
}
