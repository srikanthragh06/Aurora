import bcrypt from "bcrypt";
import crypto from "crypto";

// Takes a raw password and generates a random salt and its hashed password
export const generateSaltAndHashedPassword = async (
    password: string
): Promise<{ salt: string; hashedPassword: string }> => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return { salt, hashedPassword };
};

// Generate random token of certain size
export const generateRandomToken = (tokenSize: number): string => {
    return crypto.randomBytes(tokenSize).toString("hex");
};

// hash the given password and compare with the hashed password
export const checkPassword = async (
    password: string,
    hashedPassword: string
): Promise<boolean> => {
    const isCorrectPassword = await bcrypt.compare(password, hashedPassword);
    return isCorrectPassword;
};
