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
  origin: process.env.CORS_ORIGIN === '*' ? '*' : (process.env.CORS_ORIGIN || 'http://localhost:5173').split(',').map(s => s.trim()),
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
        notes TEXT, 
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // Auto-migration for existing table without notes
    try {
      await pool.query("ALTER TABLE leads ADD COLUMN notes TEXT");
    } catch (e) {
      // Ignore error if column already exists
    }

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
    // 5. Seed/Reset Admin (Ensure password is correct)
    const password = 'admin123';
    const { hash } = await import('bcryptjs');
    const hashedPassword = await hash(password, 10);

    await pool.query(`
      INSERT INTO admins (username, password_hash) 
      VALUES ('admin', ?) 
      ON DUPLICATE KEY UPDATE password_hash = ?
    `, [hashedPassword, hashedPassword]);

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

    // 7. Seed Pricing Plans (Starter, Pro, Enterprise)
    const [existingPlans] = await pool.query("SELECT * FROM pricing_plans");
    if (existingPlans.length === 0) {
      const plans = [
        {
          name: 'Starter', price: '$19', description: 'Ideal para pequeños negocios.',
          features_json: JSON.stringify(['1 número', '1,000 mensajes / mes', 'Soporte por email']),
          extended_description: 'El plan Starter es perfecto si estás empezando.',
          comparison_data: JSON.stringify({ 'Números': '1', 'Mensajes': '1,000', 'Soporte': 'Email' }),
          image_url: ''
        },
        {
          name: 'Pro', price: '$49', description: 'Para negocios en crecimiento.',
          features_json: JSON.stringify(['3 números', '10,000 mensajes / mes', 'Reportes Avanzados', 'Soporte Prioritario']),
          extended_description: 'Lleva tu negocio al siguiente nivel con el plan Pro.',
          comparison_data: JSON.stringify({ 'Números': '3', 'Mensajes': '10,000', 'Soporte': 'Chat' }),
          image_url: ''
        },
        {
          name: 'Enterprise', price: 'Custom', description: 'Soluciones a medida.',
          features_json: JSON.stringify(['Números ilimitados', 'Volumen masivo', 'API Dedicada']),
          extended_description: 'Para grandes volúmenes y requerimientos específicos.',
          comparison_data: JSON.stringify({ 'Números': 'Ilimitados', 'Mensajes': 'A medida', 'Soporte': 'Dedicado' }),
          image_url: ''
        }
      ];

      for (const p of plans) {
        await pool.query(
          "INSERT INTO pricing_plans (name, price, description, features_json, extended_description, comparison_data, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [p.name, p.price, p.description, p.features_json, p.extended_description, p.comparison_data, p.image_url]
        );
      }
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
