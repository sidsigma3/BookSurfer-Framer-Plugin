import { addPropertyControls, ControlType } from "framer"

interface Props {
    embedUrl: string
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

addPropertyControls(BookingForm, {
    embedUrl: {
        type: ControlType.String,
        title: "Embed URL",
        defaultValue: "",
    },
})

export default BookingForm
