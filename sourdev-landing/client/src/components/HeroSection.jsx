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
          <img src={logo} alt="SourDev Logo" className="h-20 w-auto" />
        </div>

        <motion.h1
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-8xl font-black bg-clip-text text-transparent bg-gradient-to-br from-white via-gray-200 to-gray-600 mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] tracking-tight leading-tight"
        >
          AUTOMATIZA <br />
          <span className="text-sour-lime drop-shadow-[0_0_20px_rgba(163,230,53,0.6)]">TU ÉXITO</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed px-4"
        >    No más envíos masivos manuales. Implementa <span className="text-white font-semibold">Bots de Inteligencia Artificial</span> que responden, califican y cierran ventas en automático. Escala tu operación 24/7.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full px-6"
        >
          <Link
            to="/empezar"
            className="btn-primary flex items-center justify-center gap-2 group text-lg px-8 py-4 w-full sm:w-auto"
          >
            <PlayCircle size={24} className="group-hover:scale-110 transition-transform" />
            Comenzar Gratis
          </Link>
          <a
            href="#pricing"
            className="px-8 py-4 rounded-xl border border-white/20 hover:bg-white/10 transition-all font-bold flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            Ver Precios <ArrowRight size={20} />
          </a>
        </motion.div>

        <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-gray-400">
          <span className="px-2 py-1 rounded bg-white/5 border border-white/10">Cierre de Ventas</span>
          <span className="px-2 py-1 rounded bg-white/5 border border-white/10">Atención 24/7</span>
          <span className="px-2 py-1 rounded bg-white/5 border border-white/10">IA Conversacional</span>
        </div>
      </div>
    </section>
  )
}
