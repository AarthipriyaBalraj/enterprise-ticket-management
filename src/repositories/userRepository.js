import pool from "../config/db.js";

export const findUserByEmail = async (email) => {
    const result = await pool.query(
        `SELECT id, name, email, password, role, created_at
         FROM users
         WHERE email = $1`,
        [email]
    );

    return result.rows[0];
};