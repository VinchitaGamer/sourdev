import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

const WHATSAPP_NUMBER = '59176266696'
const WHATSAPP_MESSAGE = 'Hola, quiero saber más sobre los bots de WhatsApp de SourDev 🤖'

export default function FloatingCTA() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 400)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

    return (
        <AnimatePresence>
            {visible && (
                <motion.a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#25D366] text-white font-bold px-5 py-3 rounded-full shadow-[0_0_25px_rgba(37,211,102,0.5)] hover:shadow-[0_0_35px_rgba(37,211,102,0.7)] hover:scale-105 transition-all duration-300"
                    aria-label="Hablar por WhatsApp"
                >
                    <MessageCircle size={22} className="shrink-0" />
                    <span className="text-sm hidden sm:block">Hablar por WhatsApp</span>
                </motion.a>
            )}
        </AnimatePresence>
    )
}
