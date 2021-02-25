import * as E from './elements';


export class Jiang{
  name
  position
  constructor(name:string,position:number){
    this.name = name;
    this.position = position;
  }
}

//十二天将 贵人、螣蛇、朱雀、六合、勾陈、青龙、天空、白虎、太常、玄武、 太阴、天后。
// 简称：贵螣朱六勾青空白常玄阴后
export class TianJiang{
  static readonly  GUI = new Jiang('天乙贵人',0);
  static readonly  TENG = new Jiang('腾蛇',1);
  static readonly  ZHU = new Jiang('朱雀',2);
  static readonly  LIU = new Jiang('六合',3);
  static readonly  GOU = new Jiang('勾陈',4);
  static readonly  QING = new Jiang('青龙',5);
  static readonly  KONG = new Jiang('天空',6);
  static readonly  BAI = new Jiang('白虎',7);
  static readonly  CHANG = new Jiang('太常',8);
  static readonly  XUAN = new Jiang('玄武',9);
  static readonly  YIN = new Jiang('太阴',10);
  static readonly  HOU = new Jiang('天后',11);

  /**
   * 起贵人
   * @param item :日干
   * @return 贵人所对应的天盘支:Zhi 
   */
  static getGuiren(item:Gan){
    const a = [DiZhi.CHOU,DiZhi.WEI]
    const b = [DiZhi.ZI,DiZhi.SHEN]
    const c = [DiZhi.HAI,DiZhi.YOU]
    const d = [DiZhi.SI,DiZhi.MAO]
    const e = [DiZhi.WU,DiZhi.YIN]
    const dict = {
      [TianGan.JIA.name]:a,
      [TianGan.WU.name]:a,
      [TianGan.GENG.name]:a,
      [TianGan.YI.name]:b,
      [TianGan.JI.name]:b,
      [TianGan.BING.name]:c,
      [TianGan.DING.name]:c,
      [TianGan.REN.name]:d,
      [TianGan.GUI.name]:d,
      [TianGan.XIN.name]:e
    }
    return dict[item.name]
  }
 
  /**
   * 贵人顺序, 顺行 
   */
  static Sequence:Jiang[] = [
      TianJiang.GUI,
      TianJiang.TENG,
      TianJiang.ZHU,
      TianJiang.LIU,
      TianJiang.GOU,
      TianJiang.QING,
      TianJiang.KONG,
      TianJiang.BAI,
      TianJiang.CHANG,
      TianJiang.XUAN,
      TianJiang.YIN,
      TianJiang.HOU      
    ]
}

// interface Item {}
type TItem = {
  name:string,
  element:E.fiveElement,
  position: number,
  isYang?:boolean //阴阳属性
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
  static readonly JIA:Gan = new Gan({name:'甲',    element:E.fiveElement.MU,   position:0,     isYang:true});
  static readonly YI:Gan = new Gan({name:'乙',      element:E.fiveElement.MU,     position:1,     isYang:false});
  static readonly BING:Gan = new Gan({name:'丙',  element:E.fiveElement.HUO,   position:2,     isYang:true});
  static readonly DING:Gan = new Gan({name:'丁',  element:E.fiveElement.HUO,   position:3,     isYang:false});
  static readonly WU:Gan = new Gan({name:'戊',      element:E.fiveElement.TU,     position:4,     isYang:true});
  static readonly JI:Gan = new Gan({name:'己',      element:E.fiveElement.TU,     position:5,     isYang:false});
  static readonly GENG:Gan = new Gan({name:'庚',  element:E.fiveElement.JIN,   position:6,     isYang:true});
  static readonly XIN:Gan = new Gan({name:'辛',    element:E.fiveElement.JIN,    position:7,     isYang:false});
  static readonly REN:Gan = new Gan({name:'壬',    element:E.fiveElement.SHUI,    position:8,     isYang:true});
  static readonly GUI:Gan = new Gan({name:'癸',    element:E.fiveElement.SHUI,    position:9,     isYang:false});

  static readonly KONG:Gan = new Gan({name:'空亡',    element:E.fiveElement.SHUI,    position:-1,     isYang:false});

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

  static getByName(name:string){

    const dict:{
      [x:string]:Gan
    } = {}

    TianGan.Serie.map(item => {
      let x = item.name
      dict[x]= item 
    })

    return dict[name]
  }
  
}

export class DiZhi{
  static readonly ZI:Zhi = new Zhi({name:'子',    element:E.fiveElement.SHUI,   position:0,     isYang:true});
  static readonly CHOU:Zhi = new Zhi({name:'丑',    element:E.fiveElement.TU,   position:1,     isYang:false});
  static readonly YIN:Zhi = new Zhi({name:'寅',    element:E.fiveElement.MU,   position:2,     isYang:true});
  static readonly MAO:Zhi = new Zhi({name:'卯',    element:E.fiveElement.MU,   position:3,     isYang:false});
  static readonly CHEN:Zhi = new Zhi({name:'辰',    element:E.fiveElement.TU,   position:4,     isYang:true});
  static readonly SI:Zhi =  new Zhi({name:'巳',    element:E.fiveElement.HUO,   position:5,     isYang:false});
  static readonly WU:Zhi =  new Zhi({name:'午',    element:E.fiveElement.HUO,   position:6,     isYang:true});
  static readonly WEI:Zhi = new Zhi ({name:'未',    element:E.fiveElement.TU,   position:7,     isYang:false});
  static readonly SHEN:Zhi = new Zhi({name:'申',    element:E.fiveElement.JIN,   position:8,     isYang:true});
  static readonly YOU:Zhi = new Zhi({name:'酉',    element:E.fiveElement.JIN,   position:9,     isYang:false});
  static readonly QU:Zhi =  new Zhi({name:'戌',    element:E.fiveElement.TU,   position:10,     isYang:true});
  static readonly HAI:Zhi = new Zhi({name:'亥',    element:E.fiveElement.SHUI,   position:11,     isYang:false});

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
      let target = i[1] as Zhi;
      if(row.some((v) => v === item)){
        return target;
      }
    }

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

  static getByName(name:string){

    const dict:{
      [x:string]:Zhi
    } = {}

    DiZhi.Serie.map(item => {
      let x = item.name
      dict[x]= item 
    })

    return dict[name]
  }
  
}
