import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import leadsRouter from './routes/leads.js';
import authRouter from './routes/auth.js';
import adminRouter from './routes/admin.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: (process.env.CORS_ORIGIN || 'http://localhost:5173').split(',').map(s => s.trim()),
  credentials: false
}));

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ ok: true, service: 'sourdev-api' });
});

// Non-protected routes
app.use('/api/leads', leadsRouter);
app.use('/api/auth', authRouter);

// Public content routes (read-only)
// We need to expose GET /api/admin/content and /api/admin/pricing publicly?
// Better to create a separate public router or handle it in index.
// Let's create a public content router for better separation or just use 'admin' router but make specific routes public?
// No, the plan said "Fetch dynamic content on load".
// I'll add public endpoints here for fetching content without auth.

app.get('/api/content/:key', async (req, res) => {
  // Simple inline handler for now or import connection
  try {
    const { pool } = await import('./db.js');
    const [rows] = await pool.query('SELECT content_json FROM site_content WHERE section_key = ?', [req.params.key]);
    if (rows.length === 0) return res.json({});
    res.json(rows[0].content_json);
  } catch (err) { res.status(500).json({ error: err.message }) }
});

app.get('/api/pricing', async (req, res) => {
  try {
    const { pool } = await import('./db.js');
    const [rows] = await pool.query('SELECT * FROM pricing_plans WHERE is_active = 1 ORDER BY created_at ASC');
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }) }
});

// Protected routes
app.use('/api/admin', adminRouter);

import { pool } from './db.js';

app.listen(PORT, async () => {
  try {
    const connection = await pool.getConnection();
    console.log('[sourdev] Database connected successfully');
    connection.release();
  } catch (err) {
    console.error('[sourdev] Database connection failed:', err.message);
  }
  console.log(`[sourdev] API listening on http://localhost:${PORT}`);
});
