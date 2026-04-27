import axios from "axios"
import { BookingPayload, ApiResponse } from "./types"

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
})

export const createBooking = async (data: BookingPayload, apiKey: string): Promise<ApiResponse> => {
    try {
        const response = await api.post<ApiResponse>("/api/bookings", data, {
            headers: {
                "x-api-key": apiKey,
            },
        })
        return response.data
    } catch (error: any) {
        console.error("API error:", error)
        throw new Error(error.response?.data?.message || "Something went wrong. Please try again later.")
    }
}

export const getCapacity = async (classId: string, apiKey: string): Promise<{ full: boolean }> => {
    try {
        const response = await api.get<{ full: boolean }>(`/api/classes/${classId}/capacity`, {
            headers: {
                "x-api-key": apiKey,
            },
        })
        return response.data
    } catch (error) {
        console.error("API error:", error)
        return { full: false } // Default to false if API fails
    }
}
