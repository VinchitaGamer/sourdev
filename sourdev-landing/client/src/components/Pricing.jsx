import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Pricing() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:4000/api/pricing')
      .then(res => res.json())
      .then(data => {
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
      <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center sm:text-left">Precios</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((p, i) => (
          <motion.div
            key={p.id || i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className={`relative overflow-hidden card-gradient p-6 group hover:-translate-y-1 transition ${p.name === 'Pro' ? 'ring-1 ring-sour-lime/40 shadow-neon' : ''}`}
          >
            {p.name === 'Pro' && (
              <div className="absolute -inset-px rounded-xl pointer-events-none" style={{
                background: 'linear-gradient(180deg, rgba(182,255,0,0.25), rgba(182,255,0,0))'
              }} />
            )}
            <div className="relative flex items-baseline gap-2">
              <h3 className="text-xl font-semibold text-white">{p.name}</h3>
              {p.name === 'Pro' && <span className="text-xs px-2 py-0.5 rounded bg-sour-lime text-black">Popular</span>}
            </div>
            <div className="relative mt-4 flex items-end gap-1">
              <div className="text-4xl font-extrabold text-sour-lime">{p.price}</div>
              <div className="text-gray-400">/mes</div>
            </div>
            <div className="relative mt-2 text-sm text-gray-400 italic">
              {p.description}
            </div>
            <ul className="relative mt-4 space-y-2 text-sm text-gray-300 min-h-[100px]">
              {p.features && p.features.map((f, j) => (
                <li key={j} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-sour-lime" /> {f}
                </li>
              ))}
            </ul>
            <Link to={`/plan/${p.id}`} className="relative mt-6 inline-block btn-primary w-full text-center">
              {p.price.toLowerCase() === 'custom' ? 'Contactar' : 'Conoce más'}
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
