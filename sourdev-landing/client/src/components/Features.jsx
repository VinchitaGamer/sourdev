import { motion } from 'framer-motion'
import { Bot, MessageSquare, Zap, BrainCircuit, Globe, BarChart3 } from 'lucide-react'

const FeatureCard = ({ icon, title, desc }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5 }}
    className="card-gradient p-8 rounded-2xl border border-white/5 hover:border-sour-lime/30 group transition-all duration-300"
  >
    <div className="w-12 h-12 bg-sour-lime/10 rounded-xl flex items-center justify-center text-sour-lime mb-6 group-hover:scale-110 transition-transform duration-300 border border-sour-lime/20">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <FeatureCard
            icon={<Bot size={28} />}
            title="Agentes de Venta IA"
            desc="Bots entrenados para entender contexto, responder dudas complejas y llevar al cliente hasta el cierre sin intervención humana."
          />
          {/* Feature 2 */}
          <FeatureCard
            icon={<MessageSquare size={28} />}
            title="Respuestas Inteligentes"
            desc="Olvídate de los flujos rígidos. Nuestra IA conversa naturalmente, maneja objeciones y agenda citas en tiempo real."
          />
          {/* Feature 3 */}
          <FeatureCard
            icon={<Zap size={28} />}
            title="Cierre Automático"
            desc="Detecta intención de compra y envía links de pago o agendamiento en el momento exacto. Maximiza tu conversión."
          />
          {/* Feature 4 */}
          <FeatureCard
            icon={<BrainCircuit size={28} />}
            title="Aprendizaje Continuo"
            desc="Tu bot aprende de cada interacción. Mientras más habla, mejor vende. Optimización constante de tu funnel."
          />
          {/* Feature 5 */}
          <FeatureCard
            icon={<Globe size={28} />}
            title="Disponibilidad 24/7"
            desc="Tu mejor vendedor nunca duerme. Atiende clientes de cualquier zona horaria, en cualquier momento, instantáneamente."
          />
          {/* Feature 6 */}
          <FeatureCard
            icon={<BarChart3 size={28} />}
            title="Analytics de Conversación"
            desc="Entiende qué dicen tus clientes. Reportes de sentimiento, objeciones frecuentes y tasa de resolución."
          />
        </div>
      </div>
    </div>
  )
}
