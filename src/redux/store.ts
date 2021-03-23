import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {LiurenReducer} from './reducers'


export type AppState = ReturnType<typeof LiurenReducer>;



export default function configureStore() {
  const middlewares = [thunkMiddleware];
  const middleWareEnhancer = applyMiddleware(...middlewares);

  const store = createStore(
    LiurenReducer,
    composeWithDevTools(middleWareEnhancer)
  );

  return store;
}
