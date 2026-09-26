import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import { authenticate } from "./middleware/authMiddleware.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(morgan("dev"));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});

app.use(limiter);

app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Enterprise Ticket Management API is running"
    });
});


app.get("/api/protected", authenticate, (req, res) => {
    res.json({
        message: "You accessed a protected route",
        user: req.user
    });
});

app.use("/api/tickets", ticketRoutes);

export default app;