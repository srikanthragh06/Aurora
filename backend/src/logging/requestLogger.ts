import moment from "moment-timezone";
import morgan from "morgan";

// Define a custom format string for Morgan logs
const format =
    ":ist-date | :remote-addr | :method | :url | :status | :res[content-length] bytes | :response-time ms";

// Define a custom Morgan token for the date in IST
morgan.token("ist-date", () => {
    // Get the current date and time in IST and format it
    return moment().tz("Asia/Kolkata").format("DD/MM/YYYY, HH:mm:ss.SSS a");
});

// Create a Morgan middleware with the custom format
export const consoleRequestLogger = morgan(format);
