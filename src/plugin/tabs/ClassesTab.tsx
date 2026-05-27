import React, { useRef, useState, useEffect } from "react"
import { useClasses, ClassInfo } from "../../hooks/useClasses"
import { Calendar, CreditCard, Search, PlusCircle, Info, MapPin, User, GripVertical, CheckCircle, ShieldAlert } from "lucide-react"
import { toast } from "sonner"
import { framer, useMakeDraggable } from "framer-plugin"
import LayoutSelector from "../components/LayoutSelector"

// ✅ Resolution: The URL is now managed via environment variables
const COMPONENT_URL = import.meta.env.VITE_BOOKING_COMPONENT_URL as string

type LayoutStyle = "classic" | "modern" | "minimal" | "compact"

const LAYOUT_CONFIG: Record<LayoutStyle, { width: number; height: number }> = {
    classic:  { width: 480, height: 720 },
    modern:   { width: 520, height: 680 },
    minimal:  { width: 400, height: 500 },
    compact:  { width: 360, height: 400 },
}

const buildAttributes = (cls: ClassInfo, style: LayoutStyle = "classic"): Partial<Record<string, unknown>> => {
    let finalEmbedUrl = cls.embed_url
    if (finalEmbedUrl) {
        try {
            const url = new URL(finalEmbedUrl)
            url.searchParams.set("layout", style)
            finalEmbedUrl = url.toString()
        } catch {
            const separator = finalEmbedUrl.includes("?") ? "&" : "?"
            finalEmbedUrl = `${finalEmbedUrl}${separator}layout=${style}`
        }
    }

    const { width, height } = LAYOUT_CONFIG[style]

    // width/height are passed as component props inside controls,
    // not as top-level EditableComponentInstanceNodeAttributes to avoid type conflicts.
    return {
        controls: {
            embedUrl: finalEmbedUrl,
            classId: String(cls.id),
            className: cls.name,
            location: cls.location ?? "",
            layoutStyle: style,
            width: `${width}px`,
            height: `${height}px`,
        },
    }
}

