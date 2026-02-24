import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
    {
        name: 'Carlos R.',
        role: 'Dueño de Tienda de Ropa',
        city: 'Santa Cruz, Bolivia',
        stars: 5,
        text: 'Antes pasaba horas respondiendo "¿tienen talla M?" en WhatsApp. Ahora el bot lo hace solo. Mis ventas subieron un 40% el primer mes porque pude enfocarme en cerrar clientes grandes.',
        avatar: 'CR',
        color: 'from-purple-500 to-blue-500',
    },
    {
        name: 'Sofía M.',
        role: 'Terapeuta Independiente',
        city: 'La Paz, Bolivia',
        stars: 5,
        text: 'El bot agendador cambió mi vida. Antes perdía citas por no responder rápido. Ahora mis pacientes se agendan solos a cualquier hora y todo llega a mi Google Calendar automáticamente.',
        avatar: 'SM',
        color: 'from-sour-lime/60 to-emerald-500',
        highlight: true,
    },
    {
        name: 'Andrés K.',
        role: 'Director de Distribuidora',
        city: 'Cochabamba, Bolivia',
        stars: 5,
        text: 'Tenía 3 personas respondiendo WhatsApp y aun así había demoras. Con SourDev, 1 persona maneja el doble de volumen y el bot gestiona todo lo rutinario. ROI inmediato.',
        avatar: 'AK',
        color: 'from-orange-500 to-red-500',
    },
]

const StarRow = ({ count }) => (
    <div className="flex gap-1">
        {Array.from({ length: count }).map((_, i) => (
            <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
        ))}
    </div>
)

export default function Testimonials() {
    return (
        <section id="testimonios" className="py-24 section-beam">
            <div className="container mx-auto px-6 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-xs font-bold uppercase tracking-widest text-sour-lime/70 mb-4 block">Resultados Reales</span>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Lo Que Dicen Nuestros Clientes</h2>
                    <p className="text-gray-400 max-w-xl mx-auto">Negocios que pasaron de manual a automático.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.12 }}
                            className={`relative p-7 rounded-3xl border flex flex-col gap-4 ${t.highlight
                                    ? 'border-sour-lime/40 bg-sour-lime/5 shadow-[0_0_30px_rgba(182,255,0,0.08)]'
                                    : 'border-white/10 bg-white/5'
                                }`}
                        >
                            {t.highlight && (
                                <div className="absolute top-4 right-4 text-[10px] bg-sour-lime text-black font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                                    Destacado
                                </div>
                            )}
                            <StarRow count={t.stars} />
                            <p className="text-gray-300 text-sm leading-relaxed flex-1">"{t.text}"</p>
                            <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                                    {t.avatar}
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm">{t.name}</p>
                                    <p className="text-gray-500 text-xs">{t.role} · {t.city}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
