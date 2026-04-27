import React, { useState, useEffect } from "react"
import { storage } from "../../utils/storage"
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from "@dnd-kit/core"
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { toast } from "sonner"
import FieldRow from "../components/FieldRow"
import { FormField } from "../../shared/types"
import { DEFAULT_FIELDS } from "../../shared/constants"

const FieldsTab = () => {
    const [fields, setFields] = useState<FormField[]>(DEFAULT_FIELDS)
    const [isSaving, setIsSaving] = useState(false)

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    useEffect(() => {
        const loadFields = async () => {
            const savedFields = await storage.get<FormField[]>("fieldConfig", DEFAULT_FIELDS)
            if (savedFields) {
                setFields(savedFields)
            }
        }
        loadFields()
    }, [])

    const handleToggle = (id: string, enabled: boolean) => {
        setFields((prev) =>
            prev.map((f) => (f.id === id ? { ...f, enabled } : f))
        )
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        if (active.id !== over?.id) {
            setFields((items) => {
                const oldIndex = items.findIndex((i) => i.id === active.id)
                const newIndex = items.findIndex((i) => i.id === over?.id)
                return arrayMove(items, oldIndex, newIndex)
            })
        }
    }

    const handleSave = async () => {
        setIsSaving(true)
        try {
            await storage.set("fieldConfig", fields)
            toast.success("Field configuration saved")
        } catch (error) {
            toast.error("Failed to save field configuration")
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <p className="text-[10px] text-[#777] leading-tight">
                Manage which fields appear in your booking form and their order.
            </p>

            <div className="flex flex-col gap-1">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext items={fields.map((f) => f.id)} strategy={verticalListSortingStrategy}>
                        {fields.map((field) => (
                            <FieldRow key={field.id} field={field} onToggle={handleToggle} />
                        ))}
                    </SortableContext>
                </DndContext>
            </div>

            <button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full h-[32px] bg-[#111] hover:bg-[#333] active:bg-black text-white font-semibold rounded-[6px] transition-all disabled:opacity-50 mt-4"
            >
                {isSaving ? "Saving..." : "Save Configuration"}
            </button>
        </div>
    )
}

export default FieldsTab
