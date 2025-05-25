"use client"

import { useState } from "react"

interface HoverMenuProps {
  tabId: string
  data: any
  onItemSelect: (itemId: string, type: string, socialId?: string) => void
}

export function HoverMenu({ tabId, data, onItemSelect }: HoverMenuProps) {
  const [hoveredBand, setHoveredBand] = useState<string | null>(null)

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
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white border-2 border-black shadow-lg p-4 z-40 min-w-48">
        <ul className="list-none p-0 m-0">
          {data.artists.map((artist: any) => (
            <li
              key={artist.id}
              onClick={() => handleItemClick(artist.id, "artist")}
              className="py-2 cursor-pointer font-bold uppercase text-black border-b border-black/10 last:border-b-0 hover:bg-black/5 transition-colors"
            >
              {artist.name}
            </li>
          ))}
        </ul>
      </div>
    )
  }

  if (tabId === "palf") {
    return (
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white border-2 border-black shadow-lg p-4 z-40 min-w-96 flex gap-4">
        <div className="flex-1">
          <h3 className="text-black font-bold border-b border-black pb-2 mb-3">Social Media</h3>
          <ul className="list-none p-0 m-0">
            {data.palf.socialMedia.map((social: any) => (
              <li
                key={social.id}
                onClick={() => handleItemClick(social.id, "palf-social")}
                className="py-2 cursor-pointer font-bold uppercase text-black border-b border-black/10 last:border-b-0 hover:bg-black/5 transition-colors"
              >
                {social.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1">
          <h3 className="text-black font-bold border-b border-black pb-2 mb-3">Bands</h3>
          <ul className="list-none p-0 m-0">
            {data.palf.bands.map((band: any) => (
              <li
                key={band.id}
                className="relative"
                onMouseEnter={() => setHoveredBand(band.id)}
                onMouseLeave={() => setHoveredBand(null)}
              >
                <div className="py-2 cursor-pointer font-bold uppercase text-black border-b border-black/10 last:border-b-0 hover:bg-black/5 transition-colors">
                  {band.name}
                </div>

                {hoveredBand === band.id && (
                  <div className="absolute top-0 left-full bg-white border-2 border-black shadow-lg p-4 z-50 min-w-40">
                    <ul className="list-none p-0 m-0">
                      {data.palf.socialMedia.map((social: any) => (
                        <li
                          key={social.id}
                          onClick={() => handleItemClick(band.id, "palf-band-social", social.id)}
                          className="py-2 cursor-pointer text-black border-b border-black/10 last:border-b-0 hover:bg-black/5 transition-colors"
                        >
                          {social.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  if (tabId === "truvatos") {
    return (
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white border-2 border-black shadow-lg p-4 z-40 min-w-48">
        <ul className="list-none p-0 m-0">
          {data.truvatos.map((social: any) => (
            <li
              key={social.id}
              onClick={() => handleItemClick(social.id, "truvatos-social")}
              className="py-2 cursor-pointer font-bold uppercase text-black border-b border-black/10 last:border-b-0 hover:bg-black/5 transition-colors"
            >
              {social.name}
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return null
}
