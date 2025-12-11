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
              className={`relative overflow-hidden card-gradient p-8 rounded-3xl group hover:-translate-y-2 transition-all duration-300 ${p.name === 'Pro' ? 'ring-1 ring-sour-lime/50 shadow-[0_0_30px_rgba(163,230,53,0.15)] scale-105 z-10' : 'border border-white/5 hover:border-sour-lime/30'}`}
            >
              {p.name === 'Pro' && (
                <div className="absolute top-0 right-0 bg-sour-lime text-black text-xs font-bold px-3 py-1 rounded-bl-xl">
                  POPULAR
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">{p.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-sour-lime">{p.price}</span>
                  <span className="text-gray-400">/mes</span>
                </div>
                <p className="text-sm text-gray-400 mt-3 leading-relaxed border-t border-white/10 pt-4">
                  {p.description}
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                {p.features && p.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-gray-300">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sour-lime shrink-0 shadow-[0_0_5px_#a3e635]" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                to={`/plan/${p.id}`}
                className={`block w-full py-4 rounded-xl text-center font-bold transition-all ${p.name === 'Pro'
                    ? 'bg-sour-lime text-black hover:bg-white hover:text-black shadow-[0_0_20px_rgba(163,230,53,0.3)]'
                    : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
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
