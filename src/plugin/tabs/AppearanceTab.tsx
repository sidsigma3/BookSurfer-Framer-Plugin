import React, { useState, useEffect } from "react"
import { storage } from "../../utils/storage"
import { toast } from "sonner"
import ColorPicker from "../components/ColorPicker"
import { AppearanceConfig } from "../../shared/types"
import { DEFAULT_APPEARANCE } from "../../shared/constants"

const AppearanceTab = () => {
    const [config, setConfig] = useState<AppearanceConfig>(DEFAULT_APPEARANCE)
    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {
        const loadConfig = async () => {
            const savedConfig = await storage.get<AppearanceConfig>("appearance", DEFAULT_APPEARANCE)
            if (savedConfig) {
                setConfig(savedConfig)
            }
        }
        loadConfig()
    }, [])

    const handleChange = (key: keyof AppearanceConfig, value: any) => {
        setConfig((prev) => ({ ...prev, [key]: value }))
    }

    const handleSave = async () => {
        setIsSaving(true)
        try {
            await storage.set("appearance", config)
            toast.success("Styles updated")
        } catch (error) {
            toast.error("Failed to save styles")
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex flex-wrap gap-4">
                <ColorPicker
                    label="Primary Color"
                    value={config.primaryColor}
                    onChange={(v) => handleChange("primaryColor", v)}
                />
                <ColorPicker
                    label="Background"
                    value={config.backgroundColor}
                    onChange={(v) => handleChange("backgroundColor", v)}
                />
            </div>

            <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1.5 flex-1">
                    <label className="text-[10px] font-semibold text-[#777] uppercase tracking-wider">Button Text</label>
                    <input
                        type="text"
                        value={config.buttonText}
                        onChange={(e) => handleChange("buttonText", e.target.value)}
                        className="w-full h-[32px] px-3 bg-[#f3f3f3] border border-transparent rounded-[6px] focus:outline-none hover:bg-[#ebebeb] text-[11px]"
                    />
                </div>
                
                <div className="flex flex-col gap-1.5 flex-1">
                    <label className="text-[10px] font-semibold text-[#777] uppercase tracking-wider">Corner Radius ({config.borderRadius}px)</label>
                    <input
                        type="range"
                        min="0"
                        max="24"
                        value={config.borderRadius}
                        onChange={(e) => handleChange("borderRadius", parseInt(e.target.value))}
                        className="w-full accent-[#111] h-6 cursor-pointer"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-[10px] font-semibold text-[#777] uppercase tracking-wider">Success Message</label>
                <textarea
                    value={config.successMessage}
                    onChange={(e) => handleChange("successMessage", e.target.value)}
                    rows={3}
                    className="w-full p-3 bg-[#f3f3f3] border border-transparent rounded-[6px] outline-none text-[11px] hover:bg-[#ebebeb] resize-none"
                />
            </div>

            <button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full h-[32px] bg-[#111] hover:bg-[#333] active:bg-black text-white font-semibold rounded-[6px] transition-all disabled:opacity-50"
            >
                {isSaving ? "Saving..." : "Save Style Preferences"}
            </button>
        </div>
    )
}

export default AppearanceTab
