import { useRef, type PointerEvent, type ReactNode } from 'react'
import type { LayerBox } from '../types'

type Mode = 'drag' | 'resize'

type Props = {
  box: LayerBox
  scale: number
  className?: string
  label: string
  minW?: number
  minH?: number
  children: ReactNode
  onChange: (next: LayerBox) => void
}

export function DraggableBox({
  box,
  scale,
  className = '',
  label,
  minW = 120,
  minH = 80,
  children,
  onChange,
}: Props) {
  const modeRef = useRef<Mode | null>(null)
  const startRef = useRef({
    px: 0,
    py: 0,
    box: box,
  })

  function onPointerDown(e: PointerEvent<HTMLElement>, mode: Mode) {
    e.preventDefault()
    e.stopPropagation()
    modeRef.current = mode
    startRef.current = { px: e.clientX, py: e.clientY, box: { ...box } }
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  function onPointerMove(e: PointerEvent<HTMLElement>) {
    if (!modeRef.current) return
    const s = scale > 0.01 ? scale : 1
    const dx = (e.clientX - startRef.current.px) / s
    const dy = (e.clientY - startRef.current.py) / s
    const b = startRef.current.box
    if (modeRef.current === 'drag') {
      onChange({ ...b, x: b.x + dx, y: b.y + dy })
      return
    }
    onChange({
      ...b,
      w: Math.max(minW, b.w + dx),
      h: Math.max(minH, b.h + dy),
    })
  }

  function onPointerUp(e: PointerEvent<HTMLElement>) {
    modeRef.current = null
    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {
      /* ignore */
    }
  }

  return (
    <div
      className={`studio-layer ${className}`.trim()}
      style={{
        left: box.x,
        top: box.y,
        width: box.w,
        height: box.h,
      }}
      onPointerDown={(e) => onPointerDown(e, 'drag')}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      role="group"
      aria-label={label}
    >
      <div className="studio-layer__body">{children}</div>
      <button
        type="button"
        className="studio-layer__handle"
        data-studio-chrome="1"
        aria-label={`${label} 缩放`}
        onPointerDown={(e) => onPointerDown(e, 'resize')}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      />
    </div>
  )
}
