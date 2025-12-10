import { pool } from './db.js';
import bcrypt from 'bcryptjs';

async function seed() {
    console.log('Seeding database...');

    try {
        // 1. Seed Admin
        const adminUser = 'admin';
        const adminPass = 'admin123'; // Default password
        const hashedPassword = await bcrypt.hash(adminPass, 10);

        // Check if admin exists
        const [existingAdmins] = await pool.query('SELECT * FROM admins WHERE username = ?', [adminUser]);
        if (existingAdmins.length === 0) {
            await pool.query('INSERT INTO admins (username, password_hash) VALUES (?, ?)', [adminUser, hashedPassword]);
            console.log('Admin user created: admin / admin123');
        } else {
            console.log('Admin user already exists.');
        }

        // 2. Seed Initial Content (Hero)
        const [heroContent] = await pool.query('SELECT * FROM site_content WHERE section_key = ?', ['hero']);
        if (heroContent.length === 0) {
            const initialHero = {
                title: "Automatiza tu Negocio con SourDev",
                subtitle: "La solución definitiva para gestionar tus clientes en WhatsApp.",
                ctaText: "Comenzar Ahora",
                imageUrl: "https://placehold.co/600x400/1a1a1a/ffffff?text=Hero+Image" // Placeholder
            };
            await pool.query('INSERT INTO site_content (section_key, content_json) VALUES (?, ?)', ['hero', JSON.stringify(initialHero)]);
            console.log('Hero content seeded.');
        }

        console.log('Seeding completed.');

    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await pool.end();
    }
}

seed();
