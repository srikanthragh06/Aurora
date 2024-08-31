import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RecoilRoot } from "recoil";

// Get the root element
const rootElement = document.getElementById("root");

// Ensure rootElement exists
if (rootElement) {
    // Create and render the React root
    createRoot(rootElement).render(
        <RecoilRoot>
            <App />
        </RecoilRoot>
    );
}
