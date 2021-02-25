import { TianGan as T, DiZhi as D, Gan, Zhi } from "./../core/liuren/GanZhi";


test('十干寄宫',() => {
  /**
   * 
   */
  expect(T.getJiGong(T.JIA)).toEqual(D.YIN)
  expect(T.getJiGong(T.GENG)).toEqual(D.SHEN)
  expect(T.getJiGong(T.GUI)).toEqual(D.CHOU)
})

test('天干五合',()=>{
  /**
   * 
   */
  expect(T.getWuhe(T.JIA)).toEqual(T.JI)
  expect(T.getWuhe(T.GENG)).toEqual(T.YI)
  expect(T.getWuhe(T.GUI)).toEqual(T.WU)
})

test('地支三合局', () => {
  expect(D.getNextSanhe(D.SHEN)).toEqual(D.ZI)
  expect(D.getNextSanhe(D.QU)).toEqual(D.YIN)
  expect(D.getNextSanhe(D.YOU)).toEqual(D.CHOU)
  expect(D.getNextSanhe(D.MAO)).toEqual(D.WEI)
})

test('mengzhongji', () => {
  expect(D.isMeng(D.YIN)).toEqual(true)
  expect(D.isMeng(D.ZI)).toEqual(false)
  expect(D.isZong(D.YOU)).toEqual(true)
  expect(D.isJi(D.SHEN)).toEqual(false)
})

test('刑神', () => {
  expect(D.getXingShen(D.SHEN)).toEqual(D.YIN)
  expect(D.getXingShen(D.WU)).toEqual(D.WU)
  expect(D.getXingShen(D.YOU)).toEqual(D.YOU)
  expect(D.getXingShen(D.MAO)).toEqual(D.ZI)
})

test('冲神',() => {
  expect(D.getChongShen(D.CHEN)).toEqual(D.QU)
  expect(D.getChongShen(D.QU)).toEqual(D.CHEN)
  expect(D.getChongShen(D.HAI)).toEqual(D.SI)
  expect(D.getChongShen(D.WU)).toEqual(D.ZI)
})

//TODO: 驿马星，贵人歌诀