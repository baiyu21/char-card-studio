export type LayerBox = {
  x: number
  y: number
  w: number
  h: number
}

export type CardLayout = {
  orgMark: LayerBox
  orgBand: LayerBox
  standee: LayerBox
  bio: LayerBox
  identity: LayerBox
  sectionHud: LayerBox
}

export type CardState = {
  nameZh: string
  nameEn: string
  summary: string
  bio: string
  orgNote: string
  standeeUrl: string
  /** 组织标志 mask 图 */
  orgMarkUrl: string
  /** 中段公司装饰字，如 OASIAS */
  orgBandText: string
  /** 右上装饰字 */
  bgTitle: string
  /** 右侧段 HUD：03 */
  hudNo: string
  /** 右侧段 HUD：03 / 05 */
  hudFrac: string
  hudTag: string
  hudTitle: string
  accent: string
  layout: CardLayout
}

export const CANVAS_W = 1920
export const CANVAS_H = 1080

export const DEFAULT_LAYOUT: CardLayout = {
  orgMark: { x: 24, y: 8, w: 480, h: 480 },
  orgBand: { x: 0, y: 500, w: 1920, h: 200 },
  standee: { x: 880, y: 40, w: 920, h: 1120 },
  bio: { x: 180, y: 260, w: 540, h: 460 },
  identity: { x: 160, y: 800, w: 1100, h: 200 },
  sectionHud: { x: 1680, y: 430, w: 200, h: 140 },
}
