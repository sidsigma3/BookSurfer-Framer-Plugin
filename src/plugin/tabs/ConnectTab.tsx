import React, { useState, useEffect } from "react"
import { storage } from "../../utils/storage"
import { toast } from "sonner"
import { Check, ExternalLink, ShieldCheck, Loader2, Eye, EyeOff } from "lucide-react"
import apiClient from "../../services/apiClient"

interface ConnectTabProps {
    onConnected: () => void
}

const ConnectTab: React.FC<ConnectTabProps> = ({ onConnected }) => {
    const [apiKey, setApiKey] = useState("")
    const [isSaving, setIsSaving] = useState(false)
    const [showApiKey, setShowApiKey] = useState(false)

    useEffect(() => {
        const loadKey = async () => {
            const savedKey = await storage.get<string>("apiKey", "")
            if (savedKey) setApiKey(savedKey)
        }
        loadKey()
    }, [])

    const handleSave = async () => {
        if (!apiKey) {
            toast.error("Please enter an API Key")
            return
        }

        setIsSaving(true)
        try {
            // First save the key so apiClient interceptor can use it
            await storage.set("apiKey", apiKey)
            
            // Try to fetch classes to validate the key
            const response: any = await apiClient.get("/widget/classes")
            
            if (response.success) {
                toast.success("Connected successfully")
                onConnected()
            } else {
                throw new Error("Invalid response from server")
            }
        } catch (error: any) {
            console.error("Connection error:", error)
            // Clear the key if connection failed
            await storage.set("apiKey", "")
            toast.error(typeof error === 'string' ? error : "Failed to connect. Please check your API key.")
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                        <ShieldCheck size={18} />
                    </div>
                    <label htmlFor="apiKey" className="font-bold text-primary">
                        API Connection
                    </label>
                </div>
                
                <div className="relative group">
                    <input
                        id="apiKey"
                        type={showApiKey ? "text" : "password"}
                        placeholder="Enter your API Key (bsf_...)"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        className="premium-input w-full h-[44px] text-[13px] px-4 pr-10"
                    />
                    <button
                        type="button"
                        onClick={() => setShowApiKey(!showApiKey)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                    >
                        {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                </div>
                
                <p className="text-[11px] text-gray-500 leading-relaxed px-1">
                    Your API key is used to securely fetch classes, schedules, and form schemas from your BookSurfer dashboard.
                </p>
            </div>

            <div className="flex flex-col gap-4">
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="btn-primary w-full h-[44px] flex items-center justify-center gap-2 shadow-sm"
                >
                    {isSaving ? (
                        <Loader2 className="animate-spin" size={18} />
                    ) : (
                        "Connect Account"
                    )}
                </button>
                
                <a 
                    href="https://admin.booksurfer.in/settings" 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 text-[11px] font-bold text-primary/40 hover:text-primary transition-colors py-2 uppercase tracking-wider"
                >
                    Get API Key
                    <ExternalLink size={12} />
                </a>
            </div>

            <div className=" p-5 bg-white border-2 border-secondary rounded-[16px]">
                <h4 className="text-[12px] font-bold text-primary mb-2">How it works</h4>
                <ul className="flex flex-col gap-3 text-[11px] text-gray-500">
                    <li className="flex gap-2">
                        <span className="text-accent font-bold">01</span>
                        <span>Link your BookSurfer account via API</span>
                    </li>
                    <li className="flex gap-2">
                        <span className="text-accent font-bold">02</span>
                        <span>Select a class from your dashboard</span>
                    </li>
                    <li className="flex gap-2">
                        <span className="text-accent font-bold">03</span>
                        <span>Instantly add the booking form to Framer</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default ConnectTab
