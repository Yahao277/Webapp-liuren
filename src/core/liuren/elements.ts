// 五行 金木水火土
enum fiveElement{
  SHUI = 'shui',
  MU = 'mu',
  HUO = 'huo',
  TU = 'tu',
  JIN = 'jin'
}

enum ElementRelation{
  generate = '生', // 生，脱， 子孙
  beingGenerated = '被生', // 被生，父母
  restrain = '克', // 克， 妻财
  beingRestrained = '被克', // 被克， 官鬼
  none = '兄弟' // 兄弟
}

const elementRelationTable:{
  shui: any,
  mu: any,
  huo: any,
  tu: any,
  jin: any
} = {
  shui:{  shui:ElementRelation.none,
          mu:ElementRelation.generate,
          huo:ElementRelation.restrain,
          tu:ElementRelation.beingRestrained,
          jin:ElementRelation.beingGenerated,},
          
  mu:{    shui:ElementRelation.beingGenerated,
          mu:ElementRelation.none,
          huo:ElementRelation.generate,
          tu:ElementRelation.restrain,
          jin:ElementRelation.beingRestrained,},

  huo:{   shui:ElementRelation.beingRestrained,
          mu:ElementRelation.beingGenerated,
          huo:ElementRelation.none,
          tu:ElementRelation.generate,
          jin:ElementRelation.restrain,},

  tu:{    shui:ElementRelation.restrain,
          mu:ElementRelation.beingRestrained,
          huo:ElementRelation.beingGenerated,
          tu:ElementRelation.none,
          jin:ElementRelation.generate,},
          
  jin:{   shui:ElementRelation.generate,
          mu:ElementRelation.restrain,
          huo:ElementRelation.beingRestrained,
          tu:ElementRelation.beingGenerated,
          jin:ElementRelation.none, }
}

const getElementRelation = (src:fiveElement,dst:fiveElement):ElementRelation => {
  return elementRelationTable[src][dst];
}

export { 
  fiveElement,
  ElementRelation,
  getElementRelation,
};


