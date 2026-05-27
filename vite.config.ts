import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import framer from "vite-plugin-framer"
import mkcert from "mkcert"
import { resolve } from "path"

async function getHttpsConfig() {
    const ca = await mkcert.createCA({
        organization: "BookSurfer Dev",
        countryCode: "IN",
        state: "Dev",
        locality: "Dev",
        validity: 365,
    })
    const cert = await mkcert.createCert({
        domains: ["127.0.0.1", "localhost"],
        validity: 365,
        ca: { key: ca.key, cert: ca.cert },
    })
    return { key: cert.key, cert: cert.cert }
}

export default defineConfig(async () => {
    const https = await getHttpsConfig()
    return {
        plugins: [react(), tailwindcss(), framer()],
        resolve: {
            alias: { "@": resolve(__dirname, "./src") },
        },
        server: {
            port: 5174,
            strictPort: true,
            cors: true,
            https: { key: https.key, cert: https.cert },
        },
    }
})