import { useRef, useState } from 'react'
import { EditorSidebar } from './components/EditorSidebar'
import { ExportBar } from './components/ExportBar'
import { PreviewStage } from './components/PreviewStage'
import { DEFAULT_CARD, cloneLayout } from './defaults'
import type { CardState, LayerBox } from './types'
import './index.css'

export default function App() {
  const [card, setCard] = useState<CardState>({
    ...DEFAULT_CARD,
    layout: cloneLayout(),
  })
  const canvasRef = useRef<HTMLDivElement>(null)

  function onLayoutChange(key: keyof CardState['layout'], box: LayerBox) {
    setCard((prev) => ({
      ...prev,
      layout: { ...prev.layout, [key]: box },
    }))
  }

  return (
    <div className="studio-app">
      <header className="studio-top">
        <h1 className="studio-top__title">Char Card Studio</h1>
        <ExportBar card={card} getNode={() => canvasRef.current} />
      </header>
      <div className="studio-main">
        <div className="studio-preview-shell">
          <PreviewStage
            card={card}
            canvasRef={canvasRef}
            onLayoutChange={onLayoutChange}
          />
        </div>
        <EditorSidebar value={card} onChange={setCard} />
      </div>
    </div>
  )
}
