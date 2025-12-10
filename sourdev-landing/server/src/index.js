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

// TEMPORARY: Database Setup Route (Run once then remove/protect)
app.get('/setup-db', async (req, res) => {
  try {
    const { pool } = await import('./db.js');

    // 1. Leads Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS leads (
        id INT NOT NULL AUTO_INCREMENT,
        full_name VARCHAR(150) NOT NULL,
        whatsapp_number VARCHAR(30) NOT NULL,
        email VARCHAR(150) NOT NULL,
        status ENUM('nuevo','contactado','cliente') NOT NULL DEFAULT 'nuevo',
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 2. Admins Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 3. Site Content Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS site_content (
        section_key VARCHAR(50) NOT NULL,
        content_json JSON NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (section_key)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 4. Pricing Plans Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS pricing_plans (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        price VARCHAR(50) NOT NULL,
        description TEXT,
        features_json JSON,
        image_url VARCHAR(555),
        extended_description TEXT,
        comparison_data JSON,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 5. Seed Admin (Check if exists first)
    const [admins] = await pool.query("SELECT * FROM admins WHERE username = 'admin'");
    if (admins.length === 0) {
      await pool.query("INSERT INTO admins (username, password_hash) VALUES ('admin', '$2b$10$dk88CPRWDRSxK2Wbk1JDxOVVWMtHVdOL1vbuuajSbekpLWmZpl.Ar6')");
    }

    // 6. Seed Content (Check if exists first)
    const [content] = await pool.query("SELECT * FROM site_content WHERE section_key = 'hero'");
    if (content.length === 0) {
      const initialHero = {
        title: "Automatiza tu Negocio con SourDev",
        subtitle: "La solución definitiva para gestionar tus clientes en WhatsApp.",
        ctaText: "Comenzar Ahora",
        imageUrl: "https://placehold.co/600x400/1a1a1a/ffffff?text=Hero+Image"
      };
      await pool.query("INSERT INTO site_content (section_key, content_json) VALUES (?, ?)", ['hero', JSON.stringify(initialHero)]);
    }

    res.send('<h1>Database Initialized Successfully! ✅</h1><p>You can now use the app.</p>');

  } catch (err) {
    console.error(err);
    const debugInfo = {
      host: process.env.DB_HOST || 'undefined',
      user: process.env.DB_USER || 'undefined',
      port: process.env.DB_PORT || 'undefined',
      database: process.env.DB_NAME || 'undefined',
      msg: err.message
    };
    res.status(500).send(`
        <h1>Error initializing DB ❌</h1>
        <p>Could not connect to database. Debug info:</p>
        <pre>${JSON.stringify(debugInfo, null, 2)}</pre>
        <p>If values are 'undefined' or 'localhost', you forgot to add Environment Variables in Railway.</p>
    `);
  }
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
