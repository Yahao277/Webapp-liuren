import * as E from './elements';


//干支组合， 四柱八字，
export type GanZhiPair = {
  gan:Gan,
  zhi:Zhi
}

//十二天将 贵人、螣蛇、朱雀、六合、勾陈、青龙、天空、白虎、太常、玄武、 太阴、天后。
// 简称：贵螣朱六勾青空白常玄阴后
enum Jiang {
  gui,
  teng,
  zhu,
  liu,
  gou,
  qing,
  bai,
  chang,
  xuan,
  yin,
  hou
}

// interface Item {}
type TItem = {
  name:string,
  element:E.fiveElement,
  position: number,
  isYang?:boolean //阴阳属性
}

// like: class Gan extends Item {}
export type TGan = TItem & {
}

//like: class Zhi extends Item {}
export type TZhi = TItem & {
}

export class Gan{
  name;
  element;
  position;
  isYang;

  public constructor({name,element,position,isYang}:TItem){
    this.name = name;
    this.element = element;
    this.position = position;
    this.isYang = isYang
  }
}

export class Zhi{
  name;
  element;
  position;
  isYang;
  public constructor({name,element,position,isYang}:TItem){
    this.name = name;
    this.element = element;
    this.position = position;
    this.isYang = isYang
  }
}

export class TianGan{
  static readonly JIA:Gan = new Gan({name:'jia',    element:E.fiveElement.MU,   position:0,     isYang:true});
  static readonly YI:Gan = new Gan({name:'yi',      element:E.fiveElement.MU,     position:1,     isYang:false});
  static readonly BING:Gan = new Gan({name:'bing',  element:E.fiveElement.HUO,   position:2,     isYang:true});
  static readonly DING:Gan = new Gan({name:'ding',  element:E.fiveElement.HUO,   position:3,     isYang:false});
  static readonly WU:Gan = new Gan({name:'wu',      element:E.fiveElement.TU,     position:4,     isYang:true});
  static readonly JI:Gan = new Gan({name:'ji',      element:E.fiveElement.TU,     position:5,     isYang:false});
  static readonly GENG:Gan = new Gan({name:'geng',  element:E.fiveElement.JIN,   position:6,     isYang:true});
  static readonly XIN:Gan = new Gan({name:'xin',    element:E.fiveElement.JIN,    position:7,     isYang:false});
  static readonly REN:Gan = new Gan({name:'ren',    element:E.fiveElement.SHUI,    position:8,     isYang:true});
  static readonly GUI:Gan = new Gan({name:'gui',    element:E.fiveElement.SHUI,    position:9,     isYang:false});

  //十干寄宫 Gan space mapping to Zhi space, mapping function
  static getJiGong(item:Gan){
    const dict = {
      [TianGan.JIA.name] : DiZhi.YIN,
      [TianGan.YI.name] : DiZhi.CHEN,
      [TianGan.BING.name] : DiZhi.SI,
      [TianGan.WU.name] : DiZhi.SI,
      [TianGan.DING.name] : DiZhi.WEI,
      [TianGan.JI.name] : DiZhi.WEI,
      [TianGan.GENG.name] : DiZhi.SHEN,
      [TianGan.XIN.name] : DiZhi.QU,
      [TianGan.REN.name] : DiZhi.HAI,
      [TianGan.GUI.name] : DiZhi.CHOU,
    }
    return dict[item.name]
  }

  //天干五合
  static getWuhe(item:Gan){
    const dict = {
      [TianGan.JIA.name] : TianGan.JI,
      [TianGan.YI.name] : TianGan.GENG,
      [TianGan.BING.name] : TianGan.XIN,
      [TianGan.WU.name] : TianGan.GUI,
      [TianGan.DING.name] : TianGan.REN,
      [TianGan.JI.name] : TianGan.JIA,
      [TianGan.GENG.name] : TianGan.YI,
      [TianGan.XIN.name] : TianGan.BING,
      [TianGan.REN.name] : TianGan.DING,
      [TianGan.GUI.name] : TianGan.WU,
    }

    return dict[item.name]
  }

  static Serie:Gan[] = [
      TianGan.JIA,
      TianGan.YI,
      TianGan.BING,
      TianGan.DING,
      TianGan.WU,
      TianGan.JI,
      TianGan.GENG,
      TianGan.XIN,
      TianGan.REN,
      TianGan.GUI
    ]
  
}

export class DiZhi{
  static readonly ZI:Zhi = new Zhi({name:'zi',    element:E.fiveElement.SHUI,   position:0,     isYang:true});
  static readonly CHOU:Zhi = new Zhi({name:'chou',    element:E.fiveElement.TU,   position:1,     isYang:false});
  static readonly YIN:Zhi = new Zhi({name:'yin',    element:E.fiveElement.MU,   position:2,     isYang:true});
  static readonly MAO:Zhi = new Zhi({name:'mou',    element:E.fiveElement.MU,   position:3,     isYang:false});
  static readonly CHEN:Zhi = new Zhi({name:'chen',    element:E.fiveElement.TU,   position:4,     isYang:true});
  static readonly SI:Zhi =  new Zhi({name:'si',    element:E.fiveElement.HUO,   position:5,     isYang:true});
  static readonly WU:Zhi =  new Zhi({name:'wu',    element:E.fiveElement.HUO,   position:6,     isYang:false});
  static readonly WEI:Zhi = new Zhi ({name:'wei',    element:E.fiveElement.TU,   position:7,     isYang:false});
  static readonly SHEN:Zhi = new Zhi({name:'shen',    element:E.fiveElement.JIN,   position:8,     isYang:true});
  static readonly YOU:Zhi = new Zhi({name:'you',    element:E.fiveElement.JIN,   position:9,     isYang:false});
  static readonly QU:Zhi =  new Zhi({name:'qu',    element:E.fiveElement.TU,   position:10,     isYang:true});
  static readonly HAI:Zhi = new Zhi({name:'hai',    element:E.fiveElement.SHUI,   position:11,     isYang:false});

