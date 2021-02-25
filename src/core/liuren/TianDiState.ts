import {
  TianGan as T,
  DiZhi as D,
  Zhi,
  Gan,
  TianJiang as J,
  Jiang
} from './GanZhi'

export type TianDiItem = {
  top: Zhi,
  bot: Zhi,
  jiang?: Jiang
}


export class TianDiState {
  state:TianDiItem[];
  difference:number;

  /**
   * 算法: 月将加时, 时为地，月将为天
   * twelve diZhiItems, each bot pairs with a top item.
   * @param top Zhi
   * @param bot Zhi
   */
  public constructor(top:Zhi,bot:Zhi,isNight:boolean){
    let result: TianDiItem[] = [];
    let topPosition = D.Serie.indexOf(top);
    let botPosition = D.Serie.indexOf(bot);

    let diff = topPosition - botPosition;
    if(diff < 0){
      diff +=12;
    }
    let pair_idx = diff;
    D.Serie.map((item,index) => {
      result.push({top:D.Serie[pair_idx],bot:D.Serie[index]})
      pair_idx = (pair_idx +1 ) % 12 ;
    });
    this.state = result;
    this.difference = diff;

    this.pairingJiang(isNight)
  }

  /**
   * Methods
   */
  public getSequence():TianDiItem[]{
    return this.state
  }
  public getTop(bot:Zhi){
    return this.state[bot.position].top
  }
  public getJiangByTop(top:Zhi){
    return this.state.find(v=> v.top === top)!.jiang
  }
  public getJiangByBot(bot:Zhi){
    return this.state[bot.position].jiang;
  }
  public getBot(top:Zhi) {
    const item= this.state.find((item) => {
      return item.top === top;
    })
    return (item)? item.bot : undefined;
  }

  public pairingJiang(isNight:boolean){
    const guirenTop = isNight?J.getGuiren(T.JIA)[1]:J.getGuiren(T.JIA)[0]
    const guirenBot = this.getBot(guirenTop)
    const isInverse = this.isInverse(guirenBot!)
    /*
    const jiangList:Jiang[] = []
    for (let i=0;i<12;i++){
      if(isInverse){
        jiangList.push(J.Sequence[i])
      }else{
        jiangList.push(J.Sequence[(-i+12)%12])
      }
    }*/
    const idx = this.state.indexOf(this.state.find(v => v.top === guirenTop)!)

    for(let i=0;i<J.Sequence.length;i++){
      this.state[(idx + i) % 12].jiang = isInverse?J.Sequence[(-i+12)%12] : J.Sequence[i]
    }
  }

  /**
   * 决定贵人顺行或逆行
   * @param bot: 地盘对应位置
   */
  private isInverse(bot:Zhi){
    const pos = bot.position;
    return (pos>5 && pos<=10)?true:false;
  }
}