import { getElementRelation,
   fiveElement as E, 
   ElementRelation as R 
  } from "./elements";
import {
  Gan,
  Zhi,
  TianGan as T,
  DiZhi as D,
  Jiang
} from './GanZhi'
import Liuren from "./liuren";
import { TianDiState } from "./TianDiState";



// 三传组合
export type SanChuanPair = {
  item: Zhi, // 发用支
  dunGan?: Gan | undefined, // 遁干 或 空亡
  jiang?: Jiang, // 所乘天将
  dayRelation?: R // 对应日干的六亲关系
  position: number, // 0:初 , 1:中 , 2:末
}

type InfoParams ={
  sike:SikePair[],
  state:TianDiState,
  yueJiang:Zhi,
  hour:Zhi
}

//JiuZongMen
//九宗门
// SanChuanController
export class SanChuanCtrl{
  sike;
  state;
  reducedPairs:SikePair[];
  toTopRestrains:SikePair[];
  toBotRestrains:SikePair[];
  yueJiang
  hour

  public constructor(sike:SikePair[],state:TianDiState,yueJiang:Zhi,hour:Zhi){
    this.state = state;
    this.sike = sike;
    this.reducedPairs = [];
    this.toTopRestrains = [];
    this.toBotRestrains = [];
    this.yueJiang = yueJiang;
    this.hour = hour;

  }

  /**
   * Count all unique sike pairs, TODO:reduce all repeated pairs.
   */
  countPairs(){
    let pairs = 4;

    for(let i=0;i<4;i++){
      for(let j=i+1;j<4 && j!==i;j++){
        if(this.sike[i].top === this.sike[j].top){
          pairs -= 1;
        }
      }
    }
    return pairs;
  }
  
  countRestrains(){
    this.sike.map(item => {
      let topElement = item.top.element;
      let botElement = item.bot.element; 
      if(getElementRelation(topElement,botElement) ===  R.restrain){ // toBotRestrain
        this.toBotRestrains.push(item)
       }else if(getElementRelation(topElement,botElement) === R.beingRestrained){ // toTopRestrain
        this.toTopRestrains.push(item)
       }
    })

    // get unique pairs
    this.toTopRestrains = this.toTopRestrains.filter((value, index, self) => self.indexOf(self.find((v) => v.top === value.top)!) === index)
    this.toBotRestrains = this.toBotRestrains.filter((value, index, self) => self.indexOf(self.find((v) => v.top === value.top)!) === index)

  }

  decideMethod():AbstractHandler{
    let countPairs = this.countPairs();
    this.countRestrains();

    const haveRestrain:boolean = (this.toTopRestrains.length > 0 || this.toBotRestrains.length > 0)?true:false;

    //Chain of resposibility
    let fanyin;
    let fuyin;
    let bazhuan;
    let bieze;
    let maoxing;
    let yaoke;
    let shehai;
    let biyong
    let zeike;
    let initialHandler;

    //Chain in case having restrains
    if(haveRestrain){
      shehai = new ShehaiHandler(yaoke?yaoke:null,this);
      biyong = new BiyongHandler(shehai,this)
      initialHandler = new ZeikeHandler(biyong,this);

    }else{
      //chain in case of no restrains
      switch(countPairs){
        case 4:
          maoxing = new MaoxingHandler(null,this);
          initialHandler = new YaokeHandler(maoxing,this);
          if(D.getChongShen(this.yueJiang) === this.hour){
            initialHandler = new FanyinHandler(null,this)
          }
          break;
        case 3:
          bieze = new BiezeHandler(null,this);
          initialHandler = new YaokeHandler(bieze,this);
          break;
        case 2:
          initialHandler = new BazhuanHandler(null,this);
          break;
        case 1:
          initialHandler = new FuyinHandler(null,this);
          break;
        default:
          throw new Error("Count pairs error");
          break;
      }
    }

    if(this.yueJiang === this.hour){
      initialHandler = new FuyinHandler(null,this);
    }

    return initialHandler;
  }
}

