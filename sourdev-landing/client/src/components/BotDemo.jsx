import { motion } from 'framer-motion';
import { MessageCircle, Bot, Zap, ArrowRight, HelpCircle } from 'lucide-react';

export default function BotDemo() {
    const phoneNumber = "59168079141";
    const message = "Hola, vengo desde la web y quiero probar el bot de SourDev.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    const faqs = [
        "¿Cuáles son los precios?",
        "¿Tienen soporte técnico?",
        "¿Puedo agendar una demo?",
        "¿Cómo funciona la integración?"
    ];

    return (
        <section className="py-24 relative overflow-hidden bg-black/50">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sour-lime/5 rounded-full blur-[120px] -z-10" />

            <div className="container mx-auto px-6 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Column: Call to Action */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 rounded-xl bg-sour-lime/10 border border-sour-lime/20 text-sour-lime">
                                <Bot size={32} />
                            </div>
                            <span className="text-sour-lime font-mono font-bold tracking-wider">DEMO EN VIVO</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            No nos creas a nosotros. <br />
                            <span className="bg-gradient-to-r from-sour-lime to-white bg-clip-text text-transparent">Pone a prueba nuestra IA.</span>
                        </h2>

                        <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                            Interactúa ahora mismo con nuestro asistente virtual. Experimenta la velocidad de respuesta, la naturalidad del lenguaje y cómo puede cualificar a tus clientes en segundos.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary group flex items-center justify-center gap-3 px-8 py-4 text-lg"
                            >
                                <MessageCircle className="group-hover:rotate-12 transition-transform" />
                                Probar en WhatsApp
                                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>

                        <p className="mt-4 text-sm text-gray-500 flex items-center gap-2">
                            <Zap size={14} className="text-yellow-500" />
                            Respuesta en tiempo real (Disponible 24/7)
                        </p>
                    </motion.div>

                    {/* Right Column: Chat Preview / Suggestions */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative z-10 bg-gray-900 border border-white/10 rounded-3xl p-8 shadow-2xl">
                            <div className="flex items-center gap-4 mb-8 border-b border-white/5 pb-6">
                                <div className="relative">
                                    <div className="w-12 h-12 rounded-full bg-sour-lime flex items-center justify-center text-black font-bold">
                                        <Bot size={24} />
                                    </div>
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-gray-900 rounded-full"></div>
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-lg">SourBot</h3>
                                    <p className="text-sour-lime text-xs font-mono animate-pulse">En línea • Responde al instante</p>
                                </div>
                            </div>

                            <div className="space-y-4 mb-8">
                                <div className="bg-white/5 rounded-2xl p-4 rounded-tl-none border border-white/5 max-w-[90%]">
                                    <p className="text-gray-300 text-sm">
                                        ¡Hola! 👋 Soy el asistente virtual de SourDev. Estoy aquí para demostrarte cómo puedo ayudar a tu negocio a vender más. ¿Qué te gustaría saber?
                                    </p>
                                </div>
                            </div>

                            <div>
                                <p className="text-gray-500 text-xs uppercase tracking-wider font-bold mb-4 flex items-center gap-2">
                                    <HelpCircle size={14} />
                                    Preguntas Sugeridas
                                </p>
                                <div className="grid grid-cols-1 gap-3">
                                    {faqs.map((q, i) => (
                                        <a
                                            key={i}
                                            href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(q)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-left px-4 py-3 rounded-xl bg-white/5 hover:bg-sour-lime/10 border border-white/5 hover:border-sour-lime/30 transition-colors text-sm text-gray-300 hover:text-sour-lime flex items-center justify-between group"
                                        >
                                            {q}
                                            <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute -top-10 -right-10 w-24 h-24 border border-sour-lime/20 rounded-full animate-spin-slow" />
                        <div className="absolute -bottom-5 -left-5 w-16 h-16 border border-white/10 rounded-full animate-reverse-spin" />
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
