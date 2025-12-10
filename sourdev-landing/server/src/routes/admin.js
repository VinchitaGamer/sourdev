import express from 'express';
import { pool } from '../db.js';
import { authenticateToken } from './auth.js';

const router = express.Router();

// Apply auth middleware to all admin routes
router.use(authenticateToken);

// === LEADS ===
router.get('/leads', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM leads ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// === SITE CONTENT ===
// Get specific section content
router.get('/content/:key', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT content_json FROM site_content WHERE section_key = ?', [req.params.key]);
        if (rows.length === 0) return res.json({});
        res.json(rows[0].content_json);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update section content
router.put('/content/:key', async (req, res) => {
    const { key } = req.params;
    const content = req.body; // Expect JSON object

    try {
        await pool.query(
            'INSERT INTO site_content (section_key, content_json) VALUES (?, ?) ON DUPLICATE KEY UPDATE content_json = ?',
            [key, JSON.stringify(content), JSON.stringify(content)]
        );
        res.json({ success: true, message: 'Content updated' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// === PRICING PLANS ===
router.get('/pricing', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM pricing_plans ORDER BY created_at ASC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/pricing', async (req, res) => {
    const { name, price, description, features_json, image_url, extended_description, comparison_data } = req.body;
    try {
        await pool.query(
            'INSERT INTO pricing_plans (name, price, description, features_json, image_url, extended_description, comparison_data) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [name, price, description, JSON.stringify(features_json), image_url, extended_description, JSON.stringify(comparison_data)]
        );
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/pricing/:id', async (req, res) => {
    const { name, price, description, features_json, image_url, extended_description, comparison_data, is_active } = req.body;
    try {
        await pool.query(
            'UPDATE pricing_plans SET name=?, price=?, description=?, features_json=?, image_url=?, extended_description=?, comparison_data=?, is_active=? WHERE id=?',
            [name, price, description, JSON.stringify(features_json), image_url, extended_description, JSON.stringify(comparison_data), is_active, req.params.id]
        );
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/pricing/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM pricing_plans WHERE id = ?', [req.params.id]);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
