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

    return sendServerSideError(res); // Send server side error
};

// Handles the error incase the json parsing middleware fails
export const incorrectJSONFormatHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Checks if the error passed is a syntax error with "JSON.parse" included in it
    // If so reject request else keep moving
    if (
        err instanceof SyntaxError &&
        (err.stack?.includes("JSON.parse") ||
            err.message.includes("JSON.parse"))
    )
        return sendClientSideError(res, "Incorrect JSON body format");
    else next();
};
