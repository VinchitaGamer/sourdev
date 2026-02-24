import { pricingPlans } from '../data/pricing';
import { heroContent } from '../data/content';

// Simulated network delay
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// In-memory store for admin session data
let _pricingPlans = [...pricingPlans];
let _heroContent = { ...heroContent };
let _leads = []; // starts empty since there's no real DB

const api = {
  get: async (url) => {
    await sleep(400);

    if (url === '/pricing') {
      return { data: _pricingPlans };
    }
    if (url === '/content/hero') {
      return { data: _heroContent };
    }
    // Admin: List leads
    if (url === '/admin/leads') {
      return { data: _leads };
    }
    // Admin: List pricing (same as public)
    if (url === '/admin/pricing') {
      return { data: _pricingPlans };
    }

    console.warn(`[MockAPI] GET ${url} not found`);
    return { data: [] };
  },

  post: async (url, body) => {
    await sleep(600);

    if (url === '/leads') {
      const newLead = {
        id: Date.now(),
        ...body,
        status: 'nuevo',
        created_at: new Date().toISOString(),
        notes: '',
      };
      _leads.unshift(newLead);
      console.log('[MockAPI] New Lead Captured:', newLead);
      return { data: { success: true } };
    }

    if (url === '/auth/login') {
      const { username, password } = body;
      console.log('[MockAPI] Login attempt with', username);
      if (username === 'admin' && password === 'admin123') {
        const token = 'mock-jwt-token-12345';
        localStorage.setItem('token', token);
        return { data: { token } };
      }
      throw new Error('Invalid credentials');
    }

    if (url === '/admin/pricing') {
      const newPlan = { id: Date.now(), ...body };
      _pricingPlans.push(newPlan);
      return { data: newPlan };
    }

    console.warn(`[MockAPI] POST ${url} not handled`, body);
    return { data: { success: true } };
  },

  put: async (url, body) => {
    await sleep(600);

    if (url === '/admin/content/hero') {
      _heroContent = { ..._heroContent, ...body };
      console.log('[MockAPI] Hero content updated:', _heroContent);
      return { data: { success: true } };
    }

    // PUT /admin/pricing/:id
    if (url.startsWith('/admin/pricing/')) {
      const id = parseInt(url.split('/').pop());
      _pricingPlans = _pricingPlans.map(p => p.id === id ? { ...p, ...body } : p);
      return { data: { success: true } };
    }

    console.warn(`[MockAPI] PUT ${url} not handled`, body);
    return { data: { success: true } };
  },

  delete: async (url) => {
    await sleep(400);

    // DELETE /admin/pricing/:id
    if (url.startsWith('/admin/pricing/')) {
      const id = parseInt(url.split('/').pop());
      _pricingPlans = _pricingPlans.filter(p => p.id !== id);
      return { data: { success: true } };
    }

    console.warn(`[MockAPI] DELETE ${url} not handled`);
    return { data: { success: true } };
  },
};

export default api;
