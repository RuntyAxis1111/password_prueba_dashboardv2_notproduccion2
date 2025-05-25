"use client"

import { useState } from "react"
import { HoverMenu } from "./hover-menu"

interface HeaderProps {
  activeTab: string
  onTabChange: (tabId: string) => void
  onItemSelect: (itemId: string, type: string, socialId?: string) => void
  data: any
}

export function Header({ activeTab, onTabChange, onItemSelect, data }: HeaderProps) {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null)

  const tabs = [
    { id: "artists", label: "ARTISTS" },
    { id: "palf", label: "PALF" },
    { id: "truvatos", label: "TRUVATOS" },
  ]

  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-white text-black z-50 shadow-md">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="flex-1 flex items-center justify-center w-full px-4">
          <h1 className="text-xl font-bold">HYBE LATIN AMERICA – DATA HUB (alpha)</h1>
        </div>

        <nav className="flex w-full h-8 relative">
          {tabs.map((tab, index) => (
            <div
              key={tab.id}
              className="flex-1 relative flex justify-center items-center"
              onMouseEnter={() => setHoveredTab(tab.id)}
              onMouseLeave={() => setHoveredTab(null)}
            >
              <button
                onClick={() => onTabChange(tab.id)}
                className={`
                  w-full h-full font-bold text-sm uppercase transition-all
                  ${activeTab === tab.id ? "bg-black text-white" : "bg-transparent text-black hover:bg-black/10"}
                  ${index < tabs.length - 1 ? "clip-path-arrow" : ""}
                `}
                style={{
                  clipPath:
                    index < tabs.length - 1 ? "polygon(0 0, calc(100% - 15px) 0, 100% 100%, 0 100%)" : undefined,
                  marginRight: index < tabs.length - 1 ? "-15px" : "0",
                  zIndex: index + 1,
                }}
              >
                {tab.label}
              </button>

              {hoveredTab === tab.id && <HoverMenu tabId={tab.id} data={data} onItemSelect={onItemSelect} />}
            </div>
          ))}
        </nav>
      </div>
    </header>
  )
}