  /**
   * 地支三合局中下一个支,
   */
  static getNextSanhe(item:Zhi){
    let shui = [DiZhi.SHEN,DiZhi.ZI,DiZhi.CHEN]
    let huo = [DiZhi.YIN,DiZhi.WU,DiZhi.QU];
    let jin = [DiZhi.SI,DiZhi.YOU,DiZhi.CHOU];
    let mu = [DiZhi.HAI,DiZhi.MAO,DiZhi.WEI];
    let targetItemSet;
    let target;

    for (let value of [shui,huo,jin,mu]){
      if(value.find((it) => it == item)){
        targetItemSet = value;
        break;
      }
    }

    if(targetItemSet !== undefined){
      target = targetItemSet[(targetItemSet.indexOf(item) + 1) % targetItemSet.length];
    }
    return target;
  }

  //孟神 寅，巳，申，亥
  static isMeng(item:Zhi){
    let mengSet = [DiZhi.YIN,DiZhi.SI,DiZhi.SHEN,DiZhi.HAI]
    return mengSet.some(u=> u === item)
  }
  //仲神 卯，午，酉，子
  static isZong(item:Zhi){
    let zongSet = [DiZhi.MAO,DiZhi.WU,DiZhi.YOU,DiZhi.ZI]
    return zongSet.some(u=> u === item)
  }
  //季神 辰，未，戌，丑
  static isJi(item:Zhi){
    let jiSet = [DiZhi.CHEN,DiZhi.WEI,DiZhi.WU,DiZhi.CHOU]
    return jiSet.some(u=> u === item)
  }

  //刑神
  static getXingShen(item:Zhi){
    const dict = {
      [DiZhi.ZI.name]: DiZhi.MAO,
      [DiZhi.CHOU.name]: DiZhi.QU,
      [DiZhi.YIN.name]: DiZhi.SI,
      [DiZhi.MAO.name]: DiZhi.ZI,
      [DiZhi.CHEN.name]: DiZhi.CHEN,
      [DiZhi.SI.name]:DiZhi.SHEN,
      
      [DiZhi.WU.name]:DiZhi.WU,
      [DiZhi.WEI.name]: DiZhi.CHOU,
      [DiZhi.SHEN.name]: DiZhi.YIN,
      [DiZhi.YOU.name]: DiZhi.YOU,
      [DiZhi.QU.name]: DiZhi.WEI,
      [DiZhi.HAI.name]: DiZhi.HAI,
    }
    return dict[item.name]
  }

  //冲神
  static getChongShen(item:Zhi){
    const dict = {
      [DiZhi.ZI.name]: DiZhi.WU,
      [DiZhi.CHOU.name]: DiZhi.WEI,
      [DiZhi.YIN.name]: DiZhi.SHEN,
      [DiZhi.MAO.name]: DiZhi.YOU,
      [DiZhi.CHEN.name]: DiZhi.QU,
      [DiZhi.SI.name]:DiZhi.HAI,

      [DiZhi.WU.name]:DiZhi.ZI,
      [DiZhi.WEI.name]: DiZhi.CHOU,
      [DiZhi.SHEN.name]: DiZhi.YIN,
      [DiZhi.YOU.name]: DiZhi.MAO,
      [DiZhi.QU.name]: DiZhi.CHEN,
      [DiZhi.HAI.name]: DiZhi.SI,
    }

    return dict[item.name]
  }

  /**
   *   驿马星
   */
  static getYima(item:Zhi){
    const array = [
      [[DiZhi.SI,DiZhi.YOU,DiZhi.CHOU], DiZhi.HAI],
      [[DiZhi.HAI,DiZhi.MAO,DiZhi.WEI], DiZhi.SI],
      [[DiZhi.SHEN,DiZhi.ZI,DiZhi.CHEN],DiZhi.YIN],
      [[DiZhi.YIN,DiZhi.WU,DiZhi.QU],   DiZhi.SHEN],
    ]
    for(let i of array) {
      let row = i[0] as Zhi[];
      let target = i[1];
      if(row.some((v) => v === item)){
        return target;
      }
    }

  }

  static getGuiren(isNight:boolean){

  }
  
  //Sequence
  static Serie:Zhi[] = [
      DiZhi.ZI,
      DiZhi.CHOU,
      DiZhi.YIN,
      DiZhi.MAO,
      DiZhi.CHEN,
      DiZhi.SI,
      DiZhi.WU,
      DiZhi.WEI,
      DiZhi.SHEN,
      DiZhi.YOU,
      DiZhi.QU,
      DiZhi.HAI
    ]
  
}

//console.log(DiZhi.ZI)



//---- combined types ------




// -----------------------------
// Declare constants


/**  tests
console.log('-------')
console.log(makeTianDiState('mou','mou')) // 3 : 3, top = bot
console.log('-------')
console.log(makeTianDiState('mou','zi')) // 3: 1, top > bot
console.log('-------')
console.log(makeTianDiState('mou','shen')) // 3:11, top < bot
*/

