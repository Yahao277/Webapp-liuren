import {
  Zhi,
  TianGan as T,
  DiZhi as D,
} from './GanZhi';
import {
  TianDiState,
  TianDiItem
} from './TianDiState'
import { SanChuanCtrl,SanChuanPair } from "./SanChuan";


export default class Liuren{
  state:TianDiState;
  sike:SikePair[];
  sanChuan:SanChuanPair[] | null
  testSanChuan:any
  sanChuanCtrl:SanChuanCtrl
  yueJiang
  isNight:boolean
  //TODO: add bazi 八字

  public constructor({yueJiang,hour,day,night}:LiurenParams){
    this.yueJiang = yueJiang;
    this.isNight = night
    this.state = new TianDiState(yueJiang,hour,night);
    this.sike = this.makeSike(day);
    this.sanChuanCtrl = new SanChuanCtrl(this.sike,this.state,yueJiang,hour)
    let method = this.sanChuanCtrl.decideMethod()
    this.sanChuan = method.handle()
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
      {top:ganYang,bot:day.gan,position:0,jiang:this.state.getJiangByTop(ganYang)},
      {top:ganYin,bot:ganYang,position:1,jiang:this.state.getJiangByTop(ganYin)},
      {top:zhiYang,bot:dayZhi,position:2,jiang:this.state.getJiangByTop(zhiYang)},
      {top:zhiYin,bot:zhiYang,position:3,jiang:this.state.getJiangByTop(zhiYin)}
    ]
  }
}