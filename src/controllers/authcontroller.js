import { registerUser ,loginUser} from "../services/authService.js";
import { generateToken } from "../utils/jwt.js";

export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const user = await registerUser(
            name,
            email,
            password,
            role || "user"
        );

        res.status(201).json({
            message: "User registered successfully",
            user
        });

    } catch (error) {
        console.error("Registration error:", error.message);

        res.status(500).json({
            message: "Registration failed"
        });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await loginUser(email, password);

        const token = generateToken(user);

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Login error:", error.message);

        res.status(401).json({
            message: error.message
        });
    }
};