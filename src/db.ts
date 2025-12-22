import { Pool } from 'pg';

console.log("DB URL is:", process.env.DATABASE_URL)

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export const query = (text: string, params?: any[]) => {
    return pool.query(text, params);
};

export const end = () => pool.end();
