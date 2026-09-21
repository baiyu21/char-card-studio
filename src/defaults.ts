import type { CardState } from './types'
import { DEFAULT_LAYOUT } from './types'

function cloneLayout() {
  return {
    orgMark: { ...DEFAULT_LAYOUT.orgMark },
    orgBand: { ...DEFAULT_LAYOUT.orgBand },
    standee: { ...DEFAULT_LAYOUT.standee },
    bio: { ...DEFAULT_LAYOUT.bio },
    identity: { ...DEFAULT_LAYOUT.identity },
    sectionHud: { ...DEFAULT_LAYOUT.sectionHud },
  }
}

export const DEFAULT_CARD: CardState = {
  nameZh: '赫柏',
  nameEn: 'harb motis',
  summary: '曾经隶属于绿洲政府的生物研究员，目前为 HR 公司的 CEO',
  bio: `赫柏·墨缇斯出生于地下城时代之前，她的父母均死于21年的灾难之中。仅剩下她与机器人37为伴。继承了父母科研精神的她，在地下城中表现出了惊人的研究天赋，并迅速投身入了对于【原体物质】研究的行列中。

然而事情并不尽遂人意，【原体Z】计划最终失控。而赫柏也因事故而遭到罢免，被封入冷冻仓中，去往未来。

在未来的地下城“中心城”中，她邂逅了神秘的外星生物“Things”欧米伽，两人一拍即合，一个成立公司的愿望在心中萌发...`,
  orgNote: 'Hope Ray',
  standeeUrl: '/sample-standee.png',
  orgMarkUrl: '/logo.png',
  orgBandText: 'OASIAS',
  bgTitle: 'CHARACTER',
  hudNo: '03',
  hudFrac: '03 / 05',
  hudTag: 'HUISU',
  hudTitle: '人物',
  accent: '#5ee7ff',
  layout: cloneLayout(),
}

export { cloneLayout }
