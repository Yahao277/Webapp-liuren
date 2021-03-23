// 五行 金木水火土

export enum fiveElement{
  SHUI = 'shui',
  MU = 'mu',
  HUO = 'huo',
  TU = 'tu',
  JIN = 'jin'
}

export enum ElementRelation{
  Generate = '子孙', // 生，脱， 子孙
  BeingGenerated = '父母', // 被生，父母
  Restrain = '妻财', // 克， 妻财
  BeingRestrained = '官鬼', // 被克， 官鬼
  None = '兄弟' // 兄弟
}

const elementRelationTable:{
  shui: any,
  mu: any,
  huo: any,
  tu: any,
  jin: any
} = {
  shui:{  shui:ElementRelation.None,
          mu:ElementRelation.Generate,
          huo:ElementRelation.Restrain,
          tu:ElementRelation.BeingRestrained,
          jin:ElementRelation.BeingGenerated,},
          
  mu:{    shui:ElementRelation.BeingGenerated,
          mu:ElementRelation.None,
          huo:ElementRelation.Generate,
          tu:ElementRelation.Restrain,
          jin:ElementRelation.BeingRestrained,},

  huo:{   shui:ElementRelation.BeingRestrained,
          mu:ElementRelation.BeingGenerated,
          huo:ElementRelation.None,
          tu:ElementRelation.Generate,
          jin:ElementRelation.Restrain,},

  tu:{    shui:ElementRelation.Restrain,
          mu:ElementRelation.BeingRestrained,
          huo:ElementRelation.BeingGenerated,
          tu:ElementRelation.None,
          jin:ElementRelation.Generate,},
          
  jin:{   shui:ElementRelation.Generate,
          mu:ElementRelation.Restrain,
          huo:ElementRelation.BeingRestrained,
          tu:ElementRelation.BeingGenerated,
          jin:ElementRelation.None, }
}

const getElementRelation = (src:fiveElement,dst:fiveElement):ElementRelation => {
  return elementRelationTable[src][dst];
}

export { 
  getElementRelation
};


