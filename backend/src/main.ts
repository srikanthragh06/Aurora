import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { consoleLogBlue } from "./utils/colorConsoleLogging";
import { sendSuccessResponse } from "./utils/responseTemplates";
import { globalErrorHandler, urlNotFoundHandler } from "./middlewares/handlers";
import { consoleRequestLogger } from "./logging/requestLogger";

// Load environment variables from a .env file
dotenv.config();

// Create an Express application instance
const app = express();

// Read the server port from environment variables and if the SERVER_PORT is defined, throw an error if not
const SERVER_PORT = process.env.SERVER_PORT;
if (typeof SERVER_PORT === "undefined")
    throw new Error("Failed to read server port");

// Use the consoleRequestLogger middleware to log incoming requests
app.use(consoleRequestLogger);

app.get("/", (req: Request, res: Response) => {
    // throw new Error("heihoaeihf");
    return sendSuccessResponse(res, undefined, 200, { yo: "yo" });
});

// Use the urlNotFoundHandler middleware to handle 404 errors for undefined routes
app.use(urlNotFoundHandler);

// Use the globalErrorHandler middleware to handle all other errors
app.use(globalErrorHandler);

// Start the server and listen on the specified port
app.listen(SERVER_PORT, () => {
    consoleLogBlue(`Server started successfully on PORT:${SERVER_PORT}`);
});
