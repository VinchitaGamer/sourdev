import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react'
import api from '../lib/api'

const PricingCard = ({ plan, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isPro = plan.name === 'Pro';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative overflow-hidden rounded-3xl border transition-all duration-300 group ${isOpen ? 'h-auto' : 'h-[400px]'
        } ${isPro ? 'border-sour-lime/50 ring-1 ring-sour-lime/20' : 'border-white/10 hover:border-sour-lime/30'}`}
    >
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        {plan.image_url ? (
          <img
            src={plan.image_url}
            alt={plan.name}
            className={`w-full h-full object-cover transition-transform duration-700 ${isOpen ? 'scale-105 opacity-20' : 'opacity-40 group-hover:scale-110'}`}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black opacity-40" />
        )}
        <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent transition-opacity duration-300 ${isOpen ? 'opacity-95' : 'opacity-100'}`} />
      </div>

      {/* Content */}
      <div className="relative z-10 p-8 h-full flex flex-col">
        {isPro && (
          <div className="absolute top-0 right-0 bg-sour-lime text-black text-xs font-bold px-3 py-1 rounded-bl-xl">
            POPULAR
          </div>
        )}

        <div className="mb-4">
          <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-extrabold text-sour-lime">{plan.price}</span>
            <span className="text-gray-400 text-sm">/mes</span>
          </div>
        </div>

        {/* Collapsed Preview Description */}
        {!isOpen && (
          <p className="text-gray-300 text-sm line-clamp-3 mb-auto">
            {plan.description}
          </p>
        )}

        {/* Expand/Collapse Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="mt-4 flex items-center gap-2 text-sm font-semibold text-sour-lime hover:text-white transition-colors w-fit group/btn"
        >
          {isOpen ? 'Menos detalles' : 'Ver características'}
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} className="group-hover/btn:translate-y-1 transition-transform" />}
        </button>

        {/* Collapsible Content */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-6 border-t border-white/10 mt-6 space-y-6">
                <p className="text-gray-300 text-sm leading-relaxed">
                  {plan.description}
                </p>

                <div>
                  <h4 className="text-white font-bold text-sm mb-3 uppercase tracking-wider">Incluye:</h4>
                  <ul className="space-y-3">
                    {plan.features && plan.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-gray-300">
                        <CheckCircle2 size={16} className="text-sour-lime mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to={`/plan/${plan.id}`}
                  className={`block w-full py-4 rounded-xl text-center font-bold transition-all ${isPro
                    ? 'bg-sour-lime text-black hover:bg-white hover:text-black shadow-[0_0_20px_rgba(163,230,53,0.3)]'
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                    }`}
                >
                  {plan.price.toLowerCase() === 'custom' ? 'Contactar Ventas' : 'Seleccionar Plan'}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA in collapsed state */}
        {!isOpen && (
          <div className="mt-auto pt-6">
            <Link
              to={`/plan/${plan.id}`}
              className={`block w-full py-3 rounded-xl text-center font-bold text-sm transition-all ${isPro
                ? 'bg-sour-lime text-black hover:bg-white'
                : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                }`}
            >
              Seleccionar
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default function Pricing() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/pricing')
      .then(res => {
        const data = res.data;
        const parsedData = data.map(p => ({
          ...p,
          features: typeof p.features_json === 'string' ? JSON.parse(p.features_json) : p.features_json
        }));
        setPlans(parsedData);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;

  return (
    <div id="pricing" className="py-24 section-beam">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Inversión Inteligente</h2>
          <p className="text-gray-400">Escoge el nivel de automatización que tu negocio necesita.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((p, i) => (
            <PricingCard key={p.id || i} plan={p} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
