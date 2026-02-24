import { useTheme } from '../context/ThemeContext'
import { Sun, Moon } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ThemeToggle() {
    const { isDark, toggle } = useTheme()

    return (
        <button
            onClick={toggle}
            aria-label="Cambiar tema"
            className={`relative flex items-center w-14 h-7 rounded-full border transition-colors duration-300 focus:outline-none ${isDark
                    ? 'bg-gray-800 border-white/20'
                    : 'bg-sour-lime/20 border-sour-lime/40'
                }`}
        >
            {/* Track icons */}
            <Sun
                size={12}
                className={`absolute left-1.5 transition-opacity duration-200 ${isDark ? 'opacity-30 text-gray-500' : 'opacity-100 text-yellow-500'}`}
            />
            <Moon
                size={12}
                className={`absolute right-1.5 transition-opacity duration-200 ${isDark ? 'opacity-100 text-sour-lime' : 'opacity-30 text-gray-400'}`}
            />
            {/* Thumb */}
            <motion.span
                layout
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className={`absolute w-5 h-5 rounded-full shadow-md z-10 ${isDark ? 'left-[30px] bg-sour-lime' : 'left-[3px] bg-yellow-400'
                    }`}
            />
        </button>
    )
}
