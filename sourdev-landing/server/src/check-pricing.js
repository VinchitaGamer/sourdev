import { pool } from './db.js';

async function checkPricing() {
    try {
        const [prices] = await pool.query('SELECT * FROM pricing_plans');
        console.log('--- Pricing Plans ---');
        console.table(prices);
    } catch (error) {
        console.error(error);
    } finally {
        await pool.end();
    }
}

checkPricing();
