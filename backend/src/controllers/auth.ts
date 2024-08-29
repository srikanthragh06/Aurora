import { NextFunction, Request, Response } from "express";
import prisma from "../db/prisma";
import {
    sendClientSideError,
    sendSuccessResponse,
} from "../utils/responseTemplates";
import {
    checkPassword,
    generateSaltAndHashedPassword,
    generateRandomToken,
} from "../utils/utils";
import jwt from "jsonwebtoken";

// sign up controller
export const signupHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const {
            email,
            username,
            password,
        }: { email: string; username: string; password: string } = req.body;

        await prisma.$transaction(async () => {
            // If user exists with entered username or email then reject request
            const existingUser = await prisma.user.findFirst({
                where: { OR: [{ email }, { username }] },
                select: { id: true, email: true, username: true },
            });
            if (existingUser?.email === email) {
                return sendClientSideError(
                    res,
                    "User with this emailID already exists"
                );
            }
            if (existingUser?.username === username) {
                return sendClientSideError(
                    res,
                    "User with this username already exists"
                );
            }

            // Generate salt,hashedPassword and updatePasswordToken and create a new user with the hashed password
            const { salt, hashedPassword } =
                await generateSaltAndHashedPassword(password); // generate a new salt and use it to the hash the entered password
            const updatePasswordToken = generateRandomToken(32);
            const newUser = await prisma.user.create({
                data: {
                    username,
                    email,
                    password: hashedPassword,
                    salt,
                    updatePasswordToken,
                },
            });

            // Sign a new jwt token with id,email and updatePasswordToken with 7 day expiry
            const jwtToken = jwt.sign(
                {
                    id: newUser.id,
                    email: newUser.email,
                    updatePasswordToken: newUser.updatePasswordToken,
                },
                process.env.JWT_SECRET_KEY as string,
                { expiresIn: "168h" }
            );

            // Send success response with jwt and user details
            return sendSuccessResponse(
                res,
                `${email} has been signed up successfully!`,
                201,
                {
                    jwtToken,
                    user: {
                        id: newUser.id,
                        username: newUser.username,
                        email: newUser.email,
                        createdAt: newUser.createdAt,
                        updatedAt: newUser.createdAt,
                    },
                }
            );
        });
    } catch (err) {
        next(err);
    }
};

export const signinHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // Extract email and password from body
        const { email, password }: { email: string; password: string } =
            req.body;

        await prisma.$transaction(async () => {
            // Search for a user with the entered emailID, if doesnt exist reject request
            const user = await prisma.user.findUnique({ where: { email } });
            if (!user)
                return sendClientSideError(
                    res,
                    "User with this email ID does not exist"
                );

            // Check if password is correct, if not reject request
            const isCorrectPassword = await checkPassword(
                password,
                user.password
            ); // hashes entered password and compares it with the password in the DB
            if (!isCorrectPassword)
                return sendClientSideError(res, "Invalid Password");

            // Sign a new jwt token with id,email, updatePasswordToken that expires in 7 days
            const jwtToken = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                    updatePasswordToken: user.updatePasswordToken,
                },
                process.env.JWT_SECRET_KEY as string,
                { expiresIn: "168h" }
            );

            // Send success response with jwt and user details
            return sendSuccessResponse(
                res,
                `${user.username} has signed in successfully`,
                200,
                {
                    jwtToken,
                    user: {
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        createdAt: user.createdAt,
                        updatedAt: user.createdAt,
                    },
                }
            );
        });
    } catch (err) {
        next(err);
    }
};
