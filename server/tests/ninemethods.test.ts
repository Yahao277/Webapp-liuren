import Liuren from '../core/liuren/liuren'
import { TianGan as T, DiZhi as D, Zhi, Gan } from "../core/liuren/GanZhi";



//九宗门
test('贼克，比用，涉害',() => {
  let liuren = new Liuren({
    yueJiang: D.YIN,
    hour:D.CHEN,
    day:{gan:T.XIN,zhi:D.WEI},
    night:true
  }).testSanChuan
  expect(liuren).toEqual([
    {item:D.WU,position:0},
    {item:D.CHEN,position:1},
    {item:D.YIN,position:2}
  ])

  expect(new Liuren({
    yueJiang: D.MAO,
    hour: D.SHEN,
    day: {gan:T.BING,zhi:D.SHEN},
    night:true
  }).testSanChuan).toEqual([
    {item:D.QU,position:0},
    {item:D.SI,position:1},
    {item:D.ZI,position:2}
  ])

  expect(new Liuren({
    yueJiang: D.WEI,
    hour: D.ZI,
    day: {gan:T.BING,zhi:D.QU},
    night:true
  }).testSanChuan).toEqual([
    {item:D.ZI,position:0},
    {item:D.WEI,position:1},
    {item:D.YIN,position:2}
  ])

  expect(new Liuren({
    yueJiang: D.YIN,
    hour: D.WEI,
    day: {gan:T.YI,zhi:D.YOU},
    night:true
  }).testSanChuan).toEqual([
    {item:D.HAI,position:0},
    {item:D.WU,position:1},
    {item:D.CHOU,position:2}
  ])

  expect(new Liuren({
    yueJiang:D.ZI,
    hour:D.QU,
    day:{gan:T.JIA,zhi:D.SHEN},
    night:true
  }).testSanChuan).toEqual([
    {item:D.CHEN,position:0},
    {item:D.WU,position:1},
    {item:D.SHEN,position:2}
  ])

})

test('4 - 遥克',() => {
  expect(new Liuren({
    yueJiang:D.SI,
    hour:D.SHEN,
    day:{gan:T.JIA,zhi:D.CHEN},
    night:true
  }).testSanChuan).toEqual([
    {item:D.SHEN,position:0},
    {item:D.SI,position:1},
    {item:D.YIN,position:2}
  ])

    expect(new Liuren({
    yueJiang:D.CHEN,
    hour:D.CHOU,
    day:{gan:T.GENG,zhi:D.QU},
    night:true
  }).testSanChuan).toEqual([
    {item:D.YIN,position:0},
    {item:D.SI,position:1},
    {item:D.SHEN,position:2}
  ])

})

test('5 - 昴星', () => {
  expect(new Liuren({
    yueJiang:D.CHEN,
    hour:D.MAO,
    day:{gan:T.WU,zhi:D.SHEN},
    night:true
  }).testSanChuan).toEqual([
    {item:D.QU,position:0},
    {item:D.YOU,position:1},
    {item:D.WU,position:2}
  ])
})

test('6 - 别责', () => {
  expect(new Liuren({
    yueJiang:D.WEI,
    hour:D.ZI,
    day:{gan:T.XIN,zhi:D.SI},
    night:true
  }).testSanChuan).toEqual([
    {item:D.WEI,position:0},
    {item:D.YIN,position:1},
    {item:D.YOU,position:2}
  ])

  expect(new Liuren({
    yueJiang:D.SI,
    hour:D.WEI,
    day:{gan:T.JI,zhi:D.YOU},
    night:true
  }).testSanChuan).toEqual([
    {item:D.MAO,position:0},
    {item:D.CHOU,position:1},
    {item:D.HAI,position:2}
  ])

  expect(new Liuren({
    yueJiang:D.SHEN,
    hour:D.WEI,
    day:{gan:T.WU,zhi:D.WU},
    night:true
  }).testSanChuan).toEqual([
    {item:D.YIN,position:0},
    {item:D.WU,position:1},
    {item:D.WU,position:2}
  ]) // Incorrect test

  expect(new Liuren({
    yueJiang:D.WEI,
    hour:D.CHEN,
    day:{gan:T.XIN,zhi:D.CHOU},
    night:true
  }).testSanChuan).toEqual([
    {item:D.SI,position:0},
    {item:D.CHOU,position:1},
    {item:D.CHOU,position:2}
  ])

})

