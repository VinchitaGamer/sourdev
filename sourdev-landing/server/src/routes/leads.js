import { Router } from 'express';
import { pool } from '../db.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { full_name, whatsapp_number, email } = req.body || {};
    if (!full_name || !whatsapp_number || !email) {
      return res.status(400).json({ error: 'Campos requeridos: full_name, whatsapp_number, email' });
    }

    const [result] = await pool.execute(
      'INSERT INTO leads (full_name, whatsapp_number, email, status) VALUES (?, ?, ?, ?)',
      [full_name, whatsapp_number, email, 'nuevo']
    );

    return res.status(201).json({ id: result.insertId, status: 'nuevo' });
  } catch (err) {
    console.error('Error /api/leads POST', err);
    return res.status(500).json({ error: 'Error al guardar el lead' });
  }
});

export default router;
