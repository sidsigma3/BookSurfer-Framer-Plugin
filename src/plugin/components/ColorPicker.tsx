import React from "react"

interface ColorPickerProps {
    label: string
    value: string
    onChange: (value: string) => void
}

const ColorPicker: React.FC<ColorPickerProps> = ({ label, value, onChange }) => {
    return (
        <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-[10px] font-semibold text-[#777] uppercase tracking-wider">{label}</label>
            <div className="flex items-center gap-2 group">
                <div className="relative w-8 h-8 rounded-full border border-[#eee] overflow-hidden shadow-inner flex shrink-0">
                    <input
                        type="color"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="absolute inset-[-10px] w-[200%] h-[200%] cursor-pointer border-none bg-transparent"
                    />
                </div>
                <input
                    type="text"
                    value={value.toUpperCase()}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full h-8 px-2 bg-[#f3f3f3] border border-transparent rounded-[6px] focus:outline-none focus:bg-white focus:border-[#007AFF] transition-all text-[10px] font-mono group-hover:bg-[#ebebeb]"
                />
            </div>
        </div>
    )
}

export default ColorPicker
