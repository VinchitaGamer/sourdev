import { motion } from 'framer-motion'

const items = [
  'Envíos masivos',
  'Anti-bloqueo',
  'Reportes en tiempo real',
  'Gestión de clientes',
  'Colas inteligentes',
  'Integraciones',
]

function Row({ reverse = false }) {
  return (
    <div className="overflow-hidden select-none border-y border-white/5 bg-white/[0.02]">
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration: 24, ease: 'linear', repeat: Infinity }}
        className="py-3 whitespace-nowrap flex items-center gap-8"
      >
        {[...items, ...items].map((t, i) => (
          <span key={i} className="inline-flex items-center gap-3 text-gray-300 text-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-sour-lime" /> {t}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export default function Marquee() {
  return (
    <div className="mt-8">
      <Row />
      <Row reverse />
    </div>
  )
}
