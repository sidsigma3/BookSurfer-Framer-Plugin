import React from "react"
import { ClassInfo } from "../../hooks/useClasses"
import { ArrowLeft } from "lucide-react"

interface LayoutOption {
    id: string
    name: string
    description: string
}

const LAYOUTS: LayoutOption[] = [
    { id: "classic", name: "Classic", description: "Standard list layout" },
    { id: "modern", name: "Modern", description: "Clean cards with shadows" },
    { id: "minimal", name: "Minimalist", description: "Simple and typography-focused" },
    { id: "compact", name: "Compact", description: "Tight layout for small spaces" },
]

interface LayoutSelectorProps {
    classItem: ClassInfo
    onSelect: (layoutId: string) => void
    onBack: () => void
}

const Skeleton = ({ type }: { type: string }) => {
    switch (type) {
        case "classic":
            return (
                <div className="flex flex-col gap-2 p-3 w-full h-full bg-gray-50 rounded-md">
                    <div className="w-3/4 h-3 bg-gray-200 rounded" />
                    <div className="w-1/2 h-2 bg-gray-200 rounded" />
                    <div className="mt-2 space-y-1.5">
                        <div className="w-full h-4 bg-white rounded border border-gray-200" />
                        <div className="w-full h-4 bg-white rounded border border-gray-200" />
                        <div className="w-full h-6 bg-primary/20 rounded" />
                    </div>
                </div>
            )
        case "modern":
            return (
                <div className="flex flex-col gap-2 p-3 w-full h-full bg-white border border-gray-100 rounded-lg shadow-sm">
                    <div className="flex justify-between items-center mb-1">
                        <div className="w-2/3 h-4 bg-gray-100 rounded" />
                        <div className="w-6 h-6 bg-gray-50 rounded-full" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="h-4 bg-gray-50 rounded" />
                        <div className="h-4 bg-gray-50 rounded" />
                    </div>
                    <div className="w-full h-8 bg-primary/10 rounded-md border border-primary/20 mt-1" />
                </div>
            )
        case "minimal":
            return (
                <div className="flex flex-col items-center gap-2 p-3 w-full h-full bg-white border border-dashed border-gray-200 rounded-md">
                    <div className="w-1/2 h-3 bg-gray-100 rounded mt-2" />
                    <div className="w-full h-[1px] bg-gray-100 my-1" />
                    <div className="w-3/4 h-2 bg-gray-50 rounded" />
                    <div className="w-full h-6 bg-black/5 rounded-sm mt-auto" />
                </div>
            )
        case "compact":
            return (
                <div className="flex items-center gap-2 p-2 w-full h-full bg-gray-50 rounded-md">
                    <div className="w-8 h-8 bg-gray-200 rounded shrink-0" />
                    <div className="flex-1 space-y-1.5">
                        <div className="w-full h-2 bg-gray-300 rounded" />
                        <div className="w-2/3 h-2 bg-gray-200 rounded" />
                    </div>
                    <div className="w-10 h-5 bg-primary/30 rounded shrink-0" />
                </div>
            )
        default:
            return null
    }
}

const LayoutSelector: React.FC<LayoutSelectorProps> = ({ classItem, onSelect, onBack }) => {
    return (
        <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex items-center gap-3 border-b border-secondary pb-4">
                <button 
                    onClick={onBack}
                    className="p-2 hover:bg-secondary rounded-full transition-colors group"
                >
                    <ArrowLeft size={18} className="text-gray-400 group-hover:text-primary" />
                </button>
                <div>
                    <h2 className="text-[16px] font-bold text-primary">Select Layout Style</h2>
                    <p className="text-gray-500 text-[11px]">Pick a representation for "{classItem.name}"</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
                {LAYOUTS.map((layout) => (
                    <button
                        key={layout.id}
                        onClick={() => onSelect(layout.id)}
                        className="flex flex-col gap-3 p-1 rounded-xl border-2 border-transparent hover:border-primary transition-all text-left bg-white shadow-sm hover:shadow-md group overflow-hidden"
                    >
                        <div className="aspect-[4/3] rounded-lg overflow-hidden border border-gray-100 bg-white">
                            <Skeleton type={layout.id} />
                        </div>
                        <div className="px-2 pb-2">
                            <div className="flex justify-between items-center">
                                <p className="text-[12px] font-bold text-primary group-hover:text-black">{layout.name}</p>
                                <div className="w-4 h-4 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/20 transition-colors">
                                    <div className="w-2 h-2 rounded-full bg-accent scale-0 group-hover:scale-100 transition-transform shadow-[0_0_8px_rgba(177,238,49,0.5)]" />
                                </div>
                            </div>
                            <p className="text-[10px] text-gray-400 line-clamp-1 mt-0.5">{layout.description}</p>
                        </div>
                    </button>
                ))}
            </div>

            <p className="text-[10px] text-center text-gray-400 mt-2 italic px-4">
                The selected layout will be sent to the backend to render the corresponding HTML template on your canvas.
            </p>
        </div>
    )
}

export default LayoutSelector
