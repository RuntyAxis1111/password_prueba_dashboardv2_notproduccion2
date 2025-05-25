"use client"

import { useState, useEffect } from "react"

interface HoverMenuProps {
  tabId: string
  data: any
  onItemSelect: (itemId: string, type: string, socialId?: string) => void
}

export function HoverMenu({ tabId, data, onItemSelect }: HoverMenuProps) {
  const [hoveredBand, setHoveredBand] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => setIsVisible(true), 10)
    return () => clearTimeout(timer)
  }, [])

  const handleItemClick = (itemId: string, type: string, socialId?: string) => {
    if (type === "public-relations") {
      const social =
        data.palf?.socialMedia?.find((s: any) => s.id === "public-relations") ||
        data.truvatos?.find((s: any) => s.id === "public-relations")
      if (social) {
        window.location.href = social.palfReportUrl || social.truvatosReportUrl
        return
      }
    }
    onItemSelect(itemId, type, socialId)
  }

  if (tabId === "artists") {
    return (
      <div
        className={`
        absolute top-full left-1/2 transform -translate-x-1/2 bg-white border-2 border-black shadow-2xl p-6 z-40 min-w-56
        transition-all duration-400 ease-out backdrop-blur-sm
        ${isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-4 scale-95"}
        before:content-[''] before:absolute before:-top-2 before:left-1/2 before:transform before:-translate-x-1/2
        before:w-4 before:h-4 before:bg-white before:border-l-2 before:border-t-2 before:border-black
        before:rotate-45 before:z-10
        rounded-lg overflow-visible
      `}
        style={{
          background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent pointer-events-none" />

        <ul className="list-none p-0 m-0 relative z-10">
          {data.artists.map((artist: any, index: number) => (
            <li
              key={artist.id}
              onClick={() => handleItemClick(artist.id, "artist")}
              className={`
                py-3 px-2 cursor-pointer font-bold uppercase text-black border-b border-black/10 last:border-b-0 
                hover:bg-gradient-to-r hover:from-black/5 hover:to-black/10 
                transition-all duration-300 ease-out rounded-md mx-1
                transform hover:translate-x-2 hover:scale-105
                ${isVisible ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"}
                relative overflow-hidden group
              `}
              style={{
                transitionDelay: `${index * 60}ms`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/5 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              <span className="relative z-10 flex items-center">
                <span className="w-2 h-2 bg-black rounded-full mr-3 transform scale-0 group-hover:scale-100 transition-transform duration-200" />
                {artist.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  if (tabId === "palf") {
    return (
      <div
        className={`
        absolute top-full left-1/2 transform -translate-x-1/2 bg-white border-2 border-black shadow-2xl p-6 z-40 min-w-[28rem] flex gap-6
        transition-all duration-400 ease-out backdrop-blur-sm
        ${isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-4 scale-95"}
        before:content-[''] before:absolute before:-top-2 before:left-1/2 before:transform before:-translate-x-1/2
        before:w-4 before:h-4 before:bg-white before:border-l-2 before:border-t-2 before:border-black
        before:rotate-45 before:z-10
        rounded-lg overflow-visible
      `}
        style={{
          background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent pointer-events-none" />

        <div className="flex-1 relative z-10">
          <h3
            className={`
            text-black font-bold border-b-2 border-black pb-3 mb-4 text-lg
            transition-all duration-400 ease-out flex items-center
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
          `}
          >
            <span className="w-3 h-3 bg-black rounded-full mr-3" />
            Social Media
          </h3>
          <ul className="list-none p-0 m-0">
            {data.palf.socialMedia.map((social: any, index: number) => (
              <li
                key={social.id}
                onClick={() => handleItemClick(social.id, "palf-social")}
                className={`
                  py-3 px-2 cursor-pointer font-bold uppercase text-black border-b border-black/10 last:border-b-0 
                  hover:bg-gradient-to-r hover:from-black/5 hover:to-black/10 
                  transition-all duration-300 ease-out rounded-md mx-1
                  transform hover:translate-x-2 hover:scale-105
                  ${isVisible ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"}
                  relative overflow-hidden group
                `}
                style={{
                  transitionDelay: `${index * 60}ms`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/5 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                <span className="relative z-10 flex items-center">
                  <span className="w-2 h-2 bg-black rounded-full mr-3 transform scale-0 group-hover:scale-100 transition-transform duration-200" />
                  {social.name}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1 relative z-10 overflow-visible">
          <h3
            className={`
            text-black font-bold border-b-2 border-black pb-3 mb-4 text-lg
            transition-all duration-400 ease-out flex items-center
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
          `}
            style={{ transitionDelay: "100ms" }}
          >
            <span className="w-3 h-3 bg-black rounded-full mr-3" />
            Bands
          </h3>
          <ul className="list-none p-0 m-0 relative overflow-visible">
            {data.palf.bands.map((band: any, index: number) => (
              <li
                key={band.id}
                className="relative overflow-visible group"
                onMouseEnter={() => setHoveredBand(band.id)}
                onMouseLeave={() => setHoveredBand(null)}
              >
                <div
                  className={`
                  py-3 px-2 cursor-pointer font-bold uppercase text-black border-b border-black/10 last:border-b-0 
                  hover:bg-gradient-to-r hover:from-black/5 hover:to-black/10 
                  transition-all duration-300 ease-out rounded-md mx-1
                  transform hover:translate-x-2 hover:scale-105
                  ${isVisible ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"}
                  relative overflow-hidden
                `}
                  style={{
                    transitionDelay: `${(data.palf.socialMedia.length + index) * 60}ms`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/5 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                  <span className="relative z-10 flex items-center">
                    <span className="w-2 h-2 bg-black rounded-full mr-3 transform scale-0 group-hover:scale-100 transition-transform duration-200" />
                    {band.name}
                    <span className="ml-auto text-xs opacity-60">▶</span>
                  </span>
                </div>

                {/* Sub-menu with fixed positioning */}
                <div
                  className={`
                  fixed bg-white border-2 border-black shadow-2xl p-4 min-w-48 z-[100]
                  transition-all duration-350 ease-out backdrop-blur-sm
                  ${
                    hoveredBand === band.id
                      ? "opacity-100 scale-100 pointer-events-auto"
                      : "opacity-0 scale-95 pointer-events-none"
                  }
                  before:content-[''] before:absolute before:top-4 before:-left-2 before:w-4 before:h-4 
                  before:bg-white before:border-l-2 before:border-b-2 before:border-black
                  before:rotate-45 before:z-10
                  rounded-lg overflow-hidden
                `}
                  style={{
                    background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
                    boxShadow: "0 15px 30px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.05)",
                    left: "calc(100% + 1rem)",
                    top: `${index * 60}px`,
                  }}
                  onMouseEnter={() => setHoveredBand(band.id)}
                  onMouseLeave={() => setHoveredBand(null)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent pointer-events-none" />

                  <ul className="list-none p-0 m-0 relative z-10">
                    {data.palf.socialMedia.map((social: any, subIndex: number) => (
                      <li
                        key={social.id}
                        onClick={() => handleItemClick(band.id, "palf-band-social", social.id)}
                        className={`
                          py-2 px-2 cursor-pointer text-black border-b border-black/10 last:border-b-0 
                          hover:bg-gradient-to-r hover:from-black/5 hover:to-black/10 
                          transition-all duration-250 ease-out rounded-md
                          transform hover:translate-x-1 hover:scale-105
                          ${hoveredBand === band.id ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"}
                          relative overflow-hidden group
                        `}
                        style={{
                          transitionDelay: `${subIndex * 40}ms`,
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/5 transform translate-x-full group-hover:translate-x-0 transition-transform duration-250" />
                        <span className="relative z-10 flex items-center text-sm">
                          <span className="w-1.5 h-1.5 bg-black rounded-full mr-2 transform scale-0 group-hover:scale-100 transition-transform duration-150" />
                          {social.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  if (tabId === "truvatos") {
    return (
      <div
        className={`
        absolute top-full left-1/2 transform -translate-x-1/2 bg-white border-2 border-black shadow-2xl p-6 z-40 min-w-56
        transition-all duration-400 ease-out backdrop-blur-sm
        ${isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-4 scale-95"}
        before:content-[''] before:absolute before:-top-2 before:left-1/2 before:transform before:-translate-x-1/2
        before:w-4 before:h-4 before:bg-white before:border-l-2 before:border-t-2 before:border-black
        before:rotate-45 before:z-10
        rounded-lg overflow-visible
      `}
        style={{
          background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent pointer-events-none" />

        <ul className="list-none p-0 m-0 relative z-10">
          {data.truvatos.map((social: any, index: number) => (
            <li
              key={social.id}
              onClick={() => handleItemClick(social.id, "truvatos-social")}
              className={`
                py-3 px-2 cursor-pointer font-bold uppercase text-black border-b border-black/10 last:border-b-0 
                hover:bg-gradient-to-r hover:from-black/5 hover:to-black/10 
                transition-all duration-300 ease-out rounded-md mx-1
                transform hover:translate-x-2 hover:scale-105
                ${isVisible ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"}
                relative overflow-hidden group
              `}
              style={{
                transitionDelay: `${index * 60}ms`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/5 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              <span className="relative z-10 flex items-center">
                <span className="w-2 h-2 bg-black rounded-full mr-3 transform scale-0 group-hover:scale-100 transition-transform duration-200" />
                {social.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return null
}
