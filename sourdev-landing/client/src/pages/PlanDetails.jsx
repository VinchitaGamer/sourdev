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

            <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 relative z-10 flex flex-col items-center justify-center min-h-[85vh]">

                {/* Header Navigation - Floating */}
                <div className="absolute top-6 left-6 md:left-0 z-20">
                    <Link to="/" className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-sm font-medium">
                        <ArrowLeft size={16} /> Volver
                    </Link>
                </div>

                {/* Unified Glass Card */}
                <div className="w-full bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row mt-16 md:mt-0">

                    {/* Left Panel: Core Info */}
                    <div className="p-8 md:p-12 flex-1 lg:w-1/2 flex flex-col justify-center relative">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sour-lime to-transparent opacity-50" />

                        <div className="inline-flex items-center gap-2 text-sour-lime mb-6">
                            <span className="w-2 h-2 rounded-full bg-sour-lime animate-pulse" />
                            <span className="text-xs font-bold uppercase tracking-widest">Plan Seleccionado</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-black mb-2 text-white leading-tight">
                            {currentPlan.name}
                        </h1>
                        <div className="flex items-baseline gap-2 mb-8">
                            <span className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sour-lime to-white">
                                {currentPlan.price}
                            </span>
                            <span className="text-lg text-gray-400">/mes</span>
                        </div>

                        <p className="text-gray-300 text-lg leading-relaxed mb-8 border-l-2 border-white/10 pl-4">
                            {currentPlan.extended_description || currentPlan.description}
                        </p>

                        <a
                            href={`https://wa.me/59176266696?text=${encodeURIComponent(`Hola, estoy interesado en solicitar el Plan ${currentPlan.name}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary w-full sm:w-fit text-center inline-flex items-center justify-center gap-2 text-lg px-8 py-4 rounded-xl group"
                        >
                            Solicitar Plan <Check size={20} className="group-hover:scale-110 transition-transform" />
                        </a>
                    </div>

                    {/* Right Panel: Features & Matrix */}
                    <div className="bg-white/5 p-8 md:p-12 lg:w-1/2 border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col justify-center">
                        <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
                            Todas las funciones incluidas:
                        </h3>

                        {/* Compact Grid for Features */}
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4 mb-8">
                            {currentPlan.features.map((feat, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                                    <div className="mt-1 min-w-[16px]">
                                        <Check size={16} className="text-sour-lime" strokeWidth={3} />
                                    </div>
                                    <span className="leading-snug">{feat}</span>
                                </li>
                            ))}
                        </ul>

                        {/* Mini Comparison Highlight */}
                        <div className="mt-auto pt-6 border-t border-white/10">
                            <p className="text-xs text-sour-lime font-mono uppercase tracking-wider mb-3">Highlights del Plan</p>
                            <div className="grid grid-cols-2 gap-4">
                                {allComparisonKeys.slice(0, 4).map(key => (
                                    <div key={key}>
                                        <div className="text-xs text-gray-500 mb-1">{key}</div>
                                        <div className="text-sm font-semibold text-white">{currentPlan.comparison[key] || '-'}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Minimal FAQ Below (Optional/Secondary) */}
                <div className="mt-16 w-full max-w-4xl text-center">
                    <p className="text-gray-500 text-sm">
                        ¿Dudas? <a href="https://wa.me/59176266696" className="text-white hover:text-sour-lime underline underline-offset-4 decoration-sour-lime/30">Habla con un asesor humano</a> o revisa nuestra tabla comparativa completa abajo.
                    </p>
                </div>

                <div className="h-20" />
            </div>

            {/* Comparison Table */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 relative z-10">
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
