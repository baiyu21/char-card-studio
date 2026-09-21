import { useState } from 'react'
import { toPng } from 'html-to-image'
import type { CardState } from '../types'
import { CANVAS_H, CANVAS_W } from '../types'
import { slugifyFilename } from '../utils'

type Props = {
  card: CardState
  getNode: () => HTMLElement | null
}

export function ExportBar({ card, getNode }: Props) {
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  async function onExport() {
    const node = getNode()
    if (!node) return
    setBusy(true)
    setErr(null)
    try {
      await document.fonts.ready
      node.dataset.exporting = '1'
      const dataUrl = await toPng(node, {
        width: CANVAS_W,
        height: CANVAS_H,
        pixelRatio: 1,
        cacheBust: true,
        style: {
          transform: 'none',
          transformOrigin: 'top left',
        },
        filter: (el) => {
          if (!(el instanceof HTMLElement)) return true
          return el.dataset.studioChrome !== '1'
        },
      })
      const a = document.createElement('a')
      a.href = dataUrl
      a.download = `char-${slugifyFilename(card.nameEn, card.nameZh)}.png`
      a.click()
    } catch (e) {
      setErr(e instanceof Error ? e.message : '导出失败')
    } finally {
      node.removeAttribute('data-exporting')
      setBusy(false)
    }
  }

  return (
    <div className="studio-export">
      <button
        type="button"
        className="studio-btn studio-btn--primary"
        disabled={busy}
        onClick={() => void onExport()}
      >
        {busy ? '导出中…' : '导出 PNG 1920×1080'}
      </button>
      {err ? <p className="studio-export__err">{err}</p> : null}
    </div>
  )
}
