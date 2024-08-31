import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [react()], // Enables React support
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"), // Aliases "@" to "src" folder
        },
    },
    server: {
        host: true, // Makes server accessible on the network
        port: 3000, // Sets the server port
    },
});
