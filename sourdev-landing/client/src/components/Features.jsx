import { motion } from 'framer-motion'

export default function Features() {
  return (
    <div className="py-20 section-beam">
      <div className="flex items-end justify-between mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold">Potencia tu operación</h2>
        <span className="hidden md:inline-flex items-center text-xs text-gray-400 gap-2 font-mono">
          <span className="h-1.5 w-1.5 rounded-full bg-sour-lime" /> Core Features
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[minmax(140px,auto)] gap-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="card-gradient p-6 col-span-1 md:col-span-7 md:row-span-2 overflow-hidden"
        >
          <div className="absolute right-0 -top-10 h-48 w-48 rounded-full bg-sour-lime/10 blur-2xl" />
          <div className="inline-flex items-center gap-2 text-sour-lime text-xs font-mono">
            <span className="h-1.5 w-1.5 rounded-full bg-sour-lime" /> Alto volumen
          </div>
          <h3 className="mt-3 text-2xl font-semibold text-white">Envío Masivo</h3>
          <p className="mt-2 text-gray-400 max-w-md">Campañas de alto volumen con colas optimizadas y métricas en vivo.</p>
          <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-gray-300">
            <div className="rounded-md border border-white/10 bg-white/5 px-3 py-2">Colas inteligentes</div>
            <div className="rounded-md border border-white/10 bg-white/5 px-3 py-2">Plantillas rápidas</div>
            <div className="rounded-md border border-white/10 bg-white/5 px-3 py-2">A/B testing</div>
            <div className="rounded-md border border-white/10 bg-white/5 px-3 py-2">Tasas de entrega</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true, amount: 0.3 }}
          className="card-gradient p-6 col-span-1 md:col-span-5"
        >
          <div className="inline-flex items-center gap-2 text-sour-lime text-xs font-mono">
            <span className="h-1.5 w-1.5 rounded-full bg-sour-lime" /> Riesgo mínimo
          </div>
          <h3 className="mt-3 text-xl font-semibold text-white">Anti-Bloqueo</h3>
          <p className="mt-2 text-gray-400">Buenas prácticas y rotación inteligente para minimizar riesgos.</p>
          <div className="mt-4 text-xs text-gray-400">Rotación por perfiles · Ritmo humano · Detección de bounces</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
          className="card-gradient p-6 col-span-1 md:col-span-5"
        >
          <div className="inline-flex items-center gap-2 text-sour-lime text-xs font-mono">
            <span className="h-1.5 w-1.5 rounded-full bg-sour-lime" /> Observabilidad
          </div>
          <h3 className="mt-3 text-xl font-semibold text-white">Reportes</h3>
          <p className="mt-2 text-gray-400">Dashboard con aperturas, respuestas y conversiones.</p>
          <div className="mt-4 grid grid-cols-3 gap-3 text-center text-sm">
            <div className="rounded-md border border-white/10 bg-white/5 px-3 py-2"><div className="text-white font-semibold">99.1%</div><div className="text-gray-400 text-xs">Entrega</div></div>
            <div className="rounded-md border border-white/10 bg-white/5 px-3 py-2"><div className="text-white font-semibold">32%</div><div className="text-gray-400 text-xs">Respuesta</div></div>
            <div className="rounded-md border border-white/10 bg-white/5 px-3 py-2"><div className="text-white font-semibold">+18%</div><div className="text-gray-400 text-xs">Conversiones</div></div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
