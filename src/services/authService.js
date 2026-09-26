import bcrypt from "bcryptjs";
import { createUser } from "../models/usermodel.js";
import { findUserByEmail } from "../repositories/userRepository.js";

export const registerUser = async (name, email, password, role) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createUser(
        name,
        email,
        hashedPassword,
        role
    );

    return user;
};

export const loginUser = async (email, password) => {
    const user = await findUserByEmail(email);

    if (!user) {
        throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordValid) {
        throw new Error("Invalid email or password");
    }

    return user;
};