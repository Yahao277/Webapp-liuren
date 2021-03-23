import { CREATE_RECORD,SAVE_RECORD,DELETE_RECORD,FETCH_FAILED,FETCH_LOADING,FETCH_SUCCESS } from "../actionTypes";

const initialState:LiurenState = {
  items: [],
  loading: false,
  error: null
}

export function LiurenReducer(state=initialState,action:LiurenAction):LiurenState{
  switch(action.type){
    case CREATE_RECORD:{
      const article = action.payload
      return{
        ...state,
        items: [...state.items,action.payload as ILiuren]
      }
    }
    case SAVE_RECORD:{
      const art = action.payload as ILiuren;
      return{
        ...state,
        items: [...state.items.filter(article => article.id !== art.id),art]
      }
    }
    case DELETE_RECORD:{
      const art = action.payload as ILiuren
      return{
        ...state,
        items: [...state.items.filter(article => article !== art)]
      }
    }
    case FETCH_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        items: [...action.payload as ILiuren[]]
      };
    case FETCH_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
        items: []
      };
    default:{
      return state
    }
  }
}