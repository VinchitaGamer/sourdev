import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function initDB() {
  const config = {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    multipleStatements: true 
  };

  console.log('Connecting to MySQL...');
  let connection;

  try {
    connection = await mysql.createConnection(config);
    console.log('Connected to MySQL server.');

    const schemaPath = path.join(__dirname, '../../database/schema.sql');
    console.log(`Reading schema from ${schemaPath}...`);
    
    const schemaSql = await fs.readFile(schemaPath, 'utf8');

    console.log('Executing schema...');
    await connection.query(schemaSql);
    
    console.log('Database initialized successfully!');

  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  } finally {
    if (connection) await connection.end();
  }
}

initDB();
