import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle, User, Phone, Mail, MessageSquare } from 'lucide-react'
import api from '../lib/api.js'

export default function ContactForm() {
  const [form, setForm] = useState({ full_name: '', whatsapp_number: '', email: '', message: '' })
  const [status, setStatus] = useState({ loading: false, ok: false, error: '' })

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus({ loading: true, ok: false, error: '' })
    try {
      await api.post('/leads', form)
      setStatus({ loading: false, ok: true, error: '' })
      setForm({ full_name: '', whatsapp_number: '', email: '', message: '' })
    } catch (err) {
      setStatus({ loading: false, ok: false, error: 'No se pudo enviar. Intenta por WhatsApp.' })
    }
  }

  return (
    <section id="contacto" className="py-24">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-sour-lime/70 mb-4 block">Contacto</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: 'var(--text)' }}>¿Listo para Automatizar?</h2>
          <p className="max-w-xl mx-auto" style={{ color: 'var(--text-muted)' }}>
            Cuéntanos tu caso. Nos ponemos en contacto en menos de 24 horas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {[
              { icon: MessageSquare, label: 'WhatsApp', value: '+591 76266696', href: 'https://wa.me/59176266696', color: 'text-[#25D366]' },
              { icon: Mail, label: 'Email', value: 'sourdev.info@gmail.com', href: 'mailto:sourdev.info@gmail.com', color: 'text-blue-400' },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-5 rounded-2xl hover:border-sour-lime/30 transition-all"
                  style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
                >
                  <div className="w-12 h-12 rounded-xl bg-black/60 flex items-center justify-center shrink-0">
                    <Icon size={22} className={item.color} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{item.label}</p>
                    <p className="text-white font-semibold">{item.value}</p>
                  </div>
                </a>
              )
            })}

            <div className="p-5 bg-sour-lime/5 border border-sour-lime/20 rounded-2xl">
              <p className="text-sour-lime font-bold text-sm mb-1">⚡ Respuesta rápida</p>
              <p className="text-gray-400 text-sm">
                Respondemos todos los mensajes en menos de 24 horas en días hábiles. Para urgencias, escríbenos directo por WhatsApp.
              </p>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <AnimatePresence mode="wait">
              {status.ok ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center gap-4 p-12 bg-white/5 border border-sour-lime/30 rounded-3xl text-center h-full"
                >
                  <CheckCircle size={56} className="text-sour-lime" />
                  <h3 className="text-2xl font-bold text-white">¡Mensaje Enviado!</h3>
                  <p className="text-gray-400">Te contactaremos pronto. Mientras tanto, puedes escribirnos por WhatsApp.</p>
                  <button
                    onClick={() => setStatus(s => ({ ...s, ok: false }))}
                    className="text-sour-lime text-sm hover:underline mt-2"
                  >
                    Enviar otro mensaje
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={onSubmit}
                  className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-4"
                >
                  {[
                    { name: 'full_name', label: 'Nombre completo', placeholder: 'Ej: Juan Pérez', type: 'text', Icon: User, required: true },
                    { name: 'whatsapp_number', label: 'WhatsApp', placeholder: '+591 7000 0000', type: 'tel', Icon: Phone, required: true },
                    { name: 'email', label: 'Email (opcional)', placeholder: 'tu@email.com', type: 'email', Icon: Mail, required: false },
                  ].map(field => (
                    <div key={field.name}>
                      <label className="text-xs text-gray-400 uppercase tracking-wider mb-1.5 block">{field.label}</label>
                      <div className="relative">
                        <field.Icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                          name={field.name}
                          value={form[field.name]}
                          onChange={onChange}
                          placeholder={field.placeholder}
                          type={field.type}
                          required={field.required}
                          className="w-full bg-black/40 border border-white/10 rounded-xl pl-9 pr-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-sour-lime focus:ring-1 focus:ring-sour-lime/30 transition-all"
                        />
                      </div>
                    </div>
                  ))}

                  <div>
                    <label className="text-xs text-gray-400 uppercase tracking-wider mb-1.5 block">¿Qué necesitas automatizar?</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={onChange}
                      placeholder="Cuéntanos brevemente tu negocio y qué te gustaría automatizar..."
                      rows={4}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-sour-lime focus:ring-1 focus:ring-sour-lime/30 transition-all resize-none"
                    />
                  </div>

                  {status.error && (
                    <p className="text-red-400 text-sm">{status.error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status.loading}
                    className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed py-3 rounded-xl font-bold"
                  >
                    {status.loading ? (
                      <>Enviando...</>
                    ) : (
                      <><Send size={18} /> Enviar Mensaje</>
                    )}
                  </button>

                  <p className="text-center text-xs text-gray-600">
                    Al enviar aceptas ser contactado por el equipo de SourDev.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Admin hidden link */}
      <div className="text-center mt-12">
        <a href="/admin/login" className="text-[10px] text-gray-700 hover:text-sour-lime transition-colors">Admin</a>
      </div>
    </section>
  )
}
