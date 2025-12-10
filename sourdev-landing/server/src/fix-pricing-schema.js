import { pool } from './db.js';

async function cleanupAndEnforce() {
    console.log('Cleaning up Pricing Plans...');
    try {
        // 1. Truncate table to remove all duplicates
        await pool.query('TRUNCATE TABLE pricing_plans');
        console.log('Table truncated.');

        // 2. Add UNIQUE constraint to 'name' if it doesn't exist
        try {
            await pool.query('ALTER TABLE pricing_plans ADD UNIQUE (name)');
            console.log('Added UNIQUE constraint to "name".');
        } catch (e) {
            if (e.code === 'ER_DUP_KEYNAME') console.log('UNIQUE constraint already exists.');
            else console.error('Error adding constraint:', e.message);
        }

    } catch (error) {
        console.error('Cleanup failed:', error);
    } finally {
        await pool.end();
    }
}

cleanupAndEnforce();
