import {
    addTicket,
    fetchAllTickets,
    assignTicketToUser,
    changeTicketStatus,
    fetchTicketById,
    removeTicket
} from "../services/ticketService.js";

export const createTicketController = async (req, res) => {
    try {
        const { title, description, priority } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                message: "Title and description are required"
        });
        }

        if (priority && !["low", "medium", "high"].includes(priority)) {
                return res.status(400).json({
                    message: "Priority must be low, medium, or high"
        });
        }

 
        const createdBy = req.user.id;

        const ticket = await addTicket(
            title,
            description,
            priority,
            createdBy
        );

        res.status(201).json({
            message: "Ticket created successfully",
            ticket
        });

    } catch (error) {
    console.error("Create ticket error:", error);

    res.status(500).json({
        message: "Internal server error"
    });
}
};

export const getAllTicketsController = async (req, res) => {
    try {
        const tickets = await fetchAllTickets();

        res.status(200).json({
            tickets
        });

    } catch (error) {
    console.error("Get all tickets error:", error);

    res.status(500).json({
        message: "Internal server error"
    });
}
};

export const assignTicketController = async (req, res) => {
    try {
        const { ticketId } = req.params;
        const { userId } = req.body;

        const ticket = await assignTicketToUser(
            ticketId,
            userId
        );

        res.status(200).json({
            message: "Ticket assigned successfully",
            ticket
        });

    } catch (error) {
        console.error("Ticket assignment error:", error.message);

        res.status(500).json({
            message: "Failed to assign ticket"
        });
    }
};

export const updateTicketStatusController = async (req, res) => {
    try {
        const { ticketId } = req.params;
        const { status } = req.body;

        const ticket = await changeTicketStatus(
            ticketId,
            status
        );

        res.status(200).json({
            message: "Ticket status updated successfully",
            ticket
        });

    } catch (error) {
        console.error(
            "Ticket status update error:",
            error.message
        );

        res.status(500).json({
            message: "Failed to update ticket status"
        });
    }
};

export const getTicketByIdController = async (req, res) => {
    try {
        const { id } = req.params;

        const ticket = await fetchTicketById(id);

        if (!ticket) {
            return res.status(404).json({
                message: "Ticket not found"
            });
        }

        res.status(200).json({
            ticket
        });

    } catch (error) {
    console.error("Get ticket by ID error:", error);

    res.status(500).json({
        message: "Internal server error"
    });
}
};

export const deleteTicketController = async (req, res) => {
    try {
        const ticketId = req.params.id;

        const ticket = await removeTicket(ticketId);

        if (!ticket) {
            return res.status(404).json({
                message: "Ticket not found"
            });
        }

        res.status(200).json({
            message: "Ticket deleted successfully",
            ticket
        });

    } catch (error) {
    console.error("Delete ticket error:", error);

    res.status(500).json({
        message: "Internal server error"
    });
}
};