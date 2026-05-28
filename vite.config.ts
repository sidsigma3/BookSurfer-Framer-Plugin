import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import framer from "vite-plugin-framer"
import basicSsl from "@vitejs/plugin-basic-ssl"
import { resolve } from "path"

export default defineConfig({
    plugins: [react(), tailwindcss(), framer(), basicSsl()],
    resolve: {
        alias: { "@": resolve(__dirname, "./src") },
    },
    server: {
        port: 5174,
        strictPort: true,
        cors: true,
        https: {},
    },
})