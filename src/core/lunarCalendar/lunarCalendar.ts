import {
  Gan,
  Zhi,
  TianGan,
  DiZhi
} from '../liuren/GanZhi'

// Mockup tests

//四柱
type fourPilar = {
  year: GanZhiPair,
  month: GanZhiPair,
  day: GanZhiPair,
  hour: GanZhiPair
}

const t1:fourPilar = {
  year: {gan:TianGan.XIN,zhi:DiZhi.CHOU},
  month: {gan:TianGan.GENG,zhi:DiZhi.YIN},
  day: {gan:TianGan.DING,zhi:DiZhi.YOU},
  hour: {gan:TianGan.JI,zhi:DiZhi.YOU},
}

export default t1;