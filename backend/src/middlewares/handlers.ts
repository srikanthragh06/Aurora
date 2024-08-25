import { Request, Response, NextFunction } from "express";
import {
    sendClientSideError,
    sendServerSideError,
} from "../utils/responseTemplates";
import { consoleLogRed } from "../utils/colorConsoleLogging";

// Middleware to handle 404 errors for unknown routes
export const urlNotFoundHandler = (req: Request, res: Response) => {
    return sendClientSideError(res, "404 Not Found", 404);
};

// Global error handling middleware
export const globalErrorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Log the error stack or message in red to the console
    if (err.stack !== undefined) {
        consoleLogRed(err.stack);
    } else {
        consoleLogRed(err.message);
    }

    return sendServerSideError(res);
};
