import { useState } from 'react'
import api from '../lib/api.js'

export default function ContactForm() {
  const [form, setForm] = useState({ full_name: '', whatsapp_number: '', email: '' })
  const [status, setStatus] = useState({ loading: false, ok: false, error: '' })

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus({ loading: true, ok: false, error: '' })
    try {
      await api.post('/api/leads', form)
      setStatus({ loading: false, ok: true, error: '' })
      setForm({ full_name: '', whatsapp_number: '', email: '' })
    } catch (err) {
      setStatus({ loading: false, ok: false, error: 'No se pudo enviar. Intenta más tarde.' })
    }
  }

  return (
    <div className="py-20">
      <h2 className="text-2xl sm:text-3xl font-bold mb-8">Contáctanos</h2>
      <form onSubmit={onSubmit} className="card-gradient p-6 grid grid-cols-1 gap-4">
        <div>
          <label className="text-sm text-gray-300">Nombre completo</label>
          <input name="full_name" value={form.full_name} onChange={onChange} placeholder="Tu nombre" className="mt-1 w-full bg-transparent border border-white/10 rounded-md px-3 py-2 outline-none focus:border-sour-lime focus:ring-2 focus:ring-sour-lime/30" />
        </div>
        <div>
          <label className="text-sm text-gray-300">WhatsApp</label>
          <input name="whatsapp_number" value={form.whatsapp_number} onChange={onChange} placeholder="+57 300 000 0000" className="mt-1 w-full bg-transparent border border-white/10 rounded-md px-3 py-2 outline-none focus:border-sour-lime focus:ring-2 focus:ring-sour-lime/30" />
        </div>
        <div>
          <label className="text-sm text-gray-300">Email</label>
          <input type="email" name="email" value={form.email} onChange={onChange} placeholder="tu@email.com" className="mt-1 w-full bg-transparent border border-white/10 rounded-md px-3 py-2 outline-none focus:border-sour-lime focus:ring-2 focus:ring-sour-lime/30" />
        </div>
        <button disabled={status.loading} className="btn-primary disabled:opacity-50">{status.loading ? 'Enviando...' : 'Quiero acceso'}</button>
        {status.ok && <div className="text-sour-lime">¡Gracias! Te contactaremos pronto.</div>}
        {status.error && <div className="text-red-400">{status.error}</div>}
        <div className="text-xs text-gray-500">Al enviar aceptas ser contactado por el equipo de sourdev.</div>
      </form>
      <div className="mt-8 text-center border-t border-white/5 pt-4">
        <a href="/admin/login" className="text-xs text-gray-600 hover:text-sour-lime transition-colors">
          Admin Access
        </a>
      </div>
    </div>
  )
}
