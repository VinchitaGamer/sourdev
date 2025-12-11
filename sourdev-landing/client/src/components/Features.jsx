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

      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Potencia Nuclear <br /> para tu Marketing</h2>
            <p className="text-gray-400 max-w-md">De la idea a la venta en segundos. Nuestra IA hace el trabajo pesado por ti.</p>
          </div>
          <span className="hidden md:inline-flex items-center text-xs text-neon-green px-3 py-1 bg-neon-green/10 rounded-full border border-neon-green/20 font-mono">
            <span className="h-1.5 w-1.5 rounded-full bg-neon-green mr-2 animate-pulse" /> AI POWERED ENGINE v2.0
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[minmax(180px,auto)] gap-6">
          {/* Card 1: AI Ad Generator (Main) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            className="card-gradient p-8 col-span-1 md:col-span-7 md:row-span-2 overflow-hidden relative group"
          >
            <div className="absolute right-0 top-0 h-64 w-64 bg-neon-purple/20 blur-[100px] group-hover:bg-neon-purple/30 transition-all duration-500" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 text-neon-purple text-xs font-mono mb-4 border border-neon-purple/30 px-2 py-1 rounded bg-neon-purple/10">
                <span className="h-1.5 w-1.5 rounded-full bg-neon-purple" /> GENERATIVE AI
              </div>
              <h3 className="text-3xl font-bold text-white mb-3">Tu Creativo Publicitario IA</h3>
              <p className="text-gray-300 text-lg mb-6 max-w-lg">
                ¿Bloqueo creativo? Escribe un prompt simple como: <span className="italic text-white">"Vender zapatos deportivos con descuento"</span> y nuestra IA redactará 3 variantes de anuncios persuasivos listos para enviar.
              </p>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                  <div className="text-gray-400 text-xs mb-1">Prompt</div>
                  <div className="text-white">"Promo pizzas 2x1"</div>
                </div>
                <div className="p-3 bg-neon-purple/10 rounded-lg border border-neon-purple/20">
                  <div className="text-neon-purple text-xs mb-1">Resultado IA</div>
                  <div className="text-white">"🍕 ¡Doble Sabor! Hoy tus pizzas favoritas al 2x1..."</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: AI Chatbot */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
            className="card-gradient p-8 col-span-1 md:col-span-5 relative overflow-hidden group"
          >
            <div className="absolute -right-10 -bottom-10 h-40 w-40 bg-neon-blue/20 blur-[80px] group-hover:bg-neon-blue/30 transition-all duration-500" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 text-neon-blue text-xs font-mono mb-4 border border-neon-blue/30 px-2 py-1 rounded bg-neon-blue/10">
                <span className="h-1.5 w-1.5 rounded-full bg-neon-blue" /> CHATBOT INTELIGENTE
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Atención al Cliente 24/7</h3>
              <p className="text-gray-400 mb-4">
                Un asistente virtual entrenado para resolver dudas, dar precios y agendar citas automáticamente.
              </p>
              <div className="text-xs text-gray-500 font-mono">
                    > "Hola, ¿tienen talla M?" <br />
                <span className="text-neon-blue">> "¡Sí! Quedan 3 unidades. ¿Te reservo una?"</span>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Mass Sending */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
            className="card-gradient p-8 col-span-1 md:col-span-12 lg:col-span-5 relative"
          >
            <div className="inline-flex items-center gap-2 text-neon-green text-xs font-mono mb-4 border border-neon-green/30 px-2 py-1 rounded bg-neon-green/10">
              <span className="h-1.5 w-1.5 rounded-full bg-neon-green" /> MÁQUINA DE VENTAS
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Envíos Masivos Seguros</h3>
            <p className="text-gray-400">
              Llega a miles de contactos sin riesgo de bloqueo. Nuestro algoritmo simula comportamiento humano con retardos aleatorios inteligentes.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
