import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
} from 'react'
import type { CardState, LayerBox } from '../types'
import { hexToRgbChannels } from '../utils'
import { DraggableBox } from './DraggableBox'
import '../styles/char-card.css'

type Props = {
  card: CardState
  canvasRef: RefObject<HTMLDivElement | null>
  onLayoutChange: (key: keyof CardState['layout'], box: LayerBox) => void
}

export function PreviewStage({ card, canvasRef, onLayoutChange }: Props) {
  const shellRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.45)

  useEffect(() => {
    const el = shellRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      const s = Math.min(width / 1920, height / 1080, 1)
      setScale(s > 0.05 ? s : 0.05)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const maskUrl = `url("${card.standeeUrl}")`
  const rimStyle = {
    '--char-mask': maskUrl,
  } as CSSProperties

  const rootStyle = {
    '--hud-accent': card.accent,
    '--hud-accent-rgb': hexToRgbChannels(card.accent),
    width: 1920,
    height: 1080,
    transform: `scale(${scale})`,
    transformOrigin: 'top left',
  } as CSSProperties

  const paras = card.bio
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <div className="studio-preview-scale" ref={shellRef}>
      <div
        className="char-card"
        ref={canvasRef}
        style={rootStyle}
        data-export-root
      >
        <span className="char-card__bg-title" aria-hidden>
          {card.bgTitle}
        </span>

        <DraggableBox
          label="组织标志"
          className="studio-layer--org-mark"
          box={card.layout.orgMark}
          scale={scale}
          minW={120}
          minH={120}
          onChange={(box) => onLayoutChange('orgMark', box)}
        >
          <div
            className="char-card__org-mark"
            aria-hidden
            style={
              {
                '--char-org-mark': `url("${card.orgMarkUrl}")`,
              } as CSSProperties
            }
          />
        </DraggableBox>

        <DraggableBox
          label="公司文字"
          className="studio-layer--org-band"
          box={card.layout.orgBand}
          scale={scale}
          minW={400}
          minH={80}
          onChange={(box) => onLayoutChange('orgBand', box)}
        >
          <div className="char-card__org-band" aria-hidden>
            <span className="char-card__org-band-text">{card.orgBandText}</span>
          </div>
        </DraggableBox>

        <div className="char-card__mask-bar" aria-hidden />

        <DraggableBox
          label="立绘"
          className="studio-layer--standee"
          box={card.layout.standee}
          scale={scale}
          minW={200}
          minH={280}
          onChange={(box) => onLayoutChange('standee', box)}
        >
          <div className="char-card__art">
            <div className="char-card__bg" aria-hidden>
              <img src={card.standeeUrl} alt="" />
            </div>
            <div className="char-card__sil-slot" aria-hidden>
              <div className="char-card__sil-rim" style={rimStyle} />
              <div
                className="char-card__sil"
                style={{
                  WebkitMaskImage: maskUrl,
                  maskImage: maskUrl,
                }}
              />
            </div>
            <div className="char-card__standee">
              <img src={card.standeeUrl} alt="" draggable={false} />
            </div>
          </div>
        </DraggableBox>

        <DraggableBox
          label="成员介绍"
          className="studio-layer--bio"
          box={card.layout.bio}
          scale={scale}
          minW={220}
          minH={160}
          onChange={(box) => onLayoutChange('bio', box)}
        >
          <div className="char-card__bio">
            <h3 className="char-card__bio-label">成员介绍</h3>
            <div className="char-card__bio-body">
              {paras.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </DraggableBox>

        <DraggableBox
          label="姓名简介"
          className="studio-layer--identity"
          box={card.layout.identity}
          scale={scale}
          minW={280}
          minH={100}
          onChange={(box) => onLayoutChange('identity', box)}
        >
          <div className="char-card__identity">
            <div className="char-card__title">
              {card.nameEn ? (
                <p className="char-card__name-en">{card.nameEn}</p>
              ) : null}
              <h2 className="char-card__name">{card.nameZh}</h2>
            </div>
            <div className="char-card__meta">
              <span className="char-card__sep" aria-hidden>
                <span className="char-card__sep-colon">:</span>
                <span className="char-card__sep-slash">//</span>
              </span>
              {card.summary ? (
                <p className="char-card__summary">{card.summary}</p>
              ) : null}
            </div>
          </div>
        </DraggableBox>

        <DraggableBox
          label="人物提示"
          className="studio-layer--hud"
          box={card.layout.sectionHud}
          scale={scale}
          minW={140}
          minH={90}
          onChange={(box) => onLayoutChange('sectionHud', box)}
        >
          <aside className="char-card__hud" aria-label="人物提示">
            <div className="char-card__hud-rail" aria-hidden />
            <div className="char-card__hud-row">
              <span className="char-card__hud-no">{card.hudNo}</span>
              <span className="char-card__hud-meta">
                <span className="char-card__hud-frac">
                  // {card.hudFrac}
                </span>
                <span className="char-card__hud-tag">{card.hudTag}</span>
              </span>
            </div>
            <p className="char-card__hud-title">{card.hudTitle}</p>
          </aside>
        </DraggableBox>
      </div>
    </div>
  )
}
