import { pricingPlans } from '../data/pricing';
import { heroContent } from '../data/content';

// Elemento simulado para retraso de red
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const api = {
  get: async (url) => {
    await sleep(500); // Simular latencia

    if (url === '/pricing') {
      return { data: pricingPlans };
    }
    if (url === '/content/hero') {
      return { data: heroContent };
    }
    // Default fallback
    console.warn(`[MockAPI] GET ${url} not found`);
    return { data: {} };
  },

  post: async (url, body) => {
    await sleep(800); // Simular procesamiento

    if (url === '/leads') {
      console.log('[MockAPI] New Lead Captured:', body);
      return { data: { success: true, message: 'Leads saved locally (simulation)' } };
    }

    if (url === '/auth/login') {
      const { username, password } = body;
      console.log('[MockAPI] Login attempt:', username);
      if (username === 'admin' && password === 'admin123') {
        return { data: { token: 'mock-jwt-token-12345' } };
      }
      throw new Error('Invalid credentials');
    }

    console.warn(`[MockAPI] POST ${url} not handled`, body);
    return { data: { success: true } };
  }
};

export default api;
