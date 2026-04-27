import { FormField, AppearanceConfig } from "./types"

export const DEFAULT_FIELDS: FormField[] = [
    { id: "studentFirstName", label: "Student First Name", required: true, enabled: true, type: "text" },
    { id: "studentLastName", label: "Student Last Name", required: false, enabled: true, type: "text" },
    { id: "email", label: "Email", required: true, enabled: true, type: "email" },
    { id: "mobile", label: "Mobile", required: true, enabled: true, type: "tel" },
    { id: "guardianFirstName", label: "Guardian First Name", required: false, enabled: true, type: "text" },
    { id: "guardianLastName", label: "Guardian Last Name", required: false, enabled: true, type: "text" },
    { id: "age", label: "Age", required: true, enabled: true, type: "number" },
    { id: "gender", label: "Gender", required: false, enabled: true, type: "select", options: ["Male", "Female", "Non-binary", "Other"] },
    { id: "notes", label: "Notes", required: false, enabled: true, type: "textarea" },
]

export const DEFAULT_APPEARANCE: AppearanceConfig = {
    primaryColor: "#6B3A2A",
    backgroundColor: "#FAF8F5",
    buttonText: "Book Class",
    borderRadius: 8,
    successMessage: "Your booking is confirmed!",
}