const ClassItem: React.FC<{ classItem: ClassInfo; canAdd: boolean; onInitiateAdd: (cls: ClassInfo) => void }> = ({ classItem, canAdd, onInitiateAdd }) => {
    const dragRef = useRef<HTMLDivElement>(null!)

    // Drag and Drop implementation for the hosted component.
    // useMakeDraggable requires a non-null DragData return, so we always return
    // a valid object. When conditions aren't met we fall back to a no-op SVG.
    useMakeDraggable(dragRef, () => {
        if (!canAdd || !COMPONENT_URL) {
            return {
                type: "svg",
                svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"1\" height=\"1\"></svg>",
            }
        }
        return {
            type: "componentInstance",
            url: COMPONENT_URL,
            attributes: buildAttributes(classItem, "classic"),
        }
    })

    const handleAddClick = () => {
        if (!canAdd) {
            toast.error("Permission denied. See banner.")
            return
        }
        if (!COMPONENT_URL) {
            toast.error("Booking component URL not configured in .env.local")
            return
        }
        onInitiateAdd(classItem)
    }

    return (
        <div
            ref={dragRef}
            className={`premium-card flex flex-col gap-3 p-5 text-left group relative overflow-hidden bg-white transition-all shadow-sm 
                ${canAdd && COMPONENT_URL ? 'cursor-grab active:cursor-grabbing hover:shadow-md hover:border-primary/50' : 'opacity-80'}`}
        >
            <div className="absolute right-0 top-0 w-1 h-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="flex justify-between items-start">
                <div className="flex items-start gap-2">
                    {canAdd && COMPONENT_URL && (
                        <div className="flex items-center h-[21px] shrink-0">
                            <GripVertical size={14} className="text-gray-300 group-hover:text-primary transition-colors" />
                        </div>
                    )}
                    <div className="flex flex-col gap-1">
                        <h3 className="font-bold text-[14px] leading-[21px] text-primary group-hover:text-black transition-colors">
                            {classItem.name}
                        </h3>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-accent bg-primary px-2 py-0.5 rounded-full w-fit uppercase tracking-wider">
                            {classItem.class_type}
                        </div>
                    </div>
                </div>
                <button 
                    onClick={(e) => {
                        e.stopPropagation()
                        handleAddClick()
                    }}
                    disabled={!canAdd || !COMPONENT_URL}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm z-10
                        ${canAdd && COMPONENT_URL ? 'bg-secondary text-primary hover:bg-accent hover:text-foreground' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                >
                    <PlusCircle size={18} />
                </button>
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-2 pt-2 border-t border-secondary mt-1">
                <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-medium">
                    <User size={12} className="text-primary/30" />
                    {classItem.instructor}
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-medium">
                    <CreditCard size={12} className="text-primary/30" />
                    ${classItem.price}
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-medium">
                    <MapPin size={12} className="text-primary/30" />
                    {classItem.location}
                </div>
            </div>
        </div>
    )
}

const ClassesTab: React.FC = () => {
    const { classes, loading, error, refresh } = useClasses()
    const [searchQuery, setSearchQuery] = useState("")
    const [canAdd, setCanAdd] = useState(framer.isAllowedTo("addComponentInstance"))
    const [selectedClassForStyle, setSelectedClassForStyle] = useState<ClassInfo | null>(null)

    useEffect(() => {
        return framer.subscribeToIsAllowedTo("addComponentInstance", (allowed) => {
            setCanAdd(allowed)
        })
    }, [])

    const filteredClasses = classes.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const testStatus = async () => {
        try {
            await framer.addSVG({
                svg: '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" /></svg>',
                name: "Connection Test",
            })
            toast.success("SDK Connection Active")
        } catch (e) {
            toast.error("SDK Connection Failed")
        }
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-4 text-gray-400">
                <div className="animate-spin rounded-full h-10 w-10 border-[3px] border-primary border-t-accent shadow-sm" />
                <p className="font-medium text-[13px] animate-pulse">Syncing...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="p-6 bg-red-50/50 border border-red-100 rounded-[16px] text-red-600">
                <div className="flex items-center gap-2 mb-3">
                    <Info size={16} />
                    <p className="font-bold text-[13px]">Sync Failed</p>
                </div>
                <p className="mb-5 text-[11px] opacity-80 leading-relaxed">{error}</p>
                <button onClick={refresh} className="w-full h-[36px] bg-red-600 text-white rounded-[8px] font-bold text-[11px] hover:bg-red-700 transition-colors shadow-sm">
                    Retry
                </button>
            </div>
        )
    }

    const handleSelectStyle = async (styleId: any) => {
        if (!selectedClassForStyle) return

        try {
            if (!selectedClassForStyle.embed_url?.startsWith("http")) {
                toast.error("Class is missing a valid embed URL")
                return
            }
            if (!COMPONENT_URL) {
                toast.error("Booking component URL not configured in .env.local")
                return
            }

            console.log(`Adding component with style ${styleId}:`, COMPONENT_URL)
            
            await framer.addComponentInstance({
                url: COMPONENT_URL,
                attributes: buildAttributes(selectedClassForStyle, styleId as LayoutStyle),
            })
            toast.success(`Added "${selectedClassForStyle.name}" with ${styleId} style`)
            setSelectedClassForStyle(null)
        } catch (err: any) {
            console.error("Add failed:", err)
            toast.error(err?.message ?? "Could not add to canvas")
        }
    }

    if (selectedClassForStyle) {
        return (
            <LayoutSelector 
                classItem={selectedClassForStyle} 
                onSelect={handleSelectStyle}
                onBack={() => setSelectedClassForStyle(null)}
            />
        )
    }

    return (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {!canAdd && (
                <div className="flex items-center gap-3 p-4 bg-orange-50 border border-orange-100 rounded-[16px] text-orange-800 animate-pulse">
                    <ShieldAlert size={20} className="shrink-0" />
                    <p className="text-[11px] font-medium leading-relaxed">
                        Framer requires component permissions. Grant them to enable insertion.
                    </p>
                </div>
            )}

            {!COMPONENT_URL && (
                <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-100 rounded-[16px] text-blue-800">
                    <Info size={20} className="shrink-0" />
                    <p className="text-[11px] font-medium leading-relaxed">
                        Please set VITE_BOOKING_COMPONENT_URL in .env.local to enable insertion.
                    </p>
                </div>
            )}

            <div className="flex justify-between items-end">
                <div className="flex flex-col gap-2">
                    <h2 className="text-[18px] font-bold text-primary">Your Classes</h2>
                    <p className="text-gray-500 text-[12px]">Drag or click to add forms.</p>
                </div>
                <button onClick={testStatus} className="flex items-center gap-1.5 text-[10px] text-primary/60 hover:text-primary transition-colors font-bold uppercase tracking-wider">
                    <CheckCircle size={12} />
                    Status
                </button>
            </div>

            <div className="relative group ">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={14} />
                <input
                    type="text"
                    placeholder="Search classes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="premium-input w-full h-[40px] !pl-10 pr-4 text-[12px]"
                />
            </div>

            <div className="flex flex-col gap-3 pb-10">
                {filteredClasses.length === 0 ? (
                    <div className="py-12 flex flex-col items-center justify-center text-gray-400 bg-white rounded-[20px] border border-dashed border-secondary">
                        <Calendar size={24} className="mb-3 opacity-20" />
                        <p className="text-[12px] font-medium italic">No classes found.</p>
                    </div>
                ) : (
                    <div className="grid gap-3">
                        {filteredClasses.map((classItem) => (
                            <ClassItem 
                                key={classItem.id} 
                                classItem={classItem} 
                                canAdd={canAdd} 
                                onInitiateAdd={setSelectedClassForStyle}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ClassesTab
