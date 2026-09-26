import pool from "../config/db.js";

export const createUser = async (name, email, password, role) => {
    const result = await pool.query(
        `INSERT INTO users (name, email, password, role)
         VALUES ($1, $2, $3, $4)
         RETURNING id, name, email, role, created_at`,
        [name, email, password, role]
    );

    return result.rows[0];
};