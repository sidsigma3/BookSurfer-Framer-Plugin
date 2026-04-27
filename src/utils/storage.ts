import { framer } from "framer-plugin"

export const storage = {
    async get<T>(key: string, defaultValue: T): Promise<T> {
        try {
            const value = await framer.getPluginData(key)
            if (value === null || value === undefined) return defaultValue
            try {
                return JSON.parse(value) as T
            } catch {
                return value as unknown as T
            }
        } catch (error) {
            console.error("Storage error:", error)
            return defaultValue
        }
    },

    async set<T>(key: string, value: T): Promise<void> {
        try {
            const stringValue = typeof value === "string" ? value : JSON.stringify(value)
            await framer.setPluginData(key, stringValue)
        } catch (error) {
            console.error("Storage error:", error)
        }
    },
}
