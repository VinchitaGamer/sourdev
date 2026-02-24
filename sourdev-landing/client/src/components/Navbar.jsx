import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'
import logo from '../pages/logo2.ico'

const NAV_LINKS = [
    { label: '¿Cómo Funciona?', href: '#como-funciona' },
    { label: 'Precios', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contacto', href: '#contacto' },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const handleNavClick = (href) => {
        setMenuOpen(false)
        const el = document.querySelector(href)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <>
            <motion.nav
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? 'bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/40'
                    : 'bg-transparent'
                    }`}
            >
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <a href="#" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                            <img src={logo} alt="SourDev" className="h-8 w-auto" />
                        </a>

                        {/* Desktop Links */}
                        <div className="hidden md:flex items-center gap-8">
                            {NAV_LINKS.map(link => (
                                <button
                                    key={link.label}
                                    onClick={() => handleNavClick(link.href)}
                                    className="text-sm text-gray-400 hover:text-white transition-colors font-medium"
                                >
                                    {link.label}
                                </button>
                            ))}
                        </div>

                        {/* Desktop CTA */}
                        <div className="hidden md:flex items-center gap-3">
                            <Link
                                to="/empezar"
                                className="flex items-center gap-1.5 text-sm font-bold bg-sour-lime text-black px-4 py-2 rounded-lg hover:bg-white transition-colors shadow-[0_0_12px_rgba(182,255,0,0.3)]"
                            >
                                Empezar <ArrowRight size={14} />
                            </Link>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="md:hidden text-white p-1.5"
                            aria-label="Toggle menu"
                        >
                            {menuOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed top-16 left-0 right-0 z-40 bg-black/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 flex flex-col gap-4 md:hidden"
                    >
                        {NAV_LINKS.map(link => (
                            <button
                                key={link.label}
                                onClick={() => handleNavClick(link.href)}
                                className="text-left text-lg text-gray-300 hover:text-sour-lime transition-colors font-medium py-1"
                            >
                                {link.label}
                            </button>
                        ))}
                        <Link
                            to="/empezar"
                            onClick={() => setMenuOpen(false)}
                            className="btn-primary flex items-center justify-center gap-2 mt-2 py-3 rounded-xl"
                        >
                            Empezar Gratis <ArrowRight size={16} />
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
