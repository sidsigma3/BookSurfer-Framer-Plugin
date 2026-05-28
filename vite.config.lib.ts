import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { resolve } from "path"

export default defineConfig({
    plugins: [react()],
    build: {
        lib: {
            entry: resolve(__dirname, "src/BookingForm.tsx"),
            name: "BookingForm",
            fileName: "BookingForm",
            formats: ["es"],
        },
        outDir: "dist",
        emptyOutDir: false,
        rollupOptions: {},
    },
})
