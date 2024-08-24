import express, { Request, Response } from "express";

import { config } from "dotenv";
import { consoleLogBlue } from "./utils/colorConsoleLogging";
config();

const app = express();

const SERVER_PORT = process.env.SERVER_PORT;
if (typeof SERVER_PORT === "undefined")
    throw new Error("Failed to read server port");

app.get("/", (req: Request, res: Response) => {
    return res.send("HI!");
});

app.listen(SERVER_PORT, () => {
    consoleLogBlue(`Server started successfully on PORT:${SERVER_PORT}`);
});
