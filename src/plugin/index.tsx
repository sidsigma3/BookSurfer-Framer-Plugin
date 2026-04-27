import React from "react"
import { createRoot } from "react-dom/client"
import { framer } from "framer-plugin"
import App from "./App"
import "../shared/styles.css"

framer.showUI({
    width: 360,
    height: 600,
})

const rootElement = document.getElementById("root")
if (rootElement) {
    createRoot(rootElement).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    )
}
