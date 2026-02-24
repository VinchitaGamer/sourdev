import { motion } from 'framer-motion'
import { MessageSquare, Zap, BarChart3 } from 'lucide-react'

const steps = [
    {
        icon: MessageSquare,
        number: '01',
        title: 'Cliente Escribe',
        description: 'Tu cliente envía un mensaje a tu WhatsApp de negocio, en cualquier momento del día o la noche.',
        color: 'text-sour-lime',
        border: 'border-sour-lime/30',
        glow: 'shadow-[0_0_20px_rgba(182,255,0,0.15)]',
    },
    {
        icon: Zap,
        number: '02',
        title: 'Bot Responde al Instante',
        description: 'El bot analiza el mensaje con IA, responde, agenda citas o registra datos automáticamente.',
        color: 'text-blue-400',
        border: 'border-blue-400/30',
        glow: 'shadow-[0_0_20px_rgba(96,165,250,0.15)]',
    },
    {
        icon: BarChart3,
        number: '03',
        title: 'Datos a tu Alcance',
        description: 'Todo queda registrado: clientes, citas, preguntas. Tu negocio crece mientras tú descansas.',
        color: 'text-purple-400',
        border: 'border-purple-400/30',
        glow: 'shadow-[0_0_20px_rgba(192,132,252,0.15)]',
    },
]

export default function HowItWorks() {
    return (
        <section id="como-funciona" className="py-24 section-beam">
            <div className="container mx-auto px-6 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-xs font-bold uppercase tracking-widest text-sour-lime/70 mb-4 block">El Proceso</span>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">¿Cómo Funciona?</h2>
                    <p className="text-gray-400 max-w-xl mx-auto">
                        En 3 simples pasos, tu negocio opera en piloto automático las 24 horas.
                    </p>
                </motion.div>

                {/* Steps */}
                <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Connector line on desktop */}
                    <div className="hidden md:block absolute top-1/3 left-1/6 right-1/6 h-px bg-gradient-to-r from-sour-lime/20 via-blue-400/20 to-purple-400/20" />

                    {steps.map((step, i) => {
                        const Icon = step.icon
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15 }}
                                className={`relative bg-white/5 border ${step.border} ${step.glow} rounded-3xl p-8 flex flex-col items-center text-center hover:bg-white/8 transition-all duration-300`}
                            >
                                <div className={`w-16 h-16 rounded-2xl bg-black/60 flex items-center justify-center mb-6 border ${step.border}`}>
                                    <Icon size={28} className={step.color} />
                                </div>
                                <span className={`text-5xl font-black ${step.color} opacity-20 absolute top-6 right-8 leading-none font-mono`}>
                                    {step.number}
                                </span>
                                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
