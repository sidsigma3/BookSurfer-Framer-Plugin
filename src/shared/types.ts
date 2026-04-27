export interface FormField {
    id: string
    label: string
    required: boolean
    enabled: boolean
    type: "text" | "email" | "tel" | "number" | "select" | "checkbox" | "textarea"
    options?: string[]
}

export interface FormConfig {
    fields: FormField[]
}

export interface AppearanceConfig {
    primaryColor: string
    backgroundColor: string
    buttonText: string
    borderRadius: number
    successMessage: string
}

export interface BookingPayload {
    classId?: string
    className?: string
    location?: string
    studentFirstName: string
    studentLastName?: string
    email: string
    mobile: string
    guardianFirstName?: string
    guardianLastName?: string
    age: number
    gender?: string
    notes?: string
}

export interface ApiResponse {
    success: boolean
    message: string
    bookingId?: string
}
