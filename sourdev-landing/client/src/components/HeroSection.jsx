import { useContext } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
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

      <div className="mx-auto max-w-7xl px-6 pt-20 pb-28 sm:pt-28 sm:pb-36">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sour-lime/30 bg-sour-lime/10 text-sour-lime text-xs font-mono">
          <span className="h-1.5 w-1.5 rounded-full bg-sour-lime animate-pulse" /> Beta privada abierta
        </div>
        <motion.h1
          className="mt-4 text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-tight [text-wrap:balance]"
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

        <p className="mt-6 max-w-2xl text-gray-400">
          {subtitle}
        </p>

        <div className="mt-10 flex items-center gap-4">
          <Link to="/empezar" className="btn-primary">{ctaText}</Link>
          <a href="#pricing" className="px-5 py-3 rounded-md border border-white/10 text-gray-200 hover:bg-white/5 transition">Ver Precios</a>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-gray-400">
          <span className="px-2 py-1 rounded bg-white/5 border border-white/10">Anti-bloqueo</span>
          <span className="px-2 py-1 rounded bg-white/5 border border-white/10">Envíos masivos</span>
          <span className="px-2 py-1 rounded bg-white/5 border border-white/10">Reportes en tiempo real</span>
        </div>
      </div>
    </section>
  )
}
