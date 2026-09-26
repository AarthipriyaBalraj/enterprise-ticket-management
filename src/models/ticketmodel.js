import pool from "../config/db.js";

export const createTicket = async (
    title,
    description,
    priority,
    createdBy
) => {
    const result = await pool.query(
        `INSERT INTO tickets
        (title, description, priority, created_by)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
        [title, description, priority, createdBy]
    );

    return result.rows[0];
};

export const getTicketById = async (ticketId) => {
    const result = await pool.query(
        `SELECT *
         FROM tickets
         WHERE id = $1`,
        [ticketId]
    );

    return result.rows[0];
};