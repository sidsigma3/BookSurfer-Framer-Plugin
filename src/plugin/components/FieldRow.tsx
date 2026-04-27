import React from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical, AlertCircle } from "lucide-react"
import * as Switch from "@radix-ui/react-switch"
import { cn } from "../../utils/cn"
import { FormField } from "../../shared/types"

interface FieldRowProps {
    field: FormField
    onToggle: (id: string, enabled: boolean) => void
}

const FieldRow: React.FC<FieldRowProps> = ({ field, onToggle }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: field.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    const isRequired = ["studentFirstName", "email", "mobile"].includes(field.id)

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={cn(
                "flex items-center justify-between p-2 rounded-[6px] border border-transparent transition-all",
                isDragging ? "bg-white shadow-xl z-50 border-[#eee] scale-[1.02]" : "hover:bg-[#f9f9f9]"
            )}
        >
            <div className="flex items-center gap-2">
                <button
                    {...attributes}
                    {...listeners}
                    className="p-1 text-[#ccc] hover:text-[#999] cursor-grab active:cursor-grabbing outline-none"
                >
                    <GripVertical size={14} />
                </button>
                <div className="flex flex-col gap-0.5">
                    <span className="font-semibold text-[#111]">{field.label}</span>
                    {isRequired && (
                        <div className="flex items-center gap-1 text-[#D7351B] text-[9px] font-bold uppercase tracking-wider">
                            <AlertCircle size={8} />
                            Required
                        </div>
                    )}
                </div>
            </div>

            <Switch.Root
                checked={field.enabled || isRequired}
                disabled={isRequired}
                onCheckedChange={(checked) => onToggle(field.id, checked)}
                className={cn(
                    "w-[30px] h-[16px] rounded-full relative outline-none transition-colors",
                    (field.enabled || isRequired) ? "bg-[#111]" : "bg-[#ccc]",
                    isRequired && "opacity-50 cursor-not-allowed"
                )}
            >
                <Switch.Thumb className="block w-[12px] h-[12px] bg-white rounded-full transition-transform duration-100 will-change-transform translate-x-[2px] data-[state=checked]:translate-x-[16px]" />
            </Switch.Root>
        </div>
    )
}

export default FieldRow
