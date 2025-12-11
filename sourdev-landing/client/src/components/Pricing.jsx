import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../lib/api'

export default function Pricing() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/pricing')
      .then(res => {
        const data = res.data;
        // Parse features_json if string
        const parsedData = data.map(p => ({
          ...p,
          features: typeof p.features_json === 'string' ? JSON.parse(p.features_json) : p.features_json
        }));
        setPlans(parsedData);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null; // Or skeleton

  return (
    <div id="pricing" className="py-20 section-beam">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">Inversión Inteligente</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((p, i) => (
            <motion.div
              key={p.id || i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className={`relative overflow-hidden card-gradient p-8 rounded-3xl group hover:-translate-y-2 transition-all duration-300 ${p.name === 'Pro' ? 'border border-neon-green/30 px-8 py-10 scale-105 z-10 shadow-[0_0_40px_rgba(163,230,53,0.1)]' : 'border border-white/10'}`}
            >
              {p.name === 'Pro' && (
                <div className="absolute top-0 right-0 bg-neon-green text-black text-xs font-bold px-3 py-1 rounded-bl-xl">
                  MÁS VENDIDO
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">{p.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white">{p.price}</span>
                  <span className="text-gray-400">/mes</span>
                </div>
                <p className="text-sm text-gray-400 mt-3 leading-relaxed">
                  {p.description}
                </p>
              </div>

              <div className="h-px w-full bg-white/10 mb-6" />

              <ul className="space-y-4 mb-8">
                {p.features && p.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-gray-300">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-neon-green shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                to={`/plan/${p.id}`}
                className={`block w-full py-4 rounded-xl text-center font-bold transition-all ${p.name === 'Pro'
                    ? 'bg-neon-green text-black hover:bg-white'
                    : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
              >
                {p.price.toLowerCase() === 'custom' ? 'Contactar Ventas' : 'Comenzar Ahora'}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
