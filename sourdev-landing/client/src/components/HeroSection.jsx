import { useContext } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, PlayCircle } from 'lucide-react'
import logo from '../logo.png'
import Hero3D from './Hero3D.jsx'
import { ContentContext } from '../App.jsx'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.03 }
  }
}

const child = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 }
}

export default function HeroSection() {
  const { hero } = useContext(ContentContext);

  const title = hero?.title || 'Automatiza tu WhatsApp. Escala tu Negocio.';
  const subtitle = hero?.subtitle || 'Plataforma de automatización de WhatsApp para envío masivo, gestión de clientes y reportes en tiempo real.';
  const ctaText = hero?.ctaText || 'Comenzar Gratis';

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Hero3D />
      </div>
      <div className="radial-hero -z-10" />
      <div className="scanlines -z-10" />

      <div className="mx-auto max-w-7xl px-6 pt-10 pb-28 sm:pt-20 sm:pb-36 relative">
        <div className="absolute top-6 left-6 flex items-center gap-3">
          <img src={logo} alt="SourDev Logo" className="h-10 w-auto" />
          <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">sourdev</span>
        </div>

        <motion.h1
          className="mt-16 text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-tight [text-wrap:balance]"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {title.split('').map((c, i) => (
            <motion.span key={i} variants={child} className={c === ' ' ? 'inline-block w-2' : ''}>
              <span className="bg-gradient-to-b from-sour-lime to-sour-lime2 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(182,255,0,0.35)] animate-neonpulse">{c}</span>
            </motion.span>
          ))}
        </motion.h1>

        <p className="mt-6 max-w-2xl text-gray-400 text-lg">
          No más envíos masivos manuales. Implementa <span className="text-white font-semibold">Bots de Inteligencia Artificial</span> que responden, califican y cierran ventas en automático. Escala tu operación 24/7.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-10">
          <Link to="/empezar" className="btn-primary flex items-center justify-center gap-2">
            Comenzar Ahora <ArrowRight size={20} />
          </Link>
          <a href="#pricing" className="px-8 py-3 rounded-lg border border-white/10 hover:bg-white/5 font-semibold transition flex items-center justify-center gap-2">
            Ver Precios
          </a>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-gray-400">
          <span className="px-2 py-1 rounded bg-white/5 border border-white/10">Cierre de Ventas</span>
          <span className="px-2 py-1 rounded bg-white/5 border border-white/10">Atención 24/7</span>
          <span className="px-2 py-1 rounded bg-white/5 border border-white/10">IA Conversacional</span>
        </div>
      </div>
    </section>
  )
}
