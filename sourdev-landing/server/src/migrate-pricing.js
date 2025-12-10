import { pool } from './db.js';

async function migrate() {
    console.log('Migrating Pricing Plans table...');
    try {
        // Add extended_description
        try {
            await pool.query('ALTER TABLE pricing_plans ADD COLUMN extended_description TEXT');
            console.log('Added extended_description column.');
        } catch (e) {
            if (e.code === 'ER_DUP_FIELDNAME') console.log('extended_description already exists.');
            else console.error(e.message);
        }

        // Add comparison_data
        try {
            await pool.query('ALTER TABLE pricing_plans ADD COLUMN comparison_data JSON');
            console.log('Added comparison_data column.');
        } catch (e) {
            if (e.code === 'ER_DUP_FIELDNAME') console.log('comparison_data already exists.');
            else console.error(e.message);
        }

    } catch (error) {
        console.error('Migration failed:', error);
    } finally {
        await pool.end();
    }
}

migrate();
