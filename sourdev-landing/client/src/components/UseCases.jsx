import { motion } from 'framer-motion';
import { Home, ShoppingBag, Utensils, Activity, Bot, PenTool } from 'lucide-react';

const cases = [
    {
        icon: Home,
        title: "Inmobiliarias",
        desc: "Tu agente 24/7. El chatbot responde dudas sobre precios y ubicación al instante.",
        ai_feature: "IA Generativa: Crea descripciones épicas.",
        img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800",
        delay: 0
    },
    {
        icon: Utensils,
        title: "Restaurantes",
        desc: "Envía el 'Menú del Día' a 500 clientes con un clic. Reservas automáticas.",
        ai_feature: "IA Chatbot: Gestiona pedidos y alérgenos.",
        img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800",
        delay: 0.1
    },
    {
        icon: ShoppingBag,
        title: "Retail & Moda",
        desc: "Lanzamientos de colección. Segmenta y envía catálogos a quienes realmente compran.",
        ai_feature: "IA Copywriter: Redacta textos que venden.",
        img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800",
        delay: 0.2
    },
    {
        icon: Activity,
        title: "Clínicas y Salud",
        desc: "Recordatorios de citas para reducir el ausentismo. Confirmación automática.",
        ai_feature: "IA Asistente: Agenda 24/7 sin errores.",
        img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800",
        delay: 0.3
    }
];

export default function UseCases() {
    return (
        <div className="py-24 bg-black relative overflow-hidden section-beam">
            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-6">
                        Diseñado para tu negocio
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        No importa tu industria. Si tienes clientes en WhatsApp, <span className="text-sour-lime font-bold">SourDev</span> es tu nuevo mejor empleado.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
                    {cases.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative h-[256px] md:h-[320px] rounded-3xl overflow-hidden border border-white/10 hover:border-sour-lime/50 transition-all cursor-pointer shadow-lg hover:shadow-[0_0_30px_rgba(163,230,53,0.15)]"
                        >
                            {/* Background Image with Overlay */}
                            <div className="absolute inset-0 z-0">
                                <img src={item.img} alt={item.title} loading="lazy" decoding="async" className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                            </div>

                            <div className="relative z-10 h-full p-8 flex flex-col justify-end">
                                <div className="flex items-center gap-4 mb-3">
                                    <div className="p-2 rounded-lg bg-sour-lime text-black">
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white group-hover:text-sour-lime transition-colors">{item.title}</h3>
                                </div>

                                <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                                    {item.desc}
                                </p>

                                <div className="flex items-center gap-2 text-xs font-mono text-sour-lime bg-sour-lime/10 px-3 py-2 rounded-lg border border-sour-lime/20 w-fit">
                                    {item.ai_feature.includes("Chatbot") ? <Bot className="w-3 h-3" /> : <PenTool className="w-3 h-3" />}
                                    <span>{item.ai_feature}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
