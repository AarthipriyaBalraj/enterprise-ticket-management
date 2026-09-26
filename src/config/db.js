import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

export default pool;

pool.query("SELECT NOW()", (error, result) => {
    if (error) {
        console.error("Database connection failed:", error.message);
    } else {
        console.log("Database connected successfully");
        console.log("Database time:", result.rows[0].now);
    }
});