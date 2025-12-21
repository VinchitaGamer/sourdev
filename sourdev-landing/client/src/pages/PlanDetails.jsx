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

    // Marketing Pitches (Hardcoded for impact)
    const marketingPitch = {
        1: {
            highlight: "Perfecto para Emprendedores",
            text: "Deja de perder clientes por no responder a tiempo. Este plan te da un asistente que trabaja 24/7, responde dudas frecuentes y califica a tus prospectos mientras tú duermes. Recupera tu tiempo y profesionaliza tu marca desde el día 1."
        },
        2: {
            highlight: "El Favorito de PyMEs en Crecimiento",
            text: "Convierte tu WhatsApp en una máquina de ventas conectada. Sincroniza pedidos con Google Sheets y agernda citas en Calendar sin mover un dedo. Elimina el error humano y gestiona tu inventario en tiempo real. Tu negocio, en piloto automático."
        },
        3: {
            highlight: "Potencia para Escalar Grandes Operaciones",
            text: "Infraestructura robusta para empresas que no pueden fallar. Integración nativa con tu ERP/CRM y bases de datos. Maneja miles de conversaciones simultáneas con seguridad y velocidad. La fuerza de ventas digital que tu corporativo necesita."
        }
    };

    const currentPitch = marketingPitch[currentPlan.id] || { highlight: "Potencia tu negocio", text: currentPlan.description };

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

                        <h1 className="text-3xl md:text-5xl font-black mb-2 text-white leading-tight">
                            {currentPlan.name}
                        </h1>
                        <div className="flex items-baseline gap-2 mb-6">
                            <span className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sour-lime to-white">
                                {currentPlan.price}
                            </span>
                            <span className="text-lg text-gray-400">/mes</span>
                        </div>

                        {/* Persuasive Description */}
                        <div className="mb-8 border-l-2 border-sour-lime/50 pl-5">
                            <h4 className="text-sour-lime font-bold text-lg mb-2">{currentPitch.highlight}</h4>
                            <p className="text-gray-200 text-base md:text-lg leading-relaxed">
                                {currentPitch.text}
                            </p>
                        </div>

                        <a
                            href={`https://wa.me/59176266696?text=${encodeURIComponent(`Hola, estoy interesado en solicitar el Plan ${currentPlan.name}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary w-full sm:w-fit text-center inline-flex items-center justify-center gap-2 text-lg px-8 py-4 rounded-xl group shadow-[0_0_20px_rgba(163,230,53,0.2)] hover:shadow-[0_0_35px_rgba(163,230,53,0.4)] transition-all"
                        >
                            ¡Lo quiero ahora! <Check size={20} className="group-hover:scale-110 transition-transform" />
                        </a>
                        <p className="text-gray-500 text-xs mt-3 flex items-center gap-1">
                            <Check size={12} className="text-sour-lime" /> Garantía de Satisfacción SourDev
                        </p>
                    </div>

                    {/* Right Panel: Features & Matrix */}
                    <div className="bg-white/5 p-8 md:p-12 lg:w-1/2 border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col justify-center">
                        <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
                            <span className="bg-white/10 p-1.5 rounded-lg"><Check size={18} className="text-sour-lime" /></span>
                            ¿Por qué este plan es para ti?
                        </h3>

                        {/* Compact Grid for Features */}
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4 mb-8">
                            {currentPlan.features.map((feat, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                                    <div className="mt-1 min-w-[6px] h-[6px] rounded-full bg-sour-lime" />
                                    <span className="leading-snug">{feat}</span>
                                </li>
                            ))}
                        </ul>

                        {/* Mini Comparison Highlight */}
                        <div className="mt-auto pt-6 border-t border-white/10">
                            <p className="text-[10px] text-sour-lime font-mono uppercase tracking-widest mb-4">ESPECIFICACIONES TÉCNICAS</p>
                            <div className="grid grid-cols-2 gap-6">
                                {allComparisonKeys.slice(0, 4).map(key => (
                                    <div key={key}>
                                        <div className="text-xs text-gray-500 mb-1 font-medium">{key}</div>
                                        <div className="text-sm font-bold text-white">{currentPlan.comparison[key] || '-'}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Minimal FAQ Below (Optional/Secondary) */}
                <div className="mt-12 w-full max-w-4xl text-center pb-8">
                    <p className="text-gray-500 text-sm">
                        ¿Aún no te decides? <a href="https://wa.me/59176266696" className="text-white hover:text-sour-lime underline underline-offset-4 decoration-sour-lime/30">Chatea con nosotros</a> y te ayudamos a elegir.
                    </p>
                </div>
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
