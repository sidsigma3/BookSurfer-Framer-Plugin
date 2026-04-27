import React, { useState, useEffect } from "react"
import { framer } from "framer-plugin"
import { Toaster } from "sonner"
import ConnectTab from "./tabs/ConnectTab"
import ClassesTab from "./tabs/ClassesTab"

import { storage } from "../utils/storage"

import apiClient from "../services/apiClient"

function App() {
    const [isConnected, setIsConnected] = useState<boolean | null>(null)
    const [studioName, setStudioName] = useState<string>("")

    const checkConnection = async () => {
        const apiKey = await storage.get<string>("apiKey", "")
        if (apiKey) {
            setIsConnected(true)
            try {
                // In a real scenario, this would be a real endpoint
                const response = await apiClient.get("/studio")
                if (response && (response as any).name) {
                    setStudioName((response as any).name)
                } else {
                    setStudioName("Premium Studio")
                }
            } catch (error) {
                setStudioName("My Studio")
            }
        } else {
            setIsConnected(false)
        }
    }

    useEffect(() => {
        checkConnection()
    }, [])

    if (isConnected === null) {
        return <div className="h-screen bg-background flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
        </div>
    }

    return (
        <div className="flex flex-col h-screen text-[12px] font-sans antialiased text-foreground bg-background overflow-hidden">
            <header className="px-6 py-5 flex items-center justify-between bg-white border-b border-secondary">
                <div className="flex items-center gap-3">

                    <div className="flex flex-col">
                        <span className="font-bold text-[14px] tracking-tight text-primary">BookSurfer</span>
                        {isConnected && <span className="text-[10px] text-gray-500 font-medium uppercase tracking-widest">{studioName}</span>}
                    </div>
                </div>
                {isConnected && (
                    <button 
                        onClick={async () => {
                            await storage.set("apiKey", "")
                            setIsConnected(false)
                        }}
                        className="text-[10px] font-bold text-primary/40 hover:text-red-500 transition-colors uppercase tracking-wider"
                    >
                        Disconnect
                    </button>
                )}
            </header>
            
            <main className="flex-1 overflow-y-auto px-6 py-6 custom-scrollbar">
                {!isConnected ? (
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-[20px] font-bold text-primary leading-tight">Welcome to BookSurfer</h1>
                            <p className="text-gray-500 text-[13px]">Connect your account to start adding booking forms to your canvas.</p>
                        </div>
                        <ConnectTab onConnected={() => setIsConnected(true)} />
                    </div>
                ) : (
                    <ClassesTab />
                )}
            </main>
            
            <footer className="px-6 py-4 border-t border-secondary bg-white flex items-center justify-between text-[10px] font-medium text-gray-400">
                <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${isConnected ? "bg-accent" : "bg-gray-300"}`} />
                    {isConnected ? "Connected" : "Not Connected"}
                </div>
                <span>v2.0.0</span>
            </footer>

            <Toaster 
                position="bottom-center" 
                richColors 
                toastOptions={{
                    style: { fontFamily: 'var(--font-sans)' },
                }}
            />
        </div>
    )
}

export default App
