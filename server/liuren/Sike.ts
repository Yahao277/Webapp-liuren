import {
  Zhi,
  Gan,
  TianGan,
  DiZhi,
  GanZhiPair
} from './GanZhi';
import {
  TianDiState,
  TianDiItem
} from './TianDiState'

// 四课组合， 地盘地支 对 天盘地支 乘 天将
export type SikePair = {
  top: Zhi,
  bot: Zhi | Gan
  jiang ?: string,
  position:number
}

export type fourPairs = {
  0: SikePair,
  1: SikePair,
  2: SikePair,
  3: SikePair
}