/**
 * Nine methods: 九宗门
 */

abstract class AbstractHandler{
  successor:AbstractHandler|any;
  initialPhase?:Zhi;
  midPhase?:Zhi;
  endPhase?:Zhi;
  info;

  public constructor(handler:AbstractHandler|null,info:SanChuanCtrl){
    this.successor = handler;
    this.info = info;
  }

  public setSuccessor(handler:AbstractHandler){
    this.successor = handler;
  }

  public handle():SanChuanPair[]|null{
    if(this.check()){
      return this.use()
    }
    return this.successor.handle();
  }
  
  public abstract check():boolean;
  public abstract use():SanChuanPair[]|null;

  public putComplements(): SanChuanPair[]{ 
    const testing = false;
    if(testing){
      return [
        {item:this.initialPhase!,position:0},
        {item:this.midPhase!,position:1},
        {item:this.endPhase!,position:2}
      ]
    }
    
    // 天将，六亲，遁干
    // 计算 六旬中的哪一旬
    let diff = (this.info.sike[2].bot.position - this.info.sike[0].bot.position + 12) % 12 
    const getDunGan = (zhi:Zhi,diff:number) => {
      const dun = (zhi.position - diff + 12) % 12
      return T.Serie[dun]?T.Serie[dun]:T.KONG
    }
    const dayElement = this.info.sike[0].bot.element     

    return [
        {item:this.initialPhase!,position:0,
          jiang:this.info.state.getJiangByTop(this.initialPhase!),
          dayRelation:getElementRelation(dayElement,this.initialPhase!.element),
          dunGan: getDunGan(this.initialPhase!,diff)
        },
        {item:this.midPhase!,position:1,
          jiang:this.info.state.getJiangByTop(this.midPhase!),
          dayRelation:getElementRelation(dayElement,this.midPhase!.element),
          dunGan: getDunGan(this.midPhase!,diff)
        },
        {item:this.endPhase!,position:2,
          jiang:this.info.state.getJiangByTop(this.endPhase!),
          dayRelation:getElementRelation(dayElement,this.endPhase!.element),
          dunGan: getDunGan(this.endPhase!,diff)
        }
    ]

  }
}

/**
 * 贼克
 */
class ZeikeHandler extends AbstractHandler{
  usePair:SikePair|null;

  constructor(handler:AbstractHandler|null,info:SanChuanCtrl){
    super(handler,info);
    this.usePair = null;
  }

  check(){

    if(this.info.toTopRestrains.length === 1){
      this.usePair = this.info.toTopRestrains[0];
      return true;

    }else if (this.info.toTopRestrains.length > 1){
      this.info.reducedPairs = this.info.toTopRestrains;
      return false;

    }else if(this.info.toBotRestrains.length === 1){
      this.usePair = this.info.toBotRestrains[0];
      return true;

    }else if(this.info.toBotRestrains.length > 1){
      this.info.reducedPairs = this.info.toBotRestrains;
      return false;
    }
    return false;
  }
  use(){
    this.initialPhase = this.usePair?.top;
    this.midPhase = this.info.state.getTop(this.initialPhase!)
    this.endPhase = this.info.state.getTop(this.midPhase)

    return this.putComplements();
  }

}

/**
 * 比用
 */
class BiyongHandler extends AbstractHandler{
  usePair:SikePair|null;

  constructor(handler:AbstractHandler|null,info:SanChuanCtrl){
    super(handler,info);
    this.usePair = null;
  }

  check(){
    let isDayYang = this.info.sike[0].bot.isYang; // sike[0].bot is dayGan(日干)
    let countPairs = 0; // count the same yinyang type to dayGan
    let newReducedPairs:SikePair[] = []

    this.info.reducedPairs.forEach(item => {
      if(item.top.isYang === isDayYang){
        countPairs += 1;
        this.usePair = item;
        newReducedPairs.push(item);
      }
    })

    if(countPairs !== 1){
      this.info.reducedPairs = newReducedPairs;
      return false;
    }else if(countPairs === 1){
      return true;
    }else{
      return false;
    }

  }

