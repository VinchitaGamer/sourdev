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

      <div className="mx-auto max-w-7xl px-4 pt-24 pb-20 sm:pt-20 sm:pb-36 relative flex flex-col items-center justify-center min-h-[80vh]">
        {/* Logo Centered on Mobile */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 md:left-6 md:translate-x-0 flex items-center gap-3">
          <img src={logo} alt="SourDev Logo" className="h-10 md:h-20 w-auto" />
        </div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center text-5xl md:text-7xl lg:text-8xl font-black bg-clip-text text-transparent bg-gradient-to-br from-white via-gray-200 to-gray-600 mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] tracking-tight leading-tight"
        >
          AUTOMATIZA <br />
          <span className="text-sour-lime drop-shadow-[0_0_20px_rgba(163,230,53,0.6)]">TU ÉXITO</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-gray-300 max-w-2xl mx-auto mb-8 text-base md:text-2xl leading-relaxed px-2"
        >
          No más envíos masivos manuales. Implementa <span className="text-white font-semibold">Bots de Inteligencia Artificial</span> que responden, califican y cierran ventas 24/7.
        </motion.p>

        {/* Benefits Cards (Fichas) - Requested by User */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-3 gap-2 w-full max-w-lg mb-8 md:mb-12"
        >
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col items-center justify-center text-center gap-2 backdrop-blur-sm">
            <span className="text-sour-lime">⚡</span>
            <span className="text-[10px] md:text-xs font-bold text-gray-200 uppercase tracking-wider">Cierre Auto</span>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col items-center justify-center text-center gap-2 backdrop-blur-sm">
            <span className="text-sour-lime">🤖</span>
            <span className="text-[10px] md:text-xs font-bold text-gray-200 uppercase tracking-wider">IA Nativa</span>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col items-center justify-center text-center gap-2 backdrop-blur-sm">
            <span className="text-sour-lime">🌍</span>
            <span className="text-[10px] md:text-xs font-bold text-gray-200 uppercase tracking-wider">24/7 On</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col w-full sm:flex-row gap-3 justify-center items-center px-4"
        >
          <Link
            to="/empezar"
            className="btn-primary flex items-center justify-center gap-2 group text-base md:text-lg px-8 py-4 w-full sm:w-auto shadow-lg shadow-sour-lime/20"
          >
            <PlayCircle size={20} className="md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
            Comenzar Gratis
          </Link>
          <a
            href="#pricing"
            className="px-8 py-4 rounded-xl border border-white/20 hover:bg-white/10 transition-all font-bold flex items-center justify-center gap-2 w-full sm:w-auto text-sm md:text-base backdrop-blur-md"
          >
            Ver Precios <ArrowRight size={18} className="md:w-5 md:h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
