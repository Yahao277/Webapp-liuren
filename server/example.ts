import {fiveElement as E, getElementRelation} from './../src/core/liuren/elements';
import {DiZhi as D,TianGan as T,Gan,Zhi, GanZhiPair} from './../src/core/liuren/GanZhi';
import LiurenApp from './../src/core/liuren/liuren';
import {SikePair} from './../src/core/liuren/Sike'
import { keysPropsMap } from './global';

console.log('------app------')


const liuren  = new LiurenApp({
  yueJiang:D.HAI,
  hour:D.QU,
  day:{gan:T.DING ,zhi:D.YOU},
  night:true
})



console.log('-----liuren tests-----')


if(T.JIA instanceof Gan){
  console.log('correct type')
}

console.log('-------')
let test:LiurenApp = new LiurenApp({
    yueJiang: D.YIN,
    hour: D.WEI,
    day: {gan:T.YI,zhi:D.YOU},
    night:true
  })


test.sanChuan!.map(item => {
  console.log(item)
})

  /*
let xun:GanZhiPair = {
    gan: T.DING,
    zhi: D.HAI
  }
let day:GanZhiPair = {
  gan:T.XIN,
  zhi:D.MAO
}
let diff = (xun.zhi.position - xun.gan.position + 12) % 12
const getDunGan = (zhi:Zhi,diff:number) => {
  const dun = (zhi.position - diff + 12) % 12
  return T.Serie[dun]?T.Serie[dun]:T.KONG
}
//let diff = (D.SHEN.position - T.JIA.position + 12) % 12
console.log('gan: ' + T.Serie[xun.gan.position].name)
console.log('zhi: ' + D.Serie[xun.zhi.position].name)
console.log(diff)
console.log(T.Serie[(xun.zhi.position - diff + 12) % 12])
console.log(getDunGan(D.WU,diff))
// unique array = test.filter((value, index, self) => self.indexOf(self.find((v) => v.top === value.top)!) === index)
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key]; // Inferred type is T[K]
}
function setProperty<T, K extends keyof T>(obj: T, key: K, value: T[K]) {
  obj[key] = value;
}

*/

