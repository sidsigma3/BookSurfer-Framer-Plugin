import React from "react"

interface Props {
    embedUrl?: string
    layoutStyle?: string
    style?: React.CSSProperties
}

export function BookingForm({ embedUrl, style }: Props) {
    if (!embedUrl) {
        return (
            <div style={{
                ...style,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#f5f5f5",
                borderRadius: 8,
                color: "#aaa",
                fontSize: 13,
                fontFamily: "sans-serif",
            }}>
                No booking URL configured
            </div>
        )
    }
    return (
        <iframe
            src={embedUrl}
            style={{ ...style, border: "none", display: "block" }}
            allow="payment"
        />
    )
}

export default BookingForm
