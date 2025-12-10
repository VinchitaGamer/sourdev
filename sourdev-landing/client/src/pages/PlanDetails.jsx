import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Check, ArrowLeft, HelpCircle } from 'lucide-react';

export default function PlanDetails() {
    const { id } = useParams();
    const [plans, setPlans] = useState([]);
    const [currentPlan, setCurrentPlan] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:4000/api/pricing')
            .then(res => res.json())
            .then(data => {
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

    // Extract all unique comparison keys
    const allComparisonKeys = Array.from(new Set(plans.flatMap(p => Object.keys(p.comparison))));

    return (
        <div className="min-h-screen bg-black text-white font-sans pt-20 pb-20">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft size={20} /> Volver al inicio
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-center">
                    <div>
                        <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                            Plan {currentPlan.name}
                        </h1>
                        <p className="text-2xl font-bold text-sour-lime mb-6">{currentPlan.price}</p>
                        <p className="text-lg text-gray-300 leading-relaxed mb-8">
                            {currentPlan.extended_description || currentPlan.description}
                        </p>
                        <a
                            href={`https://wa.me/59168079141?text=${encodeURIComponent(`Hola, estoy interesado en solicitar el Plan ${currentPlan.name}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary inline-block text-lg px-8 py-4"
                        >
                            Solicitar este Plan
                        </a>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Check className="text-sour-lime" /> Incluye todo esto:
                        </h3>
                        <ul className="space-y-4">
                            {currentPlan.features.map((feat, i) => (
                                <li key={i} className="flex items-start gap-3 text-gray-300">
                                    <span className="h-2 w-2 rounded-full bg-sour-lime mt-2" />
                                    {feat}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Comparison Table */}
                <div className="mb-20">
                    <h2 className="text-3xl font-bold mb-8 text-center">Comparativa de Planes</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr>
                                    <th className="p-4 border-b border-white/10 text-gray-400 font-medium">Características</th>
                                    {plans.map(p => (
                                        <th key={p.id} className={`p-4 border-b border-white/10 text-xl font-bold ${p.id === currentPlan.id ? 'text-sour-lime' : 'text-white'}`}>
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

                {/* FAQ Section */}
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold mb-8 text-center">Preguntas Frecuentes</h2>
                    <div className="space-y-6">
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                            <h3 className="text-lg font-bold mb-2 flex items-center gap-2"><HelpCircle size={20} className="text-sour-lime" /> ¿Puedo cambiar de plan después?</h3>
                            <p className="text-gray-400">Sí, puedes mejorar tu plan en cualquier momento. El cambio se aplicará inmediatamente y se ajustará la facturación.</p>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                            <h3 className="text-lg font-bold mb-2 flex items-center gap-2"><HelpCircle size={20} className="text-sour-lime" /> ¿Necesito tarjeta de crédito?</h3>
                            <p className="text-gray-400">Para iniciar la beta no requerimos tarjeta. Una vez lanzada la versión final, podrás configurar tu método de pago preferido.</p>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                            <h3 className="text-lg font-bold mb-2 flex items-center gap-2"><HelpCircle size={20} className="text-sour-lime" /> ¿Qué pasa si excedo los mensajes?</h3>
                            <p className="text-gray-400">Te notificaremos antes de llegar al límite. Podrás adquirir paquetes extra de mensajes sin cambiar de plan.</p>
                        </div>
                    </div>
                </div>

                <div id="contact-form" className="mt-20">
                    {/* Placeholder for contact anchor */}
                </div>
            </div>
        </div>
    );
}
