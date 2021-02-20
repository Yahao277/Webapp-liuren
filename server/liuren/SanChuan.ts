import { getElementRelation,
   fiveElement as E, 
   ElementRelation as R 
  } from "./elements";
import {
  Gan,
  Zhi,
  TianGan as T,
  DiZhi as D
} from './GanZhi'
import Liuren from "./liuren";
import { SikePair } from "./Sike";
import { TianDiState } from "./TianDiState";



// 三传组合
export type SanChuanPair = {
  item: Zhi, // 发用支
  dunGan?: Gan | undefined, // 遁干 或 空亡
  jiang?: string, // 所乘天将
  dayRelation: R // 对应日干的六亲关系
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
class SanChuanCtrl{
  sike;
  state;
  methodHandler:any;
  reducedPairs:SikePair[];
  toTopRestrains:SikePair[];
  toBotRestrains:SikePair[];
  yueJiang
  hour

  public constructor(sike:SikePair[],state:TianDiState,yueJiang:Zhi,hour:Zhi){
    this.state = state;
    this.sike = sike;
    this.methodHandler = null;
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
    //TODO: count only unique pairs
    this.sike.map(item => {
      let topElement = item.top.element;
      let botElement = item.bot.element; 
      if(getElementRelation(topElement,botElement) ===  R.restrain){ // toBotRestrain
        this.toBotRestrains.push(item)
       }else if(getElementRelation(topElement,botElement) === R.beingRestrained){ // toTopRestrain
        this.toTopRestrains.push(item)
       }
    })
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
          break;
        case 3:
          bieze = new MaoxingHandler(null,this);
          initialHandler = new YaokeHandler(bieze,this);
          break;
        case 2:
          fanyin = new MaoxingHandler(null,this);;
          fuyin = new MaoxingHandler(fanyin,this);
          initialHandler = new MaoxingHandler(fuyin,this);
          break;
        default:
          throw new Error("Count pairs error");
          break;
      }
    }
    return initialHandler;

    
    /***  EASY MODE *****
    switch(countPairs){
      case 4:
        maoxing = new MaoxingHandler(null,this);
        yaoke = new YaokeHandler(maoxing,this);
        shehai = new ShehaiHandler(yaoke,this);
        biyong = new BiyongHandler(shehai,this)
        initialHandler = new ZeikeHandler(biyong,this)
        break;
      case 3:
        bieze = new MaoxingHandler(null,this);
        yaoke = new YaokeHandler(bieze,this);
        shehai = new ShehaiHandler(yaoke,this);
        biyong = new BiyongHandler(shehai,this)
        initialHandler = new ZeikeHandler(biyong,this)
        break;
      case 2:
        fanyin = new MaoxingHandler(null,this);;
        fuyin = new MaoxingHandler(fanyin,this);
        bazhuan = new MaoxingHandler(fuyin,this);
        shehai = new ShehaiHandler(bazhuan,this);
        biyong = new BiyongHandler(shehai,this)
        initialHandler = new ZeikeHandler(biyong,this)
        break;
      default:
        throw new Error("Count pairs error");
        break;
    }
    */

  }

  //九宗门
  public nineMethods(){

  }
}

const decideMethod = (sike:SikePair[]) => {

  //(四课 == 4) -> 全,  (四课 < 4) -> 不全
  const countSikePairs = () => {
    let pairs = 4;

    for(let i=0;i<4;i++){
      for(let j=i+1;j<4 && j!==i;j++){
        if(sike[i].bot instanceof Gan){
          //TODO: convert Gan to Zhi:十干寄宫
          // new sikepair 
        }
        if(sike[i].top === sike[i].top){
          pairs -= 1;
        }
      }
    }
    return pairs;
  }

  const countRestrains = () => {
    sike.map(item => {
      let topElement = item.top.element;
      let botElement = item.bot.element; 
      if(getElementRelation(topElement,botElement) ===  R.restrain){ // toBotRestrain
        toBotRestrains.push(item)
       }else if(getElementRelation(topElement,botElement) === R.beingRestrained){ // toTopRestrain
        toTopRestrains.push(item)
       }
    })
  }

  let toTopRestrains:SikePair[] = []; //贼上
  let toBotRestrains:SikePair[] = []; //克下
  let countPairs = countSikePairs();
  countRestrains();
}


abstract class AbstractHandler{
  successor:AbstractHandler|any;
  info;

  public constructor(handler:AbstractHandler|null,info:SanChuanCtrl){
    this.successor = handler;
    this.info = info;
  }

  public setSuccessor(handler:AbstractHandler){
    this.successor = handler;
  }

  public handle():SanChuanPair[]|void{
    if(this.check()){
      return this.use()
    }
    return this.successor.handle();
  }
  
  public abstract check():boolean;
  public abstract use():SanChuanPair[]|void;
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
    let initialPhase = this.usePair?.top;
    let midPhase = this.info.state.getTop(initialPhase!)
    let endPhase = this.info.state.getTop(midPhase)

    let sanChuanData:SanChuanPair[] = [
      {position:0,item:initialPhase!,dayRelation:getElementRelation(this.info.sike[0].bot.element,initialPhase!.element)},
      {position:1,item:midPhase!,    dayRelation:getElementRelation(this.info.sike[0].bot.element,midPhase.element)},
      {position:2,item:endPhase,     dayRelation:getElementRelation(this.info.sike[0].bot.element,endPhase.element)}
    ]
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
    let initialPhase = this.usePair?.top;
    let midPhase = this.info.state.getTop(initialPhase!)
    let endPhase = this.info.state.getTop(midPhase)
    
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
    let initialPhase = this.usePair?.top;
    let midPhase = this.info.state.getTop(initialPhase!)
    let endPhase = this.info.state.getTop(midPhase)
    
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
    let initialPhase = this.usePair?.top;
    let midPhase = this.info.state.getTop(initialPhase!)
    let endPhase = this.info.state.getTop(midPhase)
    
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
    let initialPhase
    let midPhase
    let endPhase
    
    if(dayGanYang){//阳日
      initialPhase = this.info.state.getTop(D.YOU)
      midPhase = this.info.sike[2].top
      endPhase = this.info.sike[0].top
    }else{//阴日
      initialPhase = this.info.state.getBot(D.YOU)
      midPhase = this.info.sike[0].top;
      endPhase = this.info.sike[2].top;
    }
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
    let initialPhase,midPhase,endPhase;
    
    if(dayGanYang){//阳日
      const dayGan = this.info.sike[0].bot
      initialPhase = T.getJiGong(T.getWuhe(dayGan))
      midPhase = this.info.sike[0].top
      endPhase = midPhase
    }else{//阴日
      let dayZhi =  this.info.sike[2].bot
      initialPhase = D.getNextSanhe(dayZhi)
      midPhase = this.info.sike[0].top
      endPhase = midPhase
    }
  }
}

/**
 * 八专
 */
class BazhuanHandler extends AbstractHandler{
  check(){
    const dayGan = this.info.sike[0].bot
    const dayZhi = this.info.sike[2].bot
    if(T.getJiGong(dayGan) === dayZhi){
      return true;
    }
    return false;
  }
  use(){

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

  }
}
