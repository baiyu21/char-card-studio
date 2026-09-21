import { useEffect, useRef } from 'react'
import type { CardState } from '../types'
import { DEFAULT_CARD, cloneLayout } from '../defaults'

type Props = {
  value: CardState
  onChange: (next: CardState) => void
}

export function EditorSidebar({ value, onChange }: Props) {
  const standeeUrlRef = useRef<string | null>(null)
  const markUrlRef = useRef<string | null>(null)

  useEffect(() => {
    return () => {
      if (standeeUrlRef.current) URL.revokeObjectURL(standeeUrlRef.current)
      if (markUrlRef.current) URL.revokeObjectURL(markUrlRef.current)
    }
  }, [])

  function patch(partial: Partial<CardState>) {
    onChange({ ...value, ...partial })
  }

  function onStandeeFile(file: File | null) {
    if (!file) return
    if (standeeUrlRef.current) URL.revokeObjectURL(standeeUrlRef.current)
    const url = URL.createObjectURL(file)
    standeeUrlRef.current = url
    patch({ standeeUrl: url })
  }

  function onMarkFile(file: File | null) {
    if (!file) return
    if (markUrlRef.current) URL.revokeObjectURL(markUrlRef.current)
    const url = URL.createObjectURL(file)
    markUrlRef.current = url
    patch({ orgMarkUrl: url })
  }

  return (
    <aside className="studio-sidebar" aria-label="卡片编辑">
      <p className="studio-hint">
        提示：预览中可拖动 / 右下角缩放 — 立绘、文字、标志、公司字、人物提示
      </p>

      <label className="studio-field">
        <span>中文名</span>
        <input
          value={value.nameZh}
          onChange={(e) => patch({ nameZh: e.target.value })}
        />
      </label>
      <label className="studio-field">
        <span>英文名</span>
        <input
          value={value.nameEn}
          onChange={(e) => patch({ nameEn: e.target.value })}
        />
      </label>
      <label className="studio-field">
        <span>短简介</span>
        <textarea
          rows={3}
          value={value.summary}
          onChange={(e) => patch({ summary: e.target.value })}
        />
      </label>
      <label className="studio-field">
        <span>成员介绍</span>
        <textarea
          rows={8}
          value={value.bio}
          onChange={(e) => patch({ bio: e.target.value })}
        />
      </label>

      <p className="studio-section-label">立绘 / 主题</p>
      <label className="studio-field">
        <span>立绘 PNG</span>
        <input
          type="file"
          accept="image/png,image/webp,image/jpeg"
          onChange={(e) => onStandeeFile(e.target.files?.[0] ?? null)}
        />
      </label>
      <label className="studio-field studio-field--row">
        <span>主题色</span>
        <input
          type="color"
          value={value.accent}
          onChange={(e) => patch({ accent: e.target.value })}
        />
        <input
          className="studio-field__accent-text"
          value={value.accent}
          onChange={(e) => patch({ accent: e.target.value })}
        />
      </label>

      <p className="studio-section-label">背景标志 / 公司字</p>
      <label className="studio-field">
        <span>组织标志图</span>
        <input
          type="file"
          accept="image/png,image/webp,image/svg+xml"
          onChange={(e) => onMarkFile(e.target.files?.[0] ?? null)}
        />
      </label>
      <label className="studio-field">
        <span>公司装饰字</span>
        <input
          value={value.orgBandText}
          onChange={(e) => patch({ orgBandText: e.target.value })}
        />
      </label>
      <label className="studio-field">
        <span>右上装饰字</span>
        <input
          value={value.bgTitle}
          onChange={(e) => patch({ bgTitle: e.target.value })}
        />
      </label>
      <label className="studio-field">
        <span>组织备注（仅侧栏）</span>
        <input
          value={value.orgNote}
          onChange={(e) => patch({ orgNote: e.target.value })}
        />
      </label>

      <p className="studio-section-label">人物提示（段 HUD）</p>
      <label className="studio-field studio-field--row">
        <span>编号</span>
        <input
          value={value.hudNo}
          onChange={(e) => patch({ hudNo: e.target.value })}
        />
      </label>
      <label className="studio-field">
        <span>分数行（如 03 / 05）</span>
        <input
          value={value.hudFrac}
          onChange={(e) => patch({ hudFrac: e.target.value })}
        />
      </label>
      <label className="studio-field">
        <span>标签</span>
        <input
          value={value.hudTag}
          onChange={(e) => patch({ hudTag: e.target.value })}
        />
      </label>
      <label className="studio-field">
        <span>标题</span>
        <input
          value={value.hudTitle}
          onChange={(e) => patch({ hudTitle: e.target.value })}
        />
      </label>

      <button
        type="button"
        className="studio-btn studio-btn--ghost"
        onClick={() => {
          if (standeeUrlRef.current) {
            URL.revokeObjectURL(standeeUrlRef.current)
            standeeUrlRef.current = null
          }
          if (markUrlRef.current) {
            URL.revokeObjectURL(markUrlRef.current)
            markUrlRef.current = null
          }
          onChange({
            ...DEFAULT_CARD,
            layout: cloneLayout(),
          })
        }}
      >
        重置为默认示例
      </button>
    </aside>
  )
}
