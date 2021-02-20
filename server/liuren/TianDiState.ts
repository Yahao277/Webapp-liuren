import {
  TianGan,
  DiZhi,
  Zhi,
} from './GanZhi'

const serie: TianGan[] = TianGan.Serie
const idx = serie.indexOf(TianGan.DING)
console.log("index serie tiangan: "+ idx)


export type TianDiItem = {
  top: Zhi,
  bot: Zhi,
  jiang?: string
}


export class TianDiState {
  state:TianDiItem[];
  difference:number;

  /**
   * TODO: unit test
   * 算法: 月将加时, 时为地，月将为天
   * twelve diZhiItems, each bot pairs with a top item.
   * @param top Zhi
   * @param bot Zhi
   */
  public constructor(top:Zhi,bot:Zhi){
    let result: TianDiItem[] = [];
    let topPosition = DiZhi.Serie.indexOf(top);
    let botPosition = DiZhi.Serie.indexOf(bot);

    let diff = topPosition - botPosition;
    if(diff < 0){
      diff +=12;
    }
    let pair_idx = diff;
    DiZhi.Serie.map((item,index) => {
      result.push({top:DiZhi.Serie[pair_idx],bot:DiZhi.Serie[index]})
      pair_idx = (pair_idx +1 ) % 12 ;
    });

    this.state = result;
    this.difference = diff;
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
  public getBot(top:Zhi) {
    const item= this.state.find((item) => {
      return item.top === top;
    })
    return (item)? item.bot : undefined;
  }
}