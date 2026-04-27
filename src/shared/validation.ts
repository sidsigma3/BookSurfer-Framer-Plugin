import { z } from "zod"

export const bookingSchema = z.object({
    studentFirstName: z.string().min(1, "First name is required"),
    studentLastName: z.string().optional(),
    email: z.string().email("Invalid email address"),
    mobile: z.string().min(8, "Invalid mobile number"),
    guardianFirstName: z.string().optional(),
    guardianLastName: z.string().optional(),
    age: z.number().min(3, "Age must be at least 3").max(100, "Invalid age"),
    gender: z.string().optional(),
    notes: z.string().optional(),
    terms: z.literal(true, {
        message: "You must agree to the terms",
    }),
})

export type BookingFormData = z.infer<typeof bookingSchema>
