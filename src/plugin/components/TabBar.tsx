import React from "react"
import { cn } from "../../utils/cn"
import { LayoutGrid, Database, Palette } from "lucide-react"

export type TabType = "connect" | "classes" | "fields" | "appearance"

interface TabBarProps {
    activeTab: TabType
    onTabChange: (tab: TabType) => void
}

const TabBar: React.FC<TabBarProps> = ({ activeTab, onTabChange }) => {
    const tabs = [
        { id: "connect", label: "Connect", icon: LayoutGrid },
        { id: "classes", label: "Classes", icon: Database },
        { id: "fields", label: "Fields", icon: Database },
        { id: "appearance", label: "Styles", icon: Palette },
    ]

    return (
        <nav className="flex items-center justify-around border-b border-[#eee] bg-white p-1">
            {tabs.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                
                return (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id as any)}
                        className={cn(
                            "flex flex-col items-center justify-center py-2 px-1 flex-1 gap-1.5 transition-all relative border-b-2",
                            isActive 
                                ? "text-[#111] border-[#111]" 
                                : "text-[#777] border-transparent hover:text-[#333]"
                        )}
                        title={tab.label}
                    >
                        <Icon size={14} />
                        <span className="font-medium tracking-tight text-[10px]">{tab.label}</span>
                    </button>
                )
            })}
        </nav>
    )
}

export default TabBar
