import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
    {
        q: '¿Necesito conocimientos técnicos para usar esto?',
        a: 'No. Nosotros nos encargamos de toda la configuración e implementación. Tú solo defines qué quieres que el bot haga, y nosotros lo construimos.',
    },
    {
        q: '¿Cuánto tiempo tarda la implementación?',
        a: 'Un Chatbot FAQ básico puede estar listo en 48-72 horas. El plan Agendador toma 5-7 días hábiles. El Ecosistema se planifica y ejecuta en sprints semanales.',
    },
    {
        q: '¿El bot puede responder en varios idiomas?',
        a: 'Sí. Los bots con IA pueden detectar el idioma del cliente y responder en el mismo. Soporte nativo para Español, Inglés y Portugués.',
    },
    {
        q: '¿Qué pasa si el bot no sabe responder algo?',
        a: 'El bot puede redirigir automáticamente al cliente con un agente humano vía WhatsApp y notificarte para que tomes el control de la conversación.',
    },
    {
        q: '¿Puedo cambiar o actualizar las respuestas del bot después?',
        a: 'Sí, todos los planes incluyen un período de ajustes post-lanzamiento. En planes superiores tienes acceso a un panel para gestionar respuestas tú mismo.',
    },
    {
        q: '¿Cómo se realiza el pago?',
        a: 'Aceptamos transferencias bancarias, QR (Tigo Money, Banco Unión) y tarjeta. Los planes mensuales no tienen contrato mínimo.',
    },
]

function FAQItem({ q, a, isOpen, onToggle }) {
    return (
        <div
            className="rounded-2xl overflow-hidden transition-all duration-300"
            style={{
                border: `1px solid ${isOpen ? 'var(--border-neon)' : 'var(--border)'}`,
                backgroundColor: 'var(--bg-card)',
            }}
        >
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between gap-4 p-6 text-left"
            >
                <span className="font-semibold text-sm md:text-base" style={{ color: 'var(--text)' }}>{q}</span>
                <ChevronDown
                    size={20}
                    className={`shrink-0 text-sour-lime transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <p className="px-6 pb-6 text-sm leading-relaxed pt-4" style={{ color: 'var(--text-muted)', borderTop: '1px solid var(--border)' }}>
                            {a}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null)

    return (
        <section id="faq" className="py-24">
            <div className="container mx-auto px-6 max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-xs font-bold uppercase tracking-widest text-sour-lime/70 mb-4 block">Preguntas Frecuentes</span>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: 'var(--text)' }}>¿Tienes Dudas?</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Las respuestas más comunes antes de dar el salto.</p>
                </motion.div>

                <div className="space-y-3">
                    {faqs.map((faq, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                        >
                            <FAQItem
                                q={faq.q}
                                a={faq.a}
                                isOpen={openIndex === i}
                                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
