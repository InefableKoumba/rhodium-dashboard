"use client"

import { Menu } from "lucide-react"
import { useSidebar } from "../ui/sidebar"

export default function TriggerSidebarButton() {
    const { toggleSidebar } = useSidebar()
    return (
        <button 
            onClick={toggleSidebar}
            className="rounded hover:bg-gray-300 dark:hover:bg-gray-600 py-1 px-1.5 transition-colors duration-300 ease-in-out"
        >
            <Menu />
        </button>
    )
}