  use(){
    this.initialPhase = this.usePair?.top;
    this.midPhase = this.info.state.getTop(this.initialPhase!)
    this.endPhase = this.info.state.getTop(this.midPhase)

    return this.putComplements();
  }
}

/**
 * 涉害
 */
class ShehaiHandler extends AbstractHandler{
  usePair:SikePair|null;

  constructor(handler:AbstractHandler|null,info:SanChuanCtrl){
    super(handler,info);
    this.usePair = null;
  }

  check(){
    let meng;
    let zong;
    let ji;
    let ret = false;

    this.info.reducedPairs.map(item => {
      let bot = (item.bot instanceof Gan)?T.getJiGong(item.bot):item.bot; 
      if(D.isMeng(bot)){
        meng = item;
      }else if(D.isZong(bot)){
        zong = item;
      }else if(D.isJi(bot)){
        ji = item;
      }
    })

    if(meng){
      ret = true;
      this.usePair = meng;
    }else if(zong){
      ret = true;
      this.usePair = zong;
    }else if(ji){
      ret = true;
      this.usePair = ji;
    }

    return ret;
  }
  use(){
    this.initialPhase = this.usePair?.top;
    this.midPhase = this.info.state.getTop(this.initialPhase!)
    this.endPhase = this.info.state.getTop(this.midPhase)
    
    return this.putComplements();
  }
}

/**
 * 遥克
 */
class YaokeHandler extends AbstractHandler{
  usePair:SikePair|null;

  constructor(handler:AbstractHandler|null,info:SanChuanCtrl){
    super(handler,info);
    this.usePair = null;
  }

  check(){
    let dayGanElement = this.info.sike[0].bot.element;
    let pairs:SikePair[] = []
    let useTop = false;

    //蒿矢课
    this.info.sike.map(item => {
      let topElement = item.top.element;
      if(getElementRelation(topElement,dayGanElement) === R.restrain){
        useTop = true;
        pairs.push(item);
      }
    });

    //弹射课
    if(!useTop){
      this.info.sike.map(item => {
        let topElement = item.top.element;
        if(getElementRelation(topElement,dayGanElement) === R.beingRestrained){
          pairs.push(item);
        }
      });
    }


    if(pairs.length  === 1){
      this.usePair = pairs[0]
      return true;
    }else if(pairs.length > 1){
      //比用
      let isDayYang = this.info.sike[0].bot.isYang; // sike[0].bot is dayGan(日干)
      for (let item of pairs){
        if(item.top.isYang === isDayYang){
          this.usePair = item;
          break;
        }
      }
      if(this.usePair){ return true;}

      //TODO: 涉害in遥克
    }

    return false;
  }
  use(){
    this.initialPhase = this.usePair?.top;
    this.midPhase = this.info.state.getTop(this.initialPhase!)
    this.endPhase = this.info.state.getTop(this.midPhase)
    
    return this.putComplements();
  }
}

/**
 * 昴星
 */
class MaoxingHandler extends AbstractHandler{

  check(){
    // When we don't use previous methods, default is 昴星
    return true;
  }
  use(){
    const dayGanYang = this.info.sike[0].bot.isYang
    this.initialPhase
    this.midPhase
    this.endPhase
    
    if(dayGanYang){//阳日
      this.initialPhase = this.info.state.getTop(D.YOU)
      this.midPhase = this.info.sike[2].top
      this.endPhase = this.info.sike[0].top
    }else{//阴日
      this.initialPhase = this.info.state.getBot(D.YOU)
      this.midPhase = this.info.sike[0].top;
      this.endPhase = this.info.sike[2].top;
    }

    return this.putComplements();
  }
}

/**
 * 别责
 */
