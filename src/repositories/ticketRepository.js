import pool from "../config/db.js";

export const getAllTickets = async () => {
    const result = await pool.query(
        `SELECT *
         FROM tickets
         ORDER BY created_at DESC`
    );

    return result.rows;
};

export const assignTicket = async (ticketId, userId) => {
    const result = await pool.query(
        `UPDATE tickets
         SET assigned_to = $1,
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $2
         RETURNING *`,
        [userId, ticketId]
    );

    return result.rows[0];
};

export const updateTicketStatus = async (ticketId, status) => {
    const result = await pool.query(
        `UPDATE tickets
         SET status = $1,
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $2
         RETURNING *`,
        [status, ticketId]
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

export const deleteTicket = async (ticketId) => {
    const result = await pool.query(
        `DELETE FROM tickets
         WHERE id = $1
         RETURNING *`,
        [ticketId]
    );

    return result.rows[0];
};