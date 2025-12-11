import { motion } from 'framer-motion';
import { Home, ShoppingBag, Utensils, Activity, Bot, PenTool } from 'lucide-react';

const cases = [
    {
        icon: Home,
        title: "Inmobiliarias",
        desc: "Tu agente 24/7. El chatbot responde dudas sobre precios y ubicación al instante, mientras tú cierras la venta.",
        ai_feature: "IA Generativa: Crea descripciones atractivas de propiedades en segundos."
    },
    {
        icon: Utensils,
        title: "Restaurantes",
        desc: "Envía el 'Menú del Día' a 500 clientes con un clic. Gestiona reservas automáticas sin atender el teléfono.",
        ai_feature: "IA Chatbot: Toma pedidos y responde preguntas sobre alérgenos automáticamente."
    },
    {
        icon: ShoppingBag,
        title: "Retail & Moda",
        desc: "Lanzamientos de nueva colección. Segmenta y envía catálogos a quienes realmente compran.",
        ai_feature: "IA Copywriter: Redacta textos de venta persuasivos para tus campañas de WhatsApp."
    },
    {
        icon: Activity,
        title: "Clínicas y Salud",
        desc: "Recordatorios de citas automáticos para reducir el ausentismo. Confirmación vía WhatsApp.",
        ai_feature: "IA Asistente: Responde preguntas frecuentes sobre horarios y servicios."
    }
];

export default function UseCases() {
    return (
        <div className="py-24 bg-black relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-neon-purple/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-6">
                        Diseñado para tu negocio
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        No importa tu industria. Si tienes clientes en WhatsApp, <span className="text-neon-green">SourDev</span> es tu nuevo mejor empleado.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {cases.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ delay: i * 0.1 }}
                            className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-neon-green/50 hover:bg-white/10 transition-all duration-300"
                        >
                            <div className="flex items-start gap-6">
                                <div className="p-4 rounded-2xl bg-gradient-to-br from-gray-800 to-black border border-white/5 group-hover:scale-110 transition-transform">
                                    <item.icon className="w-8 h-8 text-neon-green" />
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                                    <p className="text-gray-400 leading-relaxed">
                                        {item.desc}
                                    </p>
                                    <div className="pt-4 border-t border-white/10 flex items-start gap-3">
                                        {item.ai_feature.includes("Chatbot") ? <Bot className="w-5 h-5 text-neon-purple shrink-0" /> : <PenTool className="w-5 h-5 text-neon-blue shrink-0" />}
                                        <p className="text-sm font-light text-gray-300">
                                            <strong className={item.ai_feature.includes("Chatbot") ? "text-neon-purple" : "text-neon-blue"}>
                                                {item.ai_feature.split(":")[0]}:
                                            </strong>
                                            {item.ai_feature.split(":")[1]}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