class BiezeHandler extends AbstractHandler{
  check(){
    // In case of only three unique sikepairs, and doesn't meets the conditions to use zeike(贼克) or yaoke (遥克), the default method is 别责
    return true;
  }
  use(){
    const dayGanYang = this.info.sike[0].bot.isYang
    
    if(dayGanYang){//阳日 日干合 
      const dayGan = this.info.sike[0].bot
      this.initialPhase = this.info.state.getTop(T.getJiGong(T.getWuhe(dayGan)))
      this.midPhase = this.info.sike[0].top
      this.endPhase = this.midPhase
    }else{//阴日 日支三合
      let dayZhi =  this.info.sike[2].bot
      this.initialPhase = D.getNextSanhe(dayZhi)
      this.midPhase = this.info.sike[0].top
      this.endPhase = this.midPhase
    }

    return this.putComplements();
  }
}

/**
 * 八专
 */
class BazhuanHandler extends AbstractHandler{
  check(){
    const dayGan = this.info.sike[0].bot
    const dayZhi = this.info.sike[2].bot
    //有克

    //无克
    if(T.getJiGong(dayGan) === dayZhi){
      return true;
    
    }
    return false;
  }
  use(){
    const dayGan = this.info.sike[0].bot
    const isDayYang = dayGan.isYang
    let diff = 2;

    //无克
    if(isDayYang){    //刚日 干上神 前二辰
      let use = this.info.sike[0].top
      let next_pos = (use.position + 2) % 12;
      this.initialPhase = D.Serie[next_pos]
      this.midPhase = use;
      this.endPhase = use;
    }else{    //柔日 第四课天盘 后二辰
      let use = this.info.sike[3].top
      let prev_pos = (use.position + (-2+12)) % 12;
      this.initialPhase = D.Serie[prev_pos]
      this.midPhase = this.info.sike[0].top;
      this.endPhase = this.midPhase;
    }

    return this.putComplements();
  }
}

/**
 * 伏吟
 */
class FuyinHandler extends AbstractHandler{
  check(){
    if(this.info.yueJiang == this.info.hour){
      return true;
    }
    return false;
  }
  use(){
    const isDayYang = this.info.sike[0].bot.isYang;

    //Special cases
    switch(this.info.sike[0].bot){
      case T.GUI: //癸寄丑宫
          this.initialPhase = this.info.sike[0].top
          this.midPhase = this.selectMidShen(this.initialPhase!)
          this.endPhase = this.selectEndShen(this.midPhase!)
        break;
      case T.YI: //乙寄辰宫
          this.initialPhase = this.info.sike[0].top
          this.midPhase = this.info.sike[2].top
          this.endPhase = this.selectEndShen(this.midPhase!)
        break;
      default:
        if(isDayYang){
          this.initialPhase = this.info.sike[0].top
          this.midPhase = this.selectMidShen(this.initialPhase!)
          this.endPhase = this.selectEndShen(this.midPhase!)
        }else{
          this.initialPhase = this.info.sike[2].top
          this.midPhase = this.selectMidShen(this.initialPhase!)
          this.endPhase = this.selectEndShen(this.midPhase!)
        }
        break;
    }

    return this.putComplements();
  }

  private selectEndShen(item:Zhi){
    //有刑取刑，自刑取冲
    let xingShen = D.getXingShen(item) === item ? D.getChongShen(item) : D.getXingShen(item)
    return xingShen;
  }
  private selectMidShen(item:Zhi){
    return D.getXingShen(item) === item ? this.info.sike[2].top : D.getXingShen(item)
  }
}

/**
 * 返吟
 */
class FanyinHandler extends AbstractHandler{
  check(){
    if(D.getChongShen(this.info.yueJiang) === this.info.hour){
      return true;
    }else{
      throw new Error("End of chain and still no method has been used")
      return false;
    }
  }
  use(){
    const dayZhi = this.info.sike[2].bot
    this.initialPhase = D.getYima(dayZhi)
    this.midPhase = this.info.sike[2].top
    this.endPhase = this.info.sike[0].top

    return this.putComplements();
  }
}
