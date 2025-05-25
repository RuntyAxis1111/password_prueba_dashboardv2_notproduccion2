"use client"

interface ContentSectionProps {
  activeTab: string
  selectedItem: {
    id: string
    type: string
    socialId?: string
  } | null
  data: any
}

export function ContentSection({ activeTab, selectedItem, data }: ContentSectionProps) {
  const getReportUrl = () => {
    if (!selectedItem) return null

    const { id, type, socialId } = selectedItem

    if (type === "artist") {
      const artist = data.artists.find((a: any) => a.id === id)
      return artist?.reportUrls?.[0] || null
    }

    if (type === "palf-social") {
      const social = data.palf.socialMedia.find((s: any) => s.id === id)
      return social?.palfReportUrl || null
    }

    if (type === "palf-band-social") {
      const social = data.palf.socialMedia.find((s: any) => s.id === socialId)
      return social?.palfReportUrl || data.truvatos[0]?.truvatosReportUrl || null
    }

    if (type === "truvatos-social") {
      const social = data.truvatos.find((s: any) => s.id === id)
      return social?.truvatosReportUrl || null
    }

    return null
  }

  const getPanelTitle = () => {
    if (!selectedItem) return `${activeTab.toUpperCase()} Data Panel`

    const { id, type, socialId } = selectedItem

    if (type === "artist") {
      const artist = data.artists.find((a: any) => a.id === id)
      return `${artist?.name} Panel`
    }

    if (type === "palf-social") {
      const social = data.palf.socialMedia.find((s: any) => s.id === id)
      return `PALF - ${social?.name} Panel`
    }

    if (type === "palf-band-social") {
      const band = data.palf.bands.find((b: any) => b.id === id)
      const social = data.palf.socialMedia.find((s: any) => s.id === socialId)
      return `${band?.name} - ${social?.name} Panel`
    }

    if (type === "truvatos-social") {
      const social = data.truvatos.find((s: any) => s.id === id)
      return `TRUVATOS - ${social?.name} Panel`
    }

    return `${activeTab.toUpperCase()} Data Panel`
  }

  const reportUrl = getReportUrl()
  const panelTitle = getPanelTitle()

  return (
    <div className="p-4 h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="w-full h-full bg-white border-2 border-black rounded-lg overflow-hidden shadow-lg animate-pulse">
        <div className="bg-black text-white p-3 flex justify-between items-center">
          <span className="font-bold uppercase">{panelTitle}</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => (window.location.href = "https://data.hybelatinamerica.com/")}
              className="bg-transparent text-white border border-white px-3 py-1 rounded text-sm font-bold flex items-center gap-2 hover:bg-white hover:text-black transition-all"
            >
              <span className="material-icons text-lg">lock</span>
              PRIVATE DATA
            </button>
            <span className="material-icons text-xl">insert_chart</span>
          </div>
        </div>

        <div className="flex-1 h-[calc(100%-3.5rem)]">
          {reportUrl ? (
            <iframe
              src={reportUrl}
              title={panelTitle}
              className="w-full h-full border-0"
              allowFullScreen
              sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
            />
          ) : (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              title={`${activeTab.toUpperCase()} Video`}
            >
              <source src={`/${activeTab}.mp4`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </div>
    </div>
  )
}
