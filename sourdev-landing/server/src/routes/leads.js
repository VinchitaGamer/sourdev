import { Router } from 'express';
import { pool } from '../db.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { full_name, whatsapp_number, email, pain_point, selected_plan } = req.body || {};
    if (!full_name || !whatsapp_number || !email) {
      return res.status(400).json({ error: 'Campos requeridos: full_name, whatsapp_number, email' });
    }

    // Combine extra data into "notes" if column exists, or just append to email strictly if not? 
    // Better: We added 'notes' column in the setup-db step (Self-correction: I need to add it there first).
    // Let's assuming I update setup-db to add the column.

    let notes = '';
    if (pain_point) notes += `Dolor: ${pain_point}. `;
    if (selected_plan) notes += `Plan Interés: ${selected_plan}.`;

    // Flexible query: Check if 'notes' column exists or just try to insert. 
    // To be safe without complex migration logic in this file, I'll use a try-catch for the column 
    // or just rely on the SetupDB running first. I will update SetupDB to add the column.

    const [result] = await pool.execute(
      'INSERT INTO leads (full_name, whatsapp_number, email, status, notes) VALUES (?, ?, ?, ?, ?)',
      [full_name, whatsapp_number, email, 'nuevo', notes]
    );

    return res.status(201).json({ id: result.insertId, status: 'nuevo' });
  } catch (err) {
    if (err.code === 'ER_BAD_FIELD_ERROR') {
      // Fallback if 'notes' column doesn't exist yet (User didn't run setup-db update)
      // Append to email to save the data anyway
      console.warn("Notes column missing, appending to email");
      try {
        const { full_name, whatsapp_number, email, pain_point, selected_plan } = req.body || {};
        const extendedEmail = `${email} [${pain_point || ''} - ${selected_plan || ''}]`.trim();
        const [result] = await pool.execute(
          'INSERT INTO leads (full_name, whatsapp_number, email, status) VALUES (?, ?, ?, ?)',
          [full_name, whatsapp_number, extendedEmail, 'nuevo']
        );
        return res.status(201).json({ id: result.insertId, status: 'nuevo' });
      } catch (e) {
        console.error('Fallback failed', e);
        return res.status(500).json({ error: 'Error al guardar el lead (Fallback)' });
      }
    }
    console.error('Error /api/leads POST', err);
    return res.status(500).json({ error: 'Error al guardar el lead' });
  }
});

export default router;
