import express from "express";

import {
    createTicketController,
    getAllTicketsController,
    assignTicketController,
    updateTicketStatusController,
    getTicketByIdController,
    deleteTicketController
} from "../controllers/ticketcontroller.js";
import { authenticate } from "../middleware/authmiddleware.js";
import { authorizeRoles } from "../middleware/rolemiddleware.js";

const router = express.Router();

// Admin RBAC test
router.get(
    "/admin-test",
    authenticate,
    authorizeRoles("admin"),
    (req, res) => {
        res.json({
            message: "Admin access granted",
            user: req.user
        });
    }
);

/**
 * @swagger
 * /api/tickets:
 *   post:
 *     summary: Create a new ticket
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *                 example: Login issue
 *               description:
 *                 type: string
 *                 example: Unable to login to the application
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *                 example: high
 *     responses:
 *       201:
 *         description: Ticket created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */

// Create ticket
router.post(
    "/",
    authenticate,
    authorizeRoles("user", "admin"),
    createTicketController
);

// Get all tickets
 /**
  * @swagger
  * /api/tickets:
  *   get:
  *     summary: Get all tickets
  *     tags: [Tickets]
  *     security:
  *       - bearerAuth: []
  *     responses:
  *       200:
  *         description: List of all tickets
  *       401:
  *         description: Unauthorized
  */
router.get(
    "/",
    authenticate,
    getAllTicketsController
);

/**
 * @swagger
 * /api/tickets/{ticketId}/assign:
 *   put:
 *     summary: Assign a ticket to a user
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: ticketId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Ticket assigned successfully
 *       404:
 *         description: Ticket or user not found
 *       401:
 *         description: Unauthorized
 */

router.put(
    "/:ticketId/assign",
    authenticate,
    assignTicketController
);

export default router;

/**
 * @swagger
 * /api/tickets/{ticketId}/status:
 *   put:
 *     summary: Update ticket status
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: ticketId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [open, in_progress, resolved, closed]
 *                 example: resolved
 *     responses:
 *       200:
 *         description: Ticket status updated successfully
 *       404:
 *         description: Ticket not found
 *       401:
 *         description: Unauthorized
 */

router.put(
    "/:ticketId/status",
    authenticate,
    updateTicketStatusController
);

/**
 * @swagger
 * /api/tickets/{id}:
 *   get:
 *     summary: Get a ticket by ID
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Ticket found successfully
 *       404:
 *         description: Ticket not found
 *       401:
 *         description: Unauthorized
 */

router.get("/:id", getTicketByIdController);

/**
 * @swagger
 * /api/tickets/{id}:
 *   delete:
 *     summary: Delete a ticket
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Ticket deleted successfully
 *       404:
 *         description: Ticket not found
 *       401:
 *         description: Unauthorized
 */

router.delete(
    "/:id",
    authenticate,
    authorizeRoles("admin"),
    deleteTicketController
);