test('7 - 八专',() => {
  expect(new Liuren({
    yueJiang:D.MAO,
    hour:D.HAI,
    day:{gan:T.JI,zhi:D.WEI},
    night:true
  }).testSanChuan).toEqual([
    {item:D.HAI,position:0},
    {item:D.MAO,position:1},
    {item:D.WEI,position:2}
  ])
  expect(new Liuren({
    yueJiang:D.YIN,
    hour:D.HAI,
    day:{gan:T.GENG,zhi:D.SHEN},
    night:true
  }).testSanChuan).toEqual([
    {item:D.CHOU,position:0},
    {item:D.HAI,position:1},
    {item:D.HAI,position:2}
  ])

  expect(new Liuren({
    yueJiang:D.MAO,
    hour:D.SI,
    day:{gan:T.JI,zhi:D.WEI},
    night:true
  }).testSanChuan).toEqual([
    {item:D.CHOU,position:0},
    {item:D.SI,position:1},
    {item:D.SI,position:2}
  ])
})

test('8 - 伏吟', () => {
  expect(new Liuren({
    yueJiang:D.CHOU,
    hour:D.CHOU,
    day:{gan:T.GUI,zhi:D.CHOU},
    night:true
  }).testSanChuan).toEqual([
    {item:D.CHOU,position:0},
    {item:D.QU,position:1},
    {item:D.WEI,position:2}
  ])

  expect(new Liuren({
    yueJiang:D.WEI,
    hour:D.WEI,
    day:{gan:T.YI,zhi:D.WEI},
    night:true
  }).testSanChuan).toEqual([
    {item:D.CHEN,position:0},
    {item:D.WEI,position:1},
    {item:D.CHOU,position:2}
  ])

  expect(new Liuren({
    yueJiang:D.CHEN,
    hour:D.CHEN,
    day:{gan:T.JIA,zhi:D.CHEN},
    night:true
  }).testSanChuan).toEqual([
    {item:D.YIN,position:0},
    {item:D.SI,position:1},
    {item:D.SHEN,position:2}
  ])

  expect(new Liuren({
    yueJiang:D.QU,
    hour:D.QU,
    day:{gan:T.REN,zhi:D.QU},
    night:true
  }).testSanChuan).toEqual([
    {item:D.HAI,position:0},
    {item:D.QU,position:1},
    {item:D.WEI,position:2}
  ])
})

test('9 - 返吟', () => {
  expect(new Liuren({
    yueJiang:D.CHEN,
    hour:D.QU,
    day:{gan:T.JIA,zhi:D.CHEN},
    night:true
  }).testSanChuan).toEqual([
    {item:D.YIN,position:0},
    {item:D.SHEN,position:1},
    {item:D.YIN,position:2}
  ])

  expect(new Liuren({
    yueJiang:D.ZI,
    hour:D.WU,
    day:{gan:T.WU,zhi:D.ZI},
    night:true
  }).testSanChuan).toEqual([
    {item:D.WU,position:0},
    {item:D.ZI,position:1},
    {item:D.WU,position:2}
  ]) // Incorrect test

  expect(new Liuren({
    yueJiang:D.WEI,
    hour:D.CHOU,
    day:{gan:T.XIN,zhi:D.WEI},
    night:true
  }).testSanChuan).toEqual([
    {item:D.SI,position:0},
    {item:D.CHOU,position:1},
    {item:D.CHEN,position:2}
  ])
})