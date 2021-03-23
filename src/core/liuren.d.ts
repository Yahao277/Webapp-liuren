type LiurenParams = {
  yueJiang:Zhi,
  hour:Zhi,
  day:GanZhiPair,
  night:boolean
}

//干支组合， 四柱八字
type GanZhiPair = {
  gan:Gan,
  zhi:Zhi
}

// 四课组合， 地盘地支 对 天盘地支 乘 天将
type SikePair = {
  top: Zhi,
  bot: Zhi | Gan
  jiang ?: Jiang,
  position:number
}