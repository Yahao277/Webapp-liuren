import * as actionTypes from "./actionTypes"

export function saveRecord(article: ILiuren) {
  const action: LiurenAction = {
    type: actionTypes.SAVE_RECORD,
    article,
  }

  return simulateHttpRequest(action)
}

export function createRecord(article: ILiuren) {
  const action: LiurenAction = {
    type: actionTypes.CREATE_RECORD,
    article,
  }
  return simulateHttpRequest(action)
}

export function simulateHttpRequest(action: LiurenAction) {
  return (dispatch: DispatchType) => {
    setTimeout(() => {
      dispatch(action)
    }, 500)
  }
}