import { pool } from './db.js';

async function checkDB() {
    try {
        const [rows] = await pool.query('SELECT * FROM leads');
        console.log('--- Current Leads in Database ---');
        if (rows.length === 0) {
            console.log('No leads found (Table is empty).');
        } else {
            console.table(rows);
        }
        console.log('---------------------------------');
    } catch (error) {
        console.error('Error fetching leads:', error);
    } finally {
        await pool.end();
    }
}

checkDB();
