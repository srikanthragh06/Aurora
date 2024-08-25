import { Response } from "express";

// Function to send a client-side error response
export const sendClientSideError = (
    res: Response,
    errMsg: string = "Invalid Request",
    statusCode: number = 400
) => {
    return res.status(statusCode).json({ error: errMsg });
};

// Function to send a server-side error response
export const sendServerSideError = (
    res: Response,
    statusCode: number = 500
) => {
    return res.status(statusCode).json({ error: "Server Side Error" });
};

// Function to send a success response
export const sendSuccessResponse = (
    res: Response,
    message: string = "Request Successful",
    statusCode: number = 200,
    additionals: Record<string, any> = {}
) => {
    // Set the status code and send a JSON response with the success message and any additional data
    return res.status(statusCode).json({ message, ...additionals });
};
