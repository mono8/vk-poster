import { createStore } from "redux";
import { combineReducers } from "redux";

import { groups } from "./groups/reducers";
import { user } from "./user/reducers";
import { status } from "./status/reducers";

const rootReducer = combineReducers({
  groups,
  user,
  status,
});

export const store = createStore(
  rootReducer,
  // @ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export type AppStateType = ReturnType<typeof rootReducer>;
