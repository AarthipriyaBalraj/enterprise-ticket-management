import { createTicket } from "../models/ticketModel.js";
import {
    getAllTickets,
    assignTicket,
    updateTicketStatus,
    getTicketById,
    deleteTicket
} from "../repositories/ticketRepository.js";
export const addTicket = async (
    title,
    description,
    priority,
    createdBy
) => {
    const ticket = await createTicket(
        title,
        description,
        priority,
        createdBy
    );

    return ticket;
};

export const fetchAllTickets = async () => {
    const tickets = await getAllTickets();

    return tickets;
};

export const assignTicketToUser = async (ticketId, userId) => {
    const ticket = await assignTicket(ticketId, userId);

    return ticket;
};

export const changeTicketStatus = async (ticketId, status) => {
    const ticket = await updateTicketStatus(
        ticketId,
        status
    );

    return ticket;
};

export const fetchTicketById = async (ticketId) => {
    const ticket = await getTicketById(ticketId);

    return ticket;
};

export const removeTicket = async (ticketId) => {
    const ticket = await deleteTicket(ticketId);

    return ticket;
};