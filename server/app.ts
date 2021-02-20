import {fiveElement as E, getElementRelation} from './liuren/elements';
import {DiZhi as D,TianGan as T,Gan,Zhi} from './liuren/GanZhi';
import LiurenApp from './liuren/liuren';
import {SikePair} from './liuren/Sike'
import './global'
import { keysPropsMap } from './global';

console.log('------app------')


type IElement = {
  name:string,
  position:number
}

class Element{

  private _name:string
  private position:number

  public constructor(obj:IElement = {name:'shui',position:0}){
    this._name = obj.name;
    this.position = obj.position;
  }

  set name(n:string){ this._name = n;}
  get name() {return this._name;}

  public getObj(): IElement{
    return{
      name:this.name,
      position:this.position
    }
  }
}

const huo = new Element({name:'huo',position:2});
const shui = new Element();


const liuren  = new LiurenApp({
  yueJiang:D.HAI,
  hour:D.QU,
  day:{gan:T.DING ,zhi:D.YOU}
})



console.log('-----liuren tests-----')

let sike = liuren.sike
sike.forEach(item => {
  console.log(item)
})

let uniquePairs = [...new Set(sike.map(item => item.top))]
uniquePairs.map(i => {
  console.log(i)
})

type Ex = {
  0:string,
  1:string,
  2:string
}

const objecte:{
  [x:string]:string
} = {
  ['a']:'abc',
  ['b']:'def',
  ['c']:'123'
}



function t1(){
  const obj2 = [
  [['a','t','z'],'abc'],
  [['b','n','x'],'def'],]

  for (let i of obj2){
    let v = i[0] as string[]

    if(v.some((x) => x === 'a')){
      return i[1];
    }
  }

}



let key:string = 'c'

console.log(t1())

let item:SikePair = {
  top: D.WU,
  bot: T.JIA,
  position:0
}



if(T.JIA instanceof Zhi){
  console.log('correct type')
}



function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key]; // Inferred type is T[K]
}
function setProperty<T, K extends keyof T>(obj: T, key: K, value: T[K]) {
  obj[key] = value;
}



