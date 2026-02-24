import { Link } from 'react-router-dom'
import logo from '../logo2.ico'
import { MessageCircle, Github, Instagram } from 'lucide-react'

const WHATSAPP_NUMBER = '59176266696'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="border-t border-white/10 bg-black/60 backdrop-blur-md mt-12">
            <div className="container mx-auto px-6 max-w-6xl py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

                    {/* Brand */}
                    <div>
                        <img src={logo} alt="SourDev" className="h-10 w-auto mb-4" />
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                            Automatización inteligente de WhatsApp para negocios que quieren crecer sin perder el toque humano.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Navegación</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="#como-funciona" className="hover:text-sour-lime transition-colors">¿Cómo Funciona?</a></li>
                            <li><a href="#pricing" className="hover:text-sour-lime transition-colors">Precios</a></li>
                            <li><a href="#faq" className="hover:text-sour-lime transition-colors">Preguntas Frecuentes</a></li>
                            <li><a href="#contacto" className="hover:text-sour-lime transition-colors">Contacto</a></li>
                            <li>
                                <a
                                    href="https://portafoliobellido.netlify.app/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-sour-lime transition-colors"
                                >
                                    Portafolio del Desarrollador
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Contacto</h4>
                        <div className="space-y-3">
                            <a
                                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#25D366] transition-colors"
                            >
                                <MessageCircle size={16} />
                                WhatsApp Directo
                            </a>
                            <a
                                href="https://github.com/VinchitaGamer"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                            >
                                <Github size={16} />
                                GitHub
                            </a>
                            <a
                                href="https://www.instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-gray-400 hover:text-pink-400 transition-colors"
                            >
                                <Instagram size={16} />
                                Instagram
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-gray-600 text-xs">
                        © {currentYear} SourDev. Todos los derechos reservados.
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-600">
                        <Link to="/admin/login" className="hover:text-sour-lime transition-colors">Admin</Link>
                        <span>•</span>
                        <span>Made with ⚡ in 🇧🇴</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
