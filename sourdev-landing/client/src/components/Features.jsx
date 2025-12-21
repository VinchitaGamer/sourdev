import { motion } from 'framer-motion'
import { Bot, MessageSquare, Zap, BrainCircuit, Globe, BarChart3 } from 'lucide-react'

const FeatureCard = ({ icon, title, desc }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5 }}
    className="card-gradient p-4 md:p-8 rounded-2xl border border-white/5 hover:border-sour-lime/30 group transition-all duration-300"
  >
    <div className="w-10 h-10 md:w-12 md:h-12 bg-sour-lime/10 rounded-xl flex items-center justify-center text-sour-lime mb-3 md:mb-6 group-hover:scale-110 transition-transform duration-300 border border-sour-lime/20">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sour-lime transition-colors">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">
      {desc}
    </p>
  </motion.div>
)

export default function Features() {
  return (
    <div className="py-20 section-beam">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <span className="text-sour-lime text-xs font-mono tracking-widest uppercase mb-4 block">Tecnología de Punta</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Nuclear Power for your Marketing</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Deja de perseguir leads. Deja que nuestra IA los capture, califique y cierre por ti.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {/* Feature 1 */}
          <FeatureCard
            icon={<Bot size={24} />}
            title="Agentes IA"
            desc="Bots que entienden, responden y venden solos."
          />
          {/* Feature 2 */}
          <FeatureCard
            icon={<MessageSquare size={24} />}
            title="Chat Inteligente"
            desc="Conversaciones naturales, sin flujos rígidos."
          />
          {/* Feature 3 */}
          <FeatureCard
            icon={<Zap size={24} />}
            title="Cierre Auto"
            desc="Maximiza conversión enviando pagos al instante."
          />
          {/* Feature 4 */}
          <FeatureCard
            icon={<BrainCircuit size={24} />}
            title="Aprendizaje"
            desc="Tu bot aprende y mejora con cada chat."
          />
          {/* Feature 5 */}
          <FeatureCard
            icon={<Globe size={24} />}
            title="24/7 Activo"
            desc="Vende sin descanso a cualquier hora."
          />
          {/* Feature 6 */}
          <FeatureCard
            icon={<BarChart3 size={24} />}
            title="Analytics"
            desc="Reportes claros de cada conversación."
          />
        </div>
      </div>
    </div>
  )
}
