import * as actionTypes from "./actionTypes"
import axios from "axios";
import { Jiang,Zhi,Gan,TianJiang as J,DiZhi as D,TianGan as T  } from './../core/liuren/GanZhi';
import Liuren from '../core/liuren/liuren'

let nextId = 0;

export function createRecord(item: ILiuren) {
  const action: LiurenAction = {
    type: actionTypes.CREATE_RECORD,
    payload:{
      ...item,
      id: ++nextId
    },
  }
  return action
}


/**
 * Save data
 */
export function requestSave(item:ILiuren,dispatch:DispatchType){
  axios.post('http://localhost:8080/api/record',{
    title: item.title,
    description: item.description,
    yueJiang: item.yueJiang,
    hour: item.hour,
    dayZhi: item.dayZhi,
    dayGan: item.dayGan,
    night: item.content.isNight
  }).then(response =>{
    console.log(response.data)
    dispatch(saveRecordSuccess(item))
  }).catch(e => {throw new Error(e)})
}

export function saveRecordSuccess(item: ILiuren) {
  const action: LiurenAction = {
    type: actionTypes.SAVE_RECORD,
    payload:{
      ...item,
      status:"saved"
    }
  }
  return action
}

/**
 * Delete data
 */
export function requestDelete(item:ILiuren,dispatch:DispatchType){
  axios.delete('http://localhost:8080/api/record/' + item._id)
  .then(response => {
    console.log(response.data)
    dispatch(deleteRecordSuccess(item))
  })
  .catch(e => {throw new Error(e)})
}

export function deleteRecordSuccess(item: ILiuren):LiurenAction {
  return {
    type: actionTypes.DELETE_RECORD,
    payload:{
      ...item,
      status:"deleted"}
  } 
} 




/**
 * Fetch data
 */
export function fetchData(dispatch:DispatchType){
    axios.get('http://localhost:8080/api/records').then(response => response.data)
    .then(data => {
      let result:ILiuren[] = data.result.map((item:any,index:number) => ({
          id: index,
          _id:item._id,
          content: new Liuren({
            yueJiang: D.getByName(item.yueJiang),
            hour: D.getByName(item.hour),
            day: {gan:T.getByName(item.dayGan),zhi:D.getByName(item.dayZhi)},
            night: item.night}),
          yueJiang: item.yueJiang,
          hour: item.hour,
          dayGan: item.dayGan,
          dayZhi: item.dayZhi,
          status: "saved",
          title: item.title
      }))
      console.log(result)
      dispatch(fetchSuccess(result))
    }).catch(error => {throw new Error(error)})
}

export function fetchSuccess(item:ILiuren[]) {
  const action: LiurenAction = {
    type: actionTypes.FETCH_SUCCESS,
    payload:item
  }
  return action
}

export function fetchFailed(item:ILiuren){
  const action: LiurenAction = {
    type: actionTypes.FETCH_FAILED,
    payload:{
      ...item
    }
  }
  return action
}

