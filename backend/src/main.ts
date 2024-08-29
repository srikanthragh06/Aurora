import express from "express";
import dotenv from "dotenv";
import { consoleLogBlue } from "./utils/colorConsoleLogging";
import {
    globalErrorHandler,
    incorrectJSONFormatHandler,
    urlNotFoundHandler,
} from "./middlewares/handlers";
import { consoleRequestLogger } from "./logging/requestLogger";
import authRouter from "./routes/auth";

// Load environment variables from a .env file
dotenv.config();

// Create an Express application instance
const app = express();

// Read the server port from environment variables and if the SERVER_PORT is defined, throw an error if not
const SERVER_PORT = process.env.SERVER_PORT;
if (typeof SERVER_PORT === "undefined")
    throw new Error("Failed to read server port");

// Parse JSON body
app.use(express.json());

// Middleware to handle incorrect JSON body
app.use(incorrectJSONFormatHandler);

// Use the consoleRequestLogger middleware to log incoming requests
app.use(consoleRequestLogger);

// Handles urls related to Authentication and Authorization
app.use("/api/auth", authRouter);

// Use the urlNotFoundHandler middleware to handle 404 errors for undefined routes
app.use(urlNotFoundHandler);

// Use the globalErrorHandler middleware to handle all other errors
app.use(globalErrorHandler);

// Start the server and listen on the specified port
app.listen(SERVER_PORT, () => {
    consoleLogBlue(`Server started successfully on PORT:${SERVER_PORT}`);
});
