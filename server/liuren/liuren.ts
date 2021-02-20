import {
  Zhi,
  TianGan as T,
  DiZhi as D,
  GanZhiPair
} from './GanZhi';
import {
  TianDiState,
  TianDiItem
} from './TianDiState'
import {SikePair,fourPairs} from './Sike'

type LiurenParams = {
  yueJiang:Zhi,
  hour:Zhi,
  day:GanZhiPair
}

export default class Liuren{
  state:TianDiState;
  sike:SikePair[];
  sanChuan:any
  yueJiang
  //TODO: add bazi 八字

  public constructor({yueJiang,hour,day}:LiurenParams){
    this.yueJiang = yueJiang;
    this.state = new TianDiState(yueJiang,hour);
    this.sike = this.makeSike(day);

  }

/**
 * makeSike
 * @params state: TianDiState
 * @params day: {Gan,Zhi}:GanZhiPair
 */
  private makeSike(day:GanZhiPair){
    const dayGan = T.getJiGong(day.gan); // 十干寄宫
    const ganYang = this.state.getTop(dayGan);
    const ganYin = this.state.getTop(ganYang);
    const dayZhi = day.zhi;
    const zhiYang = this.state.getTop(dayZhi);
    const zhiYin = this.state.getTop(zhiYang);
    return [
      {top:ganYang,bot:day.gan,position:0},
      {top:ganYin,bot:ganYang,position:1},
      {top:zhiYang,bot:dayZhi,position:2},
      {top:zhiYin,bot:zhiYang,position:3}
    ]
  }

  private makeSanChuan(){

  }